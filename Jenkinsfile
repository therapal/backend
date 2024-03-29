pipeline {
  agent any
  stages {
    stage("build") {
      steps [
        echo "Sample build stage"
      }
    }
    stage("build") {
      steps [
        echo "Sample test stage"
      }
    }
  }
  post {
    always {
      echo "Build done... Cleaning up"
    }
    success {
      echo "Build success"
    }
    failure {
      echo "Build failed"
    }
  }
}
