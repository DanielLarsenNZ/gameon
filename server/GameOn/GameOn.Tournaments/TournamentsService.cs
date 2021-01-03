using Dapr.Client;
using GameOn.Common;
using GameOn.Models;
using Microsoft.Extensions.Logging;

namespace GameOn.Tournaments
{
    public class TournamentsService : GameOnService<Tournament>
    {
        public TournamentsService(DaprClient daprClient, ILogger<TournamentsService> logger) : base(daprClient, logger)
        {
        }
    }
}
