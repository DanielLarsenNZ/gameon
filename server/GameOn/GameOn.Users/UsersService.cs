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

        public async Task GetUsers(HttpContext context)
        {
            var @params = await JsonSerializer.DeserializeAsync<GetUsersParams>(
                context.Request.Body, _jsonOptions);

            User[] users = await GetBatch(@params.TenantId, @params.UserIds);

            if (users == null)
            {
                _log.LogWarning($"User Ids {@params.UserIds} not found in Tenant {@params.TenantId}");
                context.Response.StatusCode = 404;
                return;
            }

            context.Response.ContentType = "application/json";
            await JsonSerializer.SerializeAsync(context.Response.Body, users, _jsonOptions);
        }
    }
}
