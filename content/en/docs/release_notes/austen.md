---
title: Austen release notes
linkTitle: Austen
description: 9 September 2022
date: 2022-09-09
Hide_readingtime: true
---
## Summary
Brief summary of the notable release contents.

{{% releasenotes/upgrade %}}

## Breaking changes
* #7479: [`config.admin.updatesEnabled`](/docs/developer_guide/project/configuration/project_configuration/#admin) is enabled by default, and should be explicitly disabled for unit tests (similar to [`bindProcessHandlers`](/docs/developer_guide/project/configuration/project_configuration#bindprocesshandlers)). Unit tests should be updated to use the [`@axway/api-builder-test-utils`](https://www.npmjs.com/package/@axway/api-builder-test-utils), which disables `updatesEnabled` and `bindProcessHandlers` by default. If your project unit tests still directly set `bindProcessHandlers`, then you should follow [this guide](/docs/updates/2022_08_26_update_unit_tests_with_test_utils) to upgrade them.

<!-- ## Features -->

<!-- ## Fixes -->

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
