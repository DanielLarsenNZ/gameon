# Deployment

## Pre-requisites

Windows

    # run as Admin
    choco install kubernetes-helm
    

## Local environment

    ./run-dapr-local.ps1

## Azure Kubernetes Services (AKS)

```powershell
# Change ./vars.ps1 to suit
./deploy.ps1
```

## K8s cheatsheet

    # Get list of pods
    kubectl get pods

    # Get metrics for the app and container
    kubectl logs --selector=app=tournaments -c gameontournaments --tail 100
    kubectl logs --selector=app=users -c gameonusers --tail 100

    # Restart pods (deployment)
    kubectl rollout restart deployment tournaments
    kubectl rollout restart deployment users

## Manual steps




### Create/renew SSL cert

Can't automate SSL certs for Apex domains 😢

<https://docs.microsoft.com/en-us/azure/key-vault/certificates/create-certificate-signing-request?tabs=azure-portal#add-certificates-in-key-vault-issued-by-non-partnered-cas>

1. Create CSR in Key Vault
1. Request cert in DigiCert
1. Merge cert

Grant KV permission to AFD: <https://docs.microsoft.com/en-us/azure/frontdoor/front-door-custom-domain-https#option-2-use-your-own-certificate>

1. Create a new access policy
1. Search for `ad0e1c7e-6d38-4ba4-9efd-0bc77ba9f037` and choose `Microsoft.Azure.Frontdoor`
1. Grant Secret=Get and Certificate=Get permisions
1. Make sure click all of the save buttons! 😬

Now you are ready to run `deploy-storage.ps1`

## Testing

See `test/example.http` for requests you can use for testing with [VSCode REST Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

If you need a bearer token, visit <https://gameon.nz/developer>. Or <https://mobilefirstcloudfirst.net/2019/09/use-vscode-rest-client-plugin-oauth-azure-active-directory/>.

## References & links

[Troubleshooting Issuing ACME Certificates](https://cert-manager.io/docs/faq/acme/)

[How to configure Azure Key Vault and Kubernetes to use Azure Managed Identities to access secrets](https://docs.dapr.io/operations/components/setup-secret-store/supported-secret-stores/azure-keyvault-managed-identity/)

[Running your first app in Kubernetes](https://yourazurecoach.com/2019/12/30/exploring-dapr-running-your-first-dapr-app-in-kubernetes/)

[Dapr K8s annotations](https://docs.dapr.io/operations/hosting/kubernetes/kubernetes-annotations/)

[Debugging Common Dapr Issues](https://xaviergeerinck.com/post/dapr/debugging)
