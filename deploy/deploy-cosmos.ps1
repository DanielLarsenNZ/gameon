. ./vars.ps1

$cosmos = 'gameon-cosmos'
$cosmosDb = 'gameon'
$cosmosDbThroughput = 400
$cosmosDbContainer = 'tournaments'
$pk = '/partitionKey'

# COSMOS DB
az cosmosdb create -n $cosmos -g $rg --tags $tags --locations regionName=$location
az cosmosdb sql database create -n $cosmos -g $rg --db-name $cosmosDb --throughput $cosmosDbThroughput
az cosmosdb sql container create --container-name $cosmosDbContainer --db-name $cosmosDb -n $cosmos -g $rg --partition-key-path $pk

# Get the connection string
$env:Cosmos_ConnectionString = ( az cosmosdb keys list --type 'connection-strings' -n $cosmos -g $rg | ConvertFrom-Json ).connectionStrings[0].connectionString
$env:Cosmos_DatabaseName = $cosmosDb
$env:Cosmos_ContainerName = $cosmosDbContainer

Write-Host "Cosmos Conn = $env:Cosmos_ConnectionString"