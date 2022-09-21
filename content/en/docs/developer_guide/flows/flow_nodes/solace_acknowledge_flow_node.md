---
title: Solace Acknowledge flow-node
linkTitle: Solace Acknowledge flow-node
weight: 200
date: 2021-10-01
---

## Overview

The **Solace Acknowledge** flow-node sends an [application acknowledgment](https://docs.solace.com/API/API-Developer-Guide/Acknowledging-Messages.htm?Highlight=acknowledge) to the Solace event broker.

It is part of the **Solace** plugin, `@axway/api-builder-plugin-ft-solace.`, and is used along with the [**Solace Consumer** flow-trigger](/docs/developer_guide/flows/flow_triggers/solace_consumer_flow_trigger/) when connected to a queue that is configured with a `Client` Queue acknowledge mode. If the Queue acknowledge mode is set to `Auto`, the **Solace Consumer** flow-trigger will automatically send an application acknowledgment to the Solace event broker and this flow-node is not required.

You can install the Solace plugin from the **Plugins** page, or execute the following command:

```bash
npm install @axway/api-builder-plugin-ft-solace
```

For additional getting started information, refer to the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started/).

Methods

The following sections provide details of the available Solace Acknowledge flow-node methods.

### Acknowledge

Acknowledge message receipt for Solace queues.
#### Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| Solace Consumer request | Object | The request object from a Solace Consumer flow-trigger where "Queue acknowledge mode" is set to "Auto" | Selector | Yes |

#### Outputs

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | none | Successfully acknowledged Solace message receipt. |  |
| Error | Object | Unexpected error when acknowledging Solace message receipt. | $.error |
<!-- lint enable no-duplicate-headings -->

## How to use the Solace Acknowledge flow-node

After the installation of the Solace plugin, you will find the **Solace Acknowledge** flow-node in the list of available **Flow-Nodes > Core** in the left-hand panel of the flow editor:

![solace_acknowledge_flow_node](/Images/solace_acknowledge_flow_node.png)

Configure the **Solace Acknowledge** flow-node in the position of the flow where you are ready to acknowledge the message.
