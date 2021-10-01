---
title: Dubai release notes
linkTitle: Dubai
date: 2020-12-18
description: 18 December 2020
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6633: Added a new flow-node [@axway/api-builder-plugin-fn-xslt](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-xslt) to transform XML documents using [XSLT](https://www.w3.org/TR/xslt-10/). Pay close attention to the module's [README](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-xslt) as it has special installation requirements.
* #6660: Flow-trigger's Flow input parameters are now editable and validated in the Flow editor.
* #6665: Flow triggers can now be deleted from within the Flow editor.
* #6667: Previously, Kafka flow-trigger and flow-node parameters were lacking sufficient validation. This meant that providing empty values to certain parameters would cause the flow-trigger or flow-node to error. Now, the schema validation for these parameters has been improved, allowing the problem to be caught in the flow-editor before saving.

## Fixes

* #6662: Previously, the swagger was only accepting a string value for the author information from package.json and was throwing error if an object provided. Now, it will accept both object and string value for author.
* #6666: Previously, when a flow-trigger failed to be created in production, the error message did not show the flow-trigger which failed, or the reason for failure. Now, both the flow-trigger and the reason are included as part of the error.
* #6668: Previously, Solace flow-node parameters were lacking sufficient validation. This meant that providing empty values to certain parameters would cause the flow-node to error. Now, the schema validation for these parameters has been improved, allowing the problem to be caught in the flow-editor before saving.

## Updated modules

* [@axway/api-builder-admin@1.34.1](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.34.1)
* [@axway/api-builder-runtime@4.49.2](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.49.2)
* [@axway/api-builder-sdk@1.0.9](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.0.9)
* [@axway/api-builder-test-utils@1.1.6](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.1.6)

## Updated plugins

* [@axway/api-builder-plugin-ft-solace@0.3.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-solace/v/0.3.0)
* [@axway/api-builder-plugin-ft-kafka@0.3.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka/v/0.3.0)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues).

{{% releasenotes/previous %}}
