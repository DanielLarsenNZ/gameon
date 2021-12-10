using GameOn.Exceptions;
using GameOn.Extensions;
using GameOn.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameOn.Tournaments.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class TournamentsController : ControllerBase
    {
        private readonly ILogger<TournamentsController> _log;
        private readonly TournamentsService _tournaments;

        public TournamentsController(ILogger<TournamentsController> log, TournamentsService service)
        {
            _log = log;
            _tournaments = service;
        }

        // Get tournament
        [HttpGet("{tournamentId}")]
        public async Task<ActionResult<Tournament>> Get(string tournamentId)
        {
            var tournament = await _tournaments.Get(User.GetTenantId(), tournamentId);
            if (tournament is null) return new NotFoundResult();
            return tournament;
        }

        // GET all tournaments with queries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tournament>>> Get(
            [FromQuery] int skip = 0,
            [FromQuery] int limit = 20,
            [FromQuery] string playerId = null)
        {
            // validate queries
            if (limit <= 0 || limit > 50) limit = 20;
            if (skip <= 0) skip = 0;

            var tournaments = await _tournaments.GetAll(User.GetTenantId());
            
            // filter by playerId if present
            if (playerId != null) tournaments =  tournaments.Where(t => 
                t.Players.Any(p => p.Id == playerId)).ToArray();

            if (skip > 0) tournaments = tournaments.Skip(skip).ToArray();

            if (limit > 0) tournaments = tournaments.Take(limit).ToArray();

            // if no tournaments, return empty array
            if (tournaments is null || !tournaments.Any()) return new Tournament[] { };

            return tournaments;
        }

        // Create Tournament
        [HttpPost]
        public async Task<ActionResult<Tournament>> Post(Tournament tournament)
        {
            string tenantId = User.GetTenantId();

            // Generate Id if not provided
            if (string.IsNullOrEmpty(tournament.Id)) tournament.Id = Guid.NewGuid().ToString("N");

            // Check for presence of Players
            if (tournament.Players != null)
                throw new ArgumentException("Players must not be included in Tournaments Post model. See PUT /tournaments/{tenant_id}/{id}/players.");

            // Check for presence of Owner
            if (tournament.Owner != null)
                throw new ArgumentException("Owner must not be included in Tournaments Post model.");

            // #52 default start date to be set to today if no start date is defined
            if (!tournament.StartDate.HasValue) tournament.StartDate = DateTimeOffset.Now;

            // #52 End date must be in the future
            if (tournament.EndDate.HasValue && tournament.EndDate.Value < DateTimeOffset.Now)
            {
                return new BadRequestObjectResult("If endDate is set, it must be a future date and time");
            }

            string userId = User.GameOnUserId();

            User user = await _tournaments.GetUser(tenantId, userId);

            tournament.Owner = user;
            tournament.Players = new[] { new Player(user) };

            try
            {
                await _tournaments.Create(tenantId, tournament);
            }
            catch (ConflictException)
            {
                return new ConflictResult();
            }

            return new CreatedResult($"{Request.GetEncodedUrl()}/{tournament.Id}", tournament);
        }

        /*
        [HttpPut("{tournamentId}")]
        public async Task<ActionResult<Tournament>> Put(Tournament tournament)
        {
            string tenantId = User.GetTenantId();

            try
            {
                await _tournaments.UpdateTournament(tenantId, tournament);
            }
            catch (NotFoundException)
            {
                return new NotFoundResult();
            }

            return new OkResult();

        } */

        [HttpDelete("{tournamentId}")]
        public async Task<ActionResult<Tournament>> Delete(string tournamentId)
        {
            string tenantId = User.GetTenantId();

            try
            {
                var tournament = await _tournaments.Get(tenantId, tournamentId);
                await _tournaments.Delete(tenantId, tournament);
            }
            catch (NotFoundException)
            {
                return new NotFoundResult();
            }
            
            return new OkResult();
        }

    }
}
