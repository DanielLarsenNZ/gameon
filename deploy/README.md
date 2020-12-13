# Deployment

## K8s cheatsheet

    # Get list of pods
    kubectl get pods

    # Read log of a specific pod and container
    kubectl logs tournaments-69f68d6d99-gxjdc gameontournaments

    # Restart pods (deployment)
    kubectl -n service rollout restart deployment tournaments
