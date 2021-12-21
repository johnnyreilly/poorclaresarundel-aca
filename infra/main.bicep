param location string = resourceGroup().location
param environmentName string = 'env-${uniqueString(resourceGroup().id)}'
// param apimName string = 'store-api-mgmt-${uniqueString(resourceGroup().id)}'
param minReplicas int = 0
param nodeImage string = 'nginx'
param nodePort int = 3000
param isNodeExternalIngress bool = true
param containerRegistry string
param containerRegistryUsername string

@secure()
param containerRegistryPassword string

var nodeServiceAppName = 'node-app'
var workspaceName = '${nodeServiceAppName}-log-analytics'

resource workspace 'Microsoft.OperationalInsights/workspaces@2020-08-01' = {
  name: workspaceName
  location: location
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
    workspaceCapping: {}
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02-preview' = {
  name: '{nodeServiceAppName}-app-insights'
  location: location
  kind: 'web'
  properties: { 
    Application_Type: 'web'
    Flow_Type: 'Bluefield'
    // Request_Source: 'CustomDeployment'
  }
}

resource environment 'Microsoft.Web/kubeEnvironments@2021-03-01' = {
  name: environmentName
  location: location
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

resource containerApp 'Microsoft.Web/containerapps@2021-03-01' = {
  name: nodeServiceAppName
  kind: 'containerapps'
  location: location
  properties: {
    kubeEnvironmentId: environment.properties.id
    configuration: {
      secrets: [
        {
          name: 'container-registry-password'
          value: containerRegistryPassword
        }
      ]
      registries: [
        {
          server: containerRegistry
          username: containerRegistryUsername
          passwordSecretRef: 'container-registry-password'
        }
      ]
      ingress: {
        'external': isNodeExternalIngress
        'targetPort': nodePort
      }
    }
    template: {
      containers: [
        {
          image: nodeImage
          name: nodeServiceAppName
          transport: 'auto'
          // env: []
          'resources':{
            'cpu':'.25'
            'memory':'.5Gi'
          }
        }
      ]
      scale: {
        minReplicas: minReplicas
      }
    }
  }
}
