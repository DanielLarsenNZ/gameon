dotnet build ../server/GameOn/GameOn.Tournaments
dotnet build ../server/GameOn/GameOn.Users

start pwsh { -c cd ../server/GameOn/GameOn.Tournaments && dapr run --app-id gameon-tournaments -p 5000 -d ../components dotnet run }
start pwsh { -c cd ../server/GameOn/GameOn.Users && dapr run --app-id gameon-users -p 5001 -d ../components dotnet run }
