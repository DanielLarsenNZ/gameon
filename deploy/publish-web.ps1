$ErrorActionPreference = 'Stop'
. ./vars.ps1

Push-Location ../client
npm install
npm run build
az storage blob upload-batch --account-name $storage -s ./build -d '$web'
Pop-Location