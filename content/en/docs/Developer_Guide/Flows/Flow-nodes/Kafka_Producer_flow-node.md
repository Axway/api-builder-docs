---
title: Kafka producer flow-node
linkTitle: Kafka producer flow-node
description: ADD A DESCRIPTION
weight: 120
date: 2021-06-22
---

## Overview

The **Kafka Producer** flow-node writes messages to [Apache Kafka](https://kafka.apache.org/) topics. Using Apache Kafka is useful when implementing an [event-driven microservice architecture](https://medium.com/trendyol-tech/event-driven-microservice-architecture-91f80ceaa21e).

It is part of the **Kafka** plugin, `@axway/api-builder-plugin-ft-kafka.` The plugin also contains a [Kafka Consumer](/docs/developer_guide/flows/flow-triggers/kafka_consumer_flow-trigger/) flow-trigger. They can be used independently in that your application may only just publish messages to Kafka, it does not necessarily have to consume them.

You can install the **Kafka** plugin from the **Plugins** page, or execute the following command:

```bash
npm install @axway/api-builder-plugin-ft-kafka
```

For additional getting started information, refer to the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/).

## Methods

The following sections provide details of the available **Kafka Producer** flow-node methods.

### Publish String

Publishes a string message to the Kafka topic.

#### Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| Connection ID | String | The Kafka Connection ID, which can be found in the details of the Kafka Consumer flow-trigger. | Selector, String | Yes |
| Topic | String | The topic. | Selector, String | Yes |
| Message | Any | The message to publish. | Any | Yes |
| Headers | Object | Send additional headers with the message. | Selector, Object | No |
| Key | String | Works together with Partition. If Key provided, but not Partition, Kafka will choose a partition based on a hash of the Key. See: [https://kafka.js.org/docs/producing#options](https://kafka.js.org/docs/producing#options) | Selector, String | No |
| Partition | Number | Works together with Key. If Partition provided, but not Key, Kafka will use the partition. See: [https://kafka.js.org/docs/producing#options](https://kafka.js.org/docs/producing#options) | Selector, Number | No |
| Acknowledge | String | Controls the number of acknowledgements required. If "All", all replicas must acknowledge (default); if "None", does not wait for acknowledgement; if "Leader", only waits for the leader to acknowledge. | Selector, String | No |
| Meta-data max age | Number | The period of time in milliseconds after which we force a refresh of metadata even if we have not seen any partition leadership changes to proactively discover any new brokers or partitions. | Selector, Number | No |
| Response timeout | Number | The time to await a response in ms. | Selector, Number | No |
| Transaction timeout | Number | The maximum amount of time in ms that the transaction coordinator will wait for a transaction status update from the producer before proactively aborting the ongoing transaction. If this value is larger than the transaction.max.timeout.ms setting in the broker, the request will fail with a InvalidTransactionTimeout error | Selector, Number | No |
| Allow auto-topic creation | Boolean | Allow topic creation when querying metadata for non-existent topics. | Selector, Boolean | No |
| Compression | String | Enables or disables compression. | Selector, String | No |

#### Outputs

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | Any | Successfully published the message. |  |
| Error | Any | An unexpected error was encountered. | $.error |

### Publish JSON

JSON encodes and publishes a message to a Kafka topic.

#### Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| Connection ID | String | The Kafka Connection ID, which can be found in the details of the Kafka Consumer flow-trigger. | Selector, String | Yes |
| Topic | String | The topic. | Selector, String | Yes |
| Message | Any | The message to publish. The value will be encoded as JSON encoded before sending. | Any | Yes |
| Headers | Object | Send additional headers with the message. | Selector, Object | No |
| Key | String | Works together with Partition. If Key provided, but not Partition, Kafka will choose a partition based on a hash of the Key. See: [https://kafka.js.org/docs/producing#options](https://kafka.js.org/docs/producing#options) | Selector, String | No |
| Partition | Number | Works together with Key. If Partition provided, but not Key, Kafka will use the partition. See: [https://kafka.js.org/docs/producing#options](https://kafka.js.org/docs/producing#options) | Selector, Number | No |
| Acknowledge | String | Controls the number of acknowledgements required. If "All", all replicas must acknowledge (default); if "None", does not wait for acknowledgement; if "Leader", only waits for the leader to acknowledge. | Selector, String | No |
| Meta-data max age | Number | The period of time in milliseconds after which we force a refresh of metadata even if we have not seen any partition leadership changes to proactively discover any new brokers or partitions. | Selector, Number | No |
| Response timeout | Number | The time to await a response in ms. | Selector, Number | No |
| Transaction timeout | Number | The maximum amount of time in ms that the transaction coordinator will wait for a transaction status update from the producer before proactively aborting the ongoing transaction. If this value is larger than the transaction.max.timeout.ms setting in the broker, the request will fail with a InvalidTransactionTimeout error | Selector, Number | No |
| Allow auto-topic creation | Boolean | Allow topic creation when querying metadata for non-existent topics. | Selector, Boolean | No |
| Compression | String | Enables or disables compression. | Selector, String | No |

#### Outputs

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | Any | Successfully published the message. |  |
| Error | Any | An unexpected error was encountered. | $.error |

### Publish Binary

Publishes a binary message to Kafka topic.

#### Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| Connection ID | String | The Kafka Connection ID, which can be found in the details of the Kafka Consumer flow-trigger. | Selector, String | Yes |
| Topic | String | The topic. | Selector, String | Yes |
| Message | Any | The message to publish. | Any | Yes |
| Headers | Object | Send additional headers with the message. | Selector, Object | No |
| Key | String | Works together with Partition. If Key provided, but not Partition, Kafka will choose a partition based on a hash of the Key. See: [https://kafka.js.org/docs/producing#options](https://kafka.js.org/docs/producing#options) | Selector, String | No |
| Partition | Number | Works together with Key. If Partition provided, but not Key, Kafka will use the partition. See: [https://kafka.js.org/docs/producing#options](https://kafka.js.org/docs/producing#options) | Selector, Number | No |
| Acknowledge | String | Controls the number of acknowledgements required. If "All", all replicas must acknowledge (default); if "None", does not wait for acknowledgement; if "Leader", only waits for the leader to acknowledge. | Selector, String | No |
| Meta-data max age | Number | The period of time in milliseconds after which we force a refresh of metadata even if we have not seen any partition leadership changes to proactively discover any new brokers or partitions. | Selector, Number | No |
| Response timeout | Number | The time to await a response in ms. | Selector, Number | No |
| Transaction timeout | Number | The maximum amount of time in ms that the transaction coordinator will wait for a transaction status update from the producer before proactively aborting the ongoing transaction. If this value is larger than the transaction.max.timeout.ms setting in the broker, the request will fail with a InvalidTransactionTimeout error | Selector, Number | No |
| Allow auto-topic creation | Boolean | Allow topic creation when querying metadata for non-existent topics. | Selector, Boolean | No |
| Compression | String | Enables or disables compression. | Selector, String | No |

#### Outputs

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | Any | Successfully published the message. |  |
| Error | Any | An unexpected error was encountered. | $.error |

## How to use the Kafka Producer

### Example - Publish JSON to Kafka

In this example, we will encode an Object as JSON and publish it to a Kafka topic, "messages". This example requires a [Kafka Consumer](/docs/developer_guide/flows/flow-triggers/kafka_consumer_flow-trigger/) flow-trigger to be created first so that it creates a valid **Connection ID** that will be used later in your **Kafka Producer**.

Follow the instructions on [Create a new flow](/docs/developer_guide/flows/manage_flows/create_a_new_flow/) to create a "Producer flow". In this flow, you will want to drag the **Kafka Producer** from the **Flow-Nodes > Flow-Triggers** panel on the left, into the flow graph on the right. Configure the flow-node to have the properties as shown below.

![image2021-4-20_16_12_23](/Images/image2021_4_20_16_12_23.png)

The **Connection ID** that is used here is a string identifier and can be found on the flow that contains the **Kafka Consumer** configuration panel (e.g. "Consumer Flow"). Unless you have more than one, it is typically just, "kafka".

![image2021-4-20_15_27_42](/Images/image2021_4_20_15_27_42.png)

Click on the debugger icon in the upper-right of the graph, do not change any values, and click **Execute Flow**, and check your console debug log, you should see:

```
// Kafka Producer debug output

1618820290122 DEBUG [request-id: 95956b63-9390-4270-b0d4-e78839c69eee] Flow invoked by debugger: Kafka Producer
1618820290123 DEBUG [request-id: 95956b63-9390-4270-b0d4-e78839c69eee] Waiting: Publish String (kafka.1)
1618820290123 DEBUG [request-id: 95956b63-9390-4270-b0d4-e78839c69eee] Invoking: Publish String (kafka.1)
1618820290125 DEBUG [type: kafka] [Connection: kafka] Getting producer connection {"transactionTimeout":0}
1618820290532 DEBUG [request-id: 95956b63-9390-4270-b0d4-e78839c69eee]   finished flow-node Publish JSON (kafka.1) route: []
1618820290533 DEBUG [request-id: 95956b63-9390-4270-b0d4-e78839c69eee] Flow debugging completed: Kafka Producer
```

The flow-node successfully published JSON to Kafka.

{{% alert title="⚠️ Note" color="primary" %}}It is not possible for your application to behave _only_ as a Kafka Producer. For more information, see [Example - Behave only as a Kafka Producer](#kafka-producer-only) below.{{% /alert %}}

### Example - Behave only as a Kafka Producer

It is not possible for your application to behave _only_ as a Kafka producer. This is because the Kafka server configuration settings on the [Kafka Consumer](/docs/developer_guide/flows/flow-triggers/kafka_consumer_flow-trigger/) flow-trigger configuration panel, and it is a limitation with the product that flow-trigger connections cannot be managed independently. It is possible for your application to behave as a Kafka Producer, but it is necessary to create a **Kafka Consumer**, and then manually disable it. Follow the instructions to create a [Kafka Consumer](/docs/developer_guide/flows/flow-triggers/kafka_consumer_flow-trigger/), and then in a text editor, edit your `triggers/kafka.yaml` file, and manually disable the flow-trigger by setting the "kafka-1" flow trigger property "enabled" to `false` (line 8):

```
// kafka.yaml

triggers:
  kafka-1:
    name: Kafka Consumer
    parameters:
      groupId: group-1
      messageFormat: string
      topic: messages
    enabled: false
    invoke:
      flow: NewFlow
      parameters:
        request: $.request
    channel: kafka
channels:
  kafka:
    enabled: true
    name: Kafka Consumer
    parameters:
      brokers: 'localhost:9092'
      clientId: client-1
```
