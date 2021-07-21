pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'yarn --no-progress --non-interactive --skip-integrity-check --frozen-lockfile install'
            }
        }
        stage('Build') {
            steps {
                sh 'yarn run build'
            }
        }
        stage('Deploy') {
            stages {
                stage('Production') {
                    when {
                        branch 'master'
                        tag 'v*'
                    }
                    environment {
                        TARGET_SERVER = credentials('dev-server-address')
                        TARGET_PATH = credentials('dev-server-path')
                    }
                    steps {
                        sshagent(credentials: ['dev-server-key']) {
                            sh 'rsync -av --delete-after build deploy@$TARGET_SERVER:$TARGET_PATH'
                        }
                    }
                }
                stage('Development') {
                    when {
                        branch 'master'
                        not {
                            tag 'v*'
                        }
                    }
                    environment {
                        TARGET_SERVER = credentials('prod-server-address')
                        TARGET_PATH = credentials('prod-server-path')
                    }
                    steps {
                        sshagent(credentials: ['prod-server-key']) {
                            sh 'rsync -av --delete-after build deploy@$TARGET_SERVER:$TARGET_PATH'
                        }
                    }
                }
            }
        }
    }
}