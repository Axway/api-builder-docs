---
title: Madrid release notes
linkTitle: Madrid
date: 2021-05-07
description: 7 May 2021
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}
## Fixes

* #6833: Flow-node log messages are now consistently prefixed with the flow-node's display name. For users writing custom flow-nodes, this change applies to all logs made by the flow-node action logger. Additionally, when a flow-node invokes, the name of the method being invoked is now also logged.
* #6855: The [Kafka flow-trigger](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka) now logs Kafka client messages at trace level, reducing the verbosity of the {{% variables/apibuilder_prod_name %}} logs. Error and warning messages are logged as normal.
* #6856: Previously, while running in production and under conditions where startup takes a long time, it was possible for a flow-trigger to start and then for the connection to become unstable (e.g. if a Kafka server went down) before the server finished starting, and if that happened, the server would be in an inconsistent state (unstable and not started), and error with `TypeError: Cannot read property 'error' of undefined`. Now, the server handles this unstable condition on startup and exits cleanly in production.
* #6856: Previously, flow-triggers could trigger while {{% variables/apibuilder_prod_name %}} was still starting. Now, flow-triggers will only trigger after the server has started.
* #6856: The programmatic `server.start()` function on the {{% variables/apibuilder_prod_name %}} instance, now returns a promise and can be awaited with more modern JavaScript, rather than having to provide a callback or listen for an event.
* #6857: Previously, while shutting down the server, data connectors still had open connections and could prevent the process from exiting. Now, {{% variables/apibuilder_prod_name %}} ensures that these are disconnected.
* #6859: Previously, it was possible for the flow editor to render a blank page when a flow is configured to use flow-triggers due to a race condition. Now, the race condition is fixed and the flow editor will display as expected.
* #6865: Fixed issue with fork [@livereach/jsonpath](https://www.npmjs.com/package/@livereach/jsonpath) that made it vulnerable to [CVE-2021-23358](https://nvd.nist.gov/vuln/detail/CVE-2021-23358). Replaced forked module with original [jsonpath.](https://www.npmjs.com/package/jsonpath)
* #6868: Previously, if {{% variables/apibuilder_prod_name %}} was running in a protected environment where there was restricted access to the "triggers" directory, {{% variables/apibuilder_prod_name %}} would silently not load any triggers because it was incorrectly attempting to get write access, which failed. Now, {{% variables/apibuilder_prod_name %}} will only look for write access to the "triggers" directory in [development mode](/docs/best_practices/).

## Updated modules

* [@axway/api-builder-admin@1.42.5](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.42.5)
* [@axway/api-builder-runtime@4.64.1](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.64.1)
* [@axway/api-builder-sdk@1.1.5](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.1.5)
* [@axway/api-builder-test-utils@1.1.12](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.1.12)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@2.9.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.9.3)
* [@axway/api-builder-plugin-ft-kafka@1.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka/v/1.1.0)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues/).

{{% releasenotes/previous %}}
