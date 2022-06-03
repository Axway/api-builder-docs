---
title: Oyo release notes
linkTitle: Oyo
description: 3 June 2022
date: 2022-06-03
Hide_readingtime: true
---
## Summary

Brief summary of the notable release contents.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features

* #7439: The HTTP request ID is now accessible in flows from `$.request.id` when using [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas).
* #7436: The "Share your feedback" button in the UI now links to the Aha! ideas portal.

## Fixes

* #7383: **API Doc & Test** page now reflects the correct error state for API documents that have invalid flow-triggers.
* #7433: In [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas), fixed issue when importing OpenAPI specification with no extension. Now defaults to .yaml.

{{% releasenotes/deprecations %}}

## Updated modules

* [@axway/api-builder-admin@1.64.3](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.64.3)
* [@axway/api-builder-runtime@4.91.7](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.91.7)
* [@axway/api-builder-sdk@1.2.2](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.2.2)
* [@axway/api-builder-test-utils@1.5.8](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.5.8)

## Updated plugins

* [@axway/api-builder-plugin-ft-oas@1.6.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas/v/1.6.0)

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
