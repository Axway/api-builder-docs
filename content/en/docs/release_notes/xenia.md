---
title: Xenia release notes
linkTitle: Xenia
date: 2020-09-25
description: 25 September 2020
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6547: Added togglable 'Basic' and 'Advanced' modes to Flow debugger that allows providing values for all Flow input parameters.

## Fixes

* #6558: Fixed regression with the @axway/api-builder-plugin-fn-json `Stringify` method where the `Value` parameter was incorrectly limited to be a string type. Now, this limitation has been removed and any type of data can be used as long as it can be JSON stringified.

## Updated modules

* [@axway/amplify-api-builder-cli@1.11.1](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.11.1)
* [@axway/api-builder@4.20.1](https://www.npmjs.com/package/@axway/api-builder/v/4.20.1)
* [@axway/api-builder-admin@1.25.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.25.0)
* [@axway/api-builder-runtime@4.36.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.36.0)

## Updated plugins

* [@axway/api-builder-plugin-fn-json@4.0.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/4.0.1)
* [@axway/api-builder-plugin-ft-timer@0.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-timer/v/0.2.0)
* [@axway/api-builder-plugin-ft-event@0.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-event/v/0.1.1)
* [@axway/api-builder-plugin-ft-solace@0.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-solace/v/0.2.0)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues).

{{% releasenotes/previous %}}
