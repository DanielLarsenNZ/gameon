using System;
using System.Threading.Tasks;
using Dapr.Client;
using GameOn.Common;
using GameOn.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace GameOn.Results
{
    public class ResultsService : GameOnService<MatchResult>
    {
        public ResultsService(DaprClient daprClient, ILogger<ResultsService> logger, IConfiguration configuration) : base(daprClient, logger, configuration)
        {
        }

        internal async Task<Result[]> GetResults(string tenantId, string tournamentId)
        {
            throw new NotImplementedException();
        }
    }
}
