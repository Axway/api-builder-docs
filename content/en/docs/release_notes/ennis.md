---
title: Ennis release notes
linkTitle: Ennis
date: 2019-11-22
description: 22 November 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #5643: Filter get-catalog results to only Unified Catalog entries
* #6092: Fix sorting algorithm for bound paths

## Fixes

* #6121: API Key should be logged at debug, not info
* #6126: Builder CLI - Filter catalog items by swagger v2 type

## Release notes

* #5643: The amplify builder CLI now supports filtering when downloading the API Catalog.
* #6092: Previously, APIs would be sorted and bound in an inconsistent order based on the load order and `sort` property, Node.js version, and other factors. Now, APIs will be always bound in a consistent order. Removed the explicit maximum supported Node.js version limitation. See deprecation {{% deprecation/link D037 %}}.
* #6121: Previously, on server startup the application's API Key was logged at the 'info' log level. Now, the API Key is logged at the 'debug' log level.
* #6126: Previously, Amplify Builder CLI fetched from the API Catalog all the available catalog items. Now, the CLI fetches only the items with API type.

{{% releasenotes/deprecations %}}

## Updated modules

* [@axway/amplify-api-builder-cli@1.2.1](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.2.1)
* [@axway/api-builder-runtime@4.17.11](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.17.11)

## Updated plugins

* [@axway/api-builder-plugin-dc-mssql@1.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/1.1.0)
* [@axway/api-builder-plugin-dc-oracle@3.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/3.0.0)
* [@axway/api-builder-plugin-fn-base64@2.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/2.1.0)
* [@axway/api-builder-plugin-fn-dot@2.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/2.1.0)
* [@axway/api-builder-plugin-fn-javascript@1.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/1.2.0)


{{% releasenotes/previous %}}
