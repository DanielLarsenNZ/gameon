using GameOn.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameOn.Results.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class ResultsController : ControllerBase
    {
        private readonly ILogger<ResultsController> _log;

        public ResultsController(ILogger<ResultsController> log)
        {
            _log = log;
        }
        
        // Create Result
        [HttpPost("{tournamentId}")]
        public async Task<ActionResult<Result>> Post(
            [FromRoute] string tournamentId, 
            [FromBody] Result result)
        {
            string tenantId = User.GetTenantId();
            // (1 check tournament exists) (
            // 2 enforce invariance
            // 3 call tournament/rankings to get score
            // 4 calculate ELO score for both players
            // 5 post ELO score for both players to tournament/rankings endpoint
            // 6 message to results topic
        }
    }
}
