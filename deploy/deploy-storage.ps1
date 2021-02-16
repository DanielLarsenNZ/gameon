$ErrorActionPreference = 'Stop'

. ./vars.ps1

# STORAGE ACCOUNT
az extension add --name storage-preview
az storage account create -n $storage -g $rg -l $location --sku Standard_LRS --kind StorageV2

# Make Storage Account a SPA
az storage blob service-properties update --account-name $storage --static-website --index-document 'index.html' --404-document 'index.html' 

# Get the Web endpoint for the storage account
# Trim the trailing slash 🙄
$webHostname = ( az storage account show -n $storage | ConvertFrom-Json ).primaryEndpoints.web.TrimEnd('/')
$webHostname
