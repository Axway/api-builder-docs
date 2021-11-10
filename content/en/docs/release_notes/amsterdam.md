---
title: Amsterdam release notes
linkTitle: Amsterdam
description: 19 November 2021
date: 2021-11-19
Hide_readingtime: true
---
## Summary
Brief summary of the notable release contents.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features
* #7132: Added support for [OAS parameter style](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#styleValues) decoding to [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas).

## Fixes
* #7077: Fixed an issue in models that when a composite model had a [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) field that was aliased (i.e. renamed), the model could not be used to create records, resulting in an error `"required field value missing"`. Now, records are created without error.
* #7084: Fixed an issue in [@axway/api-builder-plugin-dc-mssql](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql) that prevented queries from working as expected with falsy values from queries (e.g. `{ "value": 0 }`), and also where values were expected to be equal to `null` or not equal to `null`.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
<!-- ## Updated modules -->

<!-- ## Updated plugins -->

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
