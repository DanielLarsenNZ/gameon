# https://docs.dapr.io/operations/components/setup-secret-store/supported-secret-stores/azure-keyvault-managed-identity/

# dot source vars and Set-ContentVariables function
. ./vars.ps1
. ./scripts/Set-ContentVariables.ps1

# Create a copy of the k8s YAML in a working folder
md ./_k8s -Force
copy ./k8s/* ./_k8s -Recurse -Force

# Get AKS details
$aksShow = ( az aks show -g $rg -n $aks | ConvertFrom-Json )


# KEY VAULT

# Create a hashtable of vars to replace using Set-ContentVariables
$vars = @{ 
    IdentityName = "$aks-identity"
    IdentityResourceId = $aksShow.identityProfile.kubeletidentity.resourceId
    IdentityClientId = $aksShow.identityProfile.kubeletidentity.clientId
    KeyVaultName = $kv
}

# Replace placeholders with vars
Set-ContentVariables -Path ./_k8s/azure-identity-config.yaml -Variables $vars 
Set-ContentVariables -Path ./_k8s/azure-keyvault.yaml -Variables $vars 

# Apply to K8S
kubectl apply -f ./_k8s/azure-identity-config.yaml
kubectl apply -f ./_k8s/azure-keyvault.yaml
