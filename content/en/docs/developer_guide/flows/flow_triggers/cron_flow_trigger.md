---
title: Cron flow-trigger
linkTitle: Cron flow-trigger
weight: 10
date: 2021-10-01
---

## Overview

This is a flow-trigger that enables triggering a flow by using a [cron job](https://en.wikipedia.org/wiki/Cron) scheduler. It supports both "standard" 5-part cron expressions, as well as the extended 6-part cron expression, which includes seconds. The supported expressions includes: seconds, minute, hour, day of month, month, and day of week (seconds is optional).

You can install the Cron plugin from the **Plugins** page, or execute the following command:

```bash
npm install @axway/api-builder-plugin-ft-cron
```

## Flow-trigger details

The following sections provide details of the available **Cron** parameters.

### Trigger Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| Cron expression | String | The cron-like expression with five or six positions that denote: second (optional), minute, hour, day of month, month, day of week. For more info see [https://github.com/node-schedule/node-schedule](https://github.com/node-schedule/node-schedule). The expression schedules the trigger using the host system time. | Selector, String | Yes |
| Timezone | String | The timezone for which the trigger is scheduled. Overrides the default host system timezone. List with currently acceptable tz database timezones can be found at [https://en.wikipedia.org/wiki/List_of_tz_database_time_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). | Selector, String | No |

## How to use the Cron flow-trigger

This Cron plugin is a flow-trigger that enables triggering a flow based on a schedule defined via [cron expressions](https://www.npmjs.com/package/node-schedule) that are triggered according to system time by default. The cron-like expression is different from cron in that it includes an optional _second_ (a 6th position) in the following format:

```text
\*    \*    \*    \*    \*    \*
┬     ┬     ┬     ┬     ┬     ┬
│     │     │     │     │     │
│     │     │     │     │     └ day of week (0 - 7) (0 or 7 is Sun)
│     │     │     │     └───── month (1 - 12)
│     │     │     └────────── day of month (1 - 31)
│     │     └─────────────── hour (0 - 23)
│     └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```

{{% alert title="Tip" color="primary" %}}An online tool [crontab.guru](https://crontab.guru) can assist in helping you compose a valid cron expression, however, it only supports 5 parts (excludes seconds).{{% /alert %}}

### Example - at 09:00 am

For this example, we will create a "Morning Flow" that will trigger a flow at 09:00 am every day.

#### Create a Morning Flow

Follow the instructions on [Create a new flow](/docs/developer_guide/flows/manage_flows/create_a_new_flow/) to create a "Morning Flow". In this flow, you will want to drag the **Cron** from the **Flow-Nodes > Flow-Triggers** panel on the left, into the flow graph on the right. Configure the **Cron** flow-trigger as shown below.

![image2021-4-20_15_14_16](/Images/image2021_4_20_15_14_16.png)

This configures the **Cron** flow-trigger to invoke at "0 second, 0 minute, and 9 hour", i.e. "09:00 am". It will do so every day.

Unlike some flow-triggers, **Cron** does not output, so the **Outputs** tab shows, "No outputs". On the **Flow inputs** tab, it lists the optional named inputs that can be provided to the flow: **request**, **config**, and **env**. Since there is nothing output when it is triggered, the **request** input can be left disabled.

Now, let's do something on the flow by adding the **Logger** flow-node to the graph, and configuring the **Message** to be "`I was triggered by Cron!"`.

![image2021-4-20_15_14_38](/Images/image2021_4_20_15_14_38.png)

On saving the flow, by clicking **Apply**, the flow-trigger will be configured to invoke at 9:00 am system time, every day. On successful restart, your **Cron** flow-trigger will be enabled.

![image2021-4-20_15_15_17](/Images/image2021_4_20_15_15_17.png)

If you check the application console window, there is a DEBUG log message that confirms the Cron flow-trigger is configured as expected:

`1618836280441 DEBUG [cron: cron-1] Created trigger using expression 0 0 9 * * * (At 09:00 AM - System Time)`

### Example - at 12:00 am (UTC)

For this example, we will create a "Midnight Flow" that will trigger a flow at 12:00 am UTC every day.

#### Create a Midnight Flow

Follow the instructions on [Create a new flow](/docs/developer_guide/flows/manage_flows/create_a_new_flow/) to create a "Morning Flow". In this flow, you will want to drag the **Cron** flow-trigger from the **Flow-Nodes > Flow-Triggers** panel on the left, into the flow graph on the right. Configure the **Cron** flow-trigger as shown below.

![image2021-4-20_15_16_56](/Images/image2021_4_20_15_16_56.png)

On saving the flow, by clicking **Apply**, the flow-trigger will be configured to invoke at 12:00 am UTC, every day. On successful restart, your **Cron** flow-trigger will be enabled.

![image2021-4-20_15_17_26](/Images/image2021_4_20_15_17_26.png)

If you check the application console window, there is a DEBUG log message that confirms the Cron flow-trigger is configured as expected:

`1618836112515 DEBUG [cron: cron-1] Created trigger using expression 0 0 0 * * * (At 12:00 AM - UTC)`
