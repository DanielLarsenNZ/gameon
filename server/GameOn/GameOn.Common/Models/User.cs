namespace GameOn.Models
{
    public class User : UserClaimsInfo, IGameOnModel
    {
        public string Email { get; set; } //TODO: PII
        public string ImageUrl { get; set; }
    }
}
