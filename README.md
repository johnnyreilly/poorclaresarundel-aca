# Poor Clares Arundel

[![Build and Deploy](https://github.com/johnnyreilly/poorclaresarundel-aca/actions/workflows/deploy.yaml/badge.svg)](https://github.com/johnnyreilly/poorclaresarundel-aca/actions/workflows/deploy.yaml)

Poor Clares Arundel ported to run on Azure Container Apps: https://node-app.thankfulbay-d3cc5436.northeurope.azurecontainerapps.io/

The work here is heavily inspired by: https://github.com/Azure-Samples/container-apps-store-api-microservice

## What this needs to run in GitHub / Azure

First of all a resource group:

```shell
az group create -g rg-poorclaresarundel -l northeurope
```

It needs some secrets for the GitHub Action to run.  We need to [create a service principal and configure its access to Azure resources](https://docs.microsoft.com/en-us/cli/azure/ad/sp?view=azure-cli-latest#az_ad_sp_create_for_rbac):

```shell
az ad sp create-for-rbac --name "myApp" --role contributor \
    --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group} \
    --sdk-auth
```

The generated JSON should look something like this:

```json
{
  "clientId": "a-client-id",
  "clientSecret": "a-client-secret",
  "subscriptionId": "a-subscription-id",
  "tenantId": "a-tenant-id",
  "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
  "resourceManagerEndpointUrl": "https://management.azure.com/",
  "activeDirectoryGraphResourceId": "https://graph.windows.net/",
  "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
  "galleryEndpointUrl": "https://gallery.azure.com/",
  "managementEndpointUrl": "https://management.core.windows.net/"
}
```

Store this value in a secret named `AZURE_CREDENTIALS`.

We also need a secret for accessing packages from Azure. We're going to be publishing packages to the GitHub container registry.  Azure is going to need to be able to access this when we're deploying; so we'll set up a `PACKAGES_TOKEN` secret. This is a GitHub personal access token with the `read:packages` scope. [Learn more](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

## Secrets for the app

The app also needs a number of secrets created:

- `APPSETTINGS_API_KEY` - an API key for Mailgun which will be used to send emails
- `APPSETTINGS_DOMAIN` - the domain for the email eg `mg.poorclaresarundel.org`
- `APPSETTINGS_PRAYER_REQUEST_FROM_EMAIL` - who automated emails should come from eg `noreply@mg.poorclaresarundel.org`
- `APPSETTINGS_PRAYER_REQUEST_RECIPIENT_EMAIL` - the email address emails should be sent to
