---
title: Removal of codeblocks
linkTitle: Removal of codeblocks
weight: 28
deprecation: D028
date: 2021-10-01
---

{{% alert title="Note" color="primary" %}}This document describes deprecation {{% deprecation/link D028 %}}{{% /alert %}}

## Why we are making this change

The [Codeblock](/docs/developer_guide/flows/flow_nodes/codeblock_flow_node/) was meant to be a way for users to create reusable JavaScript functions for Flows, akin to a custom flow-node. However, it was always a difficult feature to use, could not be managed from the UI, and over time {{% variables/apibuilder_prod_name %}} added several features that allow users to make better use of JavaScript, such as the [axway-flow-sdk](https://www.npmjs.com/package/axway-flow-sdk) to build custom flow-nodes, and the [@axway/api-builder-plugin-fn-javascript](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript) flow-node.

## How does this impact my service

If you have a `./codeblocks` directory, and it contains files (.js and .json), then your application is impacted by this change.

## Upgrading codeblocks

You need to decide if you want to create a reusable flow-node using [axway-flow-sdk](https://www.npmjs.com/package/axway-flow-sdk), or if the code is suitable for the JavaScript flow-node [@axway/api-builder-plugin-fn-javascript](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript). Follow the guides for [Creating a custom flow-node](/docs/how_to/create_a_custom_flow_node/), or using the [JavaScript flow-node](/docs/developer_guide/flows/flow_nodes/javascript_flow_node/). Once you migrate all of the Codeblocks and adjust your Flows accordingly, then you can safely delete the `./codeblocks` directory.
