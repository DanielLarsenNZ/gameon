using Dapr.AppCallback.Autogen.Grpc.v1;
using Dapr.Client;
using Dapr.Client.Autogen.Grpc.v1;
using Grpc.Core;
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
        /// <summary>
        /// State store name.
        /// </summary>
        public const string StoreName = "statestore";

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
                case "getaccount":
                    //var input = JsonSerializer.Deserialize<GetAccountInput>(request.Data.Value.ToByteArray(), this.jsonOptions);
                    //var output = await GetAccount(input, context);
                    //response.Data = new Any
                    //{
                    //    Value = ByteString.CopyFrom(JsonSerializer.SerializeToUtf8Bytes<Account>(output, this.jsonOptions)),
                    //};
                    break;
                case "deposit":
                case "withdraw":
                    //var transaction = JsonSerializer.Deserialize<Transaction>(request.Data.Value.ToByteArray(), this.jsonOptions);
                    //var account = request.Method == "deposit" ?
                    //    await Deposit(transaction, context) :
                    //    await Withdraw(transaction, context);
                    //response.Data = new Any
                    //{
                    //    Value = ByteString.CopyFrom(JsonSerializer.SerializeToUtf8Bytes<Account>(account, this.jsonOptions)),
                    //};
                    break;
                default:
                    break;
            }
            return response;
        }

    }
}
