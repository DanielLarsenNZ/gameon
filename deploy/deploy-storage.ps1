$ErrorActionPreference = 'Stop'

. ./vars.ps1

$frontDoor = 'gameonnz'
$frontDoorFrontEnd = 'gameonnz'
$ttl = 300
$kvSecretName = 'GameOnNZCSR2'
$kvSecretVersion = '3e2dc2ac68f24800a354cf56ccba1795'

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

# $frontDoorId = ( az network front-door create -n $frontDoor -g $rg --tags $tags `
#     --backend-address $spaUrl `
#     --accepted-protocols Http Https `
#     --protocol Http | ConvertFrom-Json ).id

$frontDoorId = ( az network front-door create -n $frontDoor -g $rg --tags $tags --accepted-protocols Http Https --backend-address $spaUrl | ConvertFrom-Json ).id


# Apex hostname on gameon.nz
# Create an Alias DNS recordset
az network dns record-set a create -n "@" -g $rg --zone-name $domainName --if-none-match --target-resource $frontDoorId --ttl $ttl

# Create the domain verify CNAME
az network dns record-set cname set-record -g $rg --zone-name $domainName --if-none-match --record-set-name "afdverify.$domainName" --cname "afdverify.$frontDoor.azurefd.net" --ttl $ttl

# Create a frontend for the custom domain
az network front-door frontend-endpoint create --front-door-name $frontDoor --host-name $domainName --name $frontDoorFrontEnd -g $rg --session-affinity-enabled 'Disabled'

# Enable HTTPS, Front Door managed cert is not possible currently 😢 So have to have to upload cert to Key Vault
# Follow the steps in this article to give Front Door access to KV: https://docs.microsoft.com/en-us/azure/frontdoor/front-door-custom-domain-https#option-2-use-your-own-certificate

# get KV id
$kvId = ( az keyvault show -n $kv -g $rg | ConvertFrom-Json ).id
az network front-door frontend-endpoint enable-https --front-door-name $frontDoor --name $frontDoorFrontEnd -g $rg --certificate-source 'AzureKeyVault' `
    --vault-id $kvId --secret-name $kvSecretName --secret-version $kvSecretVersion

# Update the default routing rule to include the new frontend
az network front-door routing-rule update --front-door-name $frontDoor -n 'DefaultRoutingRule' -g $rg `
    --caching 'Enabled' --accepted-protocols 'HttpsOnly' --frontend-endpoints 'DefaultFrontendEndpoint' $frontDoorFrontEnd

# Create http redirect routing rule
az network front-door routing-rule create -f $frontDoor -g $rg -n 'httpRedirect' --frontend-endpoints $frontDoorFrontEnd `
    --accepted-protocols 'Http' --route-type 'Redirect'  --patterns '/*' --redirect-protocol 'HttpsOnly'

start "https://$frontDoor.azurefd.net"
start "http://$domainName"
start "https://$domainName"
