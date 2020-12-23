namespace GameOn.Models
{
    public class Player : IGameOnModel
    {
        //public string Email { get; set; } //TODO: PII
        public string ImageUrl { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
    }
}
