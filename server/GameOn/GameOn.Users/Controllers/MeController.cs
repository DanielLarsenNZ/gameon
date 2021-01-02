using GameOn.Exceptions;
using GameOn.Extensions;
using GameOn.Models;
using GameOn.Users.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web;
using System.Threading.Tasks;

namespace GameOn.Users.Controllers
{
    /// <summary>
    /// Resources that take effect on the current user.
    /// </summary>
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class MeController : ControllerBase
    {
        private readonly ILogger<MeController> _log;
        private readonly UsersService _users;

        public MeController(ILogger<MeController> log, UsersService usersService)
        {
            _log = log;
            _users = usersService;
        }

        /// <summary>
        /// Get the current authenticated User
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<User>> Get()
        {
            var tenantId = User.GetTenantId();
            var userId = User.GameOnUserId();
            var user = await _users.GetUser(tenantId, userId);

            if (user is null)
            {
                _log.LogWarning($"User Id {userId} not found in Tenant {tenantId}");
                return NotFound($"User Id {userId} not found");
            }

            return user;
        }

        /// <summary>
        /// Create a User from Claims
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<User>> Post()
        {
            try
            {
                return new CreatedResult(
                               $"{Request.GetEncodedUrl()}",
                               await _users.CreateUser(User.GetTenantId(), User.GameOnUser()));
            }
            catch (ConflictException)
            {
                return new ConflictResult();
            }
        }
    }
}
