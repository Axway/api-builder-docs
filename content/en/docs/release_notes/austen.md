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
* #7479: [`config.admin.updatesEnabled`](/docs/developer_guide/project/configuration/project_configuration/#admin) no longer has its default behavior controlled by [`config.bindProcessHandlers`](/docs/developer_guide/project/configuration/project_configuration/#bindprocesshandlers). If your project unit tests still directly set `bindProcessHandlers` you should follow [this guide](/docs/updates/2022_08_26_update_unit_tests_with_test_utils) to update your unit tests to use `@axway/api-builder-test-utils` which will control `updatesEnabled` and `bindProcessHandlers` under the hood.

<!-- ## Features -->

<!-- ## Fixes -->

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
