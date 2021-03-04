---
title: Flow Triggers
linkTitle: Flow Triggers
weight: 90
date: 2021-03-02
---

{{% alert title="❗️ Flow-triggers are experimental" color="danger" %}}Flow-triggers are an experimental feature, added in the [Shanghai release](/docs/release_notes/-_17_july_2020/).

* You should **not** use this feature in production.

* Upgrade is **not** supported.

* This feature may break between releases, even patches.

* You should only use flow-triggers on newly created projects, and for preview use only.

Feedback is greatly appreciated.

Contact [support@axway.com](mailto:support@axway.com) if you require assistance.{{% /alert %}}

The flow-triggers feature is a new way to invoke flows. Previously, the only way to invoke flows was through [API Endpoints](/docs/developer_guide/flows/manage_endpoints/). From the [Shanghai release](/docs/release_notes/-_17_july_2020/) onward, we will be adding many ways to invoke flows, such as timers, events, and queues, using various protocols such as [Kafka](https://kafka.apache.org/) and [Solace](https://solace.com/).

## Concepts

There are two main concepts with respect to flow-triggers: channels and flow-triggers.

* **Channel** - A channel is a communication bridge between a subscriber and a publisher. It is optional as not all flow-trigger plugins would have channels (e.g. the @axway/api-builder-plugin-ft-timer does not have channels). A flow-trigger plugin would use channels if it requires a reusable communication channel to be shared between flow-triggers. A typical channel would be an external connection. Channels can have configuration parameters, and these can be [environmentalized](/docs/how_to/environmentalization/).

* **Flow-triggers** - A flow-trigger is the subscriber that will trigger invoking a flow when it receives an event. Flow-triggers can have configuration parameters, and these can be [environmentalized](/docs/how_to/environmentalization/).

## Roadmap

We plan on a minimal (but functional) implementation of flow-triggers, and a reasonable set of plugins. Roughly, the expected implementation is as follows:

* Load flow-trigger plugins

* Implement a flow-trigger lifecycle for managing start/stop and disconnection events

* UI for listing, creating and configuring flows and their flow-triggers

* Timer trigger

* Node.js event trigger

* Kafka trigger

* Solace trigger

* RSS feed trigger

## Current Limitations

* There is currently no UI for managing flow-triggers. Configuration is currently manual.

* There is currently no way to edit flows used by flow-triggers, other than using a direct URL.

* All configuration `parameter` values must be strings.

* The flow parameter schema cannot describe complex objects.

* There is no SDK for creating flow-trigger plugins, and there probably will not be one in the medium to long term.

## @axway/api-builder-plugin-ft-event

This plugin is a flow-trigger that enables triggering a flow by consuming events. This plugin will also install a flow-node called "Event" for producing events. Two separate flows are installed to demonstrate consuming events and producing events.

```
// Plugin contents

├───package.json
├── flows/
│   ├── EventConsumerFlow.json
│   └── EventProducerFlow.json
└── triggers
    └── event.yaml
```

### event.yaml

This file is created after installing the **@axway/api-builder-plugin-ft-event** plugin. A flow-trigger event, "beep" is automatically enabled for demonstration purposes in [EventConsumerFlow](#eventconsumerflow.json) that will be triggered when the [EventProducerFlow](#eventproducerflow.json) is manually invoked. If you wish to disable the event, you can change `enabled` to `false`. Note that the **`request`** parameter will have the value of the **data** parameter from the [EventProducerFlow](#eventproducerflow.json).

To configure the event, edit the `triggers/event.yaml` file, and modify the configuration, e.g. to change the event name:

```
// event.yaml

triggers:
  beep-event:
    enabled: true
    name: Beep
    parameters:
      # the event name (case-sensitive)
      event: beep
    invoke:
      flow: EventConsumerFlow
      parameters:
        request: $.request
        config: $.config
        env: $.env
```

### EventConsumerFlow.json

This file is created after installing the **@axway/api-builder-plugin-ft-event** plugin. This flow is bound to the "beep" flow-trigger (see the [event.yaml](#event.yaml) configuration file). You can edit it [directly in the flow editor](http://localhost:8080/console/project/flows/EventConsumerFlow/edit), if you wish, but to trigger it, you need to use the [EventProducerFlow](#eventproducerflow.json).

You can find the EventConsumerFlow in the "Flows" tab in the UI.

### EventProducerFlow.json

This file is created after installing the **@axway/api-builder-plugin-ft-event** plugin. This flow is not bound to anything, but you can access it [directly in the flow editor](http://localhost:8080/console/project/flows/EventProducerFlow/edit), and use the flow debugger to invoke the flow and emit the event, "beep". No parameters are required.

You can find the EventProducerFlow in the "Flows" tab in the UI.

## @axway/api-builder-plugin-ft-kafka

Kafka is a messaging system that safely moves data between systems. We recommend you follow the [https://kafka.apache.org/quickstart](https://kafka.apache.org/quickstart). This plugin is a flow-trigger that triggers a flow when messages are consumed from a Kafka topic. This plugin will also install a flow-node called "Kafka", which is used for publishing messages to Kafka topics. Two separate flows are installed to demonstrate subscribing to messages from Kafka topics, and publishing messages to Kafka topics.

```
// Plugin contents

├───package.json
├── flows/
│   ├── KafkaConsumerFlow.json
│   └── KafkaProducerFlow.json
└── triggers
    └── kafka.yaml
```

### kafka.yaml

This file is created after installing the **@axway/api-builder-plugin-ft-kafka** plugin. A flow-trigger "my-kafka-1" is automatically enabled for demonstration purposes in [KafkaConsumerFlow](#kafkaconsumerflow.json) that will be triggered when a message is written to the "quickstart-events" topic. Messages can be manually published to the Kafka topic "quickstart-events" by using the [KafkaProducerFlow](#kafkaproducerflow.json). If you wish to disable the flow-trigger, you can change `enabled` to `false`. Note that the **`request`** parameter will be a Kafka message, and the actual message value is accessed from the request's **data** property (i.e. using the "$.request.data" selector).

To configure the event, edit the `triggers/kafka.yaml` file, and modify the configuration (e.g. to change the topic):

```
// kafka.yaml

triggers:
channels:
  kafka-1:
    name: Kafka
    parameters:
      clientId: my-client
      brokers: localhost:9092
triggers:
  my-kafka-1:
    name: Quick Start
    enabled: true
    channel: kafka-1
    parameters:
      groupId: quickstart
      topic: quickstart-events
      messageFormat: binary
      fromBeginning: 'false'
    invoke:
      flow: KafkaConsumerFlow
      parameters:
        request: $.request
```

#### Kafka channel parameters

All parameter values must be strings.

| Option | Description | Required | Default |
| --- | --- | --- | --- |
| clientId | Identifies this application as a specific member of the consumer group. | Yes |  |
| brokers | A comma separated list of Kafka brokers, "host1:port, host2:port". | Yes |  |
| rejectUnauthorized | Rejects unauthorized SSL certificates. |  | "false" |
| ca | The relative path to a CA certificate file to trust (PEM format). |  |  |
| key | The relative path to a client key file (PEM format). |  |  |
| cert | The relative path to a client certificate file (PEM format). |  |  |
| retries | The maximum number of retries per call. |  | 5 |

#### Kafka topic parameters

All parameter values must be strings.

| Option | Description | Required | Default |
| --- | --- | --- | --- |
| groupId | Identifies this application as a member of a collective group of consumer instances, identified by a \`groupId\`. In a horizontally scaled application, each instance would be a consumer and together they act as a consumer group. | Yes |  |
| topic | The topic to listen for events when data is written to this particular topic. | Yes |  |
| messageFormat | Automatically decode messages from the \`topic\`. If you do not know the message format, then use \`binary\`. Must be one of: JSON, string, binary. | Yes | "JSON" |
| fromBeginning | The consumer group will use the latest committed offset when starting to fetch messages. If the offset is invalid or not defined, this option defines the behavior of the consumer group. If "true", it will start reading from the earliest offset. If "false", it will use the latest. |  | "false" |
| allowAutoTopicCreation | Allows topic creation when querying metadata for non-existent topics. |  | "true" |
| heartbeatInterval | The expected time in milliseconds between heartbeats to the consumer coordinator. Heartbeats are used to ensure that the consumer's session stays active. The value must be set lower than session timeout. |  | "3000" |
| maxBytes | Maximum amount of bytes to accumulate in the response. Supported by Kafka >= 0.10.1.0. |  | "10485760" |
| maxBytesPerPartition | The maximum amount of data per-partition the server will return. This size must be at least as large as the maximum message size the server allows or else it is possible for the producer to send messages larger than the consumer can fetch. If that happens, the consumer can get stuck trying to fetch a large message on a certain partition. |  | "10485760" |
| maxWaitTimeInMs | The maximum amount of time in milliseconds the server will block before answering the fetch request if there isn’t sufficient data to immediately satisfy the requirement given by minBytes. |  | "5000" |
| metadataMaxAge | The period of time in milliseconds after which we force a refresh of metadata even if we have not seen any partition leadership changes to proactively discover any new brokers or partitions. |  | "300000" |
| minBytes | Minimum amount of data the server should return for a fetch request, otherwise wait up to maxWaitTimeInMs for more data to accumulate. |  | "1" |
| partitionsConsumedConcurrently | The number of partitions to consume concurrently. |  | "1" |
| readUncommitted | Configures the consumer isolation level. If false (default), the consumer will not return any transactional messages which were not committed (default false). |  | "false" |
| rebalanceTimeout | The maximum time that the coordinator will wait for each member to rejoin when rebalancing the group. |  | "60000" |
| sessionTimeout | Timeout in milliseconds used to detect failures. The consumer sends periodic heartbeats to indicate its liveness to the broker. If no heartbeats are received by the broker before the expiration of this session timeout, then the broker will remove this consumer from the group and initiate a rebalance. |  | "30000" |

### KafkaConsumerFlow.json

This file is created after installing the **@axway/api-builder-plugin-ft-kafka** plugin. This flow is bound to the "my-kafka-1" flow-trigger (see the [kafka.yaml](#kafka.yaml) configuration file) and is configured to receiKafka is a messaging system that safely moves data between systemsve JSON messages from the Kafka topic, "quickstart-events". You can edit it [directly in the flow editor](http://localhost:8080/console/project/flows/EventConsumerFlow/edit), if you wish, but to trigger it, you need to use the [KafkaProducerFlow](#kafkaproducerflow.json).

You can find the KafkaConsumerFlow in the "Flows" tab in the UI.

### KafkaProducerFlow.json

This file is created after installing the **@axway/api-builder-plugin-ft-kafka** plugin. This flow is not bound to anything, but you can access it [directly in the flow editor](http://localhost:8080/console/project/flows/EventProducerFlow/edit), and use the flow debugger to invoke the flow and publish an event to the Kafka topic, "quickstart-events". No parameters are required.

You can find the KafkaProducerFlow in the "Flows" tab in the UI.

## @axway/api-builder-plugin-ft-timer

This plugin is a flow-trigger that enables triggering a flow at regular intervals.

```
// Plugin contents

├───package.json
├───flows/
│   └───TimerFlow.json
└───triggers/
    └───timer.yaml
```

### timer.yaml

This file is created after installing the **@axway/api-builder-plugin-ft-timer** plugin. A flow-trigger timer is automatically enabled for demonstration purposes that will invoke the TimerFlow every 1000 milliseconds (1 second). If you wish to disable the timer, you can change `enabled` to `false`.

To configure the timer, edit the `triggers/timer.yaml` file, and modify the configuration, e.g. to change the interval:

```
// timer.yaml

triggers:
  my-timer-1:
    name: Timer 1
    enabled: true
    parameters:
      interval: '1000'
    invoke:
      flow: TimerFlow
      parameters:
        config: $.config
        env: $.env
```

#### Timer parameters

All parameter values must be strings.

| Option | Description | Required | Default |
| --- | --- | --- | --- |
| interval | The time in milliseconds between flow invocations, and before the first invocation. Must be between 1 and 2147483647. | Yes |  |
| startImmediately | When true, the flow will be invoked immediately on startup without first waiting for the configured interval. | No | false |

### TimerFlow.json

This file is created after installing the **@axway/api-builder-plugin-ft-timer** plugin. It is different from the GreetFlow in that it lacks the "$.params.username" parameter. In the limitations section above, it was mentioned that the flow cannot have complex parameters. The "params" from the GreetFlow is an example of a complex parameter.

You can find the TimerFlow in the "Flows" tab in the UI.

{{% alert title="⚠️ Note" color="primary" %}}You can copy TimerFlow and configure additional flow-triggers in timer.yaml if you wish. The same principles apply.{{% /alert %}}

## @axway/api-builder-plugin-ft-solace

Solace is a messaging layer for moving data across systems. This plugin is a flow-trigger that enables triggering a flow when message is published in a Solace topic. This plugin will also install a flow-node called "Solace" that allows publishing messages to topics. Two separate flows are installed to demonstrate consuming messages and publishing messages.

**Plugin contents**

```
// Plugin content

├───package.json
├── flows/
│   ├── SolaceConsumerFlow.json
│   └── SolaceProducerFlow.json
└── triggers
    └── solace.yaml
```

solace.yaml

This file is created after installing the **@axway/api-builder-plugin-ft-solace** plugin. To configure solace channel and trigger instances, edit the `triggers/solace.yaml` file accordingly. Initially the configuration file describes one channel named **solace** and one trigger instance named **my-solace-1** that uses the solace channel. To run the trigger successfully you must set url, vpnName, userName, and password channel parameters with corresponding values for your Solace broker instance. This will allow you to create a channel and connect to Solace. In production it is a good practice to [environmentalize](/docs/how_to/environmentalization/) those parameters.

```
// solace.yaml

channels:
  solace:
    name: Solace
    enabled: true
    parameters:
      # Environmentalize in production:
      # https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/environmentalization.html
      url: tcp://localhost:55555
      vpnName: default
      userName: admin
      password: admin
      # default is 20
      connectRetries: "0"
      # default is 8000
      connectTimeoutInMsecs: "5000"
triggers:
  my-solace-1:
    name: Trigger Print Message
    enabled: true
    channel: solace
    parameters:
      topicName: DemoTopic
    invoke:
      flow: SolaceConsumerFlow
      parameters:
        message: $.request.message
```

### SolaceConsumerFlow.json

This file is created after installing the **@axway/api-builder-plugin-ft-solace** plugin. This flow is bound to the "my-solace-1" flow-trigger (see the [solace.yaml](#solace.yaml) configuration file). You can edit it [directly in the flow editor](http://localhost:8080/console/project/flows/SolaceConsumerFlow/edit), if you wish, but to trigger it, you need to use the [SolaceProducerFlow](#solaceproducerflow.json). The direct URL to SolaceConsumerFlow is:

**[http://localhost:8080/console/project/flows/SolaceConsumerFlow/edit](http://localhost:8080/console/project/flows/SolaceConsumerFlow/edit)**

### SolaceProducerFlow.json

This file is created after installing the **@axway/api-builder-plugin-ft-solace** plugin. This flow is not bound to anything, but you can access it [directly in the flow editor](http://localhost:8080/console/project/flows/SolaceProducerFlow/edit), and use the flow debugger to invoke the flow and publish a message to a Solace topic. For this to happen you need to provide the **channel** id configured in your [solace.yaml](#solace.yaml), the **topic** name, and the **message** that should be published in the specified topic. The direct URL to SolaceProducerFlow is:

**[http://localhost:8080/console/project/flows/SolaceProducerFlow/edit](http://localhost:8080/console/project/flows/SolaceProducerFlow/edit)**

Both, SolaceProducerFlow and SolaceConsumerFlow flows, as well as other example flows that come with other plugins installation can be seen and accessed from the "Flows" tab in the {{% variables/apibuilder_prod_name %}} Admin UI:

![Screenshot_2020-09-11_at_08.11.14](/Images/Screenshot_2020-09-11_at_08.11.14.png)
