# https://github.com/dapr/quickstarts/tree/master/hello-kubernetes

dapr init --kubernetes

kubectl apply -f ./k8s/tournaments.yaml
kubectl apply -f ./k8s/users.yaml

./deploy-k8s-keyvault.ps1
./deploy-k8s-cosmos.ps1
./deploy-ingress.ps1
