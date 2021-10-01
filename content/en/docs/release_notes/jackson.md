---
title: Jackson release notes
linkTitle: Jackson
date: 2020-02-28
description: 28 February 2020
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6215: Support async/promise action functions in flow-nodes
* #6220: Update image for bundled Dockerfile
* 6225:

## Fixes

* #6186: Reduce log level of admin api calls to trace
* #6238: Plugin SDK deletes falsy \`description\` field for flow-node methods but it is required

## Release notes

* #6186: Previously, request and response logs for {{% variables/apibuilder_prod_name %}} admin were logged at info level and would pollute the console making API and Endpoint logs difficult to debug during development. Now, they are logged at trace level.
* #6186: The logRequest and logResponse functions of the scoped {{% variables/apibuilder_prod_name %}} logger have been deprecated. See deprecation {{% deprecation/link D041 %}}.
* #6215: Previously, the flow engine only supported standard functions as actions. Now, async functions are also supported.
* #6220: Updated the Dockerfile in newly created projects to use the latest Node.js 12 LTS image instead of Node.js 8, which is out of support.
* #6225: Using {{% variables/apibuilder_prod_name %}} with Node.js v8, v9 and v11 have been deprecated due to security concerns and because it is no longer maintained. Compatibility with Node.js v8.9.0+ will be maintained in all {{% variables/apibuilder_prod_name %}} v4 releases. Going forward, {{% variables/apibuilder_prod_name %}} will no longer support or recommend any future Node.js version which is no longer maintained. See deprecation {{% deprecation/link D039 %}}.
* #6225: Using {{% variables/apibuilder_prod_name %}} with Node.js v10 has been deprecated. See deprecation {{% deprecation/link D040 %}}.
* #6238: Previously, with [@axway/api-builder-sdk](https://www.npmjs.com/package/@axway/api-builder-sdk), it was possible to create flow-nodes that would fail to validate if a method was created with an empty or undefined `description`. Now, method `description` will be set to empty string instead.

{{% releasenotes/deprecations %}}

## Updated modules

* [@axway/amplify-api-builder-cli@1.2.7](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.2.7)
* [@axway/api-builder-sdk@0.2.0](https://www.npmjs.com/package/@axway/api-builder-sdk/v/0.2.0)
* [@axway/api-builder-runtime@4.25.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.25.0)
* [@axway/api-builder-admin@1.15.2](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.15.2)
* [@axway/api-builder@4.16.0](https://www.npmjs.com/package/@axway/api-builder/v/4.16.0)

## Updated plugins

* [@axway/api-builder-plugin-fn-javascript@1.2.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/1.2.3)


{{% releasenotes/previous %}}
