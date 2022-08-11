---
title: Tauranga release notes
linkTitle: Tauranga
description: 12 August 2022
date: 2022-08-12
Hide_readingtime: true
---
## Summary

In this release we continued our effort on providing the necessary information to users to keep their applications up to date. With this release, all upgrades that are available to the {{% variables/apibuilder_prod_name %}} Core and the installed plugin components in their services will be now shown, alongside any potential updates, in the [**Updates** tab](/docs/developer_guide/console/#updates-tab).

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features

* #7405: Projects now check for upgrades on startup, and they are displayed in the [**Updates** tab](/docs/developer_guide/console/#updates-tab).

## Fixes

* #7490: Now respects existing `ca`, `cafile` and `strict-ssl` npm configuration when checking for updates.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->

## Updated modules

* [@axway/api-builder-admin@1.67.1](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.67.1)
* [@axway/api-builder-runtime@4.92.7](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.92.7)

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
