pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        ECR_REGISTRY = '367709774709.dkr.ecr.ap-south-1.amazonaws.com'
        BACKEND_IMAGE = 'devboard-backend'
        FRONTEND_IMAGE = 'devboard-frontend'
        APP_EC2_IP = '43.205.238.78'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'GitHub se code le raha hoon...'
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Docker images build ho rahi hain...'
                sh 'docker build -t $BACKEND_IMAGE:latest ./backend'
                sh 'docker build -t $FRONTEND_IMAGE:latest ./frontend'
            }
        }

        stage('ECR Push') {
            steps {
                echo 'ECR pe images push ho rahi hain...'
                sh '''
                    aws ecr get-login-password --region $AWS_REGION | \
                    docker login --username AWS --password-stdin $ECR_REGISTRY
                    
                    docker tag $BACKEND_IMAGE:latest $ECR_REGISTRY/$BACKEND_IMAGE:latest
                    docker push $ECR_REGISTRY/$BACKEND_IMAGE:latest
                    
                    docker tag $FRONTEND_IMAGE:latest $ECR_REGISTRY/$FRONTEND_IMAGE:latest
                    docker push $ECR_REGISTRY/$FRONTEND_IMAGE:latest
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo 'App EC2 pe deploy ho rahi hai...'
                sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@$APP_EC2_IP "
                        cd devboard &&
                        aws ecr get-login-password --region ap-south-1 | \
                        docker login --username AWS --password-stdin 367709774709.dkr.ecr.ap-south-1.amazonaws.com &&
                        docker compose pull &&
                        docker compose up -d
                    "
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline successful! App deploy ho gayi! '
        }
        failure {
            echo 'Pipeline fail ho gayi! Check karo!'
        }
    }
}