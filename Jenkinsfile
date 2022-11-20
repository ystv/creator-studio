String registryEndpoint = 'registry.comp.ystv.co.uk'

def vaultConfig = [vaultUrl: 'https://vault.comp.ystv.co.uk',
                   vaultCredentialId: 'jenkins-vault',
                   engineVersion: 2]

def image
String imageName = "ystv/creator-studio:${env.BRANCH_NAME}-${env.BUILD_ID}"

// Checking if it is semantic version release/
String deployEnv = env.TAG_NAME ==~ /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/ ? 'prod' : 'dev'

pipeline {
  agent {
    label 'docker'
  }

  environment {
    DOCKER_BUILDKIT = '1'
  }

  stages {
    stage('Build image') {
      steps {
        script {
          def secrets = [
            [path: "ci/ystv-creator-studio-${deployEnv}", engineVersion: 2, secretValues: [
              [envVar: 'REACT_APP_API_BASEURL', vaultKey: 'api-baseurl'],
              [envVar: 'REACT_APP_MYTV_BASEURL', vaultKey: 'mytv-baseurl'],
              [envVar: 'REACT_APP_SECURITY_BASEURL', vaultKey: 'auth-baseurl'],
              [envVar: 'REACT_APP_SECURITY_TYPE', vaultKey: 'auth-type'],
              [envVar: 'REACT_APP_UPLOAD_ENDPOINT', vaultKey: 'upload-endpoint'],
              [envVar: 'REACT_APP_TITLE', vaultKey: 'title']
            ]]
          ]
          withVault([configuration: vaultConfig, vaultSecrets: secrets]) {
            docker.withRegistry('https://' + registryEndpoint, 'docker-registry') {
              sh 'env > .env.local'
              image = docker.build(imageName)
              sh 'rm .env.local'
            }
          }
        }
      }
    }

    stage('Push image to registry') {
      steps {
        script {
          docker.withRegistry('https://' + registryEndpoint, 'docker-registry') {
            image.push()
            if (env.BRANCH_IS_PRIMARY) {
              image.push('latest')
            }
          }
        }
      }
    }

    stage('Deploy') {
      when {
        anyOf {
          expression { env.BRANCH_IS_PRIMARY }
          equals(actual: deployEnv, expected: 'prod')
        }
      }

      steps {
        build(job: 'Deploy Nomad Job', parameters: [
          string(name: 'JOB_FILE', value: "creator-studio-${deployEnv}.nomad"),
          string(name: 'TAG_REPLACEMENTS', value: "${registryEndpoint}/${imageName}")
        ])
      }
    }
  }
}
