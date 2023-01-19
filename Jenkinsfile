// Loads the Jenkins global pipeline library called "axway-dubl-libraries". This
// has to be added by your Jenkins admin.
@Library('axway-dubl-libraries')

// Previews will always be created by the opendocs.preview() function for pull
// requests and branches called "master" and "main". Add in the names of branches
// you want to generate previews for using the PREVIEW_FOR_BRANCHES variable e.g. 
//    String PREVIEW_FOR_BRANCHES = "developmay22 developaug22 developnov22"
//    String PREVIEW_FOR_BRANCHES = "developmay22,developaug22,developnov22"
String PREVIEW_FOR_BRANCHES = ""

node('OpendocsBuilder') {
  timestamps{  // enable timestamp in the console logs
    ansiColor('xterm') { // using ansi colours
      properties([
        disableConcurrentBuilds(),
        buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '20', daysToKeepStr: '', numToKeepStr: '20'))
      ])

      try {
        // Checkout stage
        stage('Checkout') {
          checkout scm
        }

        // Potentially duplicating something already done using github workflows
        // but it runs fast. Just delete this stage if you don't need it.
        //stage ('Markdown Lint') {
        //  opendocs.markdownlint("content/en/**/*.md")
        //}

        stage ('Build') {
          // The build environment uses a default version of hugo. Invoke the opendocs.build
          // using the following to override the default version:
          //    - opendocs.build(HUGO_VERSION, BUILD_COMMAND)
          //    - opendocs.build("0.103.1", "bash build.sh -m ci")
          opendocs.build("bash build.sh -m ci")
        }

        stage ('Start Preview') {
          opendocs.preview("${PREVIEW_FOR_BRANCHES}")
        }
      }
      catch(Exception e) {
        currentBuild.result = "FAILURE"
        echo e
      }
    }
  }
}

