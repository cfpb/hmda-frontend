pipeline {
  agent {
    label 'hmdaops'
  }

  stages {
    stage('init') {
      steps {
        script {
          library identifier: "hmdaUtils@master", retriever: modernSCM (
              [
                  $class: 'GitSCMSource',
                  remote: 'https://github.cfpb.gov/HMDA-Operations/hmda-devops.git'
              ]
          )

          init.setEnvironment('hmda_frontend')
        }
      }
    }

    stage('Build And Publish Docker Image') {
      steps {
        script {
          withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'dockerhub',
            usernameVariable: 'DOCKER_HUB_USER', passwordVariable: 'DOCKER_HUB_PASSWORD']]) {
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'hmda-platform-jenkins-service',
              usernameVariable: 'DTR_USER', passwordVariable: 'DTR_PASSWORD']]) {
              withCredentials([string(credentialsId: 'internal-docker-registry', variable: 'DOCKER_REGISTRY_URL')]){
                dockerBuild.dockerBuild('hmda-frontend', '')
                security.dockerImageScan('hmda-frontend', env.DOCKER_TAG)
              }
            }
          }
        }
      }
    }

     stage('Deploy') {
      agent {
        docker {
          image 'hmda/helm'
          reuseNode true
          args '--entrypoint=\'\''
        }
      }
      steps {
        script {
          withCredentials([file(credentialsId: 'hmda-ops-kubeconfig', variable: 'KUBECONFIG')]) {
            if (env.DOCKER_PUSH == 'true') {
              helm.deploy('hmda-frontend')
            }
          }
        }
      }
    }

  }

}
