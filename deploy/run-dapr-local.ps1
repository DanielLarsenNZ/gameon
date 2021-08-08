dotnet build ../server/GameOn
#dotnet build ../server/GameOn/GameOn.Tournaments
#dotnet build ../server/GameOn/GameOn.Users
#dotnet build ../server/GameOn/GameOn.Results

Start-Process pwsh { -c cd ../server/GameOn/GameOn.Tournaments && dapr run --app-id gameon-test-tournaments -p 5000 -d ../components dotnet run }
Start-Process pwsh { -c cd ../server/GameOn/GameOn.Users && dapr run --app-id gameon-test-users -p 5001 -d ../components dotnet run }
Start-Process pwsh { -c cd ../server/GameOn/GameOn.Results && dapr run --app-id gameon-test-results -p 5002 -d ../components dotnet run }