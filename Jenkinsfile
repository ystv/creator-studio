pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'yarn --no-progress --non-interactive --skip-integrity-check --frozen-lockfile install'
            }
        }
        stage('Build') {
            stages {
                stage('Staging') {
                    when {
                        branch 'master'
                        not {
                            expression { return env.TAG_NAME ==~ /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/ } // Checking if it is main semantic version release
                        }
                    }
                    environment {
                        APP_ENV = credentials('creator-staging-env')
                    }
                    steps {
                        sh 'cp $APP_ENV .env'
                        sh 'yarn run build'
                        sh 'rm .env'
                    }
                }
                stage('Production') {
                    when {
                        expression { return env.TAG_NAME ==~ /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/ } // Checking if it is main semantic version release
                    }
                    environment {
                        APP_ENV = credentials('creator-prod-env')
                    }
                    steps {
                        sh 'cp $APP_ENV .env'
                        sh 'yarn run build'
                        sh 'rm .env'
                    }
                }
            }
        }
        stage('Deploy') {
            stages {
                stage('Staging') {
                    when {
                        branch 'master'
                        not {
                            expression { return env.TAG_NAME ==~ /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/ } // Checking if it is main semantic version release
                        }
                    }
                    environment {
                        TARGET_SERVER = credentials('staging-server-address')
                        TARGET_PATH = credentials('staging-server-path')
                    }
                    steps {
                        sshagent(credentials: ['staging-server-key']) {
                            sh 'rsync -av --delete-after build deploy@$TARGET_SERVER:$TARGET_PATH/creator-studio'
                        }
                    }
                }
                stage('Production') {
                    when {
                        expression { return env.TAG_NAME ==~ /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/ } // Checking if it is main semantic version release
                    }
                    environment {
                        TARGET_SERVER = credentials('prod-server-address')
                        TARGET_PATH = credentials('prod-server-path')
                    }
                    steps {
                        sshagent(credentials: ['prod-server-key']) {
                            sh 'rsync -av --delete-after build deploy@$TARGET_SERVER:$TARGET_PATH/creator-studio'
                        }
                    }
                }
            }
        }
    }
}
