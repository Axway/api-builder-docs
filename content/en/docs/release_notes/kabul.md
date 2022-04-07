---
title: Kabul release notes
linkTitle: Kabul
description: 8 April 2022
date: 2022-04-08
Hide_readingtime: true
---
## Summary

Added support for Node.js 16 and npm 8 for {{% variables/apibuilder_prod_name %}} runtime and plugins. All plugins now have an `engines.apibuilder` that indicate their compatibility support for `@axway/api-builder-runtime` and will error on install if they are incompatible. Also made UX improvements to the _API Doc & Test_ page to get rid of the confusing name "Endpoints", and to hide Flow-Triggers when editing flows that are bound to OpenAPI specifications (to prevent confusion).

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features

* #7345: Added support for Node.js 16.
* #7102: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) OpenAPI specs are now validated to check for invalid path parameter names that contain characters that are incompatible with [Express route parameters](https://expressjs.com/en/guide/routing.html#route-parameters), i.e. names that contain characters other than `A-Z a-z 0-9 _`.
* #7268: Prevents OpenAPI specification flow-triggers from being deleted in the flow editor.
* #7268: Hide the flow-triggers list in the flow-nodes panel when editing flows that are bound to OpenAPI specifications.
* #7268: Hide OpenAPI flow-triggers from the list of flow-triggers in flow-nodes panel when editing flows.
* #7355: In "API Doc & Test" page, changed the title of "API Endpoints" and removed "Endpoints" column.
* #6933: Now reads `engines.apibuilder` from plugin `package.json` files to determine compatibility with the {{% variables/apibuilder_prod_name %}} version in use. Incompatible plugins will fail to start and will not be able to be installed from the "Plugins" page.
* #7329: Added the ability to scaffold example projects to the {{% variables/apibuilder_prod_name %}} CLI - `axway builder init --example` to see the available examples.

## Fixes

* #7347: Updated [json-schema-faker](https://www.npmjs.com/package/json-schema-faker) to address npm-audit security issue #1067281 with sabotaged [faker](https://www.npmjs.com/package/faker) module.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
<!-- ## Updated modules -->

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
