using GameOn.Models;

namespace GameOn.Tournaments.Calculators
{
    public interface IScoreCalculator
    {
        ScoreResult[] Calculate(ScoreResult[] scores, string winnerId);
    }
}
