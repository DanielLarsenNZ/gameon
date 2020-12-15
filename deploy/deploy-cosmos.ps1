. ./vars.ps1


# COSMOS DB
az cosmosdb create -n $cosmos -g $rg --tags $tags --locations regionName=$location
az cosmosdb sql database create -g $rg -a $cosmos -n $cosmosDb --throughput $cosmosDbThroughput
az cosmosdb sql container create -g $rg -a $cosmos -d $cosmosDb -n $cosmosDbContainer --partition-key-path $pk

# Get the connection string
$env:Cosmos_ConnectionString = ( az cosmosdb keys list --type 'connection-strings' -n $cosmos -g $rg | ConvertFrom-Json ).connectionStrings[0].connectionString
$env:Cosmos_DatabaseName = $cosmosDb
$env:Cosmos_ContainerName = $cosmosDbContainer

Write-Host "Cosmos Conn = $env:Cosmos_ConnectionString"