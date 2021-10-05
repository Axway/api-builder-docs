---
title: Yako release notes
linkTitle: Yako
date: 2019-08-02
description: 2 August 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #5892: Support auto-select of initial parameter type for flow-nodes
* #5924: Add Mustache flow-node
* #5956: Include JavaScript flow-node in all new applications

## Fixes

* #4811: Fix Bootstrap XSS vulnerability
* #5912: Fix lodash.merge prototype pollution
* #5920: Update .dockerignore file with .git and coverage
* #5954: Modifying outputs in the Flow Editor causes value to change to "jsonpath"
* #5957: Fix marked Regular Expression Denial of Service (ReDoS) vulnerability


## Release notes

* #4811: Previously, RetireJS security scans of {{% variables/apibuilder_prod_name %}} would report that it was using a vulnerable dependency on bootstrap@3.3.7. Now, the dependency is no longer reported.
* #5892: Flow-nodes now support defining an initial type for parameters in the UI, other than always being a selector. For example, template fields could have their `initialType` set to `string`. See [Axway Flow SDK](/docs/developer_guide/flows/axway_flow_sdk/) for more information.
* #5912: Previously, when using "npm install" on an {{% variables/apibuilder_prod_name %}} project, npm would alert that "lodash.merge" had a high alert for Prototype Pollution (\[https://nodesecurity.io/advisories/1067\]). Now, the alert has been resolved by removing the dependency.
* #5920: Previously, the .dockerignore file that comes with a scaffolded {{% variables/apibuilder_prod_name %}} service did not include .git, coverage, and .nyc_output folders. Now, those folders are added.
* #5924: The UI now renders a specialized Mustache editor with syntax highlighting for flow-node parameters which are defined with "format": "mustache" and "type": "string" in their schema.
* #5954: Previously, there was a regression which meant flow-node outputs were un-editable, causing the value to always change to "jsonpath". Now, outputs can be edited again.
* #5956: The {{% variables/apibuilder_prod_name %}} CLI will now include the JavaScript flow-node in all new projects.
* #5957: Previously, when using "npm install" on an {{% variables/apibuilder_prod_name %}} project, npm would alert that "marked" had a low alert for Regular Expression Denial of Service (\[https://www.npmjs.com/advisories/1076\]). Now, the alert has been resolved by updating the dependency.

## Updated modules

* [@axway/api-builder-runtime@4.12.6](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.12.6)
* [@axway/api-builder-admin@1.10.24](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.10.24)
* [@axway/api-builder@4.8.0](https://www.npmjs.com/package/@axway/api-builder/v/4.8.0)

## Updated plugins

* [@axway/api-builder-plugin-fn-base64@2.0.12](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/2.0.12)
* [@axway/api-builder-plugin-fn-dot@2.0.12](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/2.0.12)
* [@axway/api-builder-plugin-fn-javascript@1.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/1.1.1)
* [@axway/api-builder-plugin-fn-json@2.0.12](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/2.0.12)
* [@axway/api-builder-plugin-fn-restclient@2.0.15](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.15)
* [@axway/api-builder-plugin-fn-mustache@1.0.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache/v/1.0.1)
* [axway-flow-sdk@3.4.0](https://www.npmjs.com/package/axway-flow-sdk/v/3.4.0)

{{% releasenotes/previous %}}
