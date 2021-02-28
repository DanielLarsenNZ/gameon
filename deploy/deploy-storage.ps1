$ErrorActionPreference = 'Stop'

. ./vars.ps1

$frontDoor = 'gameonnz'

# STORAGE ACCOUNT
#az extension add --name storage-preview
az storage account create -n $storage -g $rg -l $location --sku Standard_LRS --kind StorageV2

# Make Storage Account a SPA
# https://www.davepaquette.com/archive/2020/05/10/deploying-a-static-site-to-azure-using-the-az-cli.aspx
az storage blob service-properties update --account-name $storage --static-website --index-document 'index.html' --404-document 'index.html' 

$spaUrl = ( az storage account show -n $storage | ConvertFrom-Json ).primaryEndpoints.web.TrimEnd('/').Replace('https://', '')
$spaUrl

# FRONT DOOR
#az extension add -n front-door

az network front-door create -n $frontDoor -g $rg --tags $tags `
    --frontend-host-name $domainName `
    --backend-address $spaUrl `
    --accepted-protocols Http Https `
    --protocol Http

az network front-door frontend-endpoint enable-https --front-door-name $frontDoor `
    --name 'DefaultFrontendEndpoint' `
    --resource-group $rg
    -certificate-source 'FrontDoor' `
    --minimum-tls-version 1.2

az network front-door routing-rule update --front-door-name $frontDoor -n 'DefaultRoutingRule' -g $rg `
    --caching 'Enabled'

start "https://$frontDoor.azurefd.net"
