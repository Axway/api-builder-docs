---
title: Eden release notes
linkTitle: Eden
date: 2018-09-14
description: 14 September 2018
Hide_readingtime: true
---
## Features

* 4467: Support queries on Memory models using $like comparison operator
* 4758: Support comparison operators on aliased fields in Composite models

## Fixes

* 4870: Fix issue with duplicate path detection when paths differ by parameter name/case
* 5028: Ensure that validation errors are cleared after saving changes in the flow editor

## Release notes

* #4467: Previously, the Memory connector did not support the `$like` comparison operator and would return an empty result set. Now, the Memory connector will support the correct `$like` behavior. **This is enabled with a feature flag.** See deprecation {{% deprecation/link D008 %}}.
* #4758: Previously, queries on Composite models that have aliased fields only had support for the `$like` comparison operator. Now, Composite models support queries on aliased fields with the `$like`, `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, and `$nin` comparison operators. **This is enabled with a feature flag.** See deprecation {{% deprecation/link D007 %}}.
* #4870: Previously, {{% variables/apibuilder_prod_name %}} would not correctly detect duplicate paths in endpoints if they differed by the case of the path parameters. Now, these duplicate paths are detected and reported on startup.
* #5028: Previously, fixing and saving an invalid flow would erroneously mark the fixed node as still invalid. Now, fixing a flow will be rendered correctly.

{{% releasenotes/deprecations %}}

## Updated plugins

* [@axway/api-builder-plugin-dc-mongo@1.1.2](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mongo/v/1.1.2)
* [@axway/api-builder-plugin-dc-mysql@2.2.1](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/2.2.1)
* [@axway/api-builder-plugin-dc-oracle@2.2.1](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/2.2.1)
* [@axway/api-builder-plugin-fn-base64@1.0.14](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/1.0.14)
* [@axway/api-builder-plugin-fn-dot@1.0.14](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/1.0.14)
* [@axway/api-builder-plugin-fn-json@1.0.14](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/1.0.14)
* [@axway/api-builder-plugin-fn-restclient@1.0.14](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/1.0.14)
* [@axway/api-builder-plugin-fn-swagger@1.0.15](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/1.0.15)
* [axway-flow-sdk@2.0.14](https://www.npmjs.com/package/axway-flow-sdk/v/2.0.14)


{{% releasenotes/previous %}}
