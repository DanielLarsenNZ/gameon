﻿using GameOn.Users.Models;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Graph;
using Microsoft.Identity.Web;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace GameOn.Users
{
    public class GraphService
    {
        internal static string[] PhotoSizes = new[] { "48X48", "64X64", "96X96", "120x120", "240X240", "360X360", "432X432", "504X504", "648X648" };

        private readonly IHttpClientFactory _httpFactory;
        private readonly IMemoryCache _cache;
        private readonly ITokenAcquisition _tokenAcquisition;
        private readonly ILogger<GraphService> _log;

        public GraphService(IHttpClientFactory clientFactory, IMemoryCache cache, ITokenAcquisition tokenAcquisition, ILogger<GraphService> logger)
        {
            _httpFactory = clientFactory;
            _cache = cache;
            _tokenAcquisition = tokenAcquisition;
            _log = logger;
        }

        private async Task<GraphServiceClient> GetGraphClient(string[] scopes)
        {
            var token = await _tokenAcquisition.GetAccessTokenForUserAsync(
             scopes).ConfigureAwait(false);

            var client = _httpFactory.CreateClient();
            client.BaseAddress = new Uri("https://graph.microsoft.com/beta");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            GraphServiceClient graphClient = new GraphServiceClient(client)
            {
                AuthenticationProvider = new DelegateAuthenticationProvider(
#pragma warning disable CS1998 // lambda must return async result to compile
                async (requestMessage) =>
#pragma warning restore CS1998 
                {
                    requestMessage.Headers.Authorization = new AuthenticationHeaderValue("bearer", token);
                })
            };

            graphClient.BaseUrl = "https://graph.microsoft.com/beta";
            return graphClient;
        }

        public async Task<PhotoResult> GetUserPhoto(
            string tenantId,
            string aadUserId,
            string size)
        {
            if (!PhotoSizes.Contains(size))
                throw new ArgumentOutOfRangeException(
                    nameof(size),
                    size, $"`size` param must be one of the following values: {string.Join(',', PhotoSizes)}");

            string uri = $"https://graph.microsoft.com/v1.0/users/{aadUserId}/photos/{size}/$value";
            string key = $"{tenantId}|{uri}";

            if (_cache.TryGetValue(key, out PhotoResult cacheValue)) return cacheValue;

            _log.LogTrace($"GetUserPhoto: Cache miss key = {key}");

            //var graphclient = await GetGraphClient(new string[] { "User.ReadBasic.All", "user.read" });
            //var graphclient = await GetGraphClient(new string[] { "User.ReadBasic.All", "profile" });
            //var graphclient = await GetGraphClient(new string[] { "https://graph.microsoft.com/profile" });
            var graphclient = await GetGraphClient(new string[] { "https://graph.microsoft.com/User.Read" });
            //api://GameOn.Api
            //var graphclient = await GetGraphClient(new string[] { "api://GameOn.Api/Users", "https://graph.microsoft.com/User.Read" });

            try
            {
                using (Stream photo = await graphclient.Users[aadUserId].Photos[size].Content.Request().GetAsync())
                {
                    if (photo is null)
                    {
                        _log.LogWarning($"GetUserPhoto: Photo not found. TenantId = {tenantId}, Uri = {uri}");
                        return null;
                    }

                    MemoryStream ms = new MemoryStream();
                    photo.CopyTo(ms);

                    var result = new PhotoResult { Content = ms.ToArray(), ContentType = "image/png" };

                    _cache.Set(key, result, TimeSpan.FromDays(1));
                    return result;
                }
            }
            catch (ServiceException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
            {
                _log.LogWarning($"GetUserPhoto: Photo not found. TenantId = {tenantId}, Uri = {uri}");
                _cache.Set(key, default(PhotoResult), TimeSpan.FromDays(1));
                return null;
            }
        }
    }
}
