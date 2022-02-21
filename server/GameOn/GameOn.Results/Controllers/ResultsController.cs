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
        
        [Topic(GameOnNames.PubSubName, GameOnTopicNames.NewMatchResult)]
        [HttpPost]
        public async Task<ActionResult> Post(MatchResult result)
        {
            // Generate Id if not provided
            if (string.IsNullOrEmpty(result.Id)) result.Id = Guid.NewGuid().ToString("N");

            // assume auth'd to get to endpoint
            string tenantId = User.GetTenantId();

            if (tenantId == null) tenantId = result.TenantId;

            Console.WriteLine($">> Result: {result}");
            try
            {
                return new CreatedResult(
                    $"{Request.GetEncodedUrl()}",
                    await _results.Create(tenantId, result));
            }
            catch (ConflictException ex)
            {
                _log.LogInformation($"Post: {ex.Message}. Result was not registered.");
                return Conflict(ex.Message);
            }
            
        }

        [Authorize] //TODO check if valid
        [HttpGet("{tournamentId}")]
        public async Task<ActionResult<IEnumerable<MatchResult>>> GetTournamentResults(
            [FromRoute] string tournamentId,
            [FromQuery] int skip = 0,
            [FromQuery] int limit = 20,
            [FromQuery] string playerId = null)
        {
            // validate queries
            if (limit <= 0 || limit > 50) limit = 20;
            if (skip <= 0) skip = 0;

            // Get all results in tournament
            var results = await _results.GetResults(User.GetTenantId(), tournamentId);
            
            // Get tournament results with player

            if (playerId != null) results = results.Where(r =>
                r.Player1Id == playerId || r.Player2Id == playerId).ToArray();

            if (skip > 0) results = results.Skip(skip).ToArray();

            if (limit > 0) results = results.Take(limit).ToArray();

            if (results is null || !results.Any()) return new MatchResult[] { };

            return results;
        }

        [HttpGet("{tournamentId}/results/{resultId}")]
        public async Task<ActionResult<MatchResult>> GetResult(
            [FromRoute] string tournamentId,
            [FromRoute] string resultId)
        {
            var result = await _results.GetResult(User.GetTenantId(),resultId);

            return result;
        }
    }
}
