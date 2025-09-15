load('ext://nerdctl', 'nerdctl_build')
nerdctl_build('nextjs-app:dev', '.', dockerfile='Dockerfile')
 
# Apply k8s manifests
k8s_yaml([
  'Kube/deployment.yaml',
  'Kube/service.yaml',
])
 
# Expose app locally on port 3000
k8s_resource('nextjs-app', port_forwards=3000)