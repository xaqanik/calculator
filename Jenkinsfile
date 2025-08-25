pipeline {
    agent any

    environment {
        // --- GCP Configuration ---
        GCP_PROJECT_ID = 'mystical-vial-403905'
        GCP_REGION = 'us-central1'
        GCP_CREDS = credentials('gcp-creds')

        // --- Docker Hub Configuration ---
        DOCKERHUB_USERNAME = 'xaqani90' // Your Docker Hub username
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds') // Your Docker Hub credential ID in Jenkins
        IMAGE_NAME = "${DOCKERHUB_USERNAME}/calc:${env.BUILD_NUMBER}" // Docker Hub image format

        // --- Other Tool Configuration ---
        SONAR_TOKEN = credentials('sonarqube-token')
        ANSIBLE_SSH_KEY = credentials('ansible-ssh-key.') 
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/xaqanik/calculator.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'docker run --rm -v "$(pwd)/src:/usr/src" sonarsource/sonar-scanner-cli:latest -Dsonar.projectKey=react-app -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=${SONAR_TOKEN}'
                }
            }
        }

        stage('Build & Push to Docker Hub') {
            steps {
                script {
                    // Build the Docker image
                    sh "docker build -t ${IMAGE_NAME} ."
                    
                    // Login to Docker Hub and push the image
                    withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"
                        sh "docker push ${IMAGE_NAME}"
                    }
                }
            }
        }

        stage('Provision Infrastructure') {
            steps {
                dir('terraform') {
                    // Authenticate with GCP for Terraform to work
                    sh 'gcloud auth activate-service-account --key-file=${GCP_CREDS}'
                    sh 'terraform init'
                    sh "terraform apply -auto-approve -var='gcp_project_id=${GCP_PROJECT_ID}' -var='gcp_region=${GCP_REGION}'"
                }
            }
        }
        
        stage('Deploy with Ansible') {
            steps {
                script {
                    echo "Waiting for VM to initialize..."
                    sleep 100 
                    
                    def instanceIp = sh(returnStdout: true, script: "cd terraform && terraform output -raw instance_ip").trim()
                    
                    sh "echo '[app-server]\n${instanceIp}' > ansible/inventory"
                    
                    ansiblePlaybook(
                        playbook: 'ansible/playbook.yml',
                        inventory: 'ansible/inventory',
                        credentialsId: 'ansible-ssh-key.',
                        extraVars: [
                            image_name: IMAGE_NAME
                        ]
                    )
                }
            }
        }
    }
}