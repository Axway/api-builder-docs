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
* #7410: Node.js v14 is deprecated, Node.js v16 is going to be the minimum version of support in API Builder v5.

## Fixes

* #7383: **API Doc & Test** page now reflects the correct error state for API documents that have invalid flow-triggers.
* #7433: In [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas), fixed issue when importing OpenAPI specification with no extension. Now defaults to .yaml.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
<!-- ## Updated modules -->

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}