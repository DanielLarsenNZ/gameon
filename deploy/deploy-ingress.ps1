# https://docs.microsoft.com/en-us/azure/aks/ingress-tls

$ErrorActionPreference = 'Stop'

. ./vars.ps1

# AZURE DNS
az network dns zone create -g $rg -n $domainName

Write-Host "Set the nameservers on your custom domain 👆🏻" -ForegroundColor Cyan 

# Create a namespace for your ingress resources
kubectl create namespace ingress-basic

# Add the ingress-nginx repository
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx

# Use Helm to deploy an NGINX ingress controller
helm install nginx-ingress ingress-nginx/ingress-nginx `
    --namespace ingress-basic `
    --set controller.replicaCount=2 `
    --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux `
    --set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux

while ($true) {
    $ingress = ( kubectl --namespace ingress-basic get services -o json nginx-ingress-ingress-nginx-controller | ConvertFrom-Json )
    $publicIp = $ingress.status.loadBalancer.ingress[0].ip
    if ($null -ne $publicIp) { break }
}

# Create a DNS record
az network dns record-set a add-record -g $rg --zone-name $domainName --record-set-name * --ipv4-address $publicIp

# Label the ingress-basic namespace to disable resource validation
kubectl label namespace ingress-basic cert-manager.io/disable-validation=true

# Add the Jetstack Helm repository
helm repo add jetstack https://charts.jetstack.io

# Update your local Helm chart repository cache
helm repo update

# Install the cert-manager Helm chart
helm install `
  cert-manager `
  --namespace ingress-basic `
  --version v0.16.1 `
  --set installCRDs=true `
  --set nodeSelector."beta\.kubernetes\.io/os"=linux `
  jetstack/cert-manager

kubectl apply -f ./k8s/cluster-issuer.yaml

kubectl apply -f ./k8s/ingress.yaml --namespace ingress-basic

kubectl get certificate --namespace ingress-basic