dotnet build ../server/GameOn

Start-Process pwsh { -c cd ../server/GameOn/GameOn.Tournaments && dapr run --app-id gameon-test-tournaments -p 5000 -d ../components dotnet run }

Start-Sleep -Seconds 5
Start-Process pwsh { -c cd ../server/GameOn/GameOn.Users && dapr run --app-id gameon-test-users -p 5001 -d ../components dotnet run }

Start-Sleep -Seconds 5
Start-Process pwsh { -c cd ../server/GameOn/GameOn.Results && dapr run --app-id gameon-test-results -p 5002 -d ../components dotnet run }