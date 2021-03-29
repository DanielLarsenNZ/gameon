using Dapr.Client;
using GameOn.Common;
using GameOn.Models;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading.Tasks;

namespace GameOn.Results
{
    public class ResultsService : GameOnService<Result>
    {
        public ResultsService(DaprClient daprClient, ILogger<ResultsService> logger) : base(daprClient, logger)
        {
        }
    }
}
