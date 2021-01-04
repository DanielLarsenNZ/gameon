using Dapr;
using Dapr.Client;
using GameOn.Exceptions;
using GameOn.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace GameOn.Common
{
    public class GameOnService<T> where T : GameOnModel
    {
        protected readonly ILogger<GameOnService<T>> _log;
        protected readonly DaprClient _dapr;
        protected static JsonSerializerOptions _jsonOptions
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
        public GameOnService(DaprClient daprClient, ILogger<GameOnService<T>> logger)
        {
            _dapr = daprClient;
            _log = logger;
        }

        public virtual async Task<T> Create(string tenantId, T entity)
        {
            entity.EnforceInvariants();

            // Get entities from State Store as array
            var entry = await GetStateEntry(tenantId);

            // Convert into List
            var entities = ToList(entry);

            // Guard for conflict
            if (entities.Any(e => e.Id == entity.Id))
            {
                _log.LogInformation($"Create: {nameof(T)} Id \"{entity.Id}\" already exists in Tenant Id \"{tenantId}\".");
                throw new ConflictException($"{nameof(T)} Id \"{entity.Id}\" already exists.");
            }

            entities.Add(entity);

            // Convert back to Array save Entry
            entry.Value = entities.ToArray();
            await entry.SaveAsync();

            return entity;
        }

        public async Task<T> Get(string tenantId, string id)
        {
            var entities = await GetAll(tenantId);
            if (entities is null || !entities.Any() || !entities.Any(e => e.Id == id)) return default;
            return entities.First(e => e.Id == id);
        }

        public async Task<T[]> GetAll(string tenantId)
            => await _dapr.GetStateAsync<T[]>(GameOnNames.StateStoreName, tenantId);

        public async Task<T[]> GetBatch(string tenantId, string[] ids) 
            => (await GetAll(tenantId)).Where(e => ids.Contains(e.Id)).ToArray();

        public async Task<StateEntry<T[]>> GetStateEntry(string tenantId) 
            => await _dapr.GetStateEntryAsync<T[]>(GameOnNames.StateStoreName, tenantId);

        protected List<T> ToList(StateEntry<T[]> entry) => entry.Value is null ? new List<T>() : new List<T>(entry.Value);
    }
}
