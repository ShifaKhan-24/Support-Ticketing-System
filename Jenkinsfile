pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Check out the code from the repository
                git branch: 'main', url: 'https://github.com/ShifaKhan-24/Support-Ticketing-System.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') { // Navigate to the backend directory
                    bat 'npm install' // Install Node.js dependencies
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') { // Navigate to the frontend directory
                    bat 'npm install' // Install React dependencies
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') { // Navigate to the backend directory
                    bat 'npm run build' // Build the Node.js application (if applicable)
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') { // Navigate to the frontend directory
                    bat 'npm run build' // Build the React application
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('frontend') { // Navigate to the backend directory
                    bat 'npm test' // Run tests for the Node.js application
                }
            }
        }

        stage('Package Application') {
            steps {
                // Optionally, package your application here
                echo 'Packaging the application...'
            }
        }

        stage('Deploy Application') {
            steps {
                // Placeholder for AWS deployment commands
                echo 'Deploying application to AWS...'
            }
        }
    }

    post {
        always {
            // Clean up workspace after the build
            cleanWs()
        }
        success {
            echo 'Build and deployment succeeded!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}
