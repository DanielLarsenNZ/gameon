using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameOn.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web;

namespace GameOn.Tournaments.Controllers
{
    [Route("tournaments/{tournamentId}/rankings")]
    [ApiController]
    [Authorize]
    public class TournamentsRankingsController : ControllerBase
    {
        private readonly ILogger<TournamentsRankingsController> _log;
        private readonly TournamentsService _tournaments;

        public TournamentsRankingsController(ILogger<TournamentsRankingsController> log, TournamentsService service)
        {
            _log = log;
            _tournaments = service;
        }

        // GET all rankings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ranking>>> Get(string tournamentId)
        {
            var rankings = await _tournaments.GetRankings(User.GetTenantId(), tournamentId);
            // TODO validate this returns expected format once implemented
            return rankings;
        }

    }
}
