using GameOn.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameOn.Tournaments.Calculators
{
    public class EloScoreCalculator : IScoreCalculator
    {
        public ScoreResult[] Calculate(ScoreResult[] scores, string winnerId)
        {
            ScoreResult playerOne = scores[0];
            ScoreResult playerTwo = scores[1];

            int outcome = 1;

            if (winnerId == playerOne.PlayerId)
                outcome = 0;

            int eloK = 32;

            int delta = (int)(eloK * (outcome - ExpectationToWin(playerOne.Score, playerTwo.Score)));

            ScoreResult playerOneNew = new ScoreResult(playerOne.PlayerId, playerOne.Score - delta);
            ScoreResult playerTwoNew = new ScoreResult(playerTwo.PlayerId, playerTwo.Score + delta);

            ScoreResult[] newScores = { playerOneNew, playerTwoNew };

            return newScores;
        }

        internal double ExpectationToWin(int playerOneScore, int playerTwoScore) 
        {
            return 1 / (1 + Math.Pow(10, (playerOneScore - playerTwoScore) / 400.0));
        }
    }
}
