$ErrorActionPreference = 'Stop'

. ./vars.ps1

# RESOURCE GROUP
az group create -n $rg --location $location --tags $tags


# AKS
az aks create -g $rg -n $aks --node-count 1 --enable-addons http_application_routing --generate-ssh-keys --enable-managed-identity
az aks get-credentials -g $rg -n $aks
$aksShow = ( az aks show -g $rg -n $aks | ConvertFrom-Json )
$clusterRG = $aksShow.nodeResourceGroup
$clusterRGId = ( az group show -n $clusterRG | ConvertFrom-Json ).id
$clientId = $aksShow.identityProfile.kubeletidentity.clientId


# KEY VAULT
# https://docs.dapr.io/operations/components/setup-secret-store/supported-secret-stores/azure-keyvault-managed-identity/
az keyvault create --location $location -g $rg -n $kv 

# Assign roles to the cluster RG
az role assignment create --role "Reader" --assignee $clientId --scope $clusterRGId
az role assignment create --role "Managed Identity Operator"  --assignee $clientId  --scope $clusterRGId

# Add a policy to the Key Vault so the managed identity can read secrets
az keyvault set-policy --name $kv --spn $clientId --secret-permissions get list

# Enable AAD Pod Identity on AKS
kubectl apply -f https://raw.githubusercontent.com/Azure/aad-pod-identity/master/deploy/infra/deployment-rbac.yaml
   
# For AKS clusters, deploy the MIC and AKS add-on exception by running -
kubectl apply -f https://raw.githubusercontent.com/Azure/aad-pod-identity/master/deploy/infra/mic-exception.yaml


# AZURE CONTAINER REGISTRY
az acr create -g $rg -n $acr --sku Standard
az aks update -g $rg -n $aks --attach-acr $acr


# AKS INSIGHTS
az aks enable-addons -g $rg -n $aks -a monitoring


# GITHUB CREDS
$rgId = ( az group show -n $rg | ConvertFrom-Json ).id
az ad sp create-for-rbac --name $gameOnADSP --role contributor --scopes $rgId --sdk-auth