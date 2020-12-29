using GameOn.Helpers;
using GameOn.Models;
using Microsoft.Identity.Web;
using System.Linq;
using System.Security.Claims;

namespace GameOn.Extensions
{
    public static class UserExtensions
    {
        public static UserClaimsInfo GameOnUser(this ClaimsPrincipal claimsPrincipal)
        {
            return new UserClaimsInfo
            {
                GivenName = claimsPrincipal?.Claims?.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname").Value,
                Name = claimsPrincipal.GetDisplayName(),
                Surname = claimsPrincipal?.Claims?.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname").Value,
                ObjectId = claimsPrincipal.GetObjectId(),
                Upn = claimsPrincipal.GetNameIdentifierId(),
                Id = CryptoHelper.Sha256(claimsPrincipal.GetObjectId())
            };
        }
    }
}
