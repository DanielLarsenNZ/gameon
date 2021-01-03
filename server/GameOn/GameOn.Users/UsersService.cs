using Dapr.Client;
using GameOn.Common;
using GameOn.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Threading.Tasks;

namespace GameOn.Users
{
    public class UsersService : GameOnService<User>
    {
        public UsersService(DaprClient daprClient, ILogger<UsersService> logger) : base(daprClient, logger) { }

        public override Task<User> Create(string tenantId, User entity)
        {
            // TODO: Augment pic and email from Graph
            return base.Create(tenantId, entity);
            // TODO: Pub User Create
        }

        public async Task GetUser(HttpContext context)
        {
            var @params = await JsonSerializer.DeserializeAsync<GetUserParams>(
                context.Request.Body, _jsonOptions);

            var user = await Get(@params.TenantId, @params.UserId);

            if (user == null)
            {
                _log.LogWarning($"User Id {@params.UserId} not found in Tenant {@params.TenantId}");
                context.Response.StatusCode = 404;
                return;
            }

            context.Response.ContentType = "application/json";
            await JsonSerializer.SerializeAsync(context.Response.Body, user, _jsonOptions);
        }
    }
}
