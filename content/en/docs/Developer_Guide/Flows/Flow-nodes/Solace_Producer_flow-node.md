---
title: Solace Producer flow-node
linkTitle: Solace producer flow-node
description: ADD A DESCRIPTION
weight: 180
date: 2021-05-17
---

## Overview

The **Solace Producer** flow-node writes messages to [Solace](https://solace.com/) topics. Using Solace is useful when implementing an [event-driven microservice architecture](https://medium.com/trendyol-tech/event-driven-microservice-architecture-91f80ceaa21e).

It is part of the **Solace** plugin, `@axway/api-builder-plugin-ft-solace.` The plugin also contains a [**Solace Consumer** flow-trigger](/docs/developer_guide/flows/flow-triggers/solace_consumer_flow-trigger/). They can be used independently in that your application may only just publish messages to Solace, it does not necessarily have to consume them.

You can install the Solace plugin from the **Plugins** page, or execute the following command:

```bash
npm install @axway/api-builder-plugin-ft-solace
```

For additional getting started information, refer to the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/).

Methods

The following sections provide details of the available Solace Producer flow-node methods.

### Publish String

Publish text message as String to Solace topic.

#### Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| Connection ID | String | The Solace Connection ID, which can be found in the details of the Solace Consumer flow-trigger | Selector, String | Yes |
| Topic | String | The topic where messages are published. | Selector, String | Yes |
| Message | Any | The message to be published. | Any | Yes |

#### Outputs

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | Any | Successfully published message to Solace topic. |  |
| Error | Any | Unexpected error when publishing to Solace topic. | $.error |

### Publish JSON

JSON encodes and publishes a message to a Solace topic.

#### Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| Connection ID | String | The Solace Connection ID, which can be found in the details of the Solace Consumer flow-trigger | Selector, String | Yes |
| Topic | String | The topic where messages are published. | Selector, String | Yes |
| Message | Any | The message to publish. The value will be JSON encoded before sending. | Any | Yes |

#### Outputs

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | Any | Successfully published message to Solace topic. |  |
| Error | Any | Unexpected error when publishing to Solace topic. | $.error |

### Publish Binary

Publish message with attached binary to Solace topic.

#### Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| Connection ID | String | The Solace Connection ID, which can be found in the details of the Solace Consumer flow-trigger | Selector, String | Yes |
| Topic | String | The topic where messages are published. | Selector, String | Yes |
| Message | Any | The message to be published. | Any | Yes |

#### Outputs

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | Any | Successfully published message to Solace topic. |  |
| Error | Any | Unexpected error when publishing to Solace topic. | $.error |

## Prerequisite

We recommend that you first get familiar with [Solace Concepts](https://docs.solace.com/Solace-PubSub-Platform.htm). To get started using the Solace flow-trigger, you need to have access to a Solace server.

Alternatively, you can run Solace in a docker container:

```
// Start a message broker container named

$ docker run -d -p 8082:8080 -p 55555:55555 -p:8008:8008 -p:1883:1883 -p:8000:8000 -p:5672:5672 -p:9000:9000 -p:2222:2222 --shm-size=2g --env username_admin_globalaccesslevel=admin --env username_admin_password=admin --name=solace solace/solace-pubsub-standard
```

If some of these ports are already used on your machine you can change them accordingly. For more information see [Solace documentation](https://solace.com/products/event-broker/software/getting-started/).

## How to use the Solace Producer

After the installation of the Solace plugin, you will find the **Solace Producer** flow-node in the list of available **Flow-Nodes > Core** in the left-hand panel of the flow editor:

![image2021-4-20_16_17_38](/Images/image2021-4-20_16_17_38.png)

To use it in your flows drag and drop the **Solace Producer** flow-node into the flow graph on the right and select a method to expand its details and configure it:

![image2021-4-20_16_17_5](/Images/image2021-4-20_16_17_5.png)

### Example - Publish JSON to Solace

In this example, we will encode an Object as JSON and publish it to a Solace topic, "messages". This example requires a [Solace Consumer](/docs/developer_guide/flows/flow-triggers/solace_consumer_flow-trigger/) flow-trigger to be created first so that it creates a valid **Connection ID** that will be used later in your **Kafka Producer**.

#### Create a Producer Flow

First create a new flow following the instructions on [Create a new Flow](/docs/developer_guide/flows/manage_flows/create_a_new_flow/) page. Once you have created a new blank flow, you will want to drag the **Solace Producer** from the **Flow-Nodes > Core** panel on the left, into the flow graph on the right. Configure the flow-node to have the properties as shown below:

![image2021-4-20_16_15_45](/Images/image2021-4-20_16_15_45.png)

The **Connection ID** that is used here is a string identifier and can be found on the flow that contains the **Solace Consumer** configuration panel (e.g. "Consumer Flow"). Unless you have more than one, it is typically just, "solace".

![image2021-4-20_15_11_48](/Images/image2021-4-20_15_11_48.png)

Click on the debugger icon in the upper-right of the graph, do not change any values, and click **Execute Flow**, and check your console debug log, you should see:

```
// Solace Producer debug output

1618853664944 DEBUG [request-id: a4d271b4-fbd8-4bcb-8a6e-d5f86fae7242] Flow invoked by debugger: Solace Producer
1618853664944 DEBUG [request-id: a4d271b4-fbd8-4bcb-8a6e-d5f86fae7242] Waiting: Publish JSON (solace.1)
1618853664944 DEBUG [request-id: a4d271b4-fbd8-4bcb-8a6e-d5f86fae7242] Invoking: Publish JSON (solace.1)
1618853664959 DEBUG [request-id: a4d271b4-fbd8-4bcb-8a6e-d5f86fae7242] Publish JSON (solace.1) route: []
1618853664959 DEBUG [request-id: a4d271b4-fbd8-4bcb-8a6e-d5f86fae7242] Flow debugging completed: Solace Producer
```

The flow-node successfully published JSON to Solace.

{{% alert title="⚠️ Note" color="primary" %}}It is not possible for your application to behave _only_ as a Solace Producer. For more information, see [Example - Behave only as a Solace Producer](#BehaveonlyasaSolaceProducer) below.{{% /alert %}}

### Example - Behave only as a Solace Producer

It is not possible for your application to behave _only_ as a Solace Producer. This is because the Solace server configuration settings on the [Solace Consumer](/docs/developer_guide/flows/flow-triggers/solace_consumer_flow-trigger/) flow-trigger configuration panel, and it is a limitation with the product that flow-trigger connections cannot be managed independently. It is possible for your application to behave as a Solace Producer, but it is necessary to create a **Solace Consumer**, and then manually disable it. Follow the instructions to create a [Solace Consumer](/docs/developer_guide/flows/flow-triggers/solace_consumer_flow-trigger/), and then in a text editor, edit your `triggers/solace.yaml` file, and manually disable the flow-trigger by setting the "solace-1" flow trigger property "enabled" to `false (line 15)`:

```
// solace.yaml

channels:
  solace:
    name: Solace
    enabled: true
    parameters:
      url: 'tcp://localhost:55556'
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
