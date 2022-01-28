---
title: Flint release notes
linkTitle: Flint
description: 28 January 2022
date: 2022-01-28
Hide_readingtime: true
---
## Summary

In this release, in the OpenAPI flow-trigger, we added support for updating an existing OpenAPI document via the UI, and also introduced smart body encoding and `content-type` header selection. Additionally, we added support for overriding `host`, `basePath` and `schemes` in the OpenAPI 2.0 and `servers` in OpenAPI 3.0 api-docs respectively when [`config.apidoc.overrides`](/docs/developer_guide/project/configuration/project_configuration#apidoc) are enabled.

{{% releasenotes/upgrade %}}

## Breaking changes

* #7168: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/plugin-ft-oas) is more strict when a response body is sent without a `content-type` header, and will now return a `500 Server Error` if the correct `content-type` cannot automatically be determined from the OpenAPI document.
* #7195: Minimum API Builder version is now Flint
* #7212: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now sends `400 Bad Request` if a client includes a HTTP body but the spec does not define one.
* #7220: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/plugin-ft-oas) plugin `save` method now overrides a previously saved specification with a new one.
* #7138: Minimum API Builder version is now Flint. Now supports configuration overrides in the OpenAPI 2.0 and 3.0 api-docs when `config.overrides` are enabled.

## Features

* #7214: Added log warning if a GET/HEAD request sends a body, it will be ignored.
* #7168: Added smart `content-type` header selection to [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/plugin-ft-oas) when a HTTP response body is set in the flow without a `content-type` header. The flow-trigger will attempt to determine the correct `content-type` from the OpenAPI document.
* #7168: Added automatic JSON response body encoding to [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/plugin-ft-oas) when a `content-type` header is not set in the flow and the OpenAPI document describes a single JSON mime-type for that response.
* #7195: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) can now handle OpenAPI specifications containing references with `requestBody` of content-type `application/x-www-form-urlencoded` or `multipart/form-data`.
* #7138: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/plugin-ft-oas) now supports configuration overrides in the OpenAPI 2.0 and 3.0 api-docs when `config.overrides` are enabled.
* #7220: Added support for updating the existing specification from the UI.

## Fixes

* #7226: Fixed an issue with [@axway/api-builder-plugin-fn-restclient](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient) flow-node while invoking an API with it should be able to access the response body of the API call when the method is DELETE or OPTIONS.
* #7195: Fixed an issue with [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) that failed to dereference JSON schema when parsing and validating the request body or parameters.
* #7228: Updated `marked` dependency to fix [CVE-2022-21680](https://github.com/advisories/GHSA-rrrm-qjm4-v8hf) and [CVE-2022-21681](https://github.com/advisories/GHSA-5v2h-r2cx-5xgj).
* #7212: Fixed an issue in [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) that incorrectly treated requests having `content-length: 0` as being invalid, even when the body was optional.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
<!-- ## Updated modules -->

<!-- ## Updated plugins -->

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
