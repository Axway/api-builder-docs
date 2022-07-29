---
title: Sunnyvale release notes
linkTitle: Sunnyvale
description: 29 July 2022
date: 2022-07-29
Hide_readingtime: true
---
## Summary

In this release we added a system of badge notifications for the UI. Notifications include the number of credentials that require attention, and also the number of updates that are available to the {{% variables/apibuilder_prod_name %}} Core and plugin components.

{{% releasenotes/upgrade %}}

## Features

* #7463: Added notification system to dynamically send status badges to the UI to inform the user that there are credentials or updates available.

## Fixes

* #7466: Fixed an issue in [@axway/api-builder-runtime](https://www.npmjs.com/package/@axway/api-builder-runtime) credential manager that ignored credential failure when the credential was previously deleted.
* #7466: Fixed an issue in [@axway/api-builder-runtime](https://www.npmjs.com/package/@axway/api-builder-runtime) credential manager that failed to mark credentials in an error state when refresh fails.
* #7466: Fixed an issue in [@axway/api-builder-runtime](https://www.npmjs.com/package/@axway/api-builder-runtime) credential manager that failed to mark expired credentials in a warning state when they cannot be automatically refreshed.
* #7466: Fixed an issue in [arrow-admin-api](https://www.npmjs.com/package/arrow-admin-api) where the service failed to start on versions of Node.js < 12.9.0.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
## Updated modules
* [@axway/api-builder-admin@1.66.3](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.66.3)
* [@axway/api-builder-oas-flow-node@2.6.6](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/2.6.6)
* [@axway/api-builder-runtime@4.92.5](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.92.5)
* [@axway/api-builder-sdk@1.2.5](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.2.5)
* [@axway/api-builder-test-utils@1.5.11](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.5.11)

## Updated plugins
* [@axway/api-builder-plugin-fn-base64@4.1.4](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/4.1.4)
* [@axway/api-builder-plugin-fn-javascript@3.1.4](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/3.1.4)
* [@axway/api-builder-plugin-fn-json@4.1.4](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/4.1.4)
* [@axway/api-builder-plugin-fn-restclient@2.2.6](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.2.6)
* [@axway/api-builder-plugin-fn-swagger@3.2.6](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/3.2.6)
* [@axway/api-builder-plugin-fn-mustache@1.1.4](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache/v/1.1.4)
* [@axway/api-builder-plugin-fn-xslt@3.3.4](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-xslt/v/3.3.4)
* [@axway/api-builder-plugin-fn-logger@1.1.4](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-logger/v/1.1.4)
* [@axway/api-builder-plugin-ft-event@1.2.3](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-event/v/1.2.3)
* [@axway/api-builder-plugin-ft-solace@1.1.3](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-solace/v/1.1.3)
* [@axway/api-builder-plugin-ft-kafka@1.2.3](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka/v/1.2.3)
* [@axway/api-builder-plugin-ft-oas@1.6.5](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas/v/1.6.5)
* [@axway/api-builder-plugin-invoke-flow@1.2.3](https://www.npmjs.com/package/@axway/api-builder-plugin-invoke-flow/v/1.2.3)

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
