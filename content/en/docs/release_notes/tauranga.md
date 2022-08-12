---
title: Tauranga release notes
linkTitle: Tauranga
description: 12 August 2022
date: 2022-08-12
Hide_readingtime: true
---
## Summary

In this release, we continued our effort on providing the necessary information to users to keep their applications up to date. With this release, when {{% variables/apibuilder_prod_name %}} checks for updates, it will respect npm configuration for `ca`, `cafile`, and `strict-ssl`.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Fixes

* #7490: Checking for updates, it now respects existing  npm configuration for `ca`, `cafile`, and `strict-ssl`.

{{% releasenotes/deprecations %}}

## Updated modules
* [@axway/api-builder-admin@1.66.3](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.66.3)
* [@axway/api-builder-runtime@4.92.5](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.92.5)
* [@axway/api-builder-oas-flow-node@2.6.6](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/2.6.6)
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
