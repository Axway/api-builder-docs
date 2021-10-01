---
title: Ibiza release notes
linkTitle: Ibiza
date: 2021-03-12
description: 12 March 2021
Hide_readingtime: true
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

* #6497: All plugins that export flow-triggers will now be validated on startup.
* #6655: Improved Flow-Trigger logs to include the Flow-Trigger ID and a unique "request ID" in order to differentiate and correlate different flow invocations by the same Flow-Trigger.
* #6738: Previously, the schema used for validating Flow-Triggers on start up was too permissive. Now, the schema is more restrictive and any problems caught will abort start up.
* #6742: Added a new Flow-Trigger for scheduling a Flow execution via cron-style expressions.
* #6746: Added "Share your feedback" link to banner.

## Fixes

* #6639: Previously, {{% variables/apibuilder_prod_name %}} would send a stack trace with certain HTTP 500 responses. Now, a stack trace will only be printed in the console and never sent to clients.
* #6695: Previously, when downloading proxy services from the Amplify Unified Catalog, the {{% variables/apibuilder_prod_name %}} CLI required "`--client-id apicentral`" to be provided when logging in. Now, users can access the Catalog without providing a client-id on login.
* #6713: Renamed the @axway/api-builder-plugin-ft-event flow-trigger and flow-node from "Event" to "Event Consumer" and "Event Producer" and moved the flow-node to the "Core" category. The plugin no longer installs sample configuration files and flows.
* #6714: Renamed the @axway/api-builder-plugin-ft-kafka flow-trigger and flow-node from "Kafka" to "Kafka Consumer" and "Kafka Producer" and moved the flow-node to the "Core" category. The plugin no longer installs sample configuration files and flows.
* #6715: Renamed the @axway/api-builder-plugin-ft-solace flow-trigger and flow-node from "Solace" to "Solace Consumer" and "Solace Producer" and moved the flow-node to the "Core" category. The plugin no longer installs sample configuration files and flows.
* #6745: @axway/api-builder-plugin-ft-timer does not install sample triggers and flows anymore.

## Updated modules

* [@axway/amplify-api-builder-cli@1.14.2](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.14.2)
* [@axway/api-builder@4.23.2](https://www.npmjs.com/package/@axway/api-builder/v/4.23.2)
* [@axway/api-builder-admin@1.39.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.39.0)
* [@axway/api-builder-runtime@4.60.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.60.0)

## Updated plugins

* [@axway/api-builder-plugin-ft-cron@0.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-cron/v/0.1.0)
* [@axway/api-builder-plugin-ft-timer@0.2.3](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-timer/v/0.2.3)
* [@axway/api-builder-plugin-ft-event@0.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-event/v/0.2.0)
* [@axway/api-builder-plugin-ft-solace@0.4.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-solace/v/0.4.0)
* [@axway/api-builder-plugin-ft-kafka@0.5.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka/v/0.5.0)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues/).
