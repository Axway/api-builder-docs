---
title: Zagreb release notes
linkTitle: Zagreb
date: 2020-10-23
description: 23 October 2020
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6500: Specifying the 'model' property on a custom API is now taken into account for defining the output model/schema in the generated API doc. See deprecation {{% deprecation/link D044 %}}.
* #6587: Trigger names now can be edited and saved from the flow editor.

## Fixes

* #6591: Previously, the `Data` parameter in the Mustache flow-node's `Format string` method had a default type of `string`, but this value made the most sense to be provided as a selector. Now, it will default to the selector type.
* #6595: Fixed regression in the Flow editor where flow-nodes with lots of outputs would not grow in width, leaving the outputs disconnected.

{{% releasenotes/deprecations %}}

## Updated modules

* [@axway/api-builder-admin@1.27.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.27.0)
* [@axway/api-builder-runtime@4.39.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.39.0)
* [@axway/api-builder-sdk@1.0.7](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.0.7)
* [@axway/api-builder-test-utils@1.1.4](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.1.4)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@2.9.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.9.1)
* [@axway/api-builder-plugin-fn-mustache@1.0.7](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache/v/1.0.7)
* [@axway/api-builder-plugin-ft-event@0.1.2](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-event/v/0.1.2)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues).

{{% releasenotes/previous %}}
