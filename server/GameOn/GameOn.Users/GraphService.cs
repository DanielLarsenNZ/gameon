using GameOn.Users.Models;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Graph;
using Microsoft.Identity.Web;
using System;
using System.IO;
using System.Linq;
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

        public GraphService(IHttpClientFactory clientFactory, IMemoryCache cache, ITokenAcquisition tokenAcquisition)
        {
            _httpFactory = clientFactory;
            _cache = cache;
            _tokenAcquisition = tokenAcquisition;
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
                    requestMessage.Headers.Authorization =
                        new AuthenticationHeaderValue("bearer", token);
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

            string url = $"https://graph.microsoft.com/v1.0/users/{aadUserId}/photos/{size}/$value";
            string key = $"{tenantId}|{url}";

            if (_cache.TryGetValue(key, out PhotoResult cacheValue)) return cacheValue;

            var graphclient = await GetGraphClient(
                new string[] { "User.ReadBasic.All", "user.read" })
               .ConfigureAwait(false);

            using (Stream photo = await graphclient.Users[aadUserId].Photos[size].Content.Request().GetAsync())
            {
                if (photo is null) return null;

                MemoryStream ms = new MemoryStream();
                photo.CopyTo(ms);

                var result = new PhotoResult { Content = ms.ToArray(), ContentType = "image/png" };

                _cache.Set(key, result, TimeSpan.FromDays(1));
                return result;
            }
        }
    }
}
