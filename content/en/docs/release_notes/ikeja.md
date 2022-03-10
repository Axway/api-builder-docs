---
title: Ikeja release notes
linkTitle: Ikeja
description: 11 March 2022
date: 2022-03-11
Hide_readingtime: true
---
## Summary

In this release, we added HTTP response validation to the OpenAPI flow-trigger to help users ensure that flows implement exactly what is documented by the specification. We also introduced the ability to delete an imported OpenAPI specification. Additionally, we added support for several new OpenAPI flow-trigger options that will allow you fine tune the behavior in a way it fits your preference and use cases.

{{% releasenotes/upgrade %}}

## Breaking changes

* 7139: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now validates response `status code`, `headers` (including `content-type`) and `body` against the specification.
* #7277: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now requires a minimum API Builder version of Ikeja.

## Features

* #7302: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now supports a new option "Lower-case all headers" that will force all headers to be lower-cased before they are passed into the flow, including OpenAPI header parameters, which would normally be case-sensitive.
* #7284: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now supports a new option "Flatten parameters" that flattens all OpenAPI parameters into a single request property "params" that will be accessible in the flow from `$.request.params`.
* #7292: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now supports a new option "Parse date parameters" that makes `string` parameters with format `date` or `date-type` accessible as Date objects in the flow.
* #7291: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now supports a new option "Request validation" that allows toggling between "error" and "warn" modes. When set to "warn" and request validation fails, the app will not respond with 500 but will execute the flow and will respond with the result of its execution.
* #7277: Now supports deletion of imported OpenAPI specifications.

## Fixes

* #7305: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) updated schema for HTTP request.
* #7283: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now ignores [JSON schema constraints](https://json-schema.org/understanding-json-schema/reference/string.html#id5) `minLength`, `maxLength`, and `pattern` when validating uploaded files.
* #7274: Fix issue where apidocs are still bound when `config.apidoc.disabled` is set to `true`.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
## Updated modules
* [@axway/api-builder-admin@1.55.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.55.0)
* [@axway/api-builder-oas-flow-node@2.5.1](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/2.5.1)
* [@axway/api-builder-runtime@4.83.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.83.0)

## Updated plugins
* [@axway/api-builder-plugin-fn-swagger@3.1.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/3.1.3)
* [@axway/api-builder-plugin-ft-oas@0.15.2](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas/v/0.15.2)

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
