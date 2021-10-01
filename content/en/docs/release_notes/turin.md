---
title: Turin release notes
linkTitle: Turin
date: 2019-05-24
description: 24 May 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}
## Fixes

* 5742: Replace doT where possible in api-builder-plugins to reduce vulnerability warnings
* 5775: Fix Swagger generation for services with models containing slashes
* 5795: Count on a composite model having a 'where' condition is ignored

## Release notes

* #5742: Updated the versions of base64, dot, and json plugins which are included with new {{% variables/apibuilder_prod_name %}} projects.
* #5775: Previously, models containing slashes were rendered in to the {{% variables/apibuilder_prod_name %}} application's Swagger document's definitions as URI encoded slash, e.g. "model%2Ffoo". This was incorrect, and while most model names would validate as Swagger, model names that contained a slash would fail validation. Now, model Swagger definitions are no longer URI encoded.
* #5795: Previously, attempting to `count` records on a composite model with a `where` clause would return a count for all records (unfiltered). Now, `count` will filter and count records using the `where` clause.

## Updated modules

* [@axway/api-builder-runtime@4.11.30](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.11.30)
* [@axway/api-builder-admin@1.10.13](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.10.13)
* [@axway/api-builder@4.5.22](https://www.npmjs.com/package/@axway/api-builder/v/4.5.22)

## Updated plugins

* [@axway/api-builder-plugin-dc-mongo@1.1.9](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mongo/v/1.1.9)
* [@axway/api-builder-plugin-dc-mssql@1.0.11](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/1.0.11)
* [@axway/api-builder-plugin-dc-mysql@2.2.8](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/2.2.8)
* [@axway/api-builder-plugin-dc-oracle@2.3.8](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/2.3.8)
* [@axway/api-builder-plugin-fn-base64@2.0.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/2.0.5)
* [@axway/api-builder-plugin-fn-dot@2.0.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/2.0.5)
* [@axway/api-builder-plugin-fn-json@2.0.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/2.0.5)
* [@axway/api-builder-plugin-fn-restclient@2.0.8](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.8)
* [@axway/api-builder-plugin-fn-swagger@2.6.7](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.6.7)
* [axway-flow-sdk@3.1.7](https://www.npmjs.com/package/axway-flow-sdk/v/3.1.7)


{{% releasenotes/previous %}}
