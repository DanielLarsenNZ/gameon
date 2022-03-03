using System;
using Dapr.Client;
using GameOn.Common;
using GameOn.Exceptions;
using GameOn.Models;
using GameOn.Tournaments.Calculators;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace GameOn.Tournaments
{
    public class TournamentsService : GameOnService<Tournament>
    {
        private readonly IScoreCalculator _scoreCalculator;

        public TournamentsService(DaprClient daprClient, ILogger<TournamentsService> logger, IScoreCalculator scoreCalculator, IConfiguration configuration) : base(daprClient, logger, configuration)
        {
            _scoreCalculator = scoreCalculator;
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

            // Add Users to Players. Players that already exist will be skipped.
            var players = tournament.Players.ToDictionary(p => p.Id);
            foreach (var user in users)
            {
                if (!players.ContainsKey(user.Id)) players[user.Id] = new Player(user);
            }

            tournament.Players = players.Select(p => p.Value).ToArray();

            await AddAndSaveStateEntry(entry, tournament);

            return tournament;
        }

        internal async Task<ScoreResult[]> CalculatePlayerScores(string tenantId, string tournamentId, MatchResult result)
        {
            // 1. Get Players from tournament
            // 1.1 Get Tournament Entry
            var entry = await GetStateEntry(tenantId);

            // 1.2 Convert into List
            var tournaments = ToList(entry);

            // 1.3 Try get Tournament 
            if (!tournaments.Any(t => t.Id == tournamentId))
                throw new NotFoundException($"Tournament Id {tournamentId} is not found");
            var tournament = tournaments.First(t => t.Id == tournamentId);

            // 1.4 Players must exist in Tournament
            if (!tournament.Players.Any(p=>p.Id==result.Player1Id))
            {
                throw new BadRequestException($"Player Id \"{result.Player1Id}\" does not exist in this Tournament.");
            }

            if (!tournament.Players.Any(p => p.Id == result.Player2Id))
            {
                throw new BadRequestException($"Player Id \"{result.Player2Id}\" does not exist in this Tournament.");
            }

            var players = tournament.Players.ToDictionary(p => p.Id);

            // 1.5 Get each player's current score and parse to ScoreResult
            ScoreResult playerOne = new ScoreResult(result.Player1Id, players[result.Player1Id].RankingScore);
            ScoreResult playerTwo = new ScoreResult(result.Player2Id, players[result.Player2Id].RankingScore);

            ScoreResult[] scores = { playerOne, playerTwo };

            // 2. Calculate score
            ScoreResult[] newScores = _scoreCalculator.Calculate(scores, result.WinnerId);

            // 3. Return score results
            return newScores;
        }

        internal async Task<User> GetUser(string tenantId, string userId)
            => (await GetUsers(tenantId, new[] { userId })).FirstOrDefault();

        internal async Task<User[]> GetUsers(string tenantId, string[] userIds)
        {
            try
            {
                // Get Player from Player Service
                return await _dapr.InvokeMethodAsync<GetUsersParams, User[]>(
                    HttpMethod.Get,
                    _config.UsersAppName(),
                    GameOnUsersMethodNames.GetUsers,
                    new GetUsersParams
                    {
                        TenantId = tenantId,
                        UserIds = userIds
                    });

            }
            catch (Exception ex)
            {
                _log.LogError(new Exception(ex.Message, ex), ex.Message);
                throw;
            }
        }

        internal async Task<Tournament> UpdatePlayerRankScores(string tenantId, string tournamentId, ScoreResult[] scores)
        {
            // Get Tournament Entry
            var entry = await GetStateEntry(tenantId);

            // Convert into List
            var tournaments = ToList(entry);

            // Try get Tournament 
            if (!tournaments.Any(t => t.Id == tournamentId))
                throw new NotFoundException($"Tournament Id {tournamentId} is not found");
            var tournament = tournaments.First(t => t.Id == tournamentId);

            // Update score of each player in scores
            var players = tournament.Players.ToDictionary(p => p.Id);
            foreach (var score in scores) players[score.PlayerId].RankingScore = score.Score;

            // Recalculate rankings
            var rankedPlayers = RecalculateRankings(players.Select(p => p.Value).ToArray());

            // Replace Players with ranked list
            tournament.Players = rankedPlayers;

            await AddAndSaveStateEntry(entry, tournament);

            return tournament;
        }

        internal static Player[] RecalculateRankings(Player[] players)
        {
            var orderedPlayers = players.OrderByDescending(p => p.RankingScore).ToArray();

            int rankCount = 1;
            orderedPlayers[0].Rank = rankCount;
            rankCount++;

            for (int i = 1; i < orderedPlayers.Length; i++)
            {
                if (orderedPlayers[i].RankingScore == orderedPlayers[i - 1].RankingScore)
                {
                    orderedPlayers[i].Rank = orderedPlayers[i - 1].Rank;
                    rankCount++;
                }
                else
                {
                    orderedPlayers[i].Rank = rankCount;
                    rankCount++;
                }
            }

            return orderedPlayers;
        }

        internal async Task UpdateTournament(string tenantId, Tournament tournament)
        {
            // Get Tournament Entry
            var entry = await GetStateEntry(tenantId);

            // Convert into List
            var tournaments = ToList(entry);

            // Try get Tournament 
            if (!tournaments.Any(t => t.Id == tournament.Id))
                throw new NotFoundException($"Tournament Id {tournament.Id} is not found");
            
            // TODO: confirm checks of tournament properties before update.

            await AddAndSaveStateEntry(entry, tournament);
            
        }
    }
}
