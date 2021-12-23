---
title: Djibouti release notes
linkTitle: Djibouti
description: 31 December 2021
date: 2021-12-31
Hide_readingtime: true
---
## Summary
Supports stricter parameter styles and binary body validation.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features
* #7153: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now enforces stricter parameter [styles](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#style-values), returning 400 when the encoding is incorrect.
* #7182: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) request body validation refactored to support binary body, and body that cannot be parsed (e.g. non-JSON).
* #7182: [@axway/api-builder-runtime](https://www.npmjs.com/package/@axway/api-builder-runtime) now supports raw HTTP body as `Buffer`.
* #7182: [@axway/api-builder-runtime](https://www.npmjs.com/package/@axway/api-builder-runtime) now supports all JSON content-type `application/*+json`.

<!-- ## Fixes -->

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
<!-- ## Updated modules -->

<!-- ## Updated plugins -->

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
