---
title: Nashville release notes
linkTitle: Nashville
date: 2021-05-21
description: 21 May 2021
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6697: Previously, flow-triggers with required enum parameters would render as a selector instead of a string drop-down, and an error would be logged in the browser. Now, they will be rendered as a string drop-down. Any default value will be pre-selected.
* #6741: Added `@alasdair/api-builder-plugin-invoke-flow` to the Plugins page as a community plugin. This plugin lets flows invoke another flow and consume its response.
* #6815: Added official support for Node.js 14. 14.17.0 is now the default recommended version.
* #6867: Updated `@axway/api-builder-plugin-fn-javascript` to make the {{% variables/apibuilder_prod_name %}} `logger` available to the code.

## Fixes

* #6661: Previously, long parameter names in the flow editor would overflow the config panel. This would also cause the enabled toggle to be inaccessible for these parameters. Now, these parameter names will wrap and all text and controls will be accessible and visible.
* #6661: Fixed broken and incorrect links to documentation for flow-triggers and flows.
* #6696: Previously, if a plugin fails to uninstall from the UI, the user is incorrectly prompted to `npm install` to manually fix the problem. Now, the user is correctly prompted to `npm uninstall`.
* #6787: Previously, when flow-trigger validation failed, the validation error did not include important details. These details were logged much earlier than the error so it was hard to correlate them. Now, these validation errors will include these details instead of them being logged separately.
* #6873: Previously, when `server.start` fails, the promise it returns was rejected causing an UnhandledPromiseRejectionWarning. Now, if `server.start` fails it will not cause this warning.
* #6877: Fixed a regression with {{% variables/apibuilder_prod_name %}} [Madrid](https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/api_builder_-_7_may_2021.html) release whereby values that were output from the JavaScript flow-node (with **Unsafe mode** disabled/false), could not have their properties selected using JSONPath. For example, if the JavaScript flow-node emitted an object that was a user as `$.user`, then `$.user.name` would return `undefined`, but `$.user` would correctly return the full object. This happened as a result of a security fix to swap the forked, unmaintained, and vulnerable [@livereach/jsonpath](https://www.npmjs.com/package/@livereach/jsonpath) module with the original [jsonpath](https://www.npmjs.com/package/jsonpath) module.
* #6894: Previously, if {{% variables/apibuilder_prod_name %}} encountered a startup failure, such as attempting to load an invalid flow, then it would fail to shut down database connections and the process would hang. Now, shutdown works as expected.

## Updated modules

* [@axway/amplify-api-builder-cli@1.16.0](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.16.0)
* [@axway/api-builder@4.25.0](https://www.npmjs.com/package/@axway/api-builder/v/4.25.0)
* [@axway/api-builder-admin@1.44.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.44.0)
* [@axway/api-builder-runtime@4.66.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.66.0)
* [@axway/api-builder-project-utils@1.0.3](https://www.npmjs.com/package/@axway/api-builder-project-utils/v/1.0.3)

## Updated plugins

* [@axway/api-builder-plugin-dc-mongo@1.1.15](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mongo/v/1.1.15)
* [@axway/api-builder-plugin-dc-mssql@3.0.1](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/3.0.1)
* [@axway/api-builder-plugin-dc-mysql@2.2.16](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/2.2.16)
* [@axway/api-builder-plugin-dc-oracle@3.0.5](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/3.0.5)
* [@axway/api-builder-plugin-fn-javascript@2.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/2.1.1)
* [@axway/api-builder-plugin-fn-xslt@3.0.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-xslt/v/3.0.1)
* [@axway/api-builder-plugin-ft-timer@1.0.1](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-timer/v/1.0.1)
* [@axway/api-builder-plugin-ft-event@1.0.2](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-event/v/1.0.2)
* [@axway/api-builder-plugin-ft-solace@1.0.1](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-solace/v/1.0.1)
* [@axway/api-builder-plugin-ft-kafka@1.1.2](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka/v/1.1.2)
* [@axway/api-builder-plugin-ft-cron@1.0.1](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-cron/v/1.0.1)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues).

{{% releasenotes/previous %}}
