namespace GameOn.Models
{
    public class GetUsersParams
    {
        public string TenantId { get; set; }
        public string[] UserIds { get; set; }
    }
}
