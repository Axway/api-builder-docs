---
title: Wicklow release notes
linkTitle: Wicklow
description: 07 October 2022
date: 2022-10-07
Hide_readingtime: true
---
## Summary
Fixed a bug calculating the accurate `Content-Length` of the request `body` that impacted a number of modules, including `@axway/api-builder-plugin-fn-restclient`, `@axway/api-builder-plugin-fn-swagger`, and `@axway/api-builder-oas-flow-node`.

{{% releasenotes/update %}}

<!-- ## Breaking changes -->

<!-- ## Features -->

## Fixes
* #7538: Fixed a bug calculating the accurate `Content-Length` of the request `body` that impacted a number of modules, including `@axway/api-builder-plugin-fn-restclient`, `@axway/api-builder-plugin-fn-swagger`, and `@axway/api-builder-oas-flow-node`.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes sc
ript -->
## Updated modules
* [@axway/amplify-api-builder-cli@6.4.1](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/6.4.1)
* [@axway/api-builder@6.4.1](https://www.npmjs.com/package/@axway/api-builder/v/6.4.1)
* [@axway/api-builder-admin@1.69.1](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.69.1)
* [@axway/api-builder-oas-flow-node@2.6.8](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/2.6.8)
* [@axway/api-builder-project-utils@2.0.1](https://www.npmjs.com/package/@axway/api-builder-project-utils/v/2.0.1)
* [@axway/api-builder-runtime@4.94.1](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.94.1)
* [@axway/api-builder-sdk@1.2.6](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.2.6)
* [@axway/api-builder-test-utils@1.6.1](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.6.1)
* [@axway/api-builder-openapi-upgrade@1.0.12](https://www.npmjs.com/package/@axway/api-builder-openapi-upgrade/v/1.0.12)

## Updated plugins
* [@axway/api-builder-plugin-dc-mongo@1.2.2](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mongo/v/1.2.2)
* [@axway/api-builder-plugin-dc-mssql@3.3.2](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/3.3.2)
* [@axway/api-builder-plugin-dc-mysql@2.3.1](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/2.3.1)
* [@axway/api-builder-plugin-dc-oracle@3.3.2](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/3.3.2)
* [@axway/api-builder-plugin-fn-base64@4.1.6](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/4.1.6)
* [@axway/api-builder-plugin-fn-javascript@3.1.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/3.1.5)
* [@axway/api-builder-plugin-fn-json@4.1.6](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/4.1.6)
* [@axway/api-builder-plugin-fn-logger@1.1.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-logger/v/1.1.5)
* [@axway/api-builder-plugin-fn-mustache@1.1.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache/v/1.1.5)
* [@axway/api-builder-plugin-fn-restclient@2.2.8](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.2.8)
* [@axway/api-builder-plugin-fn-swagger@3.2.9](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/3.2.9)
* [@axway/api-builder-plugin-fn-xslt@3.3.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-xslt/v/3.3.5)
* [@axway/api-builder-plugin-ft-cron@1.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-cron/v/1.1.1)
* [@axway/api-builder-plugin-ft-event@1.2.4](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-event/v/1.2.4)
* [@axway/api-builder-plugin-ft-kafka@1.2.4](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka/v/1.2.4)
* [@axway/api-builder-plugin-ft-oas@1.6.7](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas/v/1.6.7)
* [@axway/api-builder-plugin-ft-solace@1.1.4](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-solace/v/1.1.4)
* [@axway/api-builder-plugin-ft-timer@1.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-timer/v/1.1.1)
* [@axway/api-builder-plugin-invoke-flow@1.2.4](https://www.npmjs.com/package/@axway/api-builder-plugin-invoke-flow/v/1.2.4)
* [@axway/api-builder-plugin-prometheus@1.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus/v/1.2.0)

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
