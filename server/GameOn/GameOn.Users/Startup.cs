using GameOn.Common;
using GameOn.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
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
            services.AddGameOnAuthentication(Configuration);
            services.AddGameOnCors(Configuration);

            // Add Services
            services.AddHttpClient();
            services.AddMemoryCache();

            services.AddTransient<GraphService>();
            services.AddTransient<UsersService>();

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
                Microsoft.IdentityModel.Logging.IdentityModelEventSource.ShowPII = true;
            }

            // Middleware order is crucial! https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-3.1
            app.UseRouting();
            app.UseAuthentication();
            app.UseCors();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                // This is an inter-service call that is not accessible via a controller
                endpoints.MapGet(GameOnUsersMethodNames.GetUsers, GetUsers);
            });
        }

        /// <summary>
        /// GetUser delegate
        /// </summary>
        private async Task GetUsers(HttpContext context)
            => await context.RequestServices.GetRequiredService<UsersService>().GetUsers(context);
    }
}
