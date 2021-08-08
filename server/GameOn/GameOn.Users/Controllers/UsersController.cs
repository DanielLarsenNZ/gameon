using GameOn.Exceptions;
using GameOn.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web;
using System;
using System.Threading.Tasks;

namespace GameOn.Users.Controllers
{
    /// <summary>
    /// Resources that take effect on the current user.
    /// </summary>
    [Route("[controller]")]
    [ApiController]
    [Authorize(Roles = "GameOn.Admins")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _log;
        private readonly UsersService _users;

        public UsersController(ILogger<UsersController> log, UsersService usersService)
        {
            _log = log;
            _users = usersService;
        }

        /// <summary>
        /// Get all users in the Tenant
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<User[]>> Get()
        {
            var tenantId = User.GetTenantId();
            var users = await _users.GetAll(tenantId);

            if (users is null)
            {
                return new User[] { };
            }

            return users;
        }

        /// <summary>
        /// Create a User
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<User>> Post(User user)
        {
            try
            {
                return new CreatedResult(
                               $"{Request.GetEncodedUrl()}",
                               await _users.Create(User.GetTenantId(), user));
            }
            catch (ConflictException ex)
            {
                return Conflict(ex.Message);
            }
        }

        /// <summary>
        /// Get the current authenticated User profile photo
        /// </summary>
        /// <remarks> /me/photo[?size=128x128] </remarks>
        [HttpGet("{userId}/photos")]
        public async Task<ActionResult<User>> GetPhoto([FromQuery] string size, string userId)
        {
            if (string.IsNullOrEmpty(size)) size = "120x120";

            string tenantId = User.GetTenantId();
            var user = await _users.Get(tenantId, userId);

            try
            {
                var result = await _users.GetUserPhoto(tenantId, user.ObjectId, size);
                if (result is null) return NotFound();
                return File(result.Content, result.ContentType);
            }
            catch (ArgumentOutOfRangeException ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }
    }
}
