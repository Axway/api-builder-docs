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

## Features

* #7153: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now enforces stricter parameter [styles](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#style-values), returning 400 when the encoding is incorrect.
* #7182: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) request body validation refactored to support binary and non-JSON body.
* #7182: [@axway/api-builder-runtime](https://www.npmjs.com/package/@axway/api-builder-runtime) now supports non-JSON and non-text body as `Buffer`.
* #7182: [@axway/api-builder-runtime](https://www.npmjs.com/package/@axway/api-builder-runtime) now supports all JSON content-type `application/*+json`.

## Fixes

* #7198: Fixed an issue with [@axway/api-builder-runtime](https://www.npmjs.com/package/@axway/api-builder-runtime) that failed to stop the server when running tests and a plugin failed to load.

{{% releasenotes/deprecations %}}

## Updated modules

* [@axway/api-builder-runtime@4.75.1](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.75.1)

## Updated plugins

* [@axway/api-builder-plugin-ft-oas@0.3.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas/v/0.3.0)

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
