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
* #7282: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) is now using Ajv version 6 which affects the way JSON Schema date-time format is validated.
* #7285: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now passes path parameters to the flow as `$.request.path` (instead of `$.request.params` as was done previously).

## Features

* #7250: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now preserves the original OpenAPI filename when updating the specification, and may adjust the extension to match the newly imported file.
* #7264: Extended the OAS flow-trigger plugin's responses to include the status `code` and the `request-id`.
* #7282: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) is now properly validating with JSON Schema Draft 4.
* #7276: The flow editor now resets the graph pan and zoom positions when `0` is pressed.
* #7280: API Builder users will no longer be able generate endpoints for models. The OAS flow-trigger is a replacement for endpoints and our new bespoke solution.

## Fixes

* #7283: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) schema validation for `multipart/form-data` files now ignores schema with constraints `minLength`, `maxLength`, and `pattern`.
* #7297: fixed issue in [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) where header parameters were incorrectly handled case-sensitive when validating the request. Now, headers parameters are case-insensitive for validation.

{{% releasenotes/deprecations %}}

## Updated modules

* [@axway/api-builder-admin@1.54.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.54.0)
* [@axway/api-builder-oas-flow-node@2.3.0](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/2.3.0)
* [@axway/api-builder-runtime@4.82.6](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.82.6)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@3.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/3.1.0)
* [@axway/api-builder-plugin-ft-oas@0.13.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas/v/0.13.0)

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
