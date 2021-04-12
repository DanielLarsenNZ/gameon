using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameOn.Results
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
