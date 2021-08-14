using Dapr;
using GameOn.Common;
using GameOn.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Identity.Web;

namespace GameOn.Results.Controllers
{
    [Route("[controller]")]
    [ApiController]
    //[Authorize] TODO
    public class ResultsController : ControllerBase
    {
        private readonly ILogger<ResultsController> _log;
        private readonly ResultsService _results;

        public ResultsController(ILogger<ResultsController> log, ResultsService service)
        {
            _log = log;
            _results = service;
        }

        [HttpGet("{tournament_id}")]
        public async Task<ActionResult<IEnumerable<MatchResult>>> Get(string tournamentId)
        {
            var results = await _results.GetResults(User.GetTenantId(), tournamentId);

            if (results is null) return new NotFoundResult();

            return results;
        }
        
        [Topic(GameOnNames.PubSubName, GameOnTopicNames.NewMatchResult)]
        [HttpPost]
        public async Task<ActionResult> Post(MatchResult result)
        {
            _log.LogInformation($"Match result received: {result}", result);
            return Ok();
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<MatchResult>>> Get(
            [FromRoute] string tournamentId,
            [FromQuery] string playerId)
        {
            // Get all results in tournament
            var results = await _results.GetResults(User.GetTenantId(), tournamentId);
            
            // Get tournament results with player
            var playerResults = results.Where(r => 
                r.Player1Id == playerId || r.Player2Id == playerId).ToArray();
            
            if (playerResults.Length == 0) return new NotFoundResult();
            
            return playerResults;
        }

        [HttpGet]
        public async Task<ActionResult<MatchResult>> Delete(
            [FromRoute] string tournamentId,
            [FromQuery] string resultId)
        {
            throw new NotImplementedException();
        }
    }
}
