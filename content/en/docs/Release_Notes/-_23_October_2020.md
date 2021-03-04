---
title: '- Zagreb'
linkTitle: '- Zagreb'
weight: 80
date: 2021-03-02
---

## Summary

This release includes:

* [Upgrade](#upgrade)

* [Features](#features)

* [Fixes](#fixes)

* [Deprecations](#deprecations)

* [Updated Modules](#updated-modules)

* [Plugins](#updated-plugins)

* [Known Issues](#known-issues)

## Upgrade

Before updating, we recommend deleting package-lock.json if it exists.

To update an existing {{% variables/apibuilder_prod_name %}} application, execute the following command from within the application directory:

```bash
npm update
```

## Features

* #6500: Specifying the 'model' property on a custom API is now taken into account for defining the output model/schema in the generated API doc. See deprecation [\[D044\]](#D044).

* #6587: Trigger names now can be edited and saved from the flow editor.

## Fixes

* #6591: Previously, the `Data` parameter in the Mustache flow-node's `Format string` method had a default type of `string`, but this value made the most sense to be provided as a selector. Now, it will default to the selector type.

* #6595: Fixed regression in the Flow editor where flow-nodes with lots of outputs would not grow in width, leaving the outputs disconnected.

## Deprecations

These are the deprecations introduced in this release. Click [here](/docs/deprecations/) for a list of all deprecations.

* **\[[D044](/docs/deprecations/#D044)\] API.response**: `response` property on the [custom API](/docs/developer_guide/apis/) is deprecated in favor of the `model` property. The `model` property serves the same purpose in that the named model is used to describe the response schema in the generated API Swagger documentation.

## Updated modules

* [@axway/api-builder-admin@1.27.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.27.0)

* [@axway/api-builder-runtime@4.39.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.39.0)

* [@axway/api-builder-sdk@1.0.7](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.0.7)

* [@axway/api-builder-test-utils@1.1.4](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.1.4)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@2.9.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.9.1)

* [@axway/api-builder-plugin-fn-mustache@1.0.7](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache/v/1.0.7)

* [@axway/api-builder-plugin-ft-event@0.1.2](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-event/v/0.1.2)

## Known Issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues/).
