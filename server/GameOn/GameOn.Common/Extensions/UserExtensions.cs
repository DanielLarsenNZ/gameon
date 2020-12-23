using GameOn.Models;
using Microsoft.Identity.Web;
using System.Linq;
using System.Security.Claims;

namespace GameOn.Common.Extensions
{
    public static class UserExtensions
    {
        public static GameOnUser GameOnUser(this ClaimsPrincipal claimsPrincipal)
        {
            return new GameOnUser
            {
                GivenName = claimsPrincipal?.Claims?.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname").Value,
                Name = claimsPrincipal.GetDisplayName(),
                Surname = claimsPrincipal?.Claims?.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname").Value,
                ObjectId = claimsPrincipal.GetObjectId(),
                Upn = claimsPrincipal.GetNameIdentifierId()
            };
        }
    }
}
