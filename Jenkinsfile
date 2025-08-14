pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/your-repo.git'
            }
        }

        stage('Build & Run with Docker Compose') {
            steps {
                sh '''
                    docker-compose down
                    docker-compose build
                    docker-compose up -d
                '''
            }
        }
    }

    post {
        always {
            sh 'docker-compose ps'
        }
    }
}
