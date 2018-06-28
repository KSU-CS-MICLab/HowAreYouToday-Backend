node {
    withCredentials([[$class: 'UsernamePasswordMultiBinding',
        credentialsId: 'dockerhub',
        usernameVariable: 'DOCKER_USER_ID',
        passwordVariable: 'DOCKER_USER_PASSWORD'], 
            string(credentialsId: 'GCLOUD_PROJECT', variable: 'GCLOUD_PROJECT'),
            string(credentialsId: 'SERVICE_ACCOUNT_KEY', variable: 'SERVICE_ACCOUNT_KEY')
        ]) {
        stage('Pull') {
            git 'https://github.com/KSU-CS-MICLab/HowAreYouToday-Backend.git'
        }
        stage('Unit Test') {
        }
        stage('Build') {
            sh(script: 'docker-compose build api')
        }
        stage('Tag') {
            sh(script: '''docker tag ${DOCKER_USER_ID}/how2day-api \
            ${DOCKER_USER_ID}/how2day-api:${BUILD_NUMBER}''')
        }
        stage('Push') {
            sh(script: 'docker login -u ${DOCKER_USER_ID} -p ${DOCKER_USER_PASSWORD}')
            sh(script: 'docker push ${DOCKER_USER_ID}/how2day-api:${BUILD_NUMBER}')
            sh(script: 'docker push ${DOCKER_USER_ID}/how2day-api:latest')
        }
        stage('Deploy') {
            sh(script: 'docker-compose up -d production')
        }
    }
}