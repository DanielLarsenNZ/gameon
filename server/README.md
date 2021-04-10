# Game On! Server

## Getting started

For local backend dev you will need: 

1. VS Code
1. Git CLI
1. .NET Core 3.1
1. [Docker Desktop](https://www.docker.com/products/docker-desktop)
1. [Dapr CLI](https://docs.dapr.io/getting-started/install-dapr-cli/)
1. [DAPR VS Code Extension](https://github.com/microsoft/vscode-dapr)

Then run these commands in a terminal:

```powershell
# Clone
git clone https://github.com/DanielLarsenNZ/gameon.git
cd gameon

# Init Dapr local *Must run as Admin / sudo
dapr init
```

## Run local

A helper script to run all services locally is provided. Dapr must be initialised and running in Docker (Docker desktop).

    cd /deploy
    ./run-dapr-local.ps1

## Debug local

You can debug the services locally in VS Code by following this article: [Debugging Dapr applications with Visual Studio Code](https://blog.ehn.nu/2020/03/debugging-dapr-applications-with-visual-studio-code/)

The VS Code `launch.json` and `tasks.json` files are included in this repo. To open the workspace correctly, cd into the server/GameOn folder before opening VS Code, e.g.

    cd server/GameOn
    code .

## Creating a new Service

Each service is a new Visual Studio ASP.NET Core project. It is easiest to create new services in Visual Studio (Community, Developer or Enterprise). 

1. Add a new ASP.NET Core API Project, e.g. `GameOn.(NewServiceName)`
1. Add project references to `GameOn.Common`, `GameOn.CommonCore`

Use another service project as a template and:

1. Copy nuget references
1. Clone Startup.cs
1. Create a new empty API Controller
1. Create new Models in `GameOn.Common` project, in the Models folder, but change namespace back to `GameOn.Common`
1. Implement a Service

Before you run locally you will need to:

1. Add new lines to `/deploy/run-dapr-local.ps1` to build and run the Service. Choose a new unused port for the new service.
1. Update `Properties/launchSettings.json` to only startup on HTTP and to use the port you chose in the previous step. See [How to change the port number for Asp.Net core app?]

## Links & references

👉🏻 <https://docs.microsoft.com/en-us/graph/tutorials/aspnet-core?tutorial-step=3>

[GitHub Actions Default environment variables](https://docs.github.com/en/free-pro-team@latest/actions/reference/environment-variables#default-environment-variables)

[Debugging Dapr applications with Visual Studio Code](https://blog.ehn.nu/2020/03/debugging-dapr-applications-with-visual-studio-code/)

[ASP.NET Core Middleware order](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-3.1)

[ASP.NET Core Routing Sample](https://github.com/dapr/dotnet-sdk/tree/master/samples/AspNetCore/RoutingSample) - for inter-service calls

[How to review your Azure AD B2C tokens using Policy – Run Now and jwt.ms](https://saraford.net/2017/09/18/how-to-review-your-azure-ad-b2c-tokens-using-policy-run-now-and-jwt-ms/)

[Quickstart: Protect an ASP.NET Core web API with Microsoft identity platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v2-aspnet-core-web-api)

[Azure-Samples/active-directory-dotnet-native-aspnetcore-v2](https://github.com/Azure-Samples/active-directory-dotnet-native-aspnetcore-v2)

[Microsoft identity platform and OAuth 2.0 authorization code flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow#request-an-access-token)

[How to change the port number for Asp.Net core app?]


<!-- link refs -->
[How to change the port number for Asp.Net core app?]:https://stackoverflow.com/a/49795443/610731