---
title: Invoke flow flow-node
linkTitle: Invoke flow flow-node
weight: 110
date: 2021-10-01
---

## Overview

The **Invoke Flow** flow-node is part of the **Invoke Flow** plugin, `@axway/api-builder-plugin-invoke-flow`. The plugin also contains the [Flow Listener](/docs/developer_guide/flows/flow_triggers/flow_listener_flow_trigger/) flow-trigger, and the [Flow Listener Response](/docs/developer_guide/flows/flow_nodes/flow_listener_response_flow_node/) flow-node, and all work together to enable one flow to invoke a different flow. It is a mechanism that can be used to create reusable flows. It can be used to invoke a flow once or multiple times, looping over an array of items. The **Invoke Flow** flow-node will use an existing unique **Flow Listener ID**, previously configured with a [Flow Listener](/docs/developer_guide/flows/flow_triggers/flow_listener_flow_trigger/) flow-trigger, to identify the flow to invoke. It supports two methods **Invoke Flow**, which is a single invoke, and **Invoke Flow (for-each)**, which will invoke a flow for each item in an array.

To install the plugin, execute the following command:

```bash
npm install @axway/api-builder-plugin-invoke-flow
```

For additional getting started information, refer to the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started/).

## Methods

The following sections provide details of the available **Invoke Flow** flow-node methods.

### Invoke Flow

Invokes a flow identified by **Flow Listener ID** with the parameter **Data**, if provided. When the flow is invoked, the value of **Data** will be provided as `$.request` (it will be `undefined` if not provided).

#### Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| Flow Listener ID | string | A unique identifier previously set on a [Flow Listener](/docs/developer_guide/flows/flow_triggers/flow_listener_flow_trigger/) flow-trigger. This value is case-sensitive. | Selector, String | Yes |
| Data | any | The data to send to the flow. | Any | No |

#### Outputs

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | any | The data returned by the flow. | `$.flowResponse` |
| Error | any | The flow did not respond successfully. | `$.error` |

### Invoke Flow (for-each)

Invokes a flow identified by **Flow Listener ID** for each item in the **Items** array. If the Items array is empty, the **Next** output will be triggered with an empty array. If any error is encountered, the **Error** output will be triggered. If **Break on error** is true, array execution will stop on the first error encountered, and the **Error** output will be triggered.

#### Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| Flow Listener ID | string | A unique identifier previously set on a [Flow Listener](/docs/developer_guide/flows/flow_triggers/flow_listener_flow_trigger/) flow-trigger. | Selector, String | Yes |
| Items | any | The data to send to the flow. | Any | Yes |
| Break on error | boolean | If true, this will break out of the flow invocation loop when the first error occurs. When using **Concurrency mode**, all remaining requests currently being executed will be processed before breaking. | Selector, Boolean | No |
| Concurrency | integer | By default, items in the **Items** array are processed concurrently in chunks of 10. This value can be set to 0 to process all items in **Items** concurrently, or set to 1 to disable concurrency, or set to a value greater-than 1 to provide a throttling mechanism so as to not overwhelm a backend. | Selector, Integer | No |

#### Outputs

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | any | The data returned by the flow. | `$.flowResponse` |
| Error | any | The flow did not respond successfully. | `$.error` |

## How to use the plugin

See [Flow Listener](/docs/developer_guide/flows/flow_triggers/flow_listener_flow_trigger/#how-to-use-the-plugin) flow-trigger for an example on how to use the plugin.
