---
title: Johannesburg release notes
linkTitle: Johannesburg
description: 25 March 2022
date: 2022-03-25
Hide_readingtime: true
---
## Summary

In this release we officially shipped the OpenAPI flow-trigger, adding support for API-first development using OpenAPI 3.0. We also added the ability to disable OpenAPI response validation, as well as requested support for using multiple OpenAPI specifications in the same service. New {{% variables/apibuilder_prod_name %}} projects will come with the OpenAPI flow-trigger installed by default.

{{% releasenotes/upgrade %}}
In order to migrate from endpoints to the new OpenAPI flow-trigger, you can follow [Upgrade endpoints](/docs/updates/upgrade_endpoints) guide.

## Breaking changes

* #7217: New projects from the API Builder CLI are now initialised without example APIs, models, schema flows or endpoints.
* #7327: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now also parses `date` and `date-time` format parameters in a form body when `Parse date parameters` is enabled.
* #7332: The minimum {{% variables/apibuilder_prod_name %}} version for [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) is now `Johannesburg`.
* #7216: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) is now officially released and installed by default in new projects.

## Features

* #7320: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now supports loading multiple OpenAPI specifications. Unlike previous behavior, the specifications will be accessed independently and not merged together.
* #7315: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now supports a new option "Response validation" that allows toggling between "error", "warn" and "disabled" modes. When set to "warn" or "disabled" and the response does not match the specification, the app will not respond with 500 but will execute the flow and respond with the result of its execution. When set to "warn", validation will still occur, and be printed to the console.

## Fixes

* #7322: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now logs the reasons for failing to validate OpenAPI specifications upon import.
* #7322: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) no longer logs duplicate `Request validation` warnings.
* #7216: Changed `Swagger` references to `OpenAPI`.
* #7331: The `Swagger` plugin is now known as `OpenAPI client`. The package name is unchanged from [@axway/api-builder-plugin-fn-swagger](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger).

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
## Updated modules
* [@axway/amplify-api-builder-cli@3.1.0](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/3.1.0)
* [@axway/api-builder@6.1.0](https://www.npmjs.com/package/@axway/api-builder/v/6.1.0)
* [@axway/api-builder-admin@1.57.2](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.57.2)
* [@axway/api-builder-runtime@4.84.4](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.84.4)
* [@axway/api-builder-openapi-upgrade@1.0.0](https://www.npmjs.com/package/@axway/api-builder-openapi-upgrade/v/1.0.0)

## Updated plugins
* [@axway/api-builder-plugin-dc-mbs@1.0.9](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mbs/v/1.0.9)
* [@axway/api-builder-plugin-ft-oas@1.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas/v/1.0.0)

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
