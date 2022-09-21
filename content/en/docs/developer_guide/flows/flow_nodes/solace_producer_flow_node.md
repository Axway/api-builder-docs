---
title: Solace producer flow-node
linkTitle: Solace producer flow-node
weight: 200
date: 2021-10-01
---

## Overview

The **Solace Producer** flow-node writes messages to [Solace](https://solace.com/) topics. Using Solace is useful when implementing an [event-driven microservice architecture](https://medium.com/trendyol-tech/event-driven-microservice-architecture-91f80ceaa21e).

It is part of the **Solace** plugin, `@axway/api-builder-plugin-ft-solace.` The plugin also contains a [**Solace Consumer** flow-trigger](/docs/developer_guide/flows/flow_triggers/solace_consumer_flow_trigger/) and the [**Solace Acknowledge** flow-node](/docs/developer_guide/flows/flow_nodes/solace_acknowledge_flow_node/). They can be used independently in that your application may only just publish messages to Solace, it does not necessarily have to consume them.

You can install the Solace plugin from the **Plugins** page, or execute the following command:

```bash
npm install @axway/api-builder-plugin-ft-solace
```

For additional getting started information, refer to the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started/).

Methods

The following sections provide details of the available Solace Producer flow-node methods.

### Publish String

Publish text message as String to Solace topic.
<!-- lint disable no-duplicate-headings -->
#### Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| Connection ID | String | The Solace Connection ID, which can be found in the details of the Solace Consumer flow-trigger | Selector, String | Yes |
| Destination name | String | The topic or queue name to publish the message. | Selector, String | Yes |
| Delivery mode | String | The message delivery mode, one of: Direct (default), Persistent, Non-persistent. | Selector, String | No |
| Destination type | String | The Solace consumer type, one of: Queue, Topic (default). | Selector, String | No |
| Message | Any | The message to be published. | Any | Yes |

#### Outputs

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | Any | Successfully published message to Solace topic. |  |
| Error | Object | Unexpected error when publishing to Solace topic. | $.error |
<!-- lint enable no-duplicate-headings -->
### Publish JSON

JSON encodes and publishes a message to a Solace topic.
<!-- lint disable no-duplicate-headings -->
#### Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| Connection ID | String | The Solace Connection ID, which can be found in the details of the Solace Consumer flow-trigger | Selector, String | Yes |
| Destination name | String | The topic or queue name to publish the message. | Selector, String | Yes |
| Delivery mode | String | The message delivery mode, one of: Direct (default), Persistent, Non-persistent. | Selector, String | No |
| Destination type | String | The Solace consumer type, one of: Queue, Topic (default). | Selector, String | No |
| Message | Any | The message to publish. The value will be JSON encoded before sending. | Any | Yes |

#### Outputs

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | Any | Successfully published message to Solace topic. |  |
| Error | Object | Unexpected error when publishing to Solace topic. | $.error |
<!-- lint enable no-duplicate-headings -->
### Publish Binary

Publish message with attached binary to Solace topic.
<!-- lint disable no-duplicate-headings -->
#### Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| Connection ID | String | The Solace Connection ID, which can be found in the details of the Solace Consumer flow-trigger | Selector, String | Yes |
| Destination name | String | The topic or queue name to publish the message. | Selector, String | Yes |
| Delivery mode | String | The message delivery mode, one of: Direct (default), Persistent, Non-persistent. | Selector, String | No |
| Destination type | String | The Solace consumer type, one of: Queue, Topic (default). | Selector, String | No |
| Message | Any | The message to be published. | Any | Yes |

#### Outputs

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | Any | Successfully published message to Solace topic. |  |
| Error | Object | Unexpected error when publishing to Solace topic. | $.error |
<!-- lint enable no-duplicate-headings -->

## How to use the Solace Producer

After the installation of the Solace plugin, you will find the **Solace Producer** flow-node in the list of available **Flow-Nodes > Core** in the left-hand panel of the flow editor:

![image2021-4-20_16_17_38](/Images/image2021_4_20_16_17_38.png)

### Prerequisites

This example requires the example from the [Solace Consumer flow-trigger](/docs/developer_guide/flows/flow_triggers/solace_consumer_flow_trigger/#create-a-consumer-flow). The **Solace Consumer** is required to be created before this example so that it creates a valid **Connection ID** that will be used in this example.

### Example - Publish JSON to Solace

First create a new flow following the instructions on [Create a new Flow](/docs/developer_guide/flows/manage_flows/create_a_new_flow/) page.

Once you have created a new blank flow, you will want to drag and drop the **Solace Producer** from the **Flow-Nodes > Core** panel on the left, into the flow graph on the right.

![Solace flow-node](/Images/solace_flow_node_configure.png)

In this example, we will encode an Object as JSON and publish it to a Solace topic, "messages". Configure the flow-node to have the properties as shown below. The **Connection ID** that is used here is a string identifier and can be found on the flow that contains the **Solace Consumer** configuration panel (e.g. "Consumer Flow"). Unless you have more than one, it is typically just, "solace".

![Solace flow-node encoding JSON](/Images/solace_flow_node_configure_message.png)

Click on the debugger icon in the upper-right of the graph, do not change any values, and click **Execute Flow**, and check your console debug log, you should see:

```log
# Solace Producer debug output
1618853664944 DEBUG [request-id: a4d271b4-fbd8-4bcb-8a6e-d5f86fae7242] Flow invoked by debugger: Solace Producer
1618853664944 DEBUG [request-id: a4d271b4-fbd8-4bcb-8a6e-d5f86fae7242] Waiting: Publish JSON (solace.1)
1618853664944 DEBUG [request-id: a4d271b4-fbd8-4bcb-8a6e-d5f86fae7242] Invoking: Publish JSON (solace.1)
1618853664959 DEBUG [request-id: a4d271b4-fbd8-4bcb-8a6e-d5f86fae7242] Publish JSON (solace.1) route: []
1618853664959 DEBUG [request-id: a4d271b4-fbd8-4bcb-8a6e-d5f86fae7242] Flow debugging completed: Solace Producer
```

The flow-node successfully published JSON to Solace.

{{% alert title="Note" color="primary" %}}It is not possible for your application to behave _only_ as a Solace producer. For more information, see [Example - Behave only as a Solace Producer](#example-behave-only-as-a-solace-producer) below.{{% /alert %}}

### Example - Behave only as a Solace Producer

It is not possible for your application to behave _only_ as a Solace producer. This is because the Solace server configuration settings on the [Solace Consumer](/docs/developer_guide/flows/flow_triggers/solace_consumer_flow_trigger/) flow-trigger configuration panel, and it is a limitation with the product that flow-trigger connections cannot be managed independently. It is possible for your application to behave as a Solace Producer, but it is necessary to create a **Solace Consumer**, and then manually disable it. Follow the instructions to create a [Solace Consumer](/docs/developer_guide/flows/flow_triggers/solace_consumer_flow_trigger/), and then in a text editor, edit your `triggers/solace.yaml` file, and manually disable the flow-trigger by setting the "solace-1" flow-trigger property "enabled" to `false (line 15)`:

```yaml:
# solace.yaml
channels:
  solace:
    name: Solace
    enabled: true
    parameters:
      url: 'tcp://localhost:55555'
      vpnName: default
      userName: admin
      password: admin
triggers:
  solace-1:
    name: Solace Consumer
    parameters:
      topicName: messages
    enabled: false
    invoke:
      flow: SolaceConsumer
      parameters:
        request: $.request.message
    channel: solace
```
