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
var minReplicas = 0

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

resource environment 'Microsoft.Web/kubeEnvironments@2021-03-01' = {
  name: environmentName
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
        'external': mailerIsExternalIngress
        'targetPort': mailerPort
      }
    }
    template: {
      containers: [
        {
          image: mailerImage
          name: mailerContainerAppName
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
        'external': webIsExternalIngress
        'targetPort': webPort
      }
    }
    template: {
      containers: [
        {
          image: webImage
          name: webContainerAppName
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


output webUrl string = webContainerApp.properties.latestRevisionFqdn
