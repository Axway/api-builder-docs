---
title: Roberttown release notes
linkTitle: Roberttown
date: 2021-07-16
description: 16 July 2021
Hide_readingtime: true
---

## Summary

This release includes:

* [Upgrade](#upgrade)
* [Features](#features)
* [Fixes](#fixes)
* [Deprecations](#deprecations)
* [Updated Modules](#updated-modules)
* [Known Issues](#known-issues)

## Upgrade

Before updating, we recommend deleting package-lock.json if it exists.

To update an existing {{% variables/apibuilder_prod_name %}} application, execute the following command from within the application directory:

```bash
npm update
```

## Features

* #6727: Previously, Swagger 2.0 endpoint methods "get" and "head" could process body payloads if configured to do so. Now, this behavior is deprecated and body payloads will be ignored. See deprecation [\[D050\]](#D050).

## Fixes

* #6939: Previously, a generic error could occur while editing or composing a new model which contained certain field properties like "custom". It was not possible to see the cause of the error. This was common when composing a model from generated MSSQL models. Now, the error has been resolved, and any future errors while validating new models are logged to the console.

## Deprecations

These are the deprecations introduced in this release. Click [here](/docs/deprecations/) for a list of all deprecations.

* **\[[D050](/docs/deprecations/#D050)\] enableStrictBodyPayloads**: HTTP methods GET and HEAD will ignore payload body. Enabling this flag is recommended for security purposes. This will be the default behavior in all new services. For more information on how to be prepared for the change, refer to [Change in the way body is handled for HTTP methods GET and HEAD](/docs/deprecations/change_in_the_way_body_is_handled_for_http_methods_get_and_head/).

## Updated modules

* [@axway/amplify-api-builder-cli@1.17.5](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.17.5)
* [@axway/api-builder@4.26.5](https://www.npmjs.com/package/@axway/api-builder/v/4.26.5)
* [@axway/api-builder-admin@1.44.9](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.44.9)
* [@axway/api-builder-runtime@4.67.1](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.67.1)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues/).
