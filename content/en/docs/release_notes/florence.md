---
title: Florence release notes
linkTitle: Florence
date: 2019-12-06
description: 6 December 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* 6099: Support option to disable all HTTP traffic when HTTPS is enabled

## Fixes

* 5210: Modernise api-builder runtime tests: models_test.js
* 6135: Server fails to start without @axway/api-builder-admin on Node.js 12 or 13

## Release notes

* #6099: Previously, when https traffic is enabled there was no way to disable http traffic. Now, new configuration option - http.disabled - can be used to disable http traffic. See deprecation {{% deprecation/link D038 %}}.
* #6135: Previously, {{% variables/apibuilder_prod_name %}} would crash on startup when running a production install without @axway/api-builder-admin on Node.js 12 or 13. Now, the service starts as expected.

{{% releasenotes/deprecations %}}

## Updated modules

* [@axway/amplify-api-builder-cli@1.2.3](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.2.3)
* [@axway/api-builder-runtime@4.18.4](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.18.4)
* [@axway/api-builder-admin@1.11.2](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.11.2)
* [@axway/api-builder@4.12.1](https://www.npmjs.com/package/@axway/api-builder/v/4.12.1)

## Updated plugins

* [@axway/api-builder-plugin-dc-mongo@1.1.12](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mongo/v/1.1.12)
* [@axway/api-builder-plugin-dc-mssql@1.1.3](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/1.1.3)
* [@axway/api-builder-plugin-dc-mysql@2.2.14](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/2.2.14)
* [@axway/api-builder-plugin-dc-oracle@3.0.3](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/3.0.3)
* [@axway/api-builder-plugin-fn-base64@2.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/2.1.1)
* [@axway/api-builder-plugin-fn-dot@2.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/2.1.1)
* [@axway/api-builder-plugin-fn-javascript@1.2.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/1.2.1)
* [@axway/api-builder-plugin-fn-json@2.0.14](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/2.0.14)
* [@axway/api-builder-plugin-fn-restclient@2.0.17](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.17)
* [@axway/api-builder-plugin-fn-swagger@2.6.12](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.6.12)
* [@axway/api-builder-plugin-fn-mustache@1.0.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache/v/1.0.3)
* [axway-flow-sdk@3.4.2](https://www.npmjs.com/package/axway-flow-sdk/v/3.4.2)


{{% releasenotes/previous %}}
