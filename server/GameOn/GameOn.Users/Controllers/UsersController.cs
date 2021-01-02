using Dapr.Client;
using GameOn.Common;
using GameOn.Extensions;
using GameOn.Models;
using GameOn.Users.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace GameOn.Users.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<User> _log;
        private readonly UsersService _users;

        public UsersController(ILogger<User> log, UsersService usersService)
        {
            _log = log;
            _users = usersService;
        }

        // Get User
        [HttpGet]
        public async Task<ActionResult<User>> Get()
        {
            var userId = User.GameOnUserId();
            var user = await _users.GetUser(userId);
            if (user is null) return NotFound($"User Id {userId} not found");
            return user;
        }

        // POST - Create User
        [HttpPost]
        public async Task<ActionResult<User>> Post([FromServices] DaprClient dapr)
        {
            var user = User.GameOnUser();
            // TODO: Get pic and Email from Graph

            // Create in Storage
            await dapr.SaveStateAsync(
                GameOnNames.StateStoreName,
                user.Id,
                user);

            // TODO: Pub user created

            return new CreatedResult($"{Request.GetEncodedUrl()}", user);
        }
    }
}
