using GameOn.Common.Exceptions;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace GameOn.Models
{
    public class Tournament : GameOnModel
    {
        public string Description { get; set; }
        
        public DateTimeOffset? EndDate { get; set; }
        
        public string Location { get; set; }
        
        public int? MaxPlayers { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        public User Owner { get; set; }
        
        public int PlayerCount => (Players is null || !Players.Any()) ? 0 : Players.Length;

        public string PlayingFor { get; set; }
        
        public User[] Players { get; set; }
        
        public DateTimeOffset? StartDate { get; set; }
        
        public string TimeOfPlayDescription { get; set; }
        
        public override void EnforceInvariants()
        {
            base.EnforceInvariants();

            EnforcePropertyNotSetInvariant(Name, nameof(Name));
            if (Players is null || !Players.Any()) throw new InvariantException("Tournament must have at least one Player");
            if (Owner is null || !Players.Any(p => p.Id == Owner.Id)) throw new InvariantException("Tournament must have an Owner who is also a Player");
        }
    }
}
