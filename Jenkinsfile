podTemplate(label: 'buildDockerContainer', containers: [
  containerTemplate(name: 'docker', image: 'docker', ttyEnabled: true, command: 'cat'),
  containerTemplate(name: 'helm', image: 'lachlanevenson/k8s-helm', ttyEnabled: true, command: 'cat')
],
volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
]) {
   node('buildDockerContainer') {
     sh "env | sort"

    def repo = checkout scm
    def gitBranch = repo.GIT_BRANCH
    def gitCommit = repo.GIT_COMMIT
    def shortCommit = repo.GIT_COMMIT[0..7]
    def isDeployPR = sh(returnStdout: true, script: "git log -1").contains("[deploy pr]")
    def gitTagged = env.TAG_NAME != null
     
    if (gitBranch == "master") {
      env.DOCKER_TAG = "latest"
    } else if (gitTagged) {
      env.DOCKER_TAG = env.TAG_NAME
    } else {
      env.DOCKER_TAG = env.BRANCH_NAME
    }

    println "DOCKER_TAG: ${env.DOCKER_TAG}, TAG_NAME: ${env.TAG_NAME}, gitbranch: ${gitBranch}, shortCommit: ${shortCommit}, isDeployPR: ${isDeployPR}"


    stage('Build And Publish Docker Image') {
      container('docker') {
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'dockerhub',
            usernameVariable: 'DOCKER_HUB_USER', passwordVariable: 'DOCKER_HUB_PASSWORD']]) {
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'hmda-platform-jenkins-service',
              usernameVariable: 'DTR_USER', passwordVariable: 'DTR_PASSWORD']]) {
              withCredentials([string(credentialsId: 'internal-docker-registry', variable: 'DOCKER_REGISTRY_URL')]){
                sh "docker build --rm --build-arg DOCKER_TAG=${env.DOCKER_TAG} -t=${env.DOCKER_HUB_USER}/hmda-frontend ."
                if (gitTagged || gitBranch == "master" || isDeployPR) {
                  //Push to Dockerhub
                  sh """
                    docker tag ${env.DOCKER_HUB_USER}/hmda-frontend ${env.DOCKER_HUB_USER}/hmda-frontend:${env.DOCKER_TAG}
                    docker login -u ${env.DOCKER_HUB_USER} -p ${env.DOCKER_HUB_PASSWORD} 
                    docker push ${env.DOCKER_HUB_USER}/hmda-frontend:${env.DOCKER_TAG}
                  """

                  //Push to Internal Docker Repo
                  sh """
                    docker tag ${env.DOCKER_HUB_USER}/hmda-frontend:${env.DOCKER_TAG} ${DOCKER_REGISTRY_URL}/${env.DOCKER_HUB_USER}/hmda-frontend:${env.DOCKER_TAG}
                    docker login ${DOCKER_REGISTRY_URL} -u ${env.DTR_USER} -p ${env.DTR_PASSWORD} 
                    docker push ${DOCKER_REGISTRY_URL}/${env.DOCKER_HUB_USER}/hmda-frontend:${env.DOCKER_TAG}
                    docker image prune -f
                  """
                }
              }
            }
          }
        }
      }

    stage('Deploy') {
      if (env.BRANCH_NAME == 'master' || isDeployPR) {
        container('helm') {
          sh "helm upgrade --install --force \
            --namespace=default \
            --values=kubernetes/hmda-frontend/values.yaml \
            --set commitId=$shortCommit \
            --set image.pullPolicy=Always \
            --set image.tag=${env.DOCKER_TAG} \
            hmda-frontend \
            kubernetes/hmda-frontend"
        }
      }
    }

  }

}
