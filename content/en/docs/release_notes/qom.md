---
title: Qom release notes
linkTitle: Qom
description: 24 June 2022
date: 2022-06-24
Hide_readingtime: true
---
## Summary

In this release we started work on a feature to check for and inform users of updates that are available to the {{% variables/apibuilder_prod_name %}} Core and plugin components. These are shown in the new **Updates** tab in the UI.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features

* #7399: Projects now check for updates on startup, and they are displayed in the new **Updates** tab in the UI. For more information, see [here](/docs/developer_guide/console/#updates-tab).
* #7173: Removed Titanium examples from OpenAPI **Try it out** sections in the UI.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
## Updated modules
* [@axway/api-builder-admin@1.64.6](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.64.6)
* [@axway/api-builder-runtime@4.91.13](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.91.13)
* [arrow-admin-ui@4.49.0](https://www.npmjs.com/package/arrow-admin-ui/v/4.49.0)

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
