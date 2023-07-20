param branchName string

param webServiceImage string

param containerRegistry string
param containerRegistryUsername string
@secure()
param containerRegistryPassword string

param tags object

@secure()
param APPSETTINGS_API_KEY string
param APPSETTINGS_DOMAIN string
param APPSETTINGS_PRAYER_REQUEST_FROM_EMAIL string
param APPSETTINGS_PRAYER_REQUEST_RECIPIENT_EMAIL string

param location string = resourceGroup().location

var branch = toLower(last(split(branchName, '/')))

var environmentName = 'shared-env'
var workspaceName = '${branch}-log-analytics'
var appInsightsName = '${branch}-app-insights'
var webServiceContainerAppName = '${branch}-web'

var containerRegistryPasswordRef = 'container-registry-password'
var mailgunApiKeyRef = 'mailgun-api-key'

resource workspace 'Microsoft.OperationalInsights/workspaces@2021-12-01-preview' = {
  name: workspaceName
  location: location
  tags: tags
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
    workspaceCapping: {}
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: location
  tags: tags
  kind: 'web'
  properties: { 
    Application_Type: 'web'
    Flow_Type: 'Bluefield'
  }
}

resource environment 'Microsoft.App/managedEnvironments@2022-10-01' = {
  name: environmentName
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
  }
}

// resource managedEnvironmentsCertificate 'Microsoft.App/managedEnvironments/certificates@2023-04-01-preview' = {
//   parent: environment
//   name: 'poorclaresarundel'
//   location: location
//   properties: {}
// }

resource webServiceContainerApp 'Microsoft.App/containerApps@2022-10-01' = {
  name: webServiceContainerAppName
  tags: tags
  location: location
  properties: {
    managedEnvironmentId: environment.id
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
        customDomains: [
          // {
          //     name: 'poorclaresarundel.org'
          //     certificateId: '/subscriptions/subscription-id/resourceGroups/rg-poor-clares-arundel-aca/providers/Microsoft.App/managedEnvironments/shared-env/certificates/poorclaresarundel.org'
          //     bindingType: 'SniEnabled'
          // }

          {
              name: 'www.poorclaresarundel.org'
              certificateId: '${environment.id}/certificates/poorclaresarundel'
              bindingType: 'SniEnabled'
          }
        ]
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

output webServiceUrl string = webServiceContainerApp.properties.latestRevisionFqdn
