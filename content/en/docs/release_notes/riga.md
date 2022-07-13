---
title: Riga release notes
linkTitle: Riga
description: 15 July 2022
date: 2022-07-15
Hide_readingtime: true
---
## Summary

In this release, we added a warning when using the end of life Node.js 17, and updated our CLIs to share the same version number.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

<!-- ## Features -->

## Fixes
* #7469: Added a warning when using Node.js 17 (EoL since June 2022) as per our [Node.js support policy](/docs/nodejs_support_policy/).
* #7428: The {{% variables/platform_prod_name %}} {{% variables/apibuilder_prod_name %}} CLI version has been changed from 3.x to 6.x so that it shares the same version with our equivalent {{% variables/apibuilder_prod_name %}} CLI. No breaking changes were introduced.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
## Updated modules
* [@axway/amplify-api-builder-cli@6.3.7](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/6.3.7)
* [@axway/api-builder@6.3.7](https://www.npmjs.com/package/@axway/api-builder/v/6.3.7)
* [@axway/api-builder-admin@1.66.2](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.66.2)
* [@axway/api-builder-oas-flow-node@2.6.5](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/2.6.5)
* [@axway/api-builder-runtime@4.92.4](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.92.4)
* [@axway/api-builder-sdk@1.2.4](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.2.4)
* [@axway/api-builder-test-utils@1.5.10](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.5.10)
* [@axway/api-builder-openapi-upgrade@1.0.9](https://www.npmjs.com/package/@axway/api-builder-openapi-upgrade/v/1.0.9)

## Updated plugins
* [@axway/api-builder-plugin-fn-base64@4.1.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/4.1.3)
* [@axway/api-builder-plugin-fn-javascript@3.1.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/3.1.3)
* [@axway/api-builder-plugin-fn-json@4.1.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/4.1.3)
* [@axway/api-builder-plugin-fn-restclient@2.2.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.2.5)
* [@axway/api-builder-plugin-fn-swagger@3.2.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/3.2.5)
* [@axway/api-builder-plugin-fn-mustache@1.1.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache/v/1.1.3)
* [@axway/api-builder-plugin-fn-xslt@3.3.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-xslt/v/3.3.3)
* [@axway/api-builder-plugin-fn-logger@1.1.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-logger/v/1.1.3)
* [@axway/api-builder-plugin-ft-event@1.2.2](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-event/v/1.2.2)
* [@axway/api-builder-plugin-ft-solace@1.1.2](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-solace/v/1.1.2)
* [@axway/api-builder-plugin-ft-kafka@1.2.2](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka/v/1.2.2)
* [@axway/api-builder-plugin-ft-oas@1.6.4](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas/v/1.6.4)
* [@axway/api-builder-plugin-invoke-flow@1.2.2](https://www.npmjs.com/package/@axway/api-builder-plugin-invoke-flow/v/1.2.2)

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
