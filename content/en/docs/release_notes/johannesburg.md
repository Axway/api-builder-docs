---
title: Johannesburg release notes
linkTitle: Johannesburg
description: 25 March 2022
date: 2022-03-25
Hide_readingtime: true
---
## Summary

Brief summary of the notable release contents.

{{% releasenotes/upgrade %}}

## Breaking changes

* #7320: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now supports loading multiple flow-triggers.
* #7217: New projects from the API Builder CLI are now initialised without example APIs, models, schema flows or endpoints.

<!-- ## Features -->

## Fixes

* #7322: In [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) added a log `warn` and `error` when fail to import OAS specs that do not validate.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
<!-- ## Updated modules -->

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
