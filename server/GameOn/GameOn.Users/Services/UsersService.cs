using Dapr.Client;
using GameOn.Common;
using GameOn.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace GameOn.Users.Services
{
    public class UsersService
    {
        private readonly ILogger<UsersService> _log;
        private readonly DaprClient _dapr;
        private readonly JsonSerializerOptions _jsonOptions
            = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                PropertyNameCaseInsensitive = true
            };

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="daprClient"></param>
        /// <param name="logger"></param>
        public UsersService(DaprClient daprClient, ILogger<UsersService> logger)
        {
            _dapr = daprClient;
            _log = logger;
        }

        public async Task GetUser(HttpContext context)
        {
            var userId = await JsonSerializer.DeserializeAsync<string>(context.Request.Body, _jsonOptions);

            var user = await GetUser(userId);

            if (user == null)
            {
                Console.WriteLine("User not found");
                context.Response.StatusCode = 404;
                return;
            }

            context.Response.ContentType = "application/json";
            await JsonSerializer.SerializeAsync(context.Response.Body, user, _jsonOptions);
        }

        public async Task<User> GetUser(string userId)
            => await _dapr.GetStateAsync<User>(GameOnNames.StateStoreName, userId);
    }
}
