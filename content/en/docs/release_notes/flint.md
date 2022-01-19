---
title: Flint release notes
linkTitle: Flint
description: 24 January 2022
date: 2022-01-24
Hide_readingtime: true
---
## Summary
In this release, we introduced smart body encoding and `content-type` header selection to the OpenAPI flow-trigger.

{{% releasenotes/upgrade %}}

## Breaking changes
* #7168: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/plugin-ft-oas) is more strict when a response body is sent without a `content-type` header, and will now return a 500 Server Error if the correct `content-type` cannot automatically be determined from the OpenAPI document.

## Features

* #7168: Added smart `content-type` header selection to [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/plugin-ft-oas) when a HTTP response body is provided without `content-type`. The flow-trigger will attempt to determine the correct `content-type` from the OpenAPI document.
* #7168: Added automatic JSON response body encoding to [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/plugin-ft-oas) when a `content-type` header is not set and the OpenAPI document describes a single JSON mime-type for that response.

<!-- ## Fixes -->

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
<!-- ## Updated modules -->

<!-- ## Updated plugins -->

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
