---
title: Unna release notes
linkTitle: Unna
description: 26 August 2022
date: 2022-08-26
Hide_readingtime: true
---
## Summary

In this release, we continued our effort on providing the necessary information to users to keep their applications up to date. With this release, all upgrades that are available to the {{% variables/apibuilder_prod_name %}} Core and the installed plugin components in their services will be now shown alongside any potential updates in the [**Updates** tab](/docs/developer_guide/console/#updates-tab). We also introduced a way to provide unit-test improvements to users more easily.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features

* #7405: Projects will now check for upgrades on startup, and they are displayed in the [**Updates** tab](/docs/developer_guide/console/#updates-tab).
* #7498: Added new metrics to [@axway/api-builder-plugin-prometheus](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus) for 'nodejs_active_resources' and 'nodejs_active_resources_total'.

## Fixes

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->

## Updated modules

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
