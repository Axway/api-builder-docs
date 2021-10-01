---
title: Darwin release notes
linkTitle: Darwin
date: 2019-11-08
description: 8 November 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}
## Fixes

* 6105: Fix generation of Models from schemas with a field called 'id' that is not a PK
* 6106: Update amplify-api-builder-cli to remove mbs

## Release notes

* #6105: Previously, Model fields named 'id' were reserved for Primary Keys only, and any field using this name would cause an error to be thrown. Now, Models can have non-PK fields named 'id'.

## Updated modules

* [@axway/amplify-api-builder-cli@1.1.6](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.1.6)
* [@axway/api-builder-runtime@4.17.5](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.17.5)

## Updated plugins

* [@axway/api-builder-plugin-dc-mssql@1.0.13](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/1.0.13)
* [@axway/api-builder-plugin-dc-mysql@2.2.11](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/2.2.11)
* [@axway/api-builder-plugin-dc-oracle@2.3.12](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/2.3.12)
* [@axway/api-builder-plugin-fn-base64@2.0.14](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/2.0.14)
* [@axway/api-builder-plugin-fn-dot@2.0.15](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/2.0.15)
* [@axway/api-builder-plugin-fn-javascript@1.1.4](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/1.1.4)


{{% releasenotes/previous %}}
