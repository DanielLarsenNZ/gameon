using Dapr.Client;
using GameOn.Common;
using GameOn.Models;
using GameOn.Tournaments.Calculators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public TournamentsResultsController(ILogger<TournamentsResultsController> log, TournamentsService tournamentsService)
        {
            _log = log;
            _tournaments = tournamentsService;
        }
        
        // Create Result
        [HttpPost("{tournamentId}")]
        public async Task<ActionResult<Result>> Post(
            [FromRoute] string tournamentId, 
            [FromBody] Result result)
        {
            string tenantId = User.GetTenantId();

            return new OkObjectResult(tenantId);

            // v2

            // 1. Recalculate Scores for each player in the Result
            var newScores = await _tournaments.CalculatePlayerScores(tenantId, tournamentId, result);

            // 2. Recalulate Rankings for all players in the Tournament
            var tournament = await _tournaments.UpdatePlayerRankScores(tenantId, tournamentId, newScores);

            // 3. Message results topic




            //v1
            // (1 check tournament exists) (
            // 2 enforce invariance
            // 3 call tournament/rankings to get score
            //var currentScores = await _dapr.InvokeMethodWithResponseAsync<GetUsersParams, User[]>(
            //    GameOnNames.UsersAppName, 
            //    GameOnUsersMethodNames.GetUsers, // change
            //    new GetUsersParams { TenantId = tenantId, UserIds = userIds },
            //    httpOptions: new HttpInvocationOptions { Method = System.Net.Http.HttpMethod.Get });
            // 4 calculate ELO score for both players
            // 5 post ELO score for both players to tournament/rankings endpoint
            // 6 message to results topic
        }
    }
}
