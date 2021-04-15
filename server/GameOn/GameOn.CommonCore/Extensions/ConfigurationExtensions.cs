using GameOn.Common;
using System;

namespace Microsoft.Extensions.Configuration
{
    public static class ConfigurationExtensions
    {
        public static string TournamentsAppName(this IConfiguration configuration) => configuration["TournamentsAppName"] ?? GameOnNames.DefaultTournamentsAppName;
        
        public static string UsersAppName(this IConfiguration configuration) => configuration["UsersAppName"] ?? GameOnNames.DefaultUsersAppName;
    }
}
