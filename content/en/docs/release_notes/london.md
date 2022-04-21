---
title: London release notes
linkTitle: London
description: 22 April 2022
date: 2022-04-22
Hide_readingtime: true
---
## Summary

Added the ability to "Generate API" from models to replace the previous "Generate endpoints" feature. Now, the API is generated as an OpenAPI specification and depends on the [OpenAPI flow-trigger plugin](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas).

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features

* #7367: Added new menu option "Generate API" to **Models** page that is enabled when [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) is installed, and replaces "Generate endpoints". This creates an OpenAPI 2.0 specification and flows with CRUD operations for the model which can be edited as needed.
* #7215: Added {{% deprecation/link D053 %}} to deprecate endpoints.
* #7215: Added {{% deprecation/link D054 %}} to deprecate `apidoc.disabled` configuration.

## Fixes

* #7366: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now produces better error messages for OpenAPI specifications that contain invalid path parameter names.
* #7367: Fixed issue where model endpoint generation for "distinct" API had invalid `200` response schema.
* #7367: Fixed issue where API generated from memory models would fail schema validation when certain APIs were invoked (e.g. query, upsert).

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
<!-- ## Updated modules -->

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
