using GameOn.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

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
        public void UpdatePlayerRankScores_TwoPlayersSameScore_RankIsNotNull()
        {
            // Arrange
            var scoredPlayers = new[] { new Player { RankingScore = 1000 }, new Player { RankingScore = 1000 } };

            // Act
            var rankedPlayers = TournamentsService.RecalculateRankings(scoredPlayers);

            // Assert
            Assert.IsFalse(rankedPlayers.Any(p => p is null), "No player rank should be null");
        }

        [TestMethod]
        public void UpdatePlayerRankScores_TwoPlayersDifferentScore_HigherRankIsRankedFirst()
        {
            // Arrange
            var scoredPlayers = new[] { new Player { RankingScore = 1000 }, new Player { RankingScore = 2000 } };

            // Act
            var rankedPlayers = TournamentsService.RecalculateRankings(scoredPlayers);

            // Assert
            Assert.IsTrue(rankedPlayers.First(p => p.RankingScore == 2000).Rank == 1, "The player with the higher ranking score should be ranked 1st (1)");

        }

        [TestMethod]
        public void UpdatePlayerRankScores_TwoPlayersDifferentScore_NoRankLessThan1()
        {
            // Arrange
            var scoredPlayers = new[] { new Player { RankingScore = 1000 }, new Player { RankingScore = 2000 } };

            // Act
            var rankedPlayers = TournamentsService.RecalculateRankings(scoredPlayers);

            // Assert
            Assert.IsFalse(rankedPlayers.Any(p => p.Rank < 1), "Ranks should start at 1");
        }

        [TestMethod]
        public void RecalculateRankings_TwoPlayersSameRankingScore_HaveSameRank()
        {
            // arrange


            // act


            // assert

        }
    
    }
}
