using Dapr.Client;
using GameOn.Common;
using GameOn.Common.Exceptions;
using GameOn.Models;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading.Tasks;

namespace GameOn.Tournaments
{
    public class TournamentsService : GameOnService<Tournament>
    {
        public TournamentsService(DaprClient daprClient, ILogger<TournamentsService> logger) : base(daprClient, logger)
        {
        }

        internal async Task<Tournament> AddPlayers(string tenantId, string tournamentId, string[] userIds)
        {
            // Get Tournament Entry
            var entry = await GetStateEntry(tenantId);

            // Convert into List
            var tournaments = ToList(entry);

            // Tournament must exist
            if (!tournaments.Any(t => t.Id == tournamentId))
                throw new NotFoundException($"Tournament Id {tournamentId} is not found");

            var tournament = tournaments.First(t => t.Id == tournamentId);
            
            // get Users from User service 
            User[] users = await GetUsers(tenantId, userIds);

            // Add Users to Players. Players that already exist will be replaced.
            var players = tournament.Players.ToDictionary(p => p.Id);
            foreach (var user in users) players[user.Id] = user;
            tournament.Players = players.Select(p => p.Value).ToArray();

            await AddAndSaveStateEntry(entry, tournament);

            return tournament;
        }

        internal async Task<User[]> GetUsers(string tenantId, string[] userIds)
        {
            // Get Player from Player Service
            var userResponse = await _dapr.InvokeMethodWithResponseAsync<GetUsersParams, User[]>(
                GameOnNames.UsersAppName,
                GameOnUsersMethodNames.GetUsers,
                new GetUsersParams { TenantId = tenantId, UserIds = userIds },
                httpOptions: new HttpInvocationOptions { Method = System.Net.Http.HttpMethod.Get });
                //httpExtension: new Dapr.Client.Http.HTTPExtension { Verb = Dapr.Client.Http.HTTPVerb.Get });

            return userResponse.Body;
        }

        public async Task<User> GetUser(string tenantId, string userId)
            => (await GetUsers(tenantId, new[] { userId })).FirstOrDefault();
    }
}
