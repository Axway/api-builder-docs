---
title: Huxley release notes
linkTitle: Huxley
description: 1 November 2023
date: 2023-11-01
Hide_readingtime: true
---
## Summary

In this release, we fixed a regression introduced in the Glaspell release that misconfigured requests when they were routed through a proxy.

{{% releasenotes/update %}}

## Fixes

* #7599: Fixed an issue with the proxy configuration which caused requests to not be correctly routed through the proxy causing request failures.

{{% releasenotes/deprecations %}}

## Updated modules
* [@axway/amplify-api-builder-cli@7.2.0](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/7.2.0)
* [@axway/api-builder@7.2.0](https://www.npmjs.com/package/@axway/api-builder/v/7.2.0)
* [@axway/api-builder-admin@5.3.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/5.3.0)
* [@axway/api-builder-oas-flow-node@3.2.0](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/3.2.0)
* [@axway/api-builder-runtime@5.3.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/5.3.0)
* [@axway/api-builder-test-utils@2.2.0](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/2.2.0)
* [@axway/api-builder-openapi-upgrade@2.2.0](https://www.npmjs.com/package/@axway/api-builder-openapi-upgrade/v/2.2.0)

## Updated plugins
* [@axway/api-builder-plugin-fn-restclient@3.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/3.2.0)
* [@axway/api-builder-plugin-fn-swagger@4.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/4.2.0)
* [@axway/api-builder-plugin-ft-oas@2.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas/v/2.2.0)

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
