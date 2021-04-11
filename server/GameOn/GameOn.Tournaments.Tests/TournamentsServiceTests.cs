using GameOn.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GameOn.Tournaments.Tests
{
    [TestClass]
    public class TournamentsServiceTests
    {
        [TestMethod]
        public void UpdatePlayerRankScores_TwoPlayersSameScore_BothPlayersHaveSameRank()
        {
            // Arrange
            var scoredPlayers = new[] { new Player { RankingScore = 1000 }, new Player { RankingScore = 1000 } };

            // Act
            var rankedPlayers = TournamentsService.RecalculateRankings(scoredPlayers);

            // Assert
            Assert.AreEqual(rankedPlayers[0].Rank, rankedPlayers[1].Rank, "The ranks of these two players should be the same, because they have the same score.");
        }
    }
}
