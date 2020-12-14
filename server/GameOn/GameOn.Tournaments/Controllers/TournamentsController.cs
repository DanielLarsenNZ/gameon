using Dapr;
using Dapr.Client;
using GameOn.Models;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace GameOn.Tournaments.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TournamentsController : ControllerBase
    {
        const string StoreName = "statestore";  //TODO: Config?
        private readonly ILogger<Tournament> _log; 

        public TournamentsController(ILogger<Tournament> log) => _log = log;

        // GET all tournaments
        [HttpGet]
        [HttpGet("{tenantId}")]
        public ActionResult<IEnumerable<Tournament>> Get(
            [FromState(StoreName, "tenantId")] StateEntry<Tournament[]> entry,
            string tenantId)
        {
            if (entry.Value is null) return NotFound($"Tenant Id {tenantId} is not found");
            return entry.Value;
        }

        // Get tournament
        [HttpGet("{tenantId}/{tournamentId}")]
        public ActionResult<Tournament> Get(
            [FromState(StoreName, "tenantId")] StateEntry<Tournament[]> entry,
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
            var entry = await dapr.GetStateEntryAsync<Tournament[]>(StoreName, tenantId);
            var tournaments = entry.Value is null ? new List<Tournament>() : new List<Tournament>(entry.Value);

            if (tournaments.Any(t => t.Id == tournament.Id))
            {
                _log.LogInformation($"Post: Tournament Id \"{tournament.Id}\" already exists in Tenant Id \"{tenantId}\".");
                return new ConflictResult();
            }

            tournaments.Add(tournament);
            entry.Value = tournaments.ToArray();

            await entry.SaveAsync();
            return new CreatedResult($"{Request.GetEncodedUrl()}/{tournament.Id}", tournament);
        }
    }
}
