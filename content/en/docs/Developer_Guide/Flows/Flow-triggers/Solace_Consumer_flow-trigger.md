---
title: Solace consumer flow-trigger
linkTitle: Solace consumer flow-trigger
description: ADD A DESCRIPTION
weight: 40
date: 2021-06-22
---

## Overview

The **Solace Consumer** flow-trigger reads messages from [Solace](https://solace.com/) topics. Using Solace is useful when implementing an [event-driven microservice architecture](https://medium.com/trendyol-tech/event-driven-microservice-architecture-91f80ceaa21e).

It is part of the **Solace** plugin, `@axway/api-builder-plugin-ft-solace.` The plugin also contains a [**Solace Producer** flow-node](/docs/developer_guide/flows/flow-nodes/solace_producer_flow-node/). They can be used independently in that your application may only just consume messages from Solace, it does not necessarily have to publish them.

You can install the Solace plugin from the **Plugins** page, or execute the following command:

```bash
npm install @axway/api-builder-plugin-ft-solace
```

For additional getting started information, refer to the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/).

## Flow-trigger details

The following sections provide details of the available **Solace Consumer** parameters.

### Connection Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| URL | String | The URL of the messaging service to connect to. | Selector, String | Yes |
| VPN name | String | The Message VPN name that the client is requesting for this session. | Selector, String | Yes |
| Username | String | The client username required for authentication. | Selector, String | Yes |
| Password | String | The password required for authentication. | Selector, String | Yes |
| Connect retries | String | The number of times to retry connecting during initial connection setup. | Selector, String | No |
| Connect timeout | String | The timeout period in milliseconds for a connect operation to the given URL. | Selector, String | No |

{{% alert title="⚠️ Note" color="primary" %}}There is only one Solace **Connection** configuration managed by the UI. All Solace flow-triggers share the same **Connection** configuration and have the **Connection ID** "solace".{{% /alert %}}

### Trigger Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| Topic | String | The topic to which to subscribe. | Selector, String | Yes |
| Request timeout | String | The request timeout period in milliseconds for subscribing to and unsubscribing from topics. | Selector, String | No |
| Message format | String | Automatically decode messages from the \`topic\`. If you do not know the message format, then use \`binary\`. One of: JSON | string | binary | Selector, String | No |

## Quick start

We recommend that you first get familiar with [Solace Concepts](https://docs.solace.com/Solace-PubSub-Platform.htm). To get started using the Solace flow-trigger, you need to have access to a Solace server.

Alternatively, you can run Solace in a docker container:

```
// Start a message broker container named

$ docker run -d -p 8082:8080 -p 55555:55555 -p:8008:8008 -p:1883:1883 -p:8000:8000 -p:5672:5672 -p:9000:9000 -p:2222:2222 --shm-size=2g --env username_admin_globalaccesslevel=admin --env username_admin_password=admin --name=solace solace/solace-pubsub-standard
```

If some of these ports are already used on your machine you can change them accordingly. For more information [see Solace documentation page](https://solace.com/products/event-broker/software/getting-started/).

## How to use the Solace Consumer flow-trigger

### Example - Consume JSON messages

In this example, we will create a "Consumer flow" and configure it to consume JSON messages from a Solace topic, "messages".

#### Create a Consumer flow

Follow the instructions on [Create a new flow](/docs/developer_guide/flows/manage_flows/create_a_new_flow/) to create a "Consumer flow". Once you have created a new flow, you will want to drag the **Solace Consumer** from the **Flow-Nodes > Flow-Triggers** panel on the left, into the flow graph on the right.

Configure the flow-node to have the properties as shown below:

![image2021-4-20_15_10_29](/Images/image2021_4_20_15_10_29.png)

This configures the **Solace Consumer** to receive JSON messages from the "messages" topic. However, we also need to configure the **Connection** details. Scroll the **Solace Consumer** property panel to the bottom, and enter your Solace server's details. This example is using the default values used in [how to run Solace service is a Docker container tutorial](https://solace.com/products/event-broker/software/getting-started/). Maker sure you adjust them accordingly if you have changed those values when starting the Solace container.

![image2021-4-20_11_50_37](/Images/image2021_4_20_11_50_37.png)

We will also want to assign the Solace message to a variable that will be used in the flow, but first we need to understand what a Solace **Message** actually is so that we can work with it. The **Solace Consumer** outputs a **Message** value called `$.request`, which can be seen on the **Outputs** tab.

![image2021-4-20_11_51_31](/Images/image2021_4_20_11_51_31.png)

If you click the info icon ![image2021-4-16_15_15_7](/Images/image2021_4_16_15_15_7.png) , it will display the JSON schema for **Message**.

```
// JSON schema for Message

{
  "properties": {
    "value": {
      "description": "The message payload. The type of data depends on the configured \"Message format\"."
    }
  }
}
```

In this example, we are only interested in the `message` property so that it can be provided to the flow to configure it to use the **Message** value. Click on the **Flow inputs** tab, and change the **request** input to assign `$.request.value` to the flow's **request** input.

![image2021-4-22_15_0_54](/Images/image2021_4_22_15_0_54.png)

On the **Flow inputs** tab, it lists the optional named inputs that can be provided to the flow: **request**, **config**, and **env**. These keys are hard-coded into the flow and their JSONPath selectors are provided automatically. The **request** maps the output of the **Solace Consumer** as input into the flow, so we want to change the value of **request** to `$.request.value` (this selects the `value` property from the **Message** object). From within the flow, the respective input values can be accessed as `$.request`, `$.config`, and `$.env`. Alternatively, you can leave the default mapping of **request** to `$.request` and then you still will be able to access the `value` property of the **Message** within the flow with `$.request.value`selector.

Now, let's do something with `$.request` by adding the **Mustache** flow-node to the graph, and configuring **Data** to be `$.request`, and the **Template** to be "`{{data}}`" (without quotes).

![image2021-4-20_11_52_57](/Images/image2021_4_20_11_52_57.png)

Now the flow is ready to be triggered by a **Solace Producer**. However, let's verify that the flow works as expected. Click on the debugger icon in the upper-right of the graph to reveal the debug panel. Change the "request" to have a JSON message with the value "Hello!" as we plan on this flow receiving a JSON input from the "Producer flow".

![image2021-4-20_11_54_1](/Images/image2021_4_20_11_54_1.png)

Click **Execute Flow**. The flow editor will not show much, just a message, "Flow successfully executed with no response". However, if you check the console window where you launched your {{% variables/apibuilder_prod_name %}} project, you see a detailed debug log showing the execution, and that it handled the "Hello!" message as expected:

```
// Flow output

1618852657607 DEBUG [request-id: 8a6373d1-47a2-45e5-8937-8ae16efd3296] Flow invoked by debugger: Consumer Flow
1618852657608 DEBUG [request-id: 8a6373d1-47a2-45e5-8937-8ae16efd3296] Waiting: Format string (mustache.1)
1618852657609 DEBUG [request-id: 8a6373d1-47a2-45e5-8937-8ae16efd3296] Invoking: Format string (mustache.1)
1618852657610 DEBUG [request-id: 8a6373d1-47a2-45e5-8937-8ae16efd3296]   Format string (mustache.1) route: []
1618852657610 DEBUG [request-id: 8a6373d1-47a2-45e5-8937-8ae16efd3296]   Format string (mustache.1) writing "Hello!" to ctx as: $.value
1618852657610 DEBUG [request-id: 8a6373d1-47a2-45e5-8937-8ae16efd3296] Flow debugging completed: Consumer Flow
```

Once you are happy with the results you can save the flow and if the connection to Solace server is successful you will see the flow-trigger status is enabled:

![image2021-4-20_15_11_48](/Images/image2021_4_20_15_11_48.png)

#### Create a Producer flow

To verify the created above Consumer flow, follow the [Solace Producer flow-node guide](/docs/developer_guide/flows/flow-nodes/solace_producer_flow-node/) to create a "Producer flow" to write JSON to the Solace topic called "messages". Publishing with the Producer flow to the same topic will trigger the execution of the Consumer flow.
