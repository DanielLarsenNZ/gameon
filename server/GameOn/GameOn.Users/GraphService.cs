using GameOn.Users.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Graph;
using Microsoft.Identity.Web;
using System;
using System.IO;
using System.IO.Compression;
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
        //private readonly HttpClient _http;
        private readonly IMemoryCache _cache;
        private readonly ITokenAcquisition _tokenAcquisition;

        public GraphService(IHttpClientFactory clientFactory, IMemoryCache cache, ITokenAcquisition tokenAcquisition)
        {
            _httpFactory = clientFactory;
            //_http = _httpFactory.CreateClient();
            _cache = cache;
            _tokenAcquisition = tokenAcquisition;
        }

        private async Task<GraphServiceClient> GetGraphClient(string[] scopes)
        {
            var token = await _tokenAcquisition.GetAccessTokenForUserAsync(
             scopes).ConfigureAwait(false);

            var client = _httpFactory.CreateClient();
            client.BaseAddress = new Uri("https://graph.microsoft.com/beta");
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

            GraphServiceClient graphClient = new GraphServiceClient(client)
            {
                AuthenticationProvider = new DelegateAuthenticationProvider(
                async (requestMessage) =>
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

            //.Request().GetAsync().ConfigureAwait(false);

            //Stream photo = await graphServiceClient.Me.Photo.Content.Request().GetAsync();

            using (Stream photo = await graphclient.Users[aadUserId].Photos[size].Content.Request().GetAsync())
            {
                if (photo is null) return null;

                MemoryStream ms = new MemoryStream();
                
                photo.CopyTo(ms);
                byte[] buffer = ms.ToArray();

                var result = new PhotoResult { Content = buffer, ContentType = "image/png" };

                _cache.Set(key, result, TimeSpan.FromDays(1));
                return result;
            }



            //string result = Convert.ToBase64String(buffer);
            //string imgDataURL = string.Format("data:image/png;base64,{0}", result);
            //ViewBag.ImageData = imgDataURL;

            //using (var photoStream = await response.Content.ReadAsStreamAsync())
            //{
            //    byte[] photoByte = ((MemoryStream)photoStream).ToArray();

            //    var result = new PhotoResult
            //    {
            //        Content = photoByte,
            //        ContentType = response.Headers.FirstOrDefault(h => h.Key == "Content-Type").Value.FirstOrDefault()
            //    };

            //    _cache.Set(key, result, TimeSpan.FromDays(1));
            //    return result;
            //}

        }


        //internal async Task<PhotoResult> GetUserPhoto(
        //    HttpContext context, 
        //    string tenantId, 
        //    string aadUserId, 
        //    string size = "128x128")
        //{
        //    string url = $"https://graph.microsoft.com/v1.0/users/{aadUserId}/photos/{size}/$value";
        //    string key = $"{tenantId}|url";

        //    if (_cache.TryGetValue(key, out PhotoResult cacheValue)) return cacheValue;

        //    // new client because we don't want to accidentally share Auth header
        //    var http = _httpFactory.CreateClient();

        //    // copy auth header
        //    var token = context.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        //    http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        //    var response = await http.GetAsync(url);

        //    using (var photoStream = await response.Content.ReadAsStreamAsync())
        //    {
        //        byte[] photoByte = ((MemoryStream)photoStream).ToArray();

        //        var result = new PhotoResult
        //        {
        //            Content = photoByte,
        //            ContentType = response.Headers.FirstOrDefault(h => h.Key == "Content-Type").Value.FirstOrDefault()
        //        };

        //        _cache.Set(key, result, TimeSpan.FromDays(1));
        //        return result;
        //    }
        //}
    }
}
