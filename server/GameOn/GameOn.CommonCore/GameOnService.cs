using Dapr;
using Dapr.Client;
using GameOn.Exceptions;
using GameOn.Models;
using Microsoft.Extensions.Configuration;
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
        protected readonly IConfiguration _config;
        protected readonly DaprClient _dapr;
        protected static JsonSerializerOptions _jsonOptions
            = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                PropertyNameCaseInsensitive = true
            };

        public GameOnService(DaprClient daprClient, ILogger<GameOnService<T>> logger, IConfiguration configuration)
        {
            _dapr = daprClient;
            _log = logger;
            _config = configuration;
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

            await AddAndSaveStateEntry(entry, entity);
            return entity;
        }

        public async Task Delete(string tenantId, T entity)
        {
            // Get Tournament Entry
            var entry = await GetStateEntry(tenantId);
            
            // ensure entity is valid
            entity.EnforceInvariants();

            // Convert into List
            var entities = ToList(entry);

            // Try get Tournament 
            if (!entities.Any(t => t.Id == entity.Id))
                throw new NotFoundException($"{nameof(T)} Id {entity.Id} is not found");
            
            await DeleteAndSaveEntry(entry, entity);
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

        public async Task AddAndSaveStateEntry(StateEntry<T[]> entry, T entity)
        {
            // Enforce Invariants
            entity.EnforceInvariants();

            var entities = ToList(entry);

            // Remove the entity from entites as it will be replaced
            entities.RemoveAll(e => e.Id == entity.Id);

            // Add entity to collection
            entities.Add(entity);

            // Convert back to Array save Entry
            entry.Value = entities.ToArray();
            await entry.SaveAsync();
        }

        public async Task DeleteAndSaveEntry(StateEntry<T[]> entry, T entity)
        {
            // Enforce Invariants
            entity.EnforceInvariants();

            var entities = ToList(entry);
            
            // TODO: Confirm not found handled external to service method
            
            // Remove the entity from entites
            entities.RemoveAll(e => e.Id == entity.Id);
            entry.Value = entities.ToArray();
            
            await entry.SaveAsync();
        }

        public async Task PublishEvent<TModel>(string topic, TModel data)
        {
            await _dapr.PublishEventAsync(GameOnNames.PubSubName, topic, data);
        }

        protected List<T> ToList(StateEntry<T[]> entry) => entry.Value is null ? new List<T>() : new List<T>(entry.Value);
    }
}
