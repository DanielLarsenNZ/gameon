using GameOn.Common;
using GameOn.Exceptions;
using GameOn.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web;
using System;
using System.Threading.Tasks;

namespace GameOn.Tournaments.Controllers
{
    [Route("tournaments/{tournamentId}/results")]
    [ApiController]
    [Authorize]
    public class TournamentsResultsController : ControllerBase
    {
        private readonly ILogger<TournamentsResultsController> _log;
        private readonly TournamentsService _tournaments;


        public TournamentsResultsController(ILogger<TournamentsResultsController> log, TournamentsService tournaments)
        {
            _log = log;
            _tournaments = tournaments;
        }

        // Create Result
        [HttpPost]
        public async Task<ActionResult<Tournament>> Post(
            [FromRoute] string tournamentId,
            [FromBody] MatchResult result)
        {
            string tenantId = User.GetTenantId();
            result.Id = Guid.NewGuid().ToString("N");
            result.TenantId = tenantId;

            // v2

            try
            {
                // CreatedAt default to Utc Now
                if (!result.CreatedAt.HasValue) result.CreatedAt = DateTimeOffset.UtcNow;

                // Check that the results model is valid
                result.EnforceInvariants();

                // 1. Recalculate Scores for each player in the Result
                var newScores = await _tournaments.CalculatePlayerScores(tenantId, tournamentId, result);

                // 2. Recalulate Rankings for all players in the Tournament
                var tournament = await _tournaments.UpdatePlayerRankScores(tenantId, tournamentId, newScores);
                
                // 3. Add tournaments reference to MatchResult object
                result.TournamentId = tournamentId;
                
                // 3. Message results topic
                await _tournaments.PublishEvent(GameOnTopicNames.NewMatchResult, result);
                
                return tournament;
            }
            catch (NotFoundException ex)
            {
                _log.LogError(ex, ex.Message);
                return NotFound(ex.Message);
            }
            catch (GameOnException ex) when (ex.GetType() == typeof(BadRequestException) || ex.GetType() == typeof(InvariantException))
            {
                _log.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
