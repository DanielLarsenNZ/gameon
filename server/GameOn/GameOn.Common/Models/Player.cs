using System;

namespace GameOn.Models
{
    /// <summary>
    /// A Player extends a User with properties that are specific to a Tournament
    /// </summary>
    public class Player : User
    {
        public Player()
        {

        }

        /// <summary>
        /// Create a new Player from an existing User
        /// </summary>
        public Player(User user)
        {
            GivenName = user.GivenName;
            Id = user.Id;
            Name = user.Name;
            ObjectId = user.ObjectId;
            Surname = user.Surname;
            TenantId = user.TenantId;
        }

        /// <summary>
        /// The ranking score for this player as calculated by the ranking algorithm. Null is no rank.
        /// </summary>
        public int? RankingScore { get; set; }

        /// <summary>
        /// The current rank of this player among all players in this Tournament. 1 is first place , 2 is second place and so on. Null is no rank.
        /// </summary>
        public int? Rank { get; set; }
    }
}
