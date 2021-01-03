using System.Text.Json.Serialization;

namespace GameOn.Models
{
    public class User : GameOnModel
    {
        public string GivenName { get; set; }
        public string ImageUrl { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

        [JsonIgnore]
        public string Email { get; set; } //TODO: PII
        [JsonIgnore]
        public string ObjectId { get; set; }
        [JsonIgnore]
        public string TenantId { get; set; }
    }
}
