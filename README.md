# Poor Clares Arundel

[![Build and Deploy](https://github.com/johnnyreilly/poorclaresarundel-aca/actions/workflows/deploy.yaml/badge.svg)](https://github.com/johnnyreilly/poorclaresarundel-aca/actions/workflows/deploy.yaml)

Built with Azure Container Apps and deployed here: https://main-web.blackmeadow-04548954.uksouth.azurecontainerapps.io

Test locally with:

```shell
cd node-service/client
yarn install
yarn run dev
```

## What this needs to run in GitHub / Azure

First of all a resource group:

```shell
az group create -g rg-poorclaresarundel -l UKSouth
```

The following secrets were created for deployment to Azure:

- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`

And an associated Enterprise Application was created in Azure Active Directory: https://portal.azure.com/#view/Microsoft_AAD_IAM/ManagedAppMenuBlade/~/Overview/objectId/e8d4b76d-ca09-4670-b3f7-95c65629ff79/appId/fab09edc-4a68-4bd3-ab7c-039c01bf3bfe

They were created using https://github.com/jongio/github-azure-oidc and the following command:

```
./oidc.sh poorclaresarundel-aca johnnyreilly/poorclaresarundel-aca ./fics.json
```

We also need a secret for accessing packages from Azure. We're going to be publishing packages to the GitHub container registry.  Azure is going to need to be able to access this when we're deploying; so we'll set up a `PACKAGES_TOKEN` secret. This is a GitHub personal access token with the `read:packages` scope. [Learn more](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

## Secrets for the app

The app also needs a number of secrets created:

- `APPSETTINGS_API_KEY` - an API key for Mailgun which will be used to send emails
- `APPSETTINGS_DOMAIN` - the domain for the email eg `mg.poorclaresarundel.org`
- `APPSETTINGS_PRAYER_REQUEST_FROM_EMAIL` - who automated emails should come from eg `noreply@mg.poorclaresarundel.org`
- `APPSETTINGS_PRAYER_REQUEST_RECIPIENT_EMAIL` - the email address emails should be sent to

## Custom domain

To use custom domains with Azure Container Apps you need to create a certificate:

https://learn.microsoft.com/en-gb/azure/container-apps/custom-domains-certificates

Certificate created with:

```shell
sudo openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes \
  -keyout poorclaresarundel.org.key -out poorclaresarundel.org.crt -subj "/CN=poorclaresarundel.org" \
  -addext "subjectAltName=DNS:poorclaresarundel.org,DNS:www.poorclaresarundel.org,IP:20.49.157.17"
sudo chmod +r poorclaresarundel.org.key
cat poorclaresarundel.org.crt poorclaresarundel.org.key > poorclaresarundel.org.pem
```

and uploaded to environment in the Azure portal.