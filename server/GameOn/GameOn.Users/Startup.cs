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
            services.AddApplicationInsightsTelemetry();

            // Add Services
            services.AddHttpClient();
            services.AddMemoryCache();

            services.AddTransient<GraphService>();
            services.AddTransient<UsersService>();
            
            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen();

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
            
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger(); // TODO: check order with @Dan

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "GameOn Users API V1");
            });
            
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
