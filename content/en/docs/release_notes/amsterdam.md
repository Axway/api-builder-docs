---
title: Amsterdam release notes
linkTitle: Amsterdam
description: 19 November 2021
date: 2021-11-19
Hide_readingtime: true
---
## Summary
Added features to [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) to support [OpenAPI parameter style](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#styleValues), CORS, and OpenAPI 2.x.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features
* #7132: Added support for [OpenAPI parameter style](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#styleValues) decoding to [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas).
* #7131: Added support for CORS to [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas).
* #7128: Added support for OpenAPI 2.x to [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas).

## Fixes
* #7077: Fixed an issue in models that when a composite model had a [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) field that was aliased (i.e. renamed), the model could not be used to create records, resulting in an error `"required field value missing"`. Now, records are created without error.
* #7084: Fixed an issue in [@axway/api-builder-plugin-dc-mssql](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql) that prevented queries from working as expected with falsy values from queries (e.g. `{ "value": 0 }`), and also where values were expected to be equal to `null` or not equal to `null`.
* #7084: Fixed an npm-audit 1002401 issue in [@axway/api-builder-plugin-dc-mssql](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql) that was using an old version of [tedious](https://www.npmjs.com/package/tedious). Updated to use the latest version.
* #7152: Fixed an issue with the `Upsert` method in the model flow-node where the `Insert` output would be triggered if the record was actually updated. Now, the `Update` output is triggered instead.
* #7120: Fixed issue [CVE-2021-3765](https://nvd.nist.gov/vuln/detail/CVE-2021-3765) with a dependency module [swagger-parser](https://www.npmjs.com/package/swagger-parser) that was using an old version of [validator](https://www.npmjs.com/package/validator) that was vulnerable. Updated to use [@apidevtools/swagger-parser](https://www.npmjs.com/package/@apidevtools/swagger-parser).

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
## Updated modules
* [@axway/api-builder-admin@1.48.1](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.48.1)
* [@axway/api-builder-oas-flow-node@2.1.0](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/2.1.0)
* [@axway/api-builder-runtime@4.74.1](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.74.1)

## Updated plugins
* [@axway/api-builder-plugin-dc-mssql@3.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/3.1.0)
* [@axway/api-builder-plugin-fn-swagger@3.0.6](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/3.0.6)

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
