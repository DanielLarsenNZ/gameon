using Dapr.Client;
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
        const string StoreName = "statestore";  //TODO: Config?
        private readonly ILogger<User> _log;

        public UsersController(ILogger<User> log) => _log = log;

        // Get User
        [HttpGet]
        public async Task<ActionResult<User>> Get([FromServices] DaprClient dapr)
        {
            var userInfo = User.GameOnUser();
            var entry = await dapr.GetStateEntryAsync<User>(StoreName, userInfo.Id);

            if (entry.Value is null) return NotFound($"User Id {userInfo.Id} not found");
            return entry.Value;
        }

        // POST - Create User
        [HttpPost]
        public async Task<ActionResult<User>> Post([FromServices] DaprClient dapr)
        {
            var user = User.GameOnUser() as User;

            // TODO: Get pic and Email from Graph

            // Create in Storage
            await dapr.SaveStateAsync(
                StoreName,
                user.Id,
                user,
                stateOptions: new StateOptions { Consistency = ConsistencyMode.Strong });

            // TODO: Pub user created

            return new CreatedResult($"{Request.GetEncodedUrl()}/{user.Id}", user);
        }
    }
}
