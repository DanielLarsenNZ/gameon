using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Threading.Tasks;

namespace GameOn.Extensions
{
    public static class AuthExtensions
    {
        public static IServiceCollection AddGameOnAuthentication(
            this IServiceCollection services,
            IConfiguration configuration,
            ILogger logger)
        {
            const string AuthenticationAuthority = "AuthenticationAuthority";
            const string AuthenticationAudience = "AuthenticationAudience";

            if (
                string.IsNullOrEmpty(configuration[AuthenticationAuthority]) ||
                string.IsNullOrEmpty(configuration[AuthenticationAudience]))
            {
                throw new InvalidOperationException(
                    $"App Settings \"{AuthenticationAuthority}\" and/or \"{AuthenticationAudience}\" are missing.");
            }

            // Add the authentication handler
            // https://docs.microsoft.com/en-us/aspnet/core/migration/1x-to-2x/identity-2x?view=aspnetcore-2.2#jwt-bearer-authentication
            // https://docs.microsoft.com/en-us/aspnet/core/security/authorization/limitingidentitybyscheme?view=aspnetcore-2.2&tabs=aspnetcore2x#use-multiple-authentication-schemes
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = configuration[AuthenticationAuthority];
                    options.Audience = configuration[AuthenticationAudience];
                    options.TokenValidationParameters = new TokenValidationParameters { ValidateIssuer = false };
                    options.Events = new JwtBearerEvents
                    {
                        OnAuthenticationFailed = (arg) =>
                        {
                            logger.LogError(arg.Exception, arg.Exception.Message);
                            return Task.CompletedTask;
                        }
                    };
                });

            return services;
        }

        public static IServiceCollection AddGameOnCors(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            const string DefaultCorsPolicyOrigins = "DefaultCorsPolicyOrigins";

            if (string.IsNullOrEmpty(configuration[DefaultCorsPolicyOrigins]))
                throw new InvalidOperationException($"App Setting \"{DefaultCorsPolicyOrigins}\" is missing.");

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder
                        .WithOrigins(configuration[DefaultCorsPolicyOrigins].Split(';'))
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                    });
            });

            return services;
        }
    }
}
