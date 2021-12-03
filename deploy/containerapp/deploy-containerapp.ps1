$ErrorActionPreference = 'Stop'

#. ../vars.ps1
. ./secrets.ps1

$location="canadacentral"
$loc = 'cac'
$rg = "gameon-capp-$loc-rg"
$logs="gameon-$loc-logs"
$containerApps="gameon-$loc"
$tournaments="gameon-tournaments"
$users="gameon-users"
$insights = "gameon-$loc-insights"

az extension add --source https://workerappscliextension.blob.core.windows.net/azure-cli-extension/containerapp-0.2.0-py2.py3-none-any.whl -y
az provider register --namespace Microsoft.Web

Write-Host "az group create..." -ForegroundColor Yellow 
az group create -n $rg --location $location

Write-Host "az monitor log-analytics workspace create..." -ForegroundColor Yellow 
az monitor log-analytics workspace create `
  --resource-group $rg `
  --workspace-name $logs

Write-Host "az monitor log-analytics workspace show..." -ForegroundColor Yellow 
$logsClientId = ( az monitor log-analytics workspace show --query customerId -g $rg -n $logs --out tsv )
Write-Host "az monitor log-analytics workspace get-shared-keys..." -ForegroundColor Yellow 
$logsClientSecret = ( az monitor log-analytics workspace get-shared-keys --query primarySharedKey -g $rg -n $logs --out tsv)

$iKey = ( az monitor app-insights component create --app $insights --location $location -g $rg --query 'instrumentationKey' --out tsv )

Write-Host "az containerapp env create..." -ForegroundColor Yellow 
az containerapp env create `
  --name $containerApps `
  --resource-group $rg `
  --logs-workspace-id $logsClientId `
  --logs-workspace-key $logsClientSecret `
  --location "$location" 

Write-Host "az containerapp create --name $tournaments..." -ForegroundColor Yellow
az containerapp create `
  --name $tournaments `
  --resource-group $rg `
  --environment $containerApps `
  --registry-login-server gameonaue.azurecr.io `
  --registry-username $REGISTRY_USERNAME `
  --registry-password $REGISTRY_PASSWORD `
  --image gameonaue.azurecr.io/gameontournaments:latest `
  --target-port 80 `
  --ingress 'external' `
  --dapr-app-id $tournaments `
  --dapr-app-port 80 `
  --dapr-components 'components.yaml' `
  --enable-dapr true

Write-Host "az containerapp create --name $users..." -ForegroundColor Yellow
az containerapp create `
  --name $users `
  --resource-group $rg `
  --environment $containerApps `
  --registry-login-server gameonaue.azurecr.io `
  --registry-username $REGISTRY_USERNAME `
  --registry-password $REGISTRY_PASSWORD `
  --image gameonaue.azurecr.io/gameonusers:latest `
  --target-port 80 `
  --ingress 'external' `
  --dapr-app-id $users `
  --dapr-app-port 80 `
  --dapr-components 'components.yaml' `
  --enable-dapr true
