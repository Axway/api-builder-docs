---
title: Kharkiv release notes
linkTitle: Kharkiv
date: 2020-03-27
description: 27 March 2020
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #5012: Add authorization support to the {{% variables/apibuilder_prod_name %}} SDK
* #6176: Add support for community components
* #6265: Provide service directory to plugins
* #6277: Support OAS3 in api-builder-plugin-fn-swagger

## Fixes

* #6252: Builder emits Responses with no Request
* #6283: Fixed internal issues with dependencies

## Release notes

* #5012: Added 'authorization' method in {{% variables/apibuilder_prod_name %}} SDK that allows defining the available authorizations for a method.
* #6176: Added support for listing plugins provided by community.
* #6252: Previously, requests from the UI for static resources would log a "Response" at info level (with no corresponding "Request"). Now, requests for UI static resources are logged at trace level.
* #6265: {{% variables/apibuilder_prod_name %}} now provides the service directory as `options.appDir` to plugins.
* #6277:[@axway/api-builder-plugin-fn-swagger](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger) now supports OAS 2 and OAS 3. Please see the [README](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger) for supported features.
* #6283: Fixed internal issues with dependencies.

## Updated modules

* [@axway/api-builder-sdk@0.2.1](https://www.npmjs.com/package/@axway/api-builder-sdk/v/0.2.1)
* [@axway/api-builder-runtime@4.27.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.27.0)
* [@axway/api-builder-admin@1.16.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.16.0)

## Updated plugins

* [@axway/api-builder-plugin-fn-restclient@2.0.20](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.20)
* [@axway/api-builder-plugin-fn-swagger@2.7.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.7.0)


{{% releasenotes/previous %}}
