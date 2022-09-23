---
title: Christie release notes
linkTitle: Christie
description: 23 September 2022
date: 2022-09-23
Hide_readingtime: true
---
## Summary
In this release we added support for publishing and subscribing to queues in the Solace plugin.

{{% releasenotes/update %}}

<!-- ## Breaking changes -->

## Features
* #7443: Added support for publishing and subscribing to queues in the Solace plugin.
* #7443: Added support for manual application acknowledgement for messages from Solace queues using the new [**Solace Acknowledge** flow-node](/docs/developer_guide/flows/flow_nodes/solace_acknowledge_flow_node/).

<!-- ## Fixes -->

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
## Updated modules
* [@axway/api-builder-admin@5.0.2](https://www.npmjs.com/package/@axway/api-buil
der-admin/v/5.0.2)
* [@axway/api-builder-oas-flow-node@3.0.1](https://www.npmjs.com/package/@axway/
api-builder-oas-flow-node/v/3.0.1)
* [@axway/api-builder-runtime@5.0.2](https://www.npmjs.com/package/@axway/api-bu
ilder-runtime/v/5.0.2)
* [@axway/api-builder-sdk@2.0.1](https://www.npmjs.com/package/@axway/api-builde
r-sdk/v/2.0.1)
* [@axway/api-builder-test-utils@2.0.1](https://www.npmjs.com/package/@axway/api
-builder-test-utils/v/2.0.1)

## Updated plugins
* [@axway/api-builder-plugin-fn-base64@5.0.1](https://www.npmjs.com/package/@axw
ay/api-builder-plugin-fn-base64/v/5.0.1)
* [@axway/api-builder-plugin-fn-javascript@4.0.1](https://www.npmjs.com/package/
@axway/api-builder-plugin-fn-javascript/v/4.0.1)
* [@axway/api-builder-plugin-fn-json@5.0.1](https://www.npmjs.com/package/@axway
/api-builder-plugin-fn-json/v/5.0.1)
* [@axway/api-builder-plugin-fn-logger@2.0.1](https://www.npmjs.com/package/@axw
ay/api-builder-plugin-fn-logger/v/2.0.1)
* [@axway/api-builder-plugin-fn-mustache@2.0.1](https://www.npmjs.com/package/@a
xway/api-builder-plugin-fn-mustache/v/2.0.1)
* [@axway/api-builder-plugin-fn-restclient@3.0.1](https://www.npmjs.com/package/
@axway/api-builder-plugin-fn-restclient/v/3.0.1)
* [@axway/api-builder-plugin-fn-swagger@4.0.1](https://www.npmjs.com/package/@ax
way/api-builder-plugin-fn-swagger/v/4.0.1)
* [@axway/api-builder-plugin-fn-xslt@4.0.1](https://www.npmjs.com/package/@axway
/api-builder-plugin-fn-xslt/v/4.0.1)
* [@axway/api-builder-plugin-ft-event@2.0.1](https://www.npmjs.com/package/@axwa
y/api-builder-plugin-ft-event/v/2.0.1)
* [@axway/api-builder-plugin-ft-kafka@2.0.1](https://www.npmjs.com/package/@axwa
y/api-builder-plugin-ft-kafka/v/2.0.1)
* [@axway/api-builder-plugin-ft-oas@2.0.1](https://www.npmjs.com/package/@axway/
api-builder-plugin-ft-oas/v/2.0.1)
* [@axway/api-builder-plugin-ft-solace@2.1.0](https://www.npmjs.com/package/@axw
ay/api-builder-plugin-ft-solace/v/2.1.0)
* [@axway/api-builder-plugin-invoke-flow@2.0.1](https://www.npmjs.com/package/@a
xway/api-builder-plugin-invoke-flow/v/2.0.1)

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
