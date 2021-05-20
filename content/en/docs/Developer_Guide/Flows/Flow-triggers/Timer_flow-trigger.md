---
title: Timer flow-trigger
linkTitle: Timer flow-trigger
description: ADD A DESCRIPTION
weight: 50
date: 2021-05-17
---

Overview

This flow-trigger allows flows to be invoked at regular intervals. The flow will be invoked repeatedly, starting after a specified interval of time or immediately after start up, then invoking the flow continuously at that interval.

You can install the Timer flow-trigger via the `@axway/api-builder-plugin-ft-timer` plugin from the **Plugins** page, or execute the following command:

```bash
npm install @axway/api-builder-plugin-ft-timer
```

## Flow-trigger details

The following sections provide a detailed information about the **Timer** flow-trigger and its configuration.

### Parameters

| Parameter | Description | Type | Default | Configuration selection | Required |
| --- | --- | --- | --- | --- | --- |
| Interval | The desired interval in milliseconds at which the flow would be invoked. Must be between 1 and 2147483647. | String | \- | Selector, String | Yes |
| Start immediately | Denotes if the flow should be invoked immediately. When "true", the flow will be invoked immediately on startup without first waiting for the configured **Interval**. | String | false | Selector, String | No |

## How to use the Timer flow-trigger

### Example - Invoking a flow every 5 minutes

For this example, we want a flow to be invoked every 5 minutes. Follow the instructions on [Create a new flow](/docs/developer_guide/flows/manage_flows/create_a_new_flow/) to create a "Timer flow". In this flow, you will want to drag the **Timer** from the **Flow-Nodes > Flow-Triggers** panel on the left, into the flow graph on the right.

![image2021-4-20_11_13_14](/Images/image2021-4-20_11_13_14.png)

Note that the flow-trigger is in an **error** state. This is due to the fact that the flow-trigger requires the **Interval** parameter and we have not provided one yet. We said we would like to invoke the flow every 5 minutes. The **Interval** parameter takes milliseconds so we should set the interval value to **300000:**

![image2021-4-20_11_11_30](/Images/image2021-4-20_11_11_30.png)

Unlike some flow-triggers, **Timer** does not output any data, so the **Outputs** tab shows, "No outputs". On the **Flow inputs** tab, it lists the optional named inputs that can be provided to the flow: **request**, **config**, and **env**. These keys are hard-coded into the flow and their JSONPath selectors are provided automatically. From within the flow, the respective input values can be accessed as `$.request`, `$.config`, and `$.env`. Since there is nothing output when the timer is triggered, the **request** on **Flow inputs** can be left disabled.

Now let's do something when the flow is invoked by adding the **Logger** flow-node to the graph and configuring **Message** with a notice that the flow was triggered.

![image2021-4-20_11_23_16](/Images/image2021-4-20_11_23_16.png)

We can now save the flow by clicking **Apply**, and the service will restart.

After the specified **Interval** of time has passed, the flow will be invoked, executing your business logic. If you check the console window where you launched your {{% variables/apibuilder_prod_name %}} project, you see a detailed debug log showing the execution, and that it logged the "I was triggered!" message as expected:

```
// Flow output

1618914065717 INFO  [timer: timer-5] [request-id: 8a486126-b485-4a02-8b19-01a0b43c7021] Triggered
1618914065717 DEBUG [timer: timer-5] [request-id: 8a486126-b485-4a02-8b19-01a0b43c7021] Every 300000ms
1618914065717 DEBUG [timer: timer-5] [request-id: 8a486126-b485-4a02-8b19-01a0b43c7021] Invoking flow: Demo Timer (id: DemoTimer) $.request has no value
1618914065717 DEBUG [timer: timer-5] [request-id: 8a486126-b485-4a02-8b19-01a0b43c7021] Invoking: DemoTimer
1618914065718 DEBUG [timer: timer-5] [request-id: 8a486126-b485-4a02-8b19-01a0b43c7021] Waiting: Log Message (logger.1)
1618914065718 DEBUG [timer: timer-5] [request-id: 8a486126-b485-4a02-8b19-01a0b43c7021] Invoking: Log Message (logger.1)
1618914065718 INFO  [timer: timer-5] [request-id: 8a486126-b485-4a02-8b19-01a0b43c7021]   log (logger.1) I was triggered!
1618914065718 DEBUG [timer: timer-5] [request-id: 8a486126-b485-4a02-8b19-01a0b43c7021]   Log Message (logger.1) route: []
1618914065718 DEBUG [timer: timer-5] [request-id: 8a486126-b485-4a02-8b19-01a0b43c7021] Flow completed: Demo Timer (id: DemoTimer)
1618914065718 INFO  [timer: timer-5] [request-id: 8a486126-b485-4a02-8b19-01a0b43c7021] Finished
```

If you would like to invoke the flow immediately on startup you can toggle the **Start Immediately** parameter and set its value to **true**.
