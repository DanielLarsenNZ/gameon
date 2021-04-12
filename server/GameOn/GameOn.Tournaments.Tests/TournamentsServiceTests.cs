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

        [TestMethod]
        public void UpdatePlayerRankScores_TwoPlayersDifferentScore_CorrectRankings()
        {
            var scoredPlayers = new[] { new Player { RankingScore = 1100 }, new Player { RankingScore = 1000 } };

            var rankedPlayers = TournamentsService.RecalculateRankings(scoredPlayers);

            Assert.IsTrue(rankedPlayers[0].Rank < rankedPlayers[1].Rank,"The highest scoring player should be ranked first, as per game rules.");
        }

        [TestMethod]
        public void UpdatePlayerRankScores_TwoPlayers_NonNullRanking()
        {
            var scoredPlayers = new[] { new Player { RankingScore = 1000 }, new Player { RankingScore = 1000 } };

            var rankedPlayers = TournamentsService.RecalculateRankings(scoredPlayers);

            Assert.IsTrue(rankedPlayers[0].Rank.HasValue && rankedPlayers[1].Rank.HasValue, "Rankings for players should not be null.");
        }

        [TestMethod]
        public void UpdatePlayerRankScores_ThreePlayers_SkipOnEqualRanking()
        {
            var scoredPlayers = new[] { new Player { RankingScore = 1000 }, new Player { RankingScore = 1000 }, new Player { RankingScore = 900 } };

            var rankedPlayers = TournamentsService.RecalculateRankings(scoredPlayers);

            Assert.IsTrue(rankedPlayers[0].Rank == 1 && rankedPlayers[1].Rank == 1 && rankedPlayers[2].Rank == 3, "Ranking should reflect the influence of previously equal rankings.");
        }
    }
}
