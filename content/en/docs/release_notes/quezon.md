---
title: Quezon release notes
linkTitle: Quezon
date: 2021-07-02
description: 2 July 2021
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Breaking changes

* #6814: Previously, @axway/api-builder-plugin-fn-javascript had an "Unsafe Mode" parameter, which when enabled, allows all Node.js globals to be available for use in the flow-node. Now, the "Unsafe Mode" parameter is removed and all Node.js globals are available by default and code will be executed in the same context as the rest of the {{% variables/apibuilder_prod_name %}} service.
## Features

* #6786: Added missing mock for `getScoped` to `MockLogger` in `@axway/api-builder-test-utils`. Additionally, all `MockLogger` methods are now stubbed and can have function calls asserted by default.

## Fixes

* #6763: Previously, some API examples in API Doc & Test would not be generated to represent the current authentication strategy. Now, apikey, basic, and none will generate examples using those strategies.
* #6935: Previously, users in the EU region that used the {{% variables/apibuilder_prod_name %}} CLI command "get-catalog" would receive an error "The user has not authenticated successfully." when attempting to fetch the API Catalog from Amplify Central. This was because the CLI did not take into consideration the user's organization's region when fetching the API Catalog. Now, get-catalog uses the correct region when fetching the API Catalog.

## Updated modules

* [@axway/amplify-api-builder-cli@1.17.4](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.17.4)
* [@axway/api-builder@4.26.4](https://www.npmjs.com/package/@axway/api-builder/v/4.26.4)
* [@axway/api-builder-admin@1.44.7](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.44.7)
* [@axway/api-builder-runtime@4.66.15](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.66.15)
* [@axway/api-builder-sdk@1.1.10](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.1.10)
* [@axway/api-builder-test-utils@1.2.0](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.2.0)

## Updated plugins

* [@axway/api-builder-plugin-dc-mssql@3.0.3](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/3.0.3)
* [@axway/api-builder-plugin-dc-mysql@2.2.18](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/2.2.18)
* [@axway/api-builder-plugin-dc-oracle@3.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/3.1.1)
* [@axway/api-builder-plugin-fn-dot@2.1.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/2.1.3)
* [@axway/api-builder-plugin-fn-javascript@3.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/3.0.0)
* [@axway/api-builder-plugin-fn-restclient@2.0.23](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.23)
* [@axway/api-builder-plugin-fn-swagger@2.9.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.9.5)
* [@axway/api-builder-plugin-fn-mustache@1.0.8](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache/v/1.0.8)
* [@axway/api-builder-plugin-ft-timer@1.0.2](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-timer/v/1.0.2)
* [@axway/api-builder-plugin-ft-solace@1.0.2](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-solace/v/1.0.2)
* [@axway/api-builder-plugin-ft-kafka@1.1.3](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka/v/1.1.3)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues).

{{% releasenotes/previous %}}
