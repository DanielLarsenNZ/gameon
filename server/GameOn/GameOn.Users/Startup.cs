using Dapr.Client;
using GameOn.Common;
using GameOn.Extensions;
using GameOn.Models;
using GameOn.Users.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace GameOn.Users
{
    public class Startup
    {
        private static ILogger Logger => new LoggerFactory().CreateLogger("Startup");

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddGameOnAuthentication(Configuration, Logger);
            services.AddGameOnCors(Configuration);
            
            //services.AddDaprClient();

            services
                .AddControllers()
                .AddDapr()
                .AddJsonOptions(options => options.JsonSerializerOptions.IgnoreNullValues = true);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Middleware order is crucial! https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-3.1
            app.UseRouting();
            app.UseAuthentication();
            app.UseCors();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapGet(GameOnUsersMethodNames.GetUser, GetUser);
            });
        }

        private async Task GetUser(HttpContext context)
        {
            var serializerOptions = new JsonSerializerOptions()
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                PropertyNameCaseInsensitive = true,
            };

            var client = context.RequestServices.GetRequiredService<DaprClient>();
            
            var userId = await JsonSerializer.DeserializeAsync<string>(context.Request.Body, serializerOptions);

            var user = await client.GetStateAsync<User>(GameOnNames.StateStoreName, userId);
            
            if (user == null)
            {
                Console.WriteLine("User not found");
                context.Response.StatusCode = 404;
                return;
            }

            context.Response.ContentType = "application/json";
            await JsonSerializer.SerializeAsync(context.Response.Body, user, serializerOptions);
        }
    }
}
