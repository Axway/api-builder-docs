---
title: Leeds release notes
linkTitle: Leeds
date: 2020-04-10
description: 10 April 2020
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6233: Cannot see Error object messages in Flow engine/editor
* #6249: Support downloading OpenAPI 3 specification via CLI get-catalog

## Fixes

* #6297: Fix the plugin template to bump sdk version to "^0.2.0"
* #6305: Cannot copy parameter info/schema from Flow editor
* #6315: Make the console URL easier to click

## Release notes

* #6233: Previously, `Error` objects output from flow-nodes during flow invocation would appear to be logged as empty "{}" objects at runtime. Now, the full error message is logged and `Error` that were output from flow-nodes can be encoded as JSON.
* #6249: Previously, the Amplify Builder CLI `get-catalog` commands only downloaded OpenAPI 2 specifications from the Amplify Catalog. Now, the CLI will download OpenAPI 2 and OpenAPI 3 specifications.
* #6297: The CLI now generates plugins that depend on api-builder-sdk "^0.2.0".
* #6305: Previously, information from descriptions and schema in the Flow editor and definitions in API Doc and Test could not be copied. Now, they can be selected and copied.
* #6315: Previously, when starting an {{% variables/apibuilder_prod_name %}} service, the console URL was not clickable in some terminals due to the dot at the end of the URL. Now, the dot has been removed making the URL clickable in more terminals which support this functionality.

## Updated modules

* [@axway/amplify-api-builder-cli@1.3.0](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.3.0)
* [@axway/api-builder-runtime@4.27.6](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.27.6)
* [@axway/api-builder-admin@1.16.2](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.16.2)
* [@axway/api-builder@4.16.1](https://www.npmjs.com/package/@axway/api-builder/v/4.16.1)

## Updated plugins

* [@axway/api-builder-plugin-dc-mongo@1.1.13](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mongo/v/1.1.13)
* [@axway/api-builder-plugin-dc-mssql@1.1.4](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/1.1.4)
* [@axway/api-builder-plugin-dc-mysql@2.2.15](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/2.2.15)
* [@axway/api-builder-plugin-dc-oracle@3.0.4](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/3.0.4)
* [@axway/api-builder-plugin-fn-base64@2.1.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/2.1.3)
* [@axway/api-builder-plugin-fn-dot@2.1.2](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/2.1.2)
* [@axway/api-builder-plugin-fn-javascript@1.2.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/1.2.5)
* [@axway/api-builder-plugin-fn-json@2.0.15](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/2.0.15)
* [@axway/api-builder-plugin-fn-restclient@2.0.21](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.21)
* [@axway/api-builder-plugin-fn-swagger@2.7.2](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.7.2)
* [@axway/api-builder-plugin-fn-mustache@1.0.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache/v/1.0.5)
* [axway-flow-sdk@3.4.3](https://www.npmjs.com/package/axway-flow-sdk/v/3.4.3)

{{% releasenotes/previous %}}
