namespace GameOn.Models
{
    public class Tournament : Model
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string PlayingFor { get; set; }
        public int PlayerCount { get; set; }
        public Player[] Players { get; set; }
    }
}
