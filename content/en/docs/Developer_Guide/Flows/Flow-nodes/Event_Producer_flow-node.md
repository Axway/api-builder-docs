---
title: Event Producer flow-node
linkTitle: Event producer flow-node
description: ADD A DESCRIPTION
weight: 80
date: 2021-05-17
---

## Overview

The **Event Produce**r flow-node is part of the **Event** plugin, `@axway/api-builder-plugin-ft-event`. The plugin also contains an [Event Consumer](/docs/developer_guide/flows/flow-triggers/event_consumer_flow-trigger/), flow-trigger, and both work together to enable an event to be emitted from a flow that will trigger another flow via the [Event Consumer](/docs/developer_guide/flows/flow-triggers/event_consumer_flow-trigger/) flow-trigger. It is a mechanism that can be used to kick-off flows that run concurrently. It is useful for spinning off relevant tasks, e.g. "new order" flow might emit a "check-inventory" event and kick off a flow that checks inventory and issues re-stock purchase orders if necessary.

To install the Event plugin, execute the following command:

```bash
npm install @axway/api-builder-plugin-ft-event
```

For additional getting started information, refer to the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/).

## Methods

The following sections provide details of the available **Event Producer** flow-node methods.

### Emit event

Emits an event that can be handled by the event protocol.

#### Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| Event name | String | The name of the event to emit to be handled by the event flow-trigger. | Selector, String | Yes |
| Data | Any | The data to emit. | Any | No |

#### Outputs

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | Any | Successfully emitted an event. |  |
| Error | Any | An unexpected error was encountered. | $.error |

## How to use the Event Producer

After the installation of the Event plugin and editing a flow, you will find the **Event Producer** flow-node in the list of available **Flow-Nodes > Core** in the left-hand panel of the flow editor:

![image2021-4-16_11_14_20](/Images/image2021-4-16_11_14_20.png)

You can drag and drop the **Event Producer** flow-node into the flow graph on the right. It is auto-selected and its properties are revealed in the panel on the right:

![image2021-4-20_11_23_57](/Images/image2021-4-20_11_23_57.png)

Configure your **Event Producer** in the example below.

![image2021-4-20_11_24_51](/Images/image2021-4-20_11_24_51.png)

An equivalent **[Event Consumer](/docs/developer_guide/flows/flow-triggers/event_consumer_flow-trigger/)** flow-trigger is required to receive this event. Please refer to that documentation for a more detailed example.
