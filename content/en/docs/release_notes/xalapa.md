---
title: Xalapa release notes
linkTitle: Xalapa
description: 8 October 2021
date: 2021-10-08
Hide_readingtime: true
---
## Summary
In this release, performance has been improved for new projects and dependencies have been updated. Our documentation is now [open source](https://github.com/Axway/api-builder-docs).

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features
* #7049: The {{% variables/apibuilder_prod_name %}} documentation is now [open source](https://github.com/Axway/api-builder-docs) and is now accessible from https://docs.axway.com/bundle/api-builder.
* #7071: New {{% variables/apibuilder_prod_name %}} projects will now depend on `mocha@^9.1.2`.
* #7072: Previously, new {{% variables/apibuilder_prod_name %}} projects were created with a "web" folder to serve static resources alongside APIs. Now, new projects will no longer have the "web" folder for performance reasons. To serve static files, the user must opt-in by creating the folder manually. If your service is not serving static files or using {{% variables/apibuilder_prod_name %}} Web, you can safely delete the "web" folder to improve performance.

<!-- ## Fixes -->

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
## Updated modules
* [@axway/amplify-api-builder-cli@1.20.0](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.20.0)
* [@axway/api-builder@4.27.2](https://www.npmjs.com/package/@axway/api-builder/v/4.27.2)
* [@axway/api-builder-admin@1.45.3](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.45.3)
* [@axway/api-builder-oas-flow-node@2.0.2](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/2.0.2)
* [@axway/api-builder-project-utils@2.0.1](https://www.npmjs.com/package/@axway/api-builder-project-utils/v/2.0.1)
* [@axway/api-builder-runtime@4.70.6](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.70.6)
* [@axway/api-builder-sdk@1.1.15](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.1.15)
* [@axway/api-builder-test-utils@1.5.1](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.5.1)

## Updated plugins
* [@axway/api-builder-plugin-dc-mbs@1.0.8](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mbs/v/1.0.8)
* [@axway/api-builder-plugin-dc-mysql@2.2.20](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/2.2.20)
* [@axway/api-builder-plugin-dc-oracle@3.2.2](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/3.2.2)
* [@axway/api-builder-plugin-fn-base64@4.0.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/4.0.3)
* [@axway/api-builder-plugin-fn-dot@2.1.4](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/2.1.4)
* [@axway/api-builder-plugin-fn-javascript@3.0.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/3.0.3)
* [@axway/api-builder-plugin-fn-json@4.0.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/4.0.3)
* [@axway/api-builder-plugin-fn-restclient@2.0.26](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.26)
* [@axway/api-builder-plugin-fn-swagger@3.0.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/3.0.3)
* [@axway/api-builder-plugin-fn-mustache@1.0.11](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache/v/1.0.11)
* [@axway/api-builder-plugin-fn-xslt@3.1.2](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-xslt/v/3.1.2)
* [@axway/api-builder-plugin-fn-logger@1.0.2](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-logger/v/1.0.2)
* [@axway/api-builder-plugin-ft-timer@1.0.3](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-timer/v/1.0.3)
* [@axway/api-builder-plugin-ft-event@1.1.2](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-event/v/1.1.2)
* [@axway/api-builder-plugin-ft-solace@1.0.4](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-solace/v/1.0.4)
* [@axway/api-builder-plugin-ft-kafka@1.1.5](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka/v/1.1.5)
* [@axway/api-builder-plugin-ft-cron@1.0.2](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-cron/v/1.0.2)
* [@axway/api-builder-plugin-invoke-flow@1.1.2](https://www.npmjs.com/package/@axway/api-builder-plugin-invoke-flow/v/1.1.2)

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues).

{{% releasenotes/previous %}}
