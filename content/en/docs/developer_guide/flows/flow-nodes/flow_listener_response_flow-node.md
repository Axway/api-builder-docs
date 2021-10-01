---
title: Flow listener response flow-node
linkTitle: Flow listener response flow-node
weight: 90
date: 2021-10-01
---

## Overview

The **Invoke Listener Response** flow-node is part of the **Invoke Flow** plugin, `@axway/api-builder-plugin-invoke-flow`. The plugin also contains the [Flow Listener](/docs/developer_guide/flows/flow-triggers/flow_listener_flow-trigger/) flow-trigger, and the [Invoke Flow](/docs/developer_guide/flows/flow-nodes/invoke_flow_flow-node/) flow-node, and are used together to enable one flow to invoke a another flow. It is a mechanism that can be used to create reusable flows. It can be used to invoke a flow once or multiple times, looping over an array of items. The **Invoke Listener Response** flow-node is the response from a flow that was previously configured with a [Flow Listener](/docs/developer_guide/flows/flow-triggers/flow_listener_flow-trigger/) flow-trigger, to identify the flow to invoke, and **must** be executed from **every** possible code path in the flow attached to the **Flow Listener**. It supports setting a "successful" or "error" response.

To install the plugin, execute the following command:

```bash
npm install @axway/api-builder-plugin-invoke-flow
```

For additional getting started information, refer to the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started/).

## Methods

The following sections provide details of the available **Flow Listener Response** flow-node method.

### Set Response

Sets the response for the executing **Flow Listener** to be returned to the flow that called **Invoke Flow** flow-node. If the response **Is error** is false, then the calling **Invoke Flow** flow-node will receive the **Data** as a successful response. If **Is error** is true, then the calling **Invoke Flow** flow-node will receive the **Data** as an error response, triggering the **Error** output.

#### Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| Is error | boolean | Indicates that the response is an error. This will cause the **Invoke Flow** to trigger the **Error** output with this value. | Selector, Boolean | Yes |
| Data | any | The result to be returned to the flow that called **Invoke Flow**. | Selector, Any | No |

#### Outputs

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | any | Response set successfully. | `$.result` |
| Error | any | Unexpected error occurred. | `$.error` |

## How to use the plugin

See [Flow Listener](/docs/developer_guide/flows/flow-triggers/flow_listener_flow-trigger/#how-to-use-the-plugin) flow-trigger for an example on how to use the plugin.
