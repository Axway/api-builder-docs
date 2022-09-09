---
title: Tauranga release notes
linkTitle: Tauranga
description: 16 August 2022
date: 2022-08-16
Hide_readingtime: true
---
## Summary

In this release, we continued our effort on providing the necessary information to users to keep their applications up to date. When {{% variables/apibuilder_prod_name %}} checks for updates, it will now respect npm configuration for `ca`, `cafile`, and `strict-ssl`.

{{% releasenotes/update %}}

<!-- ## Breaking changes -->

<!-- ## Features -->

## Fixes

* #7490: When {{% variables/apibuilder_prod_name %}} checks for updates, it will respect npm configuration for `ca`, `cafile`, and `strict-ssl`.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
## Updated modules
* [@axway/api-builder-admin@1.67.1](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.67.1)
* [@axway/api-builder-runtime@4.92.7](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.92.7)

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
