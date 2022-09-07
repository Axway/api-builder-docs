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
- #7425: {{% variables/apibuilder_prod_name %}} will now fail to start with mismatching versions of @axway/api-builder-admin and @axway/api-builder-runtime (the same version of each should be installed).
- #6089: All {{% variables/apibuilder_prod_name %}} components now require a minimum of Node.js version 16.x.

<!-- ## Features -->

<!-- ## Fixes -->

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
