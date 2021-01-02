using Dapr.Client;
using GameOn.Common;
using GameOn.Exceptions;
using GameOn.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
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
            var @params = await JsonSerializer.DeserializeAsync<GetUserParams>(
                context.Request.Body, _jsonOptions);

            var user = await GetUser(@params.TenantId, @params.UserId);

            if (user == null)
            {
                _log.LogWarning($"User Id {@params.UserId} not found in Tenant {@params.TenantId}");
                context.Response.StatusCode = 404;
                return;
            }

            context.Response.ContentType = "application/json";
            await JsonSerializer.SerializeAsync(context.Response.Body, user, _jsonOptions);
        }

        public async Task<User> GetUser(string tenantId, string userId)
        {
            var users = await GetUsers(tenantId);
            if (users is null || !users.Any() || !users.Any(u => u.Id == userId)) return null;
            return users.First(u => u.Id == userId);
        }

        internal async Task<User> CreateUser(string tenantId, User user)
        {
            // TODO: Add pic URL and Email from Graph to User

            // Get Tournaments from State Store as array
            var entry = await _dapr.GetStateEntryAsync<User[]>(GameOnNames.StateStoreName, tenantId);

            // Convert into List
            var users = entry.Value is null ? new List<User>() : new List<User>(entry.Value);

            // Guard for conflict
            if (users.Any(u => u.Id == user.Id))
            {
                _log.LogInformation($"CreateUser: User Id \"{user.Id}\" already exists in Tenant Id \"{tenantId}\".");
                throw new ConflictException($"User Id \"{user.Id}\" already exists.");
            }

            users.Add(user);

            // Convert back to Array save Entry
            entry.Value = users.ToArray();
            await entry.SaveAsync();


            // TODO: Pub user created

            return user;
        }

        public async Task<User[]> GetUsers(string tenantId) 
            => await _dapr.GetStateAsync<User[]>(GameOnNames.StateStoreName, tenantId);
    }
}
