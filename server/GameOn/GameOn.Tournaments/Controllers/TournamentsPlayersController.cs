using GameOn.Exceptions;
using GameOn.Extensions;
using GameOn.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web;
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
        private readonly TournamentsService _tournaments;

        public TournamentsPlayersController(ILogger<TournamentsPlayersController> log, TournamentsService service)
        {
            _log = log;
            _tournaments = service;
        }

        // GET all Players
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> Get(string tournamentId)
        {
            // Get Tournament
            var tournament = await _tournaments.Get(User.GetTenantId(), tournamentId);
            return tournament.Players;
        }

        // Get Player
        [HttpGet("{userId}")]
        public async Task<ActionResult<Player>> Get(
            string tournamentId,
            string userId)
        {
            // Get Tournament
            var tournament = await _tournaments.Get(User.GetTenantId(), tournamentId);

            // Get Player
            var player = tournament.Players.FirstOrDefault(p => p.Id == userId);

            if (player is null) return new NotFoundResult();
            return player;
        }

        /// <summary>
        /// Add Users as Players to Tournament. Accepts an <see cref="AddPlayersModel"/> with three optional 
        /// properties: `playerId` (a string), `playerIds` (an array of strings) or `addMe` (a boolean). At 
        /// least one of these properties must be set. Any combination is accepted.
        /// </summary>
        /// <returns>The <see cref="Tournament"/> after any players have been added.</returns>
        [HttpPost]
        public async Task<ActionResult<Tournament>> Post(string tournamentId, [FromBody] AddPlayersModel addPlayers)
        {
            var playerIds = new List<string>();

            if (addPlayers.AddMe) playerIds.Add(User.GameOnUserId());
            if (addPlayers.PlayerId != null) playerIds.Add(addPlayers.PlayerId);
            if (addPlayers.PlayerIds != null) playerIds.AddRange(addPlayers.PlayerIds);

            if (!playerIds.Any()) return new BadRequestObjectResult("Provide either playerId or playerIds or addMe: true");
            
            try
            {
                return await _tournaments.AddPlayers(User.GetTenantId(), tournamentId, playerIds.ToArray());
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
