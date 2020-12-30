using GameOn.Helpers;
using GameOn.Models;
using Microsoft.Identity.Web;
using System.Linq;
using System.Security.Claims;

namespace GameOn.Extensions
{
    /// <remarks>
    /// Microsoft.Identity.Web requires .netcore or .net 5.0. Dapr does not (yet) support .net 5.0. 🙄
    /// </remarks>
    public static class UserExtensions
    {
        public static User GameOnUser(this ClaimsPrincipal claimsPrincipal) => new User
        {
            GivenName = claimsPrincipal?.Claims?.FirstOrDefault(
                c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname")?.Value,
            Name = claimsPrincipal?.Claims?.FirstOrDefault(
                c => c.Type == "name")?.Value,
            Surname = claimsPrincipal?.Claims?.FirstOrDefault(
                c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname")?.Value,
            ObjectId = claimsPrincipal.GetObjectId(),
            Id = claimsPrincipal.GameOnUserId(),
            TenantId = claimsPrincipal.GetTenantId()
        };

        public static string GameOnUserId(this ClaimsPrincipal claimsPrincipal) 
            => CryptoHelper.Sha256(claimsPrincipal.GetObjectId());
    }
}
