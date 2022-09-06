---
title: Villasimius release notes
linkTitle: Villasimius
description: 9 September 2022
date: 2022-09-09
Hide_readingtime: true
---
## Summary
Brief summary of the notable release contents.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features
* #7406: When installing plugins from the **Plugins** page, if the latest version of a plugin is not compatible with the current version of {{% variables/apibuilder_prod_name %}} or Node.js a previous compatible version will be installed instead, if possible. This feature only applies when using Node.js 12.13.0 and above.

## Fixes
* #7500: Fixed the unexpected re-rendering of UI components in the API DOCS & TEST page after a restart.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
