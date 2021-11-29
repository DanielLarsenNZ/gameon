using Dapr.Client;
using GameOn.Common;
using GameOn.Models;
using GameOn.Users.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace GameOn.Users
{
    public class UsersService : GameOnService<User>
    {
        private readonly GraphService _graph;

        public UsersService(DaprClient daprClient, ILogger<UsersService> logger, GraphService graph, IConfiguration configuration)
            : base(daprClient, logger, configuration)
        {
            _graph = graph;
        }

        public override async Task<User> Create(string tenantId, User entity)
        {
            return await base.Create(tenantId, entity);
            // TODO: Pub User Create
        }

        public async Task GetUsers(HttpContext context)
        {
            try
            {
                var @params = await JsonSerializer.DeserializeAsync<GetUsersParams>(
                    context.Request.Body,
                    _jsonOptions);

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
            catch (Exception ex)
            {
                _log.LogError(new Exception(ex.Message, ex), ex.Message);
                throw;
            }
        }

        public async Task<PhotoResult> GetUserPhoto(
            string tenantId,
            string aadUserObjectId,
            string size) => await _graph.GetUserPhoto(tenantId, aadUserObjectId, size);
    }
}
