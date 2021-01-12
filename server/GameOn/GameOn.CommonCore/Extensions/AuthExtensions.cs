using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Web;
using System;

namespace GameOn.Extensions
{
    public static class AuthExtensions
    {
        public static IServiceCollection AddGameOnAuthentication(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddMicrosoftIdentityWebApiAuthentication(configuration)
                .EnableTokenAcquisitionToCallDownstreamApi()
                .AddInMemoryTokenCaches();

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
