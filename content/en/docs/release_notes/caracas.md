---
title: Caracas release notes
linkTitle: Caracas
description: 17 December 2021
date: 2021-12-17
Hide_readingtime: true
---
## Summary
Brief summary of the notable release contents.

{{% releasenotes/upgrade %}}

## Breaking changes
* #7185: {{% variables/apibuilder_prod_name %}} CLIs now require a minimum Node.js version of `12.17.0`. {{% variables/apibuilder_prod_name %}} Runtime is not impacted by this change, and existing projects can still be upgraded without a breaking change.
* #7185: Projects created with the new CLI no longer have a development dependency on `request` for unit tests and now use [`got`](https://github.com/sindresorhus/got) instead. 

<!-- ## Features -->

## Fixes
* #7185: Using the handlebars renderer on Linux with Node.js 14 and above no longer throws `ERR_FEATURE_UNAVAILABLE_ON_PLATFORM`.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
## Updated modules
* [@axway/api-builder-runtime@4.74.9](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.74.9)

<!-- ## Updated plugins -->

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
