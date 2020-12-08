. ./vars.ps1
$aks = "gameon-$loc-aks"
$kv = "gameon-$loc-kv"

# RESOURCE GROUP
az group create -n $rg --location $location --tags $tags


# AKS
az aks create -g $rg -n $aks --node-count 1 --enable-addons http_application_routing --generate-ssh-keys --enable-managed-identity
az aks get-credentials -g $rg -n $aks
$aksShow = ( az aks show -g $rg -n $aks | ConvertFrom-Json )
$clusterRG = $aksShow.nodeResourceGroup
$clusterRGId = ( az group show -n $clusterRG | ConvertFrom-Json ).id


# KEY VAULT
# https://docs.dapr.io/operations/components/setup-secret-store/supported-secret-stores/azure-keyvault-managed-identity/
az keyvault create --location $location -g $rg -n $kv 

# Get the client Id for the Managed Identity
$clientId= az aks show -g $rg -n $aks --query identityProfile.kubeletidentity.clientId -otsv

# Assign roles to the cluster RG
az role assignment create --role "Reader" --assignee $clientId --scope $clusterRGId
az role assignment create --role "Managed Identity Operator"  --assignee $clientId  --scope $clusterRGId

# Add a policy to the Key Vault so the managed identity can read secrets
az keyvault set-policy --name $kv --spn $clientId --secret-permissions get list

# Enable AAD Pod Identity on AKS
kubectl apply -f https://raw.githubusercontent.com/Azure/aad-pod-identity/master/deploy/infra/deployment-rbac.yaml
   
# For AKS clusters, deploy the MIC and AKS add-on exception by running -
kubectl apply -f https://raw.githubusercontent.com/Azure/aad-pod-identity/master/deploy/infra/mic-exception.yaml

