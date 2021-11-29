$ErrorActionPreference = 'Stop'

#. ../vars.ps1

$location="westcentralus"
$loc = 'wcus'
$rg = "gameon-capp-$loc-rg"
$logs="gameon-$loc-logs"
$containerApps="gameon-$loc"
$tournaments="gameontournaments"

az extension add --source https://workerappscliextension.blob.core.windows.net/azure-cli-extension/containerapp-0.2.0-py2.py3-none-any.whl -y
az provider register --namespace Microsoft.Web

az group create -n $rg --location $location

#az monitor log-analytics workspace create `
#  --resource-group $rg `
#  --workspace-name $logs

$logsClientId = ( az monitor log-analytics workspace show --query customerId -g 'gameon-rg' -n $logs --out tsv )
$logsClientSecret = ( az monitor log-analytics workspace get-shared-keys --query primarySharedKey -g 'gameon-rg' -n $logs --out tsv)

Write-Host "az containerapp env create..." -ForegroundColor Yellow 
az containerapp env create `
  --name $containerApps `
  --resource-group $rg `
  --logs-workspace-id $logsClientId `
  --logs-workspace-key $logsClientSecret `
  --location "$location" `
  --debug

Write-Host "az containerapp create..." -ForegroundColor Yellow
az containerapp create `
  --name tournaments `
  --resource-group $rg `
  --environment $containerApps `
  --image gameonaue.azurecr.io/gameontournaments:latest `
  --target-port 80 `
  --ingress 'external' `
  --verbose
