using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace GameOn.Models
{
    public class Tournament : IGameOnModel
    {
        public string Description { get; set; }
        
        public DateTimeOffset? EndDate { get; set; }
        
        public string Location { get; set; }
        
        public int? MaxPlayers { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        public Player Owner { get; set; }
        
        public int PlayerCount => (Players is null || !Players.Any()) ? 0 : Players.Length;

        public string PlayingFor { get; set; }
        
        public Player[] Players { get; set; }
        
        public DateTimeOffset? StartDate { get; set; }
        
        public string TimeOfPlayDescription { get; set; }
        
        public string Id { get; set; }
    }
}
