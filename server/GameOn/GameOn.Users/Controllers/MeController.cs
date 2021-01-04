using GameOn.Common;
using GameOn.Exceptions;
using GameOn.Extensions;
using GameOn.Models;
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
        private readonly GameOnService<User> _users;

        public MeController(ILogger<MeController> log, GameOnService<User> usersService)
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
            var user = await _users.Get(tenantId, userId);

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
                               await _users.Create(User.GetTenantId(), User.GameOnUser()));
            }
            catch (ConflictException ex)
            {
                // So that this endpoint can be idempotent, a Conflict status is not returned here.
                // The stored User is returned. It is not replaced. A 200 Ok status code is returned 
                // instead of 201 Created.
                _log.LogInformation($"Post: {ex.Message}. User was not replaced.");
                return new JsonResult(await _users.Get(User.GetTenantId(), User.GameOnUserId()));
            }
        }
    }
}
