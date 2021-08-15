using Dapr;
using GameOn.Common;
using GameOn.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using GameOn.Exceptions;
using Microsoft.AspNetCore.Http.Extensions;
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
            // assume auth'd to get to endpoint
            string tenantId = User.GetTenantId();
            
            try
            {
                return new CreatedResult(
                    $"{Request.GetEncodedUrl()}",
                    await _results.Create(User.GetTenantId(), result));
            }
            catch (ConflictException ex)
            {
                _log.LogInformation($"Post: {ex.Message}. Result was not registered.");
                return Conflict(ex.Message);
            }
            
        }


        [HttpGet("{tournamentId}")]
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

        [HttpGet("{tournamentId}/results/{resultId}")]
        public async Task<ActionResult<MatchResult>> Get(
            [FromRoute] string tournamentId,
            [FromRoute] string resultId)
        {
            throw new NotImplementedException();
        }
    }
}
