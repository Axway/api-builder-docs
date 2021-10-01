---
title: Prague release notes
linkTitle: Prague
date: 2020-06-05
description: 5 June 2020
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* 6337: Migrate test helpers from @axway/api-builder-sdk into its own module @axway/api-builder-test-utils
* 6441: Update @axway/api-builder-sdk to 1.0.0

## Release notes

* #6337: Introduced new module [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils) which includes test utils for Plugins such as `MockLogger` and `MockRuntime`.
* #6441: Updated CLI to use new [@axway/api-builder-sdk](https://www.npmjs.com/package/@axway/api-builder-sdk) 1.0.
* #6441: Released [@axway/api-builder-sdk](https://www.npmjs.com/package/@axway/api-builder-sdk) 1.0. Learn more about it [here](https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/api_builder_sdk.html). Features include:

    * Simpler YAML/JSON flow-node definition.
    * Greatly simplified the interface for `action` methods where outputs are removed in favor of return/throw and two outputs, Next and Error.
    * Added `pluginContext` to allow plugins to maintain state.
    * Simplified the unit-testing capabilities to test action response and output callback distinctly.
    * Support for plugin configuration via runtime and unit-test.
    * Merged action req.parameters and req.authorizations into a single argument, `params`.
    * Fixed issue with certain method names clashing with {{% variables/apibuilder_prod_name %}} flow engine internals by prohibiting use of certain method names (see [@axway/api-builder-sdk](https://www.npmjs.com/package/@axway/api-builder-sdk)).

## Updated modules

* [@axway/amplify-api-builder-cli@1.7.0](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.7.0)
* [@axway/api-builder@4.19.0](https://www.npmjs.com/package/@axway/api-builder/v/4.19.0)
* [@axway/api-builder-admin@1.17.5](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.17.5)
* [@axway/api-builder-runtime@4.27.29](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.27.29)
* [@axway/api-builder-sdk@1.0.0](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.0.0)
* [@axway/api-builder-test-utils@1.0.0](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.0.0)

## Updated plugins

* [@axway/api-builder-plugin-fn-base64@2.1.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/2.1.5)
* [@axway/api-builder-plugin-fn-javascript@1.2.6](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/1.2.6)
* [@axway/api-builder-plugin-fn-json@2.0.16](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/2.0.16)
* [@axway/api-builder-plugin-fn-restclient@2.0.22](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.22)
* [@axway/api-builder-plugin-fn-swagger@2.7.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.7.5)
* [@axway/api-builder-plugin-fn-mustache@1.0.6](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache/v/1.0.6)


{{% releasenotes/previous %}}
