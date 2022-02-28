---
title: Ikeja release notes
linkTitle: Ikeja
description: 11 March 2022
date: 2022-03-11
Hide_readingtime: true
---
## Summary
In this release we added response validation to the OpenAPI flow-trigger to help users ensure that flows implement exactly what is documented by the specification.

{{% releasenotes/upgrade %}}

## Breaking changes
* 7139: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now validates response `status code`, `headers` (including `content-type`) and `body` against the specification.

## Features

* #7302: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now supports a new option "Lower-case all headers" that will force all headers to be lower-cased before they are passed into the flow, including OpenAPI header parameters, which would normally be case-sensitive.
* #7284: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now supports a new option "Flatten parameters" that flatten all OpenAPI parameters into a single request property "params" that will be accessible from the flow from `$.request.params`.
* #7292: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now supports a new option "Parse date parameters" that converts date strings to Date object when specification parameters or body are of type string with format date or date-time.

## Fixes

* #7305: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) updated schema for HTTP request.
* #7283: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now ignores [JSON schema constraints](https://json-schema.org/understanding-json-schema/reference/string.html#id5) `minLength`, `maxLength`, and `pattern` when validating uploaded files.
* #7274: OAS flow-trigger will not binds apidoc when it is disabled in config.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
<!-- ## Updated modules -->

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
