---
title: Kalamitsi release notes
linkTitle: Kalamitsi
date: 2021-04-09
description: 9 April 2021
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6788: Previously, all the Flows were listed under the URL /project/triggers in the UI. Now, it is moved to /project/flows.
* #6808: Added a new flow-node for logging messages from flows.

## Fixes

* #6802: Previously, the Kafka Producer in Kafka flow-trigger @axway/api-builder-plugin-ft-kafka was ignoring the configured advanced options when creating connections. Now, those are taken into account and Kafka Producer connections are configured correctly.
* #6803: Modified the startup order to ensure that the {{% variables/apibuilder_prod_name %}} Admin is loaded after flow-triggers. This makes the {{% variables/apibuilder_prod_name %}} Console URL more accessible after the server has started.
* #6805: Fixed a memory leak when the application reloads.

## Updated modules

* [@axway/api-builder-runtime@4.61.1](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.61.1)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues).

{{% releasenotes/previous %}}
