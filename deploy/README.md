# Deployment

## Pre-requisites

Windows

    # run as Admin
    choco install kubernetes-helm
    

## Local environment

    dapr run --app-id gameon dotnet run

## K8s cheatsheet

    # Get list of pods
    kubectl get pods

    # Get metrics for the app and container
    kubectl logs --selector=app=tournaments -c gameontournaments

    # Restart pods (deployment)
    kubectl rollout restart deployment tournaments
