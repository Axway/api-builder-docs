---
title: Bangkok release notes
linkTitle: Bangkok
description: 3 December 2021
date: 2021-12-03
Hide_readingtime: true
---
## Summary
Brief summary of the notable release contents.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features
* #7142: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now binds OpenAPI specifications to `/apidoc/swagger.json`, `/apidoc/swagger.yaml` (both for legacy purposes), as well as `/apidoc/openapi.json` and `/apidoc/openapi.yaml`. The paths `/apidoc/oas.json` and `/apidoc/oas.yaml` are no longer bound. On startup, users will see only one path in the log. For OpenAPI 2.0, it is `/apidoc/swagger.json`, otherwise, it is `/apidoc/openapi.json`.
* #7148: Added support for HTTP body parsing and validation for `multipart/form-data` and `application/x-www-form-urlencoded` requests in [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas).

<!-- ## Fixes -->

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
## Updated modules
* [@axway/api-builder-runtime@4.74.3](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.74.3)

<!-- ## Updated plugins -->

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
