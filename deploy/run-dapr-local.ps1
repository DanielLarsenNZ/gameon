#dotnet build ../server/GameOn/GameOn.Tournaments
#dotnet build ../server/GameOn/GameOn.Users
dotnet build ../server/GameOn/GameOn.Results

#start pwsh { -c cd ../server/GameOn/GameOn.Tournaments && dapr run --app-id gameon-tournaments -p 5000 -d ../components dotnet run }
#start pwsh { -c cd ../server/GameOn/GameOn.Users && dapr run --app-id gameon-users -p 5001 -d ../components dotnet run }
start pwsh { -c cd ../server/GameOn/GameOn.Results && dapr run --app-id gameon-results -p 5002 -d ../components dotnet run }