---
title: Haarlem release notes
linkTitle: Haarlem
description: 25 February 2022
date: 2022-02-25
Hide_readingtime: true
---
## Summary

Brief summary of the notable release contents.

{{% releasenotes/upgrade %}}

## Breaking changes

* #7271: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now saves and loads OpenAPI specifications from `apidocs/openapi` instead of `endpoints`.

## Features

* #7250: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now preserves the original OpenAPI filename when updating the specification, and may adjust the extention to match the newly imported file.
* #7264: Extended the OAS flow-trigger plugin's responses to include the status `code` and the `request-id`.

<!-- ## Fixes -->

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
<!-- ## Updated modules -->

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
