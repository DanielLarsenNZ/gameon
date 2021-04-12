using System;

namespace GameOn.Models
{
    public class ScoreResult
    {
        public ScoreResult(string playerId, int score)
        {
            PlayerId = playerId;
            Score = score;
        }
        public string PlayerId { get; set; }
        public int Score { get; set; }
    }
}
