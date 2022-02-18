using System;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Dapr.Client;
using GameOn.Common;
using GameOn.Exceptions;
using GameOn.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace GameOn.Results
{
    public class ResultsService : GameOnService<MatchResult>
    {
        public ResultsService(DaprClient daprClient, ILogger<ResultsService> logger, IConfiguration configuration) : base(daprClient, logger, configuration)
        {
        }
        
        internal async Task<MatchResult[]> GetResults(string tenantId, string tournamentId)
        {
            var entry = await GetStateEntry(tenantId);

            var results = ToList(entry);

            var result = results.Where(r => r.TournamentId == tournamentId);

            return result.ToArray();
        }

        internal async Task<MatchResult> GetResult(string tenantId, string resultId)
        {
            var entry = await GetStateEntry(tenantId);

            var results = ToList(entry);

            var result = results.First(r => r.Id == resultId);
            
            if (result != null)
                return result;
            throw new NotFoundException("Match Result not found"); 
        }

        internal async Task<ActionResult> Delete(string tenantId, string resultId)
        {
            var entry = await GetStateEntry(tenantId);

            var results = ToList(entry);
            
            if (!results.Any(t => t.Id == resultId))
                return new NotFoundResult();

            var result = results.First(r => r.Id == resultId);

            await DeleteAndSaveEntry(entry, result);

            return new OkResult();
        }
    }
}
