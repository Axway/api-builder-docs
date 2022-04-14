---
title: London release notes
linkTitle: London
description: 22 April 2022
date: 2022-04-22
Hide_readingtime: true
---
## Summary

Brief summary of the notable release contents.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features

* #7215: Added new `disableEndpoints` deprecation flag which controls usage of endpoints if no spec plugin is installed.
* #7215: Deprecated `apidoc.disabled` feature and removed from default configuration.
* #7367: Added new menu option "Generate API" to Models page that is enabled when the [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) is installed.

## Fixes

* #7366: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now produces better error messages for OpenAPI specifications that contain invalid path parameter names.
* #7367: Fixed issue where model endpoint generation for "distinct" API had invalid `200` response schema.
* #7367: Fixed issue where API generated from memory models would fail schema validation when certain API were invoked (e.g. query, upsert).

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
<!-- ## Updated modules -->

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
