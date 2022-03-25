---
title: Caracas release notes
linkTitle: Caracas
description: 17 December 2021
date: 2021-12-17
Hide_readingtime: true
---
## Summary

In this release, [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) HTTP request validation was refactored to resolve a number of issues with validating binary body and form-data. We also provide stricter parsing for the [OpenAPI 3.0 style](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#style-values) parameters. We addressed [CVE-2021-3918](https://nvd.nist.gov/vuln/detail/CVE-2021-3918), completely removing the deprecated [request](https://www.npmjs.com/package/request) module from the product. With this change, we also upgraded the [{{% variables/apibuilder_prod_name %}} CLI](https://www.npmjs.com/package/@axway/amplify-api-builder-cli) which is now version 2.0.0.

{{% releasenotes/upgrade %}}

## Breaking changes

* #7185: {{% variables/apibuilder_prod_name %}} CLIs now require a minimum Node.js version of `12.17.0`. {{% variables/apibuilder_prod_name %}} Runtime is not impacted by this change, and existing projects can still be upgraded without a breaking change.

## Features

* #7185: Projects created with the latest CLI no longer have a development dependency on [`request`](https://www.npmjs.com/package/request) for unit tests. The newly scaffolded projects will use [got](https://www.npmjs.com/package/got) for tests instead.
* #7185: Addressed [CVE-2021-3918](https://nvd.nist.gov/vuln/detail/CVE-2021-3918), and upgraded the [{{% variables/apibuilder_prod_name %}} CLI](https://www.npmjs.com/package/@axway/amplify-api-builder-cli) to 2.0.0. This removes the [request](https://www.npmjs.com/package/request) module from the product. This also updates the third-party dependencies for new projects. You should upgrade the {{% variables/apibuilder_prod_name %}} CLI. For more details of the changes made to the {{% variables/apibuilder_prod_name %}} project, see [Replace the request dev-dependency in project unit tests](/docs/updates/2021_12_17_update_to_remove_request_module).
* #7185: HTTP keep-alive now implemented by default for [@axway/api-builder-plugin-fn-restclient](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient), [@axway/api-builder-plugin-fn-swagger](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger), and [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas).
* #7167: All the paths bound in the API Builder app are now logged at DEBUG level.

## Fixes

* #7185: Using the handlebars renderer on Linux with Node.js 14 and above no longer throws `ERR_FEATURE_UNAVAILABLE_ON_PLATFORM`.

{{% releasenotes/deprecations %}}

## Updated modules
* [@axway/amplify-api-builder-cli@2.0.1](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/2.0.1)
* [@axway/api-builder@5.0.1](https://www.npmjs.com/package/@axway/api-builder/v/5.0.1)
* [@axway/api-builder-admin@1.48.4](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.48.4)
* [@axway/api-builder-oas-flow-node@2.2.0](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/2.2.0)
* [@axway/api-builder-runtime@4.74.12](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.74.12)

## Updated plugins
* [@axway/api-builder-plugin-fn-restclient@2.0.27](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.27)
* [@axway/api-builder-plugin-fn-swagger@3.0.9](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/3.0.9)
* [@axway/api-builder-plugin-ft-oas@0.2.4](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas/v/0.2.4)

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
