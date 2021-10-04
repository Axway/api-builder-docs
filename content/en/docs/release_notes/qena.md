---
title: Qena release notes
linkTitle: Qena
date: 2020-06-19
description: 19 June 2020
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #4567: Config copy script is inconsistent between connectors
* #6397: {{% variables/apibuilder_prod_name %}} project unit tests do not exit with non-zero exit code if they fail
* #6458: Update CLI project template to use new major versions of Base64, JSON and JavaScript plugins

## Fixes

* #6376: Convert "Amplify Central" in login required message into a link to the platform
* #6445: @axway/api-builder-plugin-fn-javascript shows invalid "\\n" characters
* #6449: The input box in the flow editor shows multiple scroll bars and extra ws

## Release notes

* #4567: Introduced new module [@axway/api-builder-project-utils](https://www.npmjs.com/package/@axway/api-builder-project-utils), which comes with `api-builder-copy` and `api-builder-create-directory` binary commands, which can help you with copying configuration files and creating directories on postinstall from your plugins into a {{% variables/apibuilder_prod_name %}} application.
* #6376: A link to the https://platform.axway.com has been added when the user is not logged-in and runs commands which require an {{% variables/platform_prod_name %}} session.
* #6397: Previously, anything testing {{% variables/apibuilder_prod_name %}} would always cause the process to exit with a 0 exit code, leading to successful test results in CI, even in the case of errors. Now, {{% variables/apibuilder_prod_name %}} will not interfere with the process exit code and tests which require {{% variables/apibuilder_prod_name %}} will be able to fail CI builds.
* #6397: Added config option `bindListeners`. This is enabled by default and can be disabled to prevent process listeners on exit and other signals from being bound. New project unit tests will have this option disabled in order for the {{% variables/apibuilder_prod_name %}} event listeners to not interfere with the mocha test suite.
* #6449: Fixed styling issues in the Flow debugger and API doc and test examples where multiple scrollbars and extra padding would appear.
* #6458: New projects now include new major versions of the [Base64](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64) (3.0.0), [JavaScript](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript) (2.0.0) and [JSON](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json) (4.0.0) plugins. These fix issues with the inability to handle errors, and now use "Next" and "Error" outputs. See the individual release notes for each plugin in their corresponding readmes.

## Updated modules

* [@axway/amplify-api-builder-cli@1.7.3](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.7.3)
* [@axway/api-builder@4.19.3](https://www.npmjs.com/package/@axway/api-builder/v/4.19.3)
* [@axway/api-builder-admin@1.17.9](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.17.9)
* [@axway/api-builder-runtime@4.28.3](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.28.3)
* [@axway/api-builder-sdk@1.0.1](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.0.1)

## Updated plugins

* [@axway/api-builder-plugin-dc-mongo@1.1.14](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mongo/v/1.1.14)
* [@axway/api-builder-plugin-fn-base64@3.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/3.0.0)
* [@axway/api-builder-plugin-fn-javascript@2.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/2.0.0)
* [@axway/api-builder-plugin-fn-json@4.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/4.0.0)
* [@axway/api-builder-plugin-fn-swagger@2.7.8](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.7.8)

{{% releasenotes/previous %}}
