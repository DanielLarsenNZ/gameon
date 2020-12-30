using Dapr.AppCallback.Autogen.Grpc.v1;
using Dapr.Client;
using Dapr.Client.Autogen.Grpc.v1;
using GameOn.Common;
using GameOn.Models;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace GameOn.Users.Services
{
    public class UsersService: AppCallback.AppCallbackBase
    {
        
        private readonly ILogger<UsersService> _log;
        private readonly DaprClient _daprClient;
        readonly JsonSerializerOptions jsonOptions 
            = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="daprClient"></param>
        /// <param name="logger"></param>
        public UsersService(DaprClient daprClient, ILogger<UsersService> logger)
        {
            _daprClient = daprClient;
            _log = logger;
        }

        /// <summary>
        /// implement OnIvoke to support getaccount, deposit and withdraw
        /// </summary>
        /// <param name="request"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public override async Task<InvokeResponse> OnInvoke(InvokeRequest request, ServerCallContext context)
        {
            var response = new InvokeResponse();
            switch (request.Method)
            {
                case "get-user":
                    string userId = JsonSerializer.Deserialize<string>(
                        request.Data.Value.ToByteArray(), 
                        this.jsonOptions);
                    var userEntry = await _daprClient.GetStateEntryAsync<User>(GameOnNames.StateStoreName, userId);

                    response.Data = new Any
                    {
                        Value = ByteString.CopyFrom(
                            JsonSerializer.SerializeToUtf8Bytes<User>(userEntry.Value, this.jsonOptions))
                    };
                    break;
                default:
                    throw new NotSupportedException($"Request method name {request.Method} is not supported");
            }
            return response;
        }

        public static Task GetUser(HttpContext context)
        {
            return Task.CompletedTask;
        }

    }
}
