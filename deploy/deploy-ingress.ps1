# https://docs.microsoft.com/en-us/azure/aks/ingress-tls

$ErrorActionPreference = 'Stop'

. ./vars.ps1

# AZURE DNS
az network dns zone create -g $rg -n $domainName

Write-Host "Set the nameservers on your custom domain 👆🏻" -ForegroundColor Cyan 

# Add the ingress-nginx repository
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx

helm repo update

# Use Helm to deploy an NGINX ingress controller
helm install nginx-ingress ingress-nginx/ingress-nginx `
    --set controller.replicaCount=2 `
    --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux `
    --set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux

while ($true) {
    $ingress = ( kubectl get services -o json nginx-ingress-ingress-nginx-controller | ConvertFrom-Json )
    if ($ingress.status.loadBalancer.ingress.length -eq 0) { continue }
    $publicIp = $ingress.status.loadBalancer.ingress[0].ip
    if ($null -ne $publicIp) { break }
}

# Create a DNS record
az network dns record-set a add-record -g $rg --zone-name $domainName --record-set-name 'api' --ipv4-address $publicIp --if-none-match

# Label the namespace to disable resource validation
kubectl label namespace default cert-manager.io/disable-validation=true

# Add the Jetstack Helm repository
helm repo add jetstack https://charts.jetstack.io

# Update your local Helm chart repository cache
helm repo update

# Install the cert-manager Helm chart
helm install `
  cert-manager `
  --version v1.5.3 `
  --set installCRDs=true `
  --set nodeSelector."beta\.kubernetes\.io/os"=linux `
  jetstack/cert-manager

kubectl apply -f ./k8s/cluster-issuer.yaml

kubectl apply -f ./k8s/ingress.yaml 

kubectl get certificate
