using GameOn.Models;
using GameOn.Tournaments.Calculators;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GameOn.Tournaments.Tests
{
    [TestClass]
    public class EloCalculatorTests
    {
        EloScoreCalculator scoreCalculator = new EloScoreCalculator();

        [TestMethod]
        public void CalculateElo_AdjustScoresWhenSame()
        {
            var playerOne = new ScoreResult("p1", 1500);
            var playerTwo = new ScoreResult("p2", 1500);
            ScoreResult[] scores = { playerOne, playerTwo };

            var newScores = scoreCalculator.Calculate(scores, "p1");

            Assert.IsTrue(newScores[0].Score == 1516 && newScores[1].Score == 1484, "Player One's score should correctly increase proportional to eloK.");
        }

        [TestMethod]
        public void CalculateElo_AdjustScoresWhenDifferent_PlayerOneWin()
        {
            var playerOne = new ScoreResult("p1", 1700);
            var playerTwo = new ScoreResult("p2", 1300);
            ScoreResult[] scores = { playerOne, playerTwo };

            var newScores = scoreCalculator.Calculate(scores, "p1");

            Assert.IsTrue(newScores[0].Score == 1703 && newScores[1].Score == 1297, $"Player One's score should correctly increase proportional to eloK.");
        }

        [TestMethod]
        public void CalculateElo_AdjustScoresWhenDifferent_PlayerTwoWin()
        {
            var playerOne = new ScoreResult("p1", 1700);
            var playerTwo = new ScoreResult("p2", 1300);
            ScoreResult[] scores = { playerOne, playerTwo };

            var newScores = scoreCalculator.Calculate(scores, "p2");

            Assert.IsTrue(newScores[0].Score == 1671 && newScores[1].Score == 1329, "Player One's score should correctly increase proportional to eloK.");
        }
    }
}
