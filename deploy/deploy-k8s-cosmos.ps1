# https://docs.dapr.io/operations/components/setup-state-store/supported-state-stores/setup-azure-cosmosdb/

# dot source vars and Set-ContentVariables function
. ./vars.ps1
. ./scripts/Set-ContentVariables.ps1

# Create a copy of the k8s YAML in a working folder
md ./_k8s -Force
copy ./k8s/* ./_k8s -Recurse -Force


# COSMOS
$cosmosShow = ( az cosmosdb show -n $cosmos -g $rg | ConvertFrom-Json )

$vars = @{
    CosmosUrl = $cosmosShow.documentEndpoint
    CosmosDatabaseName = $cosmosDb
    CosmosCollectionName = $cosmosDbContainer
}

# Replace placeholders with vars
Set-ContentVariables -Path ./_k8s/azure-cosmos.yaml -Variables $vars 

kubectl apply -f ./_k8s/azure-cosmos.yaml

# Get Cosmos DB Master Key
$masterKey = ( az cosmosdb keys list --name $cosmos --resource-group $rg --type keys | ConvertFrom-Json ).primaryMasterKey
$masterKey

kubectl create secret generic cosmos-secret --from-literal=cosmos-key=$masterKey
