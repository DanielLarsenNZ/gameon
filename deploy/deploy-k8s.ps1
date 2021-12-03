# https://github.com/dapr/quickstarts/tree/master/hello-kubernetes

dapr init --kubernetes

kubectl apply -f ./k8s/tournaments.yaml
kubectl apply -f ./k8s/users.yaml

# TODO: Do this when AAD App registrations are created
# create ClientId secret
#kubectl create secret generic azuread --from-literal=clientsecret=XXXX_Paste_Client_Secret_From_Deploy_AKS_PS1_HERE_XXXXX

./deploy-k8s-keyvault.ps1
./deploy-k8s-cosmos.ps1
./deploy-ingress.ps1
