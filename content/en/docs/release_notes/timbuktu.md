---
title: Timbuktu release notes
linkTitle: Timbuktu
date: 2021-08-13
description: 13 August 2021
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6975: Added feature to enable tracking {{% variables/apibuilder_prod_name %}} transaction usage to the {{% variables/platform_prod_name %}} for billing purposes. See [Track usage for your subscription](/docs/how_to/track_usage_for_your_subscription/#configuration) for more information.
* #6999: The MockLogger in @axway/api-builder-test-utils can now log to the console by providing `LOG_LEVEL=trace` as an environment variable when running your unit tests. Accepted values are (in order of most-verbose to least) _trace_, _debug_, _info_, _warn_, _error_ and _fatal_.

## Fixes

* #6958: Previously, errors trapped by [Express](https://expressjs.com/) would log directly to console using `console.error`. Now, those errors will be logged at debug level using the {{% variables/apibuilder_prod_name %}} logger.
* #6992: Fixed a regression from @axway/api-builder-plugin-fn-mustache@1.0.6 where `Data` would only accept string values. Now, any type is accepted.
* #7000: Previously, when writing code within the JavaScript flow-node, it was possible to enter a specific sequence of text, "new Error" that would cause the text to be saved to disk truncated and prohibit further editing. This was due to a failure in jshint, the component responsible for providing visual feedback in the editor. Now, the issue is resolved.
* #7004: Previously, `@axway/api-builder-plugin-fn-javascript` failed to execute code with trailing comments. Now, code executes as expected.

## Updated modules

* [@axway/api-builder-admin@1.44.12](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.44.12)
* [@axway/api-builder-runtime@4.68.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.68.0)
* [@axway/api-builder-sdk@1.1.12](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.1.12)
* [@axway/api-builder-test-utils@1.3.0](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.3.0)

## Updated plugins

* [@axway/api-builder-plugin-fn-javascript@3.0.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/3.0.1)
* [@axway/api-builder-plugin-fn-mustache@1.0.9](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache/v/1.0.9)
* [@axway/api-builder-plugin-ft-event@1.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-event/v/1.1.0)
* [@axway/api-builder-plugin-invoke-flow@1.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-invoke-flow/v/1.1.0)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues/).

{{% releasenotes/previous %}}
