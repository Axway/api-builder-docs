---
title: Kobe release notes
linkTitle: Kobe
date: 2018-12-21
description: 21 December 2018
Hide_readingtime: true
---
## Features

* #5155: Add a nav badge to attract attention to credential errors
* #5357: Clarify next steps to take when viewing an invalid credential

## Fixes

* #5388: Fix server error when rendering endpoints with path parameters defined using $ref pointers
* #5389: Endpoint headers are too verbose and unclear
* #5393: Importing API causes {{% variables/apibuilder_prod_name %}} to exit
* #5394: Fix issue where API Key credential with an empty string value is resolved as null

## Release notes

* #5155: Introduced notification badges in the navigation menu to attract attention to Credentials that need attention.
* #5357: Add documentation links for credentials that were invalid or incomplete to clarify next steps to take.
* #5388: Previously, {{% variables/apibuilder_prod_name %}} console would fail to render imported endpoints with path parameters which were defined with a `$ref` pointer. Now, {{% variables/apibuilder_prod_name %}} console will render these endpoints correctly.
* #5389: Previously, messages describing "setting headers" would be logged out when getting a response from an endpoint. These logs were unclear and displayed duplicate information as the headers were also logged in the response. Now, these logs have been removed.
* #5393: Previously, Swagger files with invalid 'default' properties that do not match the type of the property they refer to were loaded successfully and were failing during endpoint invocation. Now, such Swagger files are not loaded successfully during initial file loading.
* #5394: Previously, an API key credential with a value of an empty string was resolved as '`null`'. Now, it is resolved as an empty string.

## Updated modules

* [@axway/api-builder-runtime@4.5.8](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.5.8)
* [@axway/api-builder-admin@1.5.5](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.5.5)
* [@axway/api-builder@4.4.3](https://www.npmjs.com/package/@axway/api-builder/v/4.4.3)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@2.0.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.0.5)


{{% releasenotes/previous %}}
