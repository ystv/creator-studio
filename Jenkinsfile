pipeline {
    agent any

    stages {
        stage('Update Components') {
            when {
                anyOf {
                    branch 'master'
                    }
                }
            steps {
                echo "Updating"
                sh "docker pull nginx:stable-alpine"
                sh "docker pull node:alpine"
            }
        }
        stage('Build') {
            when {
                anyOf {
                    branch 'master'
                    }
                }
            steps {
                echo "Building"
                sh "docker build --build-arg BUILD_ID=${env.BUILD_ID} ."
            }
        }
        stage('Cleanup') {
            when {
                anyOf {
                    branch 'master'
                    }
                }
            steps {
                echo "Uploading To Registry"
                sh "docker push localhost:5000/ystv/creator-studio:$BUILD_ID" // Uploaded to registry
                echo "Performing Cleanup"
                script {
                    try {
                        sh "docker image prune -f --filter label=site=creator-studio --filter label=stage=builder --filter label=build=\$((${env.BUILD_NUMBER} - 1))" // Removing the previous local builder image
                    }
                    catch (err) {
                        echo "Couldn't find old build to delete"
                        echo err.getMessage()
                    }
                }
                sh "docker image rm localhost:5000/ystv/creator-studio:$BUILD_ID" // Removing the local builder image
            }
        }
        stage('Deploy') {
            when {
                anyOf {
                    branch 'master'
                    }
                }
            steps {
                echo "Deploying"
                sh "docker pull localhost:5000/ystv/creator-studio:$BUILD_ID" // Pulling image from local registry
                script {
                    try {
                        sh "docker kill ystv-creator-studio" // Stop old container
                    }
                    catch (err) {
                        echo "Couldn't find container to stop"
                        echo err.getMessage()
                    }
                }
                sh "docker run -d --rm -p 8050:80 --name ystv-creator-studio localhost:5000/ystv/creator-studio:$BUILD_ID" // Deploying site
                sh 'docker image prune -a -f --filter "label=site=creator-studio" --filter "label=stage=final"' // remove old image
            }
        }
    }
    post {
        success {
            echo 'Very cash-money'
        }
        failure {
            echo 'That is not ideal'
        }
    }
}