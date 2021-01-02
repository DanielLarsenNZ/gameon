# Deployment

## Pre-requisites

Windows

    # run as Admin
    choco install kubernetes-helm
    

## Local environment

    cd server/GameOn/GameOn.Tournaments
    dotnet build && dapr run --app-id gameon dotnet run

## K8s cheatsheet

    # Get list of pods
    kubectl get pods

    # Get metrics for the app and container
    kubectl logs --selector=app=tournaments -c gameontournaments

    # Restart pods (deployment)
    kubectl rollout restart deployment tournaments

## References & links

[Troubleshooting Issuing ACME Certificates](https://cert-manager.io/docs/faq/acme/)

[How to configure Azure Key Vault and Kubernetes to use Azure Managed Identities to access secrets](https://docs.dapr.io/operations/components/setup-secret-store/supported-secret-stores/azure-keyvault-managed-identity/)

[Running your first app in Kubernetes](https://yourazurecoach.com/2019/12/30/exploring-dapr-running-your-first-dapr-app-in-kubernetes/)

[Dapr K8s annotations](https://docs.dapr.io/operations/hosting/kubernetes/kubernetes-annotations/)

[Debugging Common Dapr Issues](https://xaviergeerinck.com/post/dapr/debugging)
