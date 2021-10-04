---
title: Flow-triggers
linkTitle: Flow-triggers
weight: 60
date: 2021-10-01
---

Flow-triggers are ways of triggering a flow and are production-ready since the [Lyon release](/docs/release_notes/-_23_april_2021/). These allow flows to be configured to run on a schedule, or subscribe to an event, such as when a message is pushed to a Kafka queue.

## Official flow-triggers

## How to get flow-triggers

Flow-triggers are distributed in plugins. As with any other plugins, they can be installed as NPM modules from the command line, or via the **Plugins** tab in the UI. Plugins which contain flow-triggers are indicated by the ![image2021-4-19_11_7_26](/Images/image2021_4_19_11_7_26.png) icon as seen below:

![image2021-4-19_11_5_53](/Images/image2021_4_19_11_5_53.png)

## How to use flow-triggers

Installed flow-triggers can be added, removed and configured as part of any flow from within the flow editor. They appear to the left of the flow editor at the top of the **Flow-Nodes** panel, and can be dragged onto the graph and configured using the panel on the right-hand side after selecting the flow-trigger in the graph. There is no limit to the number of flow-triggers that a flow can have.

![image2021-4-19_11_17_23](/Images/image2021_4_19_11_17_23.png)

### Configuration

Each flow-trigger has its own unique configuration, and there are three important tabs to know about:

The **Parameters** tab lists the configurable parameters for the flow-trigger. All values should be provided as strings. JSONPath selectors can also be used to select values from environment variables (e.g. `$.env.VARIABLE`) or project configuration (e.g. `$.config.myConfigKey`).

The **Outputs** tab describes the output schema of any contextual "request" data (if any) which may be provided by the flow-trigger when it triggers. The data will be available to **Flow inputs** as `$.request`.

The **Flow inputs** tab lists the flow's input parameters. For new flows, the inputs are: **request**, **config**, and **env**, and they are optional. For flows bound to [endpoints](/docs/developer_guide/flows/manage_endpoints/), all inputs are required. All flow inputs are provided as strings. The purpose of the **Flow inputs** tab is to provide inputs into the flow. If a flow-trigger outputs a value (see **Outputs** tab), the value of the **request** will be automatically set to `$.request.`To provide additional configuration values **config** is automatically set to `$.config`where to provide environment variables to the flow, **env** is set to `$.env`. You can switch those off if you do not need to access them within the flow.
