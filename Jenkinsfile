@Library('pipeline-common@master') _

pipeline {
    options {
        disableConcurrentBuilds()
    }
    environment {
        NODE_ENV = 'test'
        NPM_TOKEN = credentials('jenkins-checkit-npm-token')
        SLACK_CHANNEL = "#comp-hub"
    }
    agent {
        node {
            label 'ec2-node8'
        }
    }
    // triggers {
    //     cron('H H(4-5) * * *')
    // }
    stages {
        stage('Setup tests') {
            steps {
                ansiColor('xterm') {
                    script {
                        onStart environment: env
                    }
                    nvm('10.15.3') {
                        sh 'rm -rf node_modules'
                        // Increase the inotify watch limit (needed for React apps)
                        sh 'echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p'
                        // Dependencies required for Cypress
                        sh 'sudo apt-get -y -q install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb'
                        // Install Chrome
                        sh 'wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb'
                        sh 'sudo apt-get -y -q install ./google-chrome-stable_current_amd64.deb'
                        sh 'npm config set scope checkit && echo //registry.npmjs.org/:_authToken=${NPM_TOKEN} >> ~/.npmrc'
                        sh 'npm install --unsafe-perm'
                    }
                }
            }
        }
        stage('Start E2E Test APP') {
            steps {
                ansiColor('xterm') {
                    sh '$(aws ecr get-login --no-include-email --region eu-west-1)'
                    //sh 'docker network create checkit || true'
                    //sh 'if grep -q "local_am_maintenance" /etc/hosts; then echo "Entry already existing in /etc/hosts"; else echo "Adding local_am_maintenance in /etc/hosts"; echo "127.0.0.1   local_am_maintenance" | sudo tee -a /etc/hosts; fi'
                    //sh 'docker stop local-mock-server || true && docker rm local-mock-server || true'
                    //sh 'docker stop local-am-maintenance-app || true && docker rm local-am-maintenance-app || true'
                    //sh 'docker-compose -f ./infrastructure/docker-compose.yml up -d'
                    timeout(time: 900, unit: 'SECONDS') {
                        //sh 'until docker-compose -f infrastructure/docker-compose.yml logs --tail 50 am-maintenance-app | grep -qm 1 "You can now view @checkit/am-maintenance-app in the browser"; do sleep 1; done;'
                    }
                }
            }
        }
        stage('Run UI tests') {
            environment {
                CYPRESS_RECORD_KEY='b4a5d089-df77-4663-a2fb-382fb8da9311'
            }
            steps {
                script {
                    nvm('10.15.3') {
                        ansiColor('xterm') {
                            sh 'npm run test'
                        }
                    }
                }
            }
        }
        stage('Successful') {
            steps {
                script {
                    onSuccess environment: env
                }
            }
        }
    }
    post {
        failure {
            script {
                onFailure environment: env
            }
        }
        always {
            sh 'echo \"*** Mock server logs ***\"'
            sh 'docker logs local-mock-server'
            sh 'echo \"************************\"'
            echo 'Generating Cucumber reports'
            cucumber fileIncludePattern: '**/*.json', jsonReportDirectory: './cypress/reports/metadata.json', sortingMethod: 'ALPHABETICAL'
            //sh 'docker stop local-mock-server || true && docker rm local-mock-server || true'
            //sh 'docker stop local-am-maintenance-app || true && docker rm local-am-maintenance-app || true'
            junit 'results/cypress-report.xml'
        }
    }
}
