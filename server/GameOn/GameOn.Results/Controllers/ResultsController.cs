using Dapr;
using GameOn.Common;
using GameOn.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
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

        [HttpGet("{tournament_id}")]
        public async Task<ActionResult<IEnumerable<MatchResult>>> Get(string tournamentId)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        [Topic(GameOnNames.PubSubName, GameOnTopicNames.NewMatchResult)]
        public async Task<ActionResult> Post(MatchResult result)
        {
            _log.LogTrace("Match result received", result);
            throw new NotImplementedException();
        }
    }
}
