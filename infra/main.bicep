param subscriptionId string
param name string
param secrets array = []

var location = resourceGroup().location
var kubeEnvironmentId = '/subscriptions/${subscriptionId}/resourceGroups/${resourceGroup().name}/providers/Microsoft.Web/kubeEnvironments/Production'
var environmentName = 'Production'
var workspaceName = '${name}-log-analytics'

resource name_resource 'Microsoft.Web/containerapps@2021-03-01' = {
  name: name
  kind: 'containerapps'
  location: location
  properties: {
    kubeEnvironmentId: kubeEnvironmentId
    configuration: {
      secrets: secrets
      registries: []
      ingress: {
        'external':true
        'targetPort':80
      }
    }
    template: {
      containers: [
        {
          'name':'simple-hello-world-container'
          'image':'mcr.microsoft.com/azuredocs/containerapps-helloworld:latest'
          'command':[]
          'resources':{
            'cpu':'.25'
            'memory':'.5Gi'
          }
        }
      ]
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
  location: location
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
    workspaceCapping: {}
  }
  dependsOn: []
}
