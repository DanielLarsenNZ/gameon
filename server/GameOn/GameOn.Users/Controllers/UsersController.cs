using Dapr.Client;
using GameOn.Common;
using GameOn.Extensions;
using GameOn.Models;
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

        public UsersController(ILogger<User> log) => _log = log;

        // Get User
        [HttpGet]
        public async Task<ActionResult<User>> Get([FromServices] DaprClient dapr)
        {
            var userId = User.GameOnUserId();
            var entry = await dapr.GetStateEntryAsync<User>(GameOnNames.StateStoreName, userId);

            if (entry.Value is null) return NotFound($"User Id {userId} not found");
            return entry.Value;
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
                user,
                stateOptions: new StateOptions { Consistency = ConsistencyMode.Strong });

            // TODO: Pub user created

            return new CreatedResult($"{Request.GetEncodedUrl()}", user);
        }
    }
}
