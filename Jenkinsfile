pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'auth-app:latest'
        SONARQUBE_ENV = 'SonarQube' // Le nom de l'outil SonarQube dans Jenkins > Manage Jenkins > Global Tool Configuration
    }

    stages {

        stage('Checkout') {
            steps {
                git url: 'https://github.com/mamediarra/Redproject_DevopsRiders.git', branch: 'master'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker compose build'
                }
            }
        }

    stage('SonarQube Analysis') {
        steps {
            withSonarQubeEnv('SonarQube') {
                sh """
                     sonar-scanner \
                     -Dsonar.projectKey=auth-app \
                     -Dsonar.sources=. \
                    -Dsonar.host.url=http://192.168.1.76:9000 \
                    -Dsonar.login=squ_22e5db6b805a0ac9e3a74f2c4f6a92486501f040
                """
            }
        }
    }

        // stage('Push to Docker Registry') {
        //     steps {
        //         script {
        //             sh "docker tag auth-app:latest ton-utilisateur/nom-image:latest"
        //             sh "docker push ton-utilisateur/nom-image:latest"
        //         }
        //     }
        // }

    }

    post {
        always {
            echo 'Pipeline terminé.'
        }
        failure {
            echo 'Le pipeline a échoué.'
        }
    }
}
