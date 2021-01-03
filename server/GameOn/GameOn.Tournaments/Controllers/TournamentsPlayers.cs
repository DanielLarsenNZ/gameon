using Dapr.Client;
using GameOn.Common;
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
    [Route("tournaments/{tournamentId}/players")]
    [ApiController]
    [Authorize]
    public class TournamentsPlayersController : ControllerBase
    {
        private readonly ILogger<TournamentsPlayersController> _log;
        private readonly GameOnService<Tournament> _tournaments;

        public TournamentsPlayersController(ILogger<TournamentsPlayersController> log, GameOnService<Tournament> service)
        {
            _log = log;
            _tournaments = service;
        }

        // GET all Players
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get(string tournamentId)
        {
            string tenantId = User.GetTenantId();

            // Get Tournament
            var tournament = await _tournaments.Get(tenantId, tournamentId);
            return tournament.Players;
        }

        // Get Player
        [HttpGet("{userId}")]
        public async Task<ActionResult<User>> Get(
            string tournamentId, 
            string userId)
        {
            string tenantId = User.GetTenantId();
        }

        // Add Users as Players to Tournament
        [HttpPost]
        public async Task<ActionResult> Post(
            string tournamentId,
            string[] userIds)
        {
            string tenantId = User.GetTenantId();

        }
    }
}
