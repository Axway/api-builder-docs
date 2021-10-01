---
title: Phoenix release notes
linkTitle: Phoenix
date: 2019-03-15
description: 15 March 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}
## Fixes

* 5263: Log Plugin load errors and stack traces
* 5469: Fix names for Model Flow-Nodes when the Model name starts with the Connector name
* 5573: Flow-node outputs are missing schema in Flow Editor
* 5585: Improve the UI's detection of server restarts

## Release notes

* #5263: Previously, when a Plugin fails to load, the stack trace of the error was hidden. Now, the stack trace will be logged at debug level.
* #5469: Previously, Flow-Nodes for models may have broken names when the model name began with the connector name. For example, a model called "compositeFoo" created with the composite connector would have the name "oo". And a model called "composite" would have no name to display. Now, the Flow-Node names retain the original model name.
* #5573: Previously, a regression caused outputs in the Flow Editor to have a missing schema popover. Now, the schema will be displayed as previously.
* #5585: Previously, {{% variables/apibuilder_prod_name %}} UI would sometimes fail to detect when the server finished restarting after updates (e.g. after modifying configuration) and either take a long time to detect (e.g. 40 seconds), or sometimes timeout with a "Restart failure". Now, {{% variables/apibuilder_prod_name %}} will detect the server restarted within three seconds of a restart.

## Updated modules

* [@axway/api-builder-runtime@4.9.1](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.9.1)
* [@axway/api-builder-admin@1.9.11](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.9.11)
* [@axway/api-builder@4.5.14](https://www.npmjs.com/package/@axway/api-builder/v/4.5.14)

## Updated plugins

* [@axway/api-builder-plugin-dc-oracle@2.3.1](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/2.3.1)
* [@axway/api-builder-plugin-fn-swagger@2.3.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.3.0)
* [axway-flow-sdk@3.1.1](https://www.npmjs.com/package/axway-flow-sdk/v/3.1.1)


{{% releasenotes/previous %}}
