---
title: Kabul release notes
linkTitle: Kabul
description: 8 April 2022
date: 2022-04-08
Hide_readingtime: true
---
## Summary

Added support for Node.js 16 and npm 8. All plugins now have an `engines.apibuilder` that indicate their {{% variables/apibuilder_prod_name %}} compatibility, and will error on install if they are incompatible. Also made UX improvements to the _API Doc & Test_ page and now hide flow-triggers when editing flows that are bound to OpenAPI specifications to prevent confusion.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features

* #7345: Added support for Node.js 16 and npm 8.
* #7329: Added the ability to scaffold example projects to the {{% variables/apibuilder_prod_name %}} CLI - `axway builder init --example` to see the available examples.
* #7268: Prevented OpenAPI specification flow-triggers from being deleted in the flow editor.
* #7268: Hidden the flow-triggers list in the flow-nodes panel when editing flows that are bound to OpenAPI specifications.
* #7268: Hidden OpenAPI flow-triggers from the list of flow-triggers in flow-nodes panel when editing flows.
* #7355: In the "API Doc & Test" page, changed the title of "API Endpoints" and removed "Endpoints" column.
* #6933: Now reads `engines.apibuilder` from plugin `package.json` files to determine compatibility with the {{% variables/apibuilder_prod_name %}} version in use. Incompatible plugins will fail to start and will not be able to be installed from the "Plugins" page.

## Fixes

* #7347: Updated [json-schema-faker](https://www.npmjs.com/package/json-schema-faker) to address npm-audit security issue #1067281 with sabotaged [faker](https://www.npmjs.com/package/faker) module.
* #7349: Fixed "Invalid trigger ID" error when creating flows for OpenAPI specifications that contained certain characters in their filename such as spaces.
* #7102: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) OpenAPI specs are now validated to check for invalid path parameter names that contain characters that are incompatible with [Express route parameters](https://expressjs.com/en/guide/routing.html#route-parameters) (only `A-Z a-z 0-9 _` are allowed).

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
## Updated modules
* [@axway/amplify-api-builder-cli@3.3.1](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/3.3.1)
* [@axway/api-builder@6.3.1](https://www.npmjs.com/package/@axway/api-builder/v/6.3.1)
* [@axway/api-builder-admin@1.60.1](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.60.1)
* [@axway/api-builder-oas-flow-node@2.6.1](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/2.6.1)
* [@axway/api-builder-runtime@4.86.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.86.0)
* [@axway/api-builder-sdk@1.2.0](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.2.0)
* [@axway/api-builder-test-utils@1.5.6](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.5.6)
* [@axway/api-builder-openapi-upgrade@1.0.3](https://www.npmjs.com/package/@axway/api-builder-openapi-upgrade/v/1.0.3)

## Updated plugins
* [@axway/api-builder-plugin-dc-mbs@1.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mbs/v/1.1.0)
* [@axway/api-builder-plugin-dc-mongo@1.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mongo/v/1.2.0)
* [@axway/api-builder-plugin-dc-mssql@3.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/3.2.0)
* [@axway/api-builder-plugin-dc-mysql@2.3.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/2.3.0)
* [@axway/api-builder-plugin-dc-oracle@3.3.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/3.3.0)
* [@axway/api-builder-plugin-fn-base64@4.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/4.1.0)
* [@axway/api-builder-plugin-fn-dot@2.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/2.2.0)
* [@axway/api-builder-plugin-fn-javascript@3.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/3.1.0)
* [@axway/api-builder-plugin-fn-json@4.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/4.1.0)
* [@axway/api-builder-plugin-fn-restclient@2.2.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.2.1)
* [@axway/api-builder-plugin-fn-swagger@3.2.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/3.2.1)
* [@axway/api-builder-plugin-fn-mustache@1.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache/v/1.1.0)
* [@axway/api-builder-plugin-fn-xslt@3.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-xslt/v/3.2.0)
* [@axway/api-builder-plugin-fn-logger@1.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-logger/v/1.1.0)
* [@axway/api-builder-plugin-ft-timer@1.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-timer/v/1.1.0)
* [@axway/api-builder-plugin-ft-event@1.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-event/v/1.2.0)
* [@axway/api-builder-plugin-ft-solace@1.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-solace/v/1.1.0)
* [@axway/api-builder-plugin-ft-kafka@1.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka/v/1.2.0)
* [@axway/api-builder-plugin-ft-cron@1.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-cron/v/1.1.0)
* [@axway/api-builder-plugin-ft-oas@1.3.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas/v/1.3.0)
* [@axway/api-builder-plugin-invoke-flow@1.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-invoke-flow/v/1.2.0)

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
