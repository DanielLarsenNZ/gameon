using GameOn.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web;
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
        [HttpPost("{tournamentId}")]
        public async Task<ActionResult<Tournament>> Post(
            [FromRoute] string tournamentId,
            [FromBody] Result result)
        {
            string tenantId = User.GetTenantId();

            // v2

            // 1. Recalculate Scores for each player in the Result
            var newScores = _tournaments.CalculatePlayerScores(result);

            // 2. Recalulate Rankings for all players in the Tournament
            var tournament = await _tournaments.UpdatePlayerRankScores(tenantId, tournamentId, newScores);

            // 3. Message results topic
            // TODO

            return tournament;
        }
    }
}
