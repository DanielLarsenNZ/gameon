namespace GameOn.Models
{
    public class User : UserClaimsInfo, IGameOnModel
    {
        public string Email { get; set; } //TODO: PII
        public string ImageUrl { get; set; }
        public string ObjectId { get; set; }
        public string GivenName { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string Id { get; set; }
        public string TenantId { get; set; }
    }
}
