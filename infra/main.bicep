param webServiceImage string

param containerRegistry string
param containerRegistryUsername string
@secure()
param containerRegistryPassword string

param branchName string
param gitSha string
param builtAt string

param workspaceName string
param appInsightsName string
param managedEnvironmentName string
param webServiceContainerAppName string

param tags object

@secure()
param APPSETTINGS_API_KEY string
param APPSETTINGS_DOMAIN string
param APPSETTINGS_PRAYER_REQUEST_FROM_EMAIL string
param APPSETTINGS_PRAYER_REQUEST_RECIPIENT_EMAIL string

param location string = resourceGroup().location

var containerRegistryPasswordRef = 'container-registry-password'
var mailgunApiKeyRef = 'mailgun-api-key'

// https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/workspaces?pivots=deployment-language-bicep
resource workspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: workspaceName
  location: location
  tags: tags
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 14
    workspaceCapping: {}
  }
}

// https://learn.microsoft.com/en-us/azure/templates/microsoft.insights/components?pivots=deployment-language-bicep
resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Flow_Type: 'Bluefield'
    WorkspaceResourceId: workspace.id
    RetentionInDays: 14
    IngestionMode: 'LogAnalytics'
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

// https://learn.microsoft.com/en-us/azure/templates/microsoft.app/2024-10-02-preview/managedenvironments?pivots=deployment-language-bicep
resource managedEnvironment 'Microsoft.App/managedEnvironments@2024-10-02-preview' = {
  name: managedEnvironmentName
  location: location
  tags: tags
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: workspace.properties.customerId
        sharedKey: workspace.listKeys().primarySharedKey
      }
    }
    appInsightsConfiguration: {
      connectionString: appInsights.properties.ConnectionString
    }
    openTelemetryConfiguration: {
      tracesConfiguration: {
        destinations: ['appInsights']
      }
      logsConfiguration: {
        destinations: ['appInsights']
      }
    }
  }
}

// resource managedEnvironmentsCertificate 'Microsoft.App/managedEnvironments/certificates@2023-04-01-preview' = {
//   parent: environment
//   name: 'poorclaresarundel'
//   location: location
//   properties: {}
// }

resource webServiceContainerApp 'Microsoft.App/containerApps@2024-03-01' = {
  name: webServiceContainerAppName
  tags: tags
  location: location
  properties: {
    managedEnvironmentId: managedEnvironment.id
    configuration: {
      secrets: [
        {
          name: containerRegistryPasswordRef
          value: containerRegistryPassword
        }
        {
          name: mailgunApiKeyRef
          value: APPSETTINGS_API_KEY
        }
      ]
      registries: [
        {
          server: containerRegistry
          username: containerRegistryUsername
          passwordSecretRef: containerRegistryPasswordRef
        }
      ]
      ingress: {
        external: true
        targetPort: 3000
        customDomains: branchName == 'main'
          ? [
              // {
              //     name: 'poorclaresarundel.org'
              //     certificateId: '/subscriptions/subscription-id/resourceGroups/rg-poor-clares-arundel-aca/providers/Microsoft.App/managedEnvironments/shared-env/certificates/poorclaresarundel.org'
              //     bindingType: 'SniEnabled'
              // }

              {
                name: 'www.poorclaresarundel.org'
                certificateId: '${managedEnvironment.id}/certificates/poorclaresarundel.org'
                bindingType: 'SniEnabled'
              }
            ]
          : []
      }
    }
    template: {
      containers: [
        {
          image: webServiceImage
          name: webServiceContainerAppName
          resources: {
            cpu: json('0.25')
            memory: '0.5Gi'
          }
          env: [
            {
              name: 'APPSETTINGS_API_KEY'
              secretRef: mailgunApiKeyRef
            }
            {
              name: 'APPSETTINGS_DOMAIN'
              value: APPSETTINGS_DOMAIN
            }
            {
              name: 'APPSETTINGS_PRAYER_REQUEST_FROM_EMAIL'
              value: APPSETTINGS_PRAYER_REQUEST_FROM_EMAIL
            }
            {
              name: 'APPSETTINGS_PRAYER_REQUEST_RECIPIENT_EMAIL'
              value: APPSETTINGS_PRAYER_REQUEST_RECIPIENT_EMAIL
            }
            { name: 'APPSETTINGS_BRANCH_NAME', value: branchName }
            { name: 'APPSETTINGS_GIT_SHA', value: gitSha }
            { name: 'APPSETTINGS_BUILT_AT', value: builtAt }
            { name: 'APPLICATIONINSIGHTS_CONNECTION_STRING', value: appInsights.properties.ConnectionString }
          ]
        }
      ]
      scale: {
        minReplicas: 0
        maxReplicas: 1
      }
    }
  }
}
