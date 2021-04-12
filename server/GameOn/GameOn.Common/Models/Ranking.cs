using System;
namespace GameOn.Models
{
    public class Ranking : GameOnModel
    {
        public int Rank { get; set; }

        public User Player { get; set; } // user vs player

        public int Score { get; set; } // use double for flexibility? Elo is int?

        public override void EnforceInvariants()
        {
            base.EnforceInvariants();

            // TODO enforce invariance on non string types - extend base or DIY

        }
    }
}
