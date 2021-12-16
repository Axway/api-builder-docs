---
title: Caracas release notes
linkTitle: Caracas
description: 17 December 2021
date: 2021-12-17
Hide_readingtime: true
---
## Summary

In this release, [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) HTTP request validation was refactored to resolve a number of issues with validating binary body and form-data. We also provide stricter parsing for the [OpenAPI 3.0 style](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#style-values) parameters. We addressed [CVE-2021-3918](https://nvd.nist.gov/vuln/detail/CVE-2021-3918), completely removing the deprecated [request](https://www.npmjs.com/package/request) module from the product. With this change, we also upgraded the [{{% variables/apibuilder_prod_name %}} CLI](https://www.npmjs.com/package/@axway/amplify-api-builder-cli) which is now version 2.0.0.

{{% releasenotes/upgrade %}}

## Breaking changes
* #7185: Addressed [CVE-2021-3918](https://nvd.nist.gov/vuln/detail/CVE-2021-3918), and upgraded the [{{% variables/apibuilder_prod_name %}} CLI](https://www.npmjs.com/package/@axway/amplify-api-builder-cli) to 2.0.0. This removes the [request](https://www.npmjs.com/package/request) module from the product and new projects will use [got](https://www.npmjs.com/package/got) for tests. This also updates the third-party dependencies for new projects. You should upgrade the {{% variables/apibuilder_prod_name %}} CLI. **TODO: merge RDPP-7185 and provide link here.**

## Features

* #7153: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now binds OpenAPI specifications to `/apidoc/swagger.json`, `/apidoc/swagger.yaml` (both for legacy purposes), as well as `/apidoc/openapi.json` and `/apidoc/openapi.yaml`. The paths `/apidoc/oas.json` and `/apidoc/oas.yaml` are no longer bound. On startup, users will see only one path in the log. For OpenAPI 2.0, it is `/apidoc/swagger.json`, otherwise, it is `/apidoc/openapi.json`.
* #7155: Addressed [CVE-2021-3918](https://nvd.nist.gov/vuln/detail/CVE-2021-3918) and completely removed the [request](https://www.npmjs.com/package/request) module from the product.

<!-- ## Fixes -->

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
## Updated modules

* [@axway/api-builder-runtime@4.74.9](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.74.9)

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
