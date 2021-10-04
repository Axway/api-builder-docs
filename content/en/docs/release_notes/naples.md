---
title: Naples release notes
linkTitle: Naples
date: 2019-02-15
description: 15 February 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #5470: Support YAML endpoints and import API

## Fixes

* #5479: Show code examples for using Endpoints
* #5481: Headers should have x-frame-options and x-xss-protection for security
* #5502: Correct documentation in default.js in respect to ldap authentication

## Release notes

* #5470: Previously, {{% variables/apibuilder_prod_name %}} only supported JSON Swagger endpoint documents, or when imported via Import API. Now, {{% variables/apibuilder_prod_name %}} also supports YAML endpoint documents.
* #5479: Previously, there were no code examples for testing endpoints in Admin UI. Now, code examples for testing endpoints have been added.
* #5481: Previously, {{% variables/apibuilder_prod_name %}} did not respond with recommended HTTP security headers for `x-frame-options`, `x-content-type-options`, `cache-control`, and `x-xss-protection`. Now, {{% variables/apibuilder_prod_name %}} responds with these HTTP headers.
* #5502: Previously, the documentation for configuring `ldap` authentication within `conf/default.js` was incorrect. Now, the documentation for that aspect is corrected.

## Updated modules

* [@axway/api-builder-runtime@4.6.37](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.6.37)
* [@axway/api-builder-admin@1.7.3](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.7.3)
* [@axway/api-builder@4.5.7](https://www.npmjs.com/package/@axway/api-builder/v/4.5.7)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@2.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.2.0)

{{% releasenotes/previous %}}
