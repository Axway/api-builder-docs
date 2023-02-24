// Loads the Jenkins global pipeline library called "axway-dubl-libraries". This
// has to be added by your Jenkins admin.
@Library('axway-dubl-libraries')_

// Previews will always be created by the opendocs.preview() function for pull
// requests and branches called "master" and "main". Add in the names of branches
// you want to generate previews for using the PREVIEW_FOR_BRANCHES variable e.g. 
//    String PREVIEW_FOR_BRANCHES = "developmay22 developaug22 developnov22"
//    String PREVIEW_FOR_BRANCHES = "developmay22,developaug22,developnov22"
String PREVIEW_FOR_BRANCHES = ""

node('OpendocsBuilder') {
  timestamps{  // enable timestamp in the console logs
    ansiColor('xterm') { // using ansi colours
      // Note that the properties are actually overwritten by the axway-dubl-libraries opendocs.*
      // functions. If you need to add some new properties then talk to the library mantainers.
      properties([
        disableConcurrentBuilds(),
        buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '20', daysToKeepStr: '', numToKeepStr: '20')),
        parameters([
          booleanParam(
            name: 'CLEAN_CACHE_NPM',
            defaultValue: false,
            description: 'Clear out the cached NPM dependencies so they be redownloaded.'),
          booleanParam(
            name: 'CLEAN_CACHE_HUGO',
            defaultValue: false,
            description: 'Clear out the cached Hugo dependencies so they be redownloaded.')
        ])
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
          //    - opendocs.build(HUGO_VERSION)
          //    - opendocs.build("0.103.1")
          opendocs.build()
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

