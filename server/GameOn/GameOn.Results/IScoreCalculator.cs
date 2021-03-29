using GameOn.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameOn.Results
{
    public interface IScoreCalculator
    {
        //(int player1score, int player2score) Calculate(int player1score, int player2score, Boolean player1wins);
        ScoreResult[] Calculate(ScoreResult[] scores, string winnerId);

    }
}
