---
title: Austen release notes
linkTitle: Austen
description: 9 September 2022
date: 2022-09-09
Hide_readingtime: true
---
## Summary

{{% variables/apibuilder_prod_name %}} v5 is released. Projects created on v4 are compatible with v5, but require installing upgrades for components (see [Upgrades](/docs/developer_guide/console#updates-tab)).

{{% releasenotes/upgrade %}}

## Breaking changes

- #6089: All {{% variables/apibuilder_prod_name %}} components now require a minimum of Node.js version 16.x.
- #7425: {{% variables/apibuilder_prod_name %}} will now fail to start with mismatching versions of @axway/api-builder-admin and @axway/api-builder-runtime (the same version of each should be installed).
- #7479: [`config.admin.updatesEnabled`](/docs/developer_guide/project/configuration/project_configuration/#admin) is now enabled by default in unit tests, and should be explicitly disabled for unit tests (similar to [`bindProcessHandlers`](/docs/developer_guide/project/configuration/project_configuration#bindprocesshandlers)). Unit tests should be updated to use the [`@axway/api-builder-test-utils`](https://www.npmjs.com/package/@axway/api-builder-test-utils), which disables `updatesEnabled` and `bindProcessHandlers` by default. If your project unit tests still directly set `bindProcessHandlers`, then you should follow [this guide](/docs/updates/2022_08_26_update_unit_tests_with_test_utils) to upgrade them.

<!-- ## Features -->

<!-- ## Fixes -->

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
