pipeline {
  agent any

  environment {
    DOCKER_REGISTRY = 'smaditya24' // change this if your Docker Hub username is different
    IMAGE_NAME = 'my-nodejs-app'
  }

  stages {

    stage('Checkout Source') {
      steps {
        git url: 'https://github.com/SMADITYA24/test1.git', branch: 'main'
      }
    }

    stage('Build & Push Docker Images') {
      steps {
        script {
          withCredentials([usernamePassword(
            credentialsId: 'docker-hub-creds',
            usernameVariable: 'DOCKER_USERNAME',
            passwordVariable: 'DOCKER_PASSWORD')]) {

            // More secure Docker login
            bat """
@echo off
echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin
"""


            // Build the Docker image
            bat "docker-compose build web"

            // Tag and push image
            def imageTag = "${DOCKER_REGISTRY}/${IMAGE_NAME}:${env.BUILD_NUMBER}"
            bat "docker tag ${IMAGE_NAME}:${env.BUILD_NUMBER} ${imageTag}"
            bat "docker push ${imageTag}"
          }
        }
      }
    }

    stage('Deploy Multi-Container App') {
      steps {
        script {
          bat """
            @echo off
            docker stop node-web node-mongo-db || exit /b 0
            docker rm node-web node-mongo-db || exit /b 0
            """
            bat """
            set BUILD_NUMBER=%BUILD_NUMBER%
            docker-compose up -d --force-recreate
          """
        }
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}