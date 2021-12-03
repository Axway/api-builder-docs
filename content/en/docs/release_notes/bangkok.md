---
title: Bangkok release notes
linkTitle: Bangkok
description: 3 December 2021
date: 2021-12-03
Hide_readingtime: true
---
## Summary
In this release we continued getting the OpenAPI flow-trigger closer to release: HTTP request bodies are now parsed and validated, and HTTP response headers can now be configured in flows.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features
* #7142: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now binds OpenAPI specifications to `/apidoc/swagger.json`, `/apidoc/swagger.yaml` (both for legacy purposes), as well as `/apidoc/openapi.json` and `/apidoc/openapi.yaml`. The paths `/apidoc/oas.json` and `/apidoc/oas.yaml` are no longer bound. On startup, users will see only one path in the log. For OpenAPI 2.0, it is `/apidoc/swagger.json`, otherwise, it is `/apidoc/openapi.json`.
* #7148: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now supports HTTP body parsing and validation for `multipart/form-data` and `application/x-www-form-urlencoded` requests.
* #7135: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now supports sending HTTP response headers that were set from the flow HTTP response flow-node.
* #7136: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now supports deduping the `config.apiPrefix`. For example, if the prefix is `/api` and all methods in the OpenAPI spec start with `/api`, then the `config.apiPrefix` will not be prepended to the path, which otherwise would have resulted in paths beginning with `/api/api`.

## Fixes
* #7137: Fixed issue in [@axway/api-builder-admin](https://www.npmjs.com/package/@axway/api-builder-admin) that prevented flow-trigger OpenAPI methods from binding to flows when the spec method did not have the optional `operationId`.
* #7176: Fixed [issue](https://github.com/Axway/swagger-tools/pull/7/files) where a client request for a parameterized path that matched the express parameterized path exactly, would result in `TypeError: Cannot read property '1' of undefined`. E.g. if the path is `/api/:typeId`, and the client requests "/api/:typeId".

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
## Updated modules
* [@axway/api-builder-admin@1.48.3](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.48.3)
* [@axway/api-builder-oas-flow-node@2.1.1](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/2.1.1)
* [@axway/api-builder-runtime@4.74.8](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.74.8)
* [@axway/api-builder-sdk@1.1.16](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.1.16)
* [@axway/api-builder-test-utils@1.5.2](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.5.2)

## Updated plugins
* [@axway/api-builder-plugin-fn-swagger@3.0.8](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/3.0.8)
* [@axway/api-builder-plugin-ft-oas@0.2.3](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas/v/0.2.3) 

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
