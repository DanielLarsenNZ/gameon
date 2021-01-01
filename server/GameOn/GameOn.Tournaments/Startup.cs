using GameOn.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace GameOn.Tournaments
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

            //services.AddCors(options =>
            //{
            //    options.AddDefaultPolicy(
            //        builder =>
            //        {
            //            builder
            //                .WithOrigins("http://localhost:3000", "https://gameon.nz", "https://localhost:44357")
            //                .AllowAnyHeader()
            //                .AllowAnyMethod()
            //                .AllowCredentials();
            //        });
            //});

            //services.AddMicrosoftIdentityWebApiAuthentication(Configuration);
            //services.AddProtectedWebApi(Configuration);
            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer()
            //    .AddMicrosoftIdentityWebApi(Configuration, "AzureAd");

            //services.AddAuthentication(options =>
            //{
            //    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            //}).AddJwtBearer(options =>
            //{
            //    options.Authority = "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/";
            //    options.Audience = "https://microsoft.onmicrosoft.com/GameOn.Tournaments";

            //    string message = "";

            //    options.Events = new JwtBearerEvents
            //    {
            //        OnAuthenticationFailed = (ctx) =>
            //        {
            //            ctx.Response.StatusCode = StatusCodes.Status401Unauthorized;
            //            message += "From OnAuthenticationFailed:\n";
            //            message += FlattenException(ctx.Exception);
            //            return Task.CompletedTask;
            //        },

            //        OnChallenge = ctx =>
            //        {
            //            message += "From OnChallenge:\n";
            //            //ctx.Response.StatusCode = StatusCodes.Status401Unauthorized;
            //            //ctx.Response.ContentType = "text/plain";
            //            //return ctx.Response.WriteAsync(message);
            //            Debug.WriteLine(message);
            //            return Task.CompletedTask;
            //        },

            //        OnMessageReceived = ctx =>
            //        {
            //            message = "From OnMessageReceived:\n";
            //            ctx.Request.Headers.TryGetValue("Authorization", out var BearerToken);
            //            if (BearerToken.Count == 0)
            //                BearerToken = "no Bearer token sent\n";
            //            message += "Authorization Header sent: " + BearerToken + "\n";
            //            return Task.CompletedTask;
            //        },

            //        OnTokenValidated = ctx =>
            //        {
            //            Debug.WriteLine("token: " + ctx.SecurityToken.ToString());
            //            return Task.CompletedTask;
            //        }
            //    };
            //});

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

            Microsoft.IdentityModel.Logging.IdentityModelEventSource.ShowPII = true;
            //app.UseHttpsRedirection();

            // Middleware order is crucial! https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-3.1
            app.UseRouting();
            app.UseAuthentication();
            app.UseCors();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
