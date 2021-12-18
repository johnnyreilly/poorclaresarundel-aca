param subscriptionId string
param name string
param location string
param kubeEnvironmentId string
param containers array
param secrets array
param registries array
param ingress object
param environmentName string
param workspaceName string
param workspaceLocation string

resource name_resource 'Microsoft.Web/containerapps@2021-03-01' = {
  name: name
  kind: 'containerapps'
  location: location
  properties: {
    kubeEnvironmentId: kubeEnvironmentId
    configuration: {
      secrets: secrets
      registries: registries
      ingress: ingress
    }
    template: {
      containers: containers
    }
  }
  dependsOn: [
    environmentName_resource
  ]
}

resource environmentName_resource 'Microsoft.Web/kubeEnvironments@2021-03-01' = {
  name: environmentName
  location: location
  properties: {
    type: 'managed'
    internalLoadBalancerEnabled: false
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: reference('Microsoft.OperationalInsights/workspaces/${workspaceName}', '2020-08-01').customerId
        sharedKey: listKeys('Microsoft.OperationalInsights/workspaces/${workspaceName}', '2020-08-01').primarySharedKey
      }
    }
  }
  dependsOn: [
    workspaceName_resource
  ]
}

resource workspaceName_resource 'Microsoft.OperationalInsights/workspaces@2020-08-01' = {
  name: workspaceName
  location: workspaceLocation
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
    workspaceCapping: {}
  }
  dependsOn: []
}
