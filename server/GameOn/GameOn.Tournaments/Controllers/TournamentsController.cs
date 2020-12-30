using Dapr;
using Dapr.Client;
using Dapr.Client.Autogen.Grpc.v1;
using GameOn.Common;
using GameOn.Extensions;
using GameOn.Helpers;
using GameOn.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace GameOn.Tournaments.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class TournamentsController : ControllerBase
    {
        private readonly ILogger<Tournament> _log;

        public TournamentsController(ILogger<Tournament> log) => _log = log;

        // GET all tournaments
        [HttpGet("{tenantId}")]
        public ActionResult<IEnumerable<Tournament>> Get(
            [FromState(GameOnNames.StateStoreName, "tenantId")] StateEntry<Tournament[]> entry,
            string tenantId)
        {
            if (entry.Value is null) return NotFound($"Tenant Id {tenantId} is not found");
            return entry.Value;
        }

        // Get tournament
        [HttpGet("{tenantId}/{tournamentId}")]
        public ActionResult<Tournament> Get(
            [FromState(GameOnNames.StateStoreName, "tenantId")] StateEntry<Tournament[]> entry,
            string tenantId,
            string tournamentId)
        {
            if (entry.Value is null) return NotFound($"Tenant Id {tenantId} is not found");
            var tournament = entry.Value.FirstOrDefault(t => t.Id == tournamentId);
            if (tournament is null) return NotFound($"Tournament Id {tournamentId} is not found");
            return tournament;
        }

        // POST 
        [HttpPost("{tenantId}")]
        public async Task<ActionResult<Tournament>> Post(
            [FromServices] DaprClient dapr,
            Tournament tournament,
            string tenantId)
        {
            // Generate Id if not provided
            if (string.IsNullOrEmpty(tournament.Id)) tournament.Id = Guid.NewGuid().ToString("N");

            // Check for presence of Players
            if (tournament.Players != null)
                throw new ArgumentException("Players must not be included in Tournaments Post model. See PUT /tournaments/{tenant_id}/{id}/players.");

            // Check for presence of Owner
            if (tournament.Owner != null)
                throw new ArgumentException("Owner must not be included in Tournaments Post model.");

            string userId = User.GameOnUserId();

            // TODO: Get Player from Player Service
            // The HttpInvocationOptions object is needed to specify additional information such as the HTTP method and an optional query string, because the receiving service is listening on HTTP.  If it were listening on gRPC, it is not needed.
            var userResponse = await dapr.InvokeMethodWithResponseAsync<string, User>(
                GameOnNames.UsersAppName, 
                GameOnUsersMethodNames.GetUser, 
                userId,
                httpExtension: new Dapr.Client.Http.HTTPExtension { Verb = Dapr.Client.Http.HTTPVerb.Get });

            // Create Player from User
            var player = new Player(userResponse.Body, tournament.Id);
            //var player = new Player(User.GameOnUser(), tournament.Id);

            tournament.Owner = player;
            tournament.Players = new Player[] { player };

            // Get Tournaments from State Store as array
            var entry = await dapr.GetStateEntryAsync<Tournament[]>(GameOnNames.StateStoreName, tenantId);

            // Convert into List
            var tournaments = entry.Value is null ? new List<Tournament>() : new List<Tournament>(entry.Value);

            // Guard for Tournament conflict
            if (tournaments.Any(t => t.Id == tournament.Id))
            {
                _log.LogInformation($"Post: Tournament Id \"{tournament.Id}\" already exists in Tenant Id \"{tenantId}\".");
                return new ConflictResult();
            }

            tournaments.Add(tournament);

            // Convert back to Array save Entry
            entry.Value = tournaments.ToArray();
            await entry.SaveAsync();

            return new CreatedResult($"{Request.GetEncodedUrl()}/{tournament.Id}", tournament);
        }
    }
}
