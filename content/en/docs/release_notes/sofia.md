---
title: Sofia release notes
linkTitle: Sofia
date: 2019-04-26
description: 26 April 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}
## Fixes

* #5650: @axway/amplify-api-builder-cli readme mentions wrong package
* #5662: Fix issue corrupting files and stacking reloads on concurrent calls to Admin APIs

## Release notes

* #5650: Previously, the readme for @axway/amplify-api-builder-cli incorrectly referenced itself as @axway/amplify-builder-cli. Now, this is corrected.
* #5662: Previously, {{% variables/apibuilder_prod_name %}} was not able to handle concurrent calls to admin APIs which modified the service, for example, edit model, and could corrupt the file being written. Multiple reloads could also happen subsequently. Now, admin APIs which modify the server cannot be called concurrently.
* #5662: Previously, {{% variables/apibuilder_prod_name %}} would allow API calls while the server was reloading and in an unstable state. Now, during reload requests will respond with 503.

## Updated modules

* [@axway/api-builder-runtime@4.11.18](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.11.18)
* [@axway/api-builder-admin@1.10.10](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.10.10)
* [@axway/api-builder@4.5.18](https://www.npmjs.com/package/@axway/api-builder/v/4.5.18)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@2.6.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.6.1)

{{% releasenotes/previous %}}
