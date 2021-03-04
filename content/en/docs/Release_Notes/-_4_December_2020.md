---
title: '- Calgary'
linkTitle: '- Calgary'
weight: 50
date: 2021-03-02
---

## Summary

This release includes:

* [Upgrade](#upgrade)

* [Features](#features)

* [Fixes](#fixes)

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

* #6609: Flow-trigger parameter values are now validated in the Flow editor.

* #6627: Added new parameter `startImmediately` to @axway/api-builder-plugin-ft-timer flow-trigger to so that it can be configured not to wait for the configured `interval` before triggering the Flow for the first time.

## Fixes

* #6577: Previously, the @axway/api-builder-plugin-ft-timer flow-trigger called flows in series when triggers had the same interval. This would end up causing flows to execute much later than expected if the first flows to be invoked took a long time. Now, these flows will be executed in parallel instead.

* #6625: Previously, the Kafka trigger could throw "undefined" instead of the real error when configured incorrectly. Now, the correct error is thrown and handled by {{% variables/apibuilder_prod_name %}}.

* #6646: Previously, using a flow-trigger with a disabled channel would result in other flow-triggers of the same type failing to register. Now, the service will abort on startup when a flow-trigger is using a disabled channel, or an invalid or missing flow.

* #6651: Updated highlight.js dependency to fix security vulnerability [CVE-2020-26237](https://github.com/advisories/GHSA-vfrc-7r7c-w9mx).

## Updated modules

* [@axway/api-builder-admin@1.30.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.30.0)

* [@axway/api-builder-runtime@4.45.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.45.0)

## Updated plugins

* [@axway/api-builder-plugin-ft-timer@0.2.1](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-timer/v/0.2.1)

* [@axway/api-builder-plugin-ft-solace@0.2.1](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-solace/v/0.2.1)

* [@axway/api-builder-plugin-ft-kafka@0.2.1](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka/v/0.2.1)

## Known Issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues/).
