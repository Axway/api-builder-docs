---
title: Austen release notes
linkTitle: Austen
description: 9 September 2022
date: 2022-09-09
Hide_readingtime: true
---
## Summary

{{% variables/apibuilder_prod_name %}} v5 is released. Projects created on v4 are compatible with v5, but require installing upgrades for components (see [Upgrades](/docs/developer_guide/console#updates-tab)).

{{% releasenotes/update %}}

## Breaking changes

* #6089: All {{% variables/apibuilder_prod_name %}} components now require a minimum of Node.js version 16.x.
* #7425: {{% variables/apibuilder_prod_name %}} will now fail to start with mismatching versions of @axway/api-builder-admin and @axway/api-builder-runtime (the same version of each should be installed).
* #7479: [`config.admin.updatesEnabled`](/docs/developer_guide/project/configuration/project_configuration/#admin) is now enabled by default in unit tests, and should be explicitly disabled for unit tests (similar to [`bindProcessHandlers`](/docs/developer_guide/project/configuration/project_configuration#bindprocesshandlers)). Unit tests should be updated to use the [`@axway/api-builder-test-utils`](https://www.npmjs.com/package/@axway/api-builder-test-utils), which disables `updatesEnabled` and `bindProcessHandlers` by default. If your project unit tests still directly set `bindProcessHandlers`, then you should follow [this guide](/docs/updates/project_updates/2022_09_09_update_unit_tests_with_test_utils) to upgrade them.

<!-- ## Features -->

<!-- ## Fixes -->

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
## Updated modules
* [@axway/amplify-api-builder-cli@7.0.0](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/7.0.0)
* [@axway/api-builder@7.0.0](https://www.npmjs.com/package/@axway/api-builder/v/7.0.0)
* [@axway/api-builder-admin@5.0.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/5.0.0)
* [@axway/api-builder-oas-flow-node@3.0.0](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/3.0.0)
* [@axway/api-builder-project-utils@3.0.0](https://www.npmjs.com/package/@axway/api-builder-project-utils/v/3.0.0)
* [@axway/api-builder-runtime@5.0.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/5.0.0)
* [@axway/api-builder-sdk@2.0.0](https://www.npmjs.com/package/@axway/api-builder-sdk/v/2.0.0)
* [@axway/api-builder-test-utils@2.0.0](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/2.0.0)
* [@axway/api-builder-openapi-upgrade@2.0.0](https://www.npmjs.com/package/@axway/api-builder-openapi-upgrade/v/2.0.0)

## Updated plugins
* [@axway/api-builder-plugin-dc-mongo@2.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mongo/v/2.0.0)
* [@axway/api-builder-plugin-dc-mssql@4.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/4.0.0)
* [@axway/api-builder-plugin-dc-mysql@3.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/3.0.0)
* [@axway/api-builder-plugin-dc-oracle@4.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/4.0.0)
* [@axway/api-builder-plugin-fn-base64@5.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/5.0.0)
* [@axway/api-builder-plugin-fn-javascript@4.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/4.0.0)
* [@axway/api-builder-plugin-fn-json@5.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/5.0.0)
* [@axway/api-builder-plugin-fn-logger@2.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-logger/v/2.0.0)
* [@axway/api-builder-plugin-fn-mustache@2.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache/v/2.0.0)
* [@axway/api-builder-plugin-fn-restclient@3.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/3.0.0)
* [@axway/api-builder-plugin-fn-swagger@4.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/4.0.0)
* [@axway/api-builder-plugin-fn-xslt@4.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-xslt/v/4.0.0)
* [@axway/api-builder-plugin-ft-cron@2.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-cron/v/2.0.0)
* [@axway/api-builder-plugin-ft-event@2.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-event/v/2.0.0)
* [@axway/api-builder-plugin-ft-kafka@2.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka/v/2.0.0)
* [@axway/api-builder-plugin-ft-oas@2.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas/v/2.0.0)
* [@axway/api-builder-plugin-ft-solace@2.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-solace/v/2.0.0)
* [@axway/api-builder-plugin-ft-timer@2.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-timer/v/2.0.0)
* [@axway/api-builder-plugin-invoke-flow@2.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-invoke-flow/v/2.0.0)
* [@axway/api-builder-plugin-prometheus@2.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus/v/2.0.0)

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
