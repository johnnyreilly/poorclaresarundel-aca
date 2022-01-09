param branchName string

param webImage string
param webPort int
param webIsExternalIngress bool

param mailerImage string
param mailerPort int
param mailerIsExternalIngress bool

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

var location = resourceGroup().location
var minReplicas = 1
var maxReplicas = 1

var branch = toLower(last(split(branchName, '/')))

var environmentName = '${branch}-env'
var workspaceName = '${branch}-log-analytics'
var appInsightsName = '${branch}-app-insights'
var webContainerAppName = '${branch}-web'
var mailerContainerAppName = '${branch}-mailer'

var containerRegistryPasswordRef = 'container-registry-password'
var mailgunApiKeyRef = 'mailgun-api-key'

resource workspace 'Microsoft.OperationalInsights/workspaces@2020-08-01' = {
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

/*
az storage account create \
  --name 'test' \
  --resource-group 'rg-poorclaresarundel' \
  --location "northeurope" \
  --sku Standard_RAGRS \
  --kind StorageV2

resource storageAccounts_storagereilly001_name_resource 'Microsoft.Storage/storageAccounts@2021-06-01' = {
  kind: 'StorageV2'
  location: location
  name: storageAccounts_storagereilly001_name
  properties: {
    accessTier: 'Hot'
    allowBlobPublicAccess: true
    encryption: {
      keySource: 'Microsoft.Storage'
      services: {
        blob: {
          enabled: true
          keyType: 'Account'
        }
        file: {
          enabled: true
          keyType: 'Account'
        }
      }
    }
    minimumTlsVersion: 'TLS1_0'
    networkAcls: {
      bypass: 'AzureServices'
      defaultAction: 'Allow'
      ipRules: []
      virtualNetworkRules: []
    }
    supportsHttpsTrafficOnly: true
  }
  sku: {
    name: 'Standard_RAGRS'
    tier: 'Standard'
  }
}
  */

resource appInsights 'Microsoft.Insights/components@2020-02-02-preview' = {
  name: appInsightsName
  location: location
  tags: tags
  kind: 'web'
  properties: { 
    Application_Type: 'web'
    Flow_Type: 'Bluefield'
  }
}

// resource kubeEnvironments_containerapps_env_name_resource 'Microsoft.Web/kubeEnvironments@2021-02-01' = {
//   kind: 'containerenvironment'
//   location: 'canadacentral'
//   name: kubeEnvironments_containerapps_env_name
//   properties: {
//     appLogsConfiguration: {
//       destination: 'log-analytics'
//       logAnalyticsConfiguration: {
//         customerId: '7dfdfae9-f1ec-4ea8-a7a5-84d14a88356e'
//       }
//     }
//     staticIp: '20.104.107.83'
//   }
// }

resource environment 'Microsoft.Web/kubeEnvironments@2021-02-01' = {
  name: environmentName
  kind: 'containerenvironment'
  location: location
  tags: tags
  properties: {
    type: 'managed'
    internalLoadBalancerEnabled: false
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: workspace.properties.customerId
        sharedKey: listKeys(workspace.id, workspace.apiVersion).primarySharedKey
      }
    }
    containerAppsConfiguration: {
      daprAIInstrumentationKey: appInsights.properties.InstrumentationKey
    }
  }
}

resource mailerContainerApp 'Microsoft.Web/containerapps@2021-03-01' = {
  name: mailerContainerAppName
  kind: 'containerapps'
  tags: tags
  location: location
  properties: {
    kubeEnvironmentId: environment.id
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
        external: mailerIsExternalIngress
        targetPort: mailerPort
      }
    }
    template: {
      containers: [
        {
          image: mailerImage
          name: mailerContainerAppName
          resources: {
            cpu: '0.5'
            memory: '1Gi'
          }
          transport: 'auto'
          env: [
            {
              name: 'APPSETTINGS_API_KEY'
              secretref: mailgunApiKeyRef
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
        minReplicas: minReplicas
        maxReplicas: maxReplicas
      }
      dapr: {
        enabled: true
        appPort: mailerPort
        appId: mailerContainerAppName
        // components: daprComponents
      }
    }
  }
}

resource webContainerApp 'Microsoft.Web/containerapps@2021-03-01' = {
  name: webContainerAppName
  kind: 'containerapps'
  tags: tags
  location: location
  properties: {
    kubeEnvironmentId: environment.id
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
        external: webIsExternalIngress
        targetPort: webPort
      }
    }
    template: {
      containers: [
        {
          image: webImage
          name: webContainerAppName
          resources: {
            cpu: '0.5'
            memory: '1Gi'
          }
          transport: 'auto'
          env: [
            {
              name: 'MAILER_SERVICE_NAME'
              value: mailerContainerAppName
            }
            {
              name: 'APPSETTINGS_API_KEY'
              secretref: mailgunApiKeyRef
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
        minReplicas: minReplicas
        maxReplicas: maxReplicas
      }
      dapr: {
        enabled: true
        appPort: webPort
        appId: webContainerAppName
        // components: daprComponents
      }
    }
  }
}


//output webUrl string = webContainerApp.properties.latestRevisionFqdn
output webUrl string = 'webContainerApp.properties.latestRevisionFqdn'
