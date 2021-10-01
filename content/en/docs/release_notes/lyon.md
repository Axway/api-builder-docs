---
title: Lyon release notes
linkTitle: Lyon
date: 2021-04-23
description: 23 April 2021
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6560: Flow-triggers are now officially released and ready to be used in production. The first available flow-triggers are Timer, Cron, Kafka, Solace and Event, and can be installed from the Plugins tab in the UI.

## Fixes

* #6799: Log messages that are printed when {{% variables/apibuilder_prod_name %}} becomes unstable due to flow-trigger connectivity issues are now printed at error level instead of debug.

## Updated modules

* [@axway/api-builder-admin@1.42.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.42.0)
* [@axway/api-builder-runtime@4.63.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.63.0)

## Updated plugins

* [@axway/api-builder-plugin-ft-timer@1.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-timer/v/1.0.0)
* [@axway/api-builder-plugin-ft-event@1.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-event/v/1.0.0)
* [@axway/api-builder-plugin-ft-solace@1.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-solace/v/1.0.0)
* [@axway/api-builder-plugin-ft-kafka@1.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka/v/1.0.0)
* [@axway/api-builder-plugin-ft-cron@1.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-cron/v/1.0.0)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues/).

{{% releasenotes/previous %}}
