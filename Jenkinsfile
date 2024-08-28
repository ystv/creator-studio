String registryEndpoint = 'registry.comp.ystv.co.uk'

def vaultConfig = [vaultUrl: 'https://vault.comp.ystv.co.uk',
                  vaultCredentialId: 'jenkins-vault',
                  engineVersion: 2]

def branch = env.BRANCH_NAME.replaceAll("/", "_")
def image
String imageName = "ystv/creator-studio:${branch}-${env.BUILD_ID}"

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
          docker.withRegistry('https://' + registryEndpoint, 'docker-registry') {
            image = docker.build(imageName, ".")
          }
          // Checking if it is semantic version release.
          String deployEnv = env.TAG_NAME ==~ /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/ ? 'prod' : 'dev'
          def secrets = [
            [path: "ci/ystv-creator-studio-${deployEnv}", engineVersion: 2, secretValues: [
              [envVar: 'REACT_APP_DEBUG', vaultKey: 'debug'],
              [envVar: 'REACT_APP_TITLE', vaultKey: 'title'],
              [envVar: 'REACT_APP_SECURITY_BASEURL', vaultKey: 'auth-baseurl'],
              [envVar: 'REACT_APP_SECURITY_TYPE', vaultKey: 'auth-type'],
              [envVar: 'REACT_APP_PUBLIC_SITE_BASEURL', vaultKey: 'public-site-baseurl'],
              [envVar: 'REACT_APP_MYTV_BASEURL', vaultKey: 'mytv-baseurl'],
              [envVar: 'REACT_APP_UPLOAD_ENDPOINT', vaultKey: 'upload-endpoint'],
              [envVar: 'REACT_APP_API_BASEURL', vaultKey: 'api-baseurl']
            ]]
          ]
          withVault([configuration: vaultConfig, vaultSecrets: secrets]) {
            docker.withRegistry('https://' + registryEndpoint, 'docker-registry') {
              // sh 'env > .env.local' // this is bad
              image = docker.build(imageName, """ \
                  --build-arg GIT_REV_ARG=${env.GIT_COMMIT} \
                  --build-arg BUILD_ID_ARG=${JOB_NAME}:${BUILD_ID} \
                  --build-arg REACT_APP_DEBUG_ARG=${REACT_APP_DEBUG} \
                  --build-arg REACT_APP_TITLE_ARG=${REACT_APP_TITLE} \
                  --build-arg REACT_APP_SECURITY_BASEURL_ARG=${REACT_APP_SECURITY_BASEURL} \
                  --build-arg REACT_APP_SECURITY_TYPE_ARG=${REACT_APP_SECURITY_TYPE} \
                  --build-arg REACT_APP_PUBLIC_SITE_BASEURL_ARG=${REACT_APP_PUBLIC_SITE_BASEURL} \
                  --build-arg REACT_APP_MYTV_BASEURL_ARG=${REACT_APP_MYTV_BASEURL} \
                  --build-arg REACT_APP_UPLOAD_ENDPOINT_ARG=${REACT_APP_UPLOAD_ENDPOINT} \
                  --build-arg REACT_APP_API_BASEURL_ARG=${REACT_APP_API_BASEURL} \
                  -f Dockerfile . \
                """)
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
      stages {
        stage('Development') {
          when {
            expression { env.BRANCH_IS_PRIMARY }
          }
          steps {
            build(job: 'Deploy Nomad Job', parameters: [
              string(name: 'JOB_FILE', value: 'creator-studio-dev.nomad'),
              text(name: 'TAG_REPLACEMENTS', value: "${registryEndpoint}/${imageName}")
            ])
          }
        }

        stage('Production') {
          when {
            // Checking if it is semantic version release.
            expression { return env.TAG_NAME ==~ /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/ }
          }
          steps {
            build(job: 'Deploy Nomad Job', parameters: [
              string(name: 'JOB_FILE', value: 'creator-studio-prod.nomad'),
              text(name: 'TAG_REPLACEMENTS', value: "${registryEndpoint}/${imageName}")
            ])
          }
        }
      }
    }
  }
}
