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

# Build and run server
cd server/GameOn/GameOn.Tournaments
dotnet build && dapr run --app-id gameon dotnet run
```

### Local debug

You can debug the services locally in VS Code by following this article: [Debugging Dapr applications with Visual Studio Code](https://blog.ehn.nu/2020/03/debugging-dapr-applications-with-visual-studio-code/)

The VS Code `launch.json` and `tasks.json` files are included in this repo. To open the workspace correctly, cd into the server/GameOn folder before opening VS Code, e.g.

    cd server/GameOn
    code .

## Links & references

[Debugging Dapr applications with Visual Studio Code](https://blog.ehn.nu/2020/03/debugging-dapr-applications-with-visual-studio-code/)

[ASP.NET Core Middleware order](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-3.1)

[How to review your Azure AD B2C tokens using Policy – Run Now and jwt.ms](https://saraford.net/2017/09/18/how-to-review-your-azure-ad-b2c-tokens-using-policy-run-now-and-jwt-ms/)

[Quickstart: Protect an ASP.NET Core web API with Microsoft identity platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v2-aspnet-core-web-api)

[Azure-Samples/active-directory-dotnet-native-aspnetcore-v2](https://github.com/Azure-Samples/active-directory-dotnet-native-aspnetcore-v2)

[Microsoft identity platform and OAuth 2.0 authorization code flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow#request-an-access-token)