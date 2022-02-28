---
title: Ikeja release notes
linkTitle: Ikeja
description: 11 March 2022
date: 2022-03-11
Hide_readingtime: true
---
<!-- ## Summary -->

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features

* #7302: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now supports a new option "Lower-case all headers" that will force all headers to be lower-cased before they are passed into the flow, including OpenAPI header parameters, which would normally be case-sensitive.

## Fixes

* #7305: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) updated schema for HTTP request.
* #7283: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now ignores [JSON schema constraints](https://json-schema.org/understanding-json-schema/reference/string.html#id5) `minLength`, `maxLength`, and `pattern` when validating uploaded files.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
<!-- ## Updated modules -->

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
