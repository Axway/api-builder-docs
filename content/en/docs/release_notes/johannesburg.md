---
title: Johannesburg release notes
linkTitle: Johannesburg
description: 25 March 2022
date: 2022-03-25
Hide_readingtime: true
---
## Summary

In this release we officially shipped the OpenAPI flow-trigger and added the ability to disable response validation.

{{% releasenotes/upgrade %}}

## Breaking changes

* #7320: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now supports loading multiple flow-triggers.
* #7217: New projects from the API Builder CLI are now initialised without example APIs, models, schema flows or endpoints.

## Features

* #7315: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now supports a new option "Response validation" that allows toggling between "error", "warn" and "disabled" modes. When set to "warn" or "disabled" and the response does not match the specification, the app will not respond with 500 but will execute the flow and respond with the result of its execution. When set to "warn", validation will still occur, and be printed to the console.

## Fixes

* #7322: In [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) added a log `warn` and `error` when fail to import OpenAPI specs that do not validate.
* #7327: In [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) added support for date string to Date object conversion for forms content types.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
<!-- ## Updated modules -->

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
