---
title: Debug a flow
linkTitle: Debug a flow
description: ADD A DESCRIPTION
weight: 50
date: 2021-05-17
---

The flow Editor has the ability to debug flows directly from within the editor, without having to externally trigger the flow (e.g. by invoking an API method). With the debugger, you can provide request parameters to the flow and ensure that it handles all conditions correctly. For additional information on managing flows using the flow Editor, refer to [Manage flows](/docs/developer_guide/flows/manage_flows/).

## Debugging flows

To debug a flow and enter parameters using flow Editor debugger:

1. Click the **Debugger** icon to open the debugger.

![Screenshot_2020-09-24_at_11.25.45](/Images/Screenshot_2020-09-24_at_11.25.45.png)

2\. In the debugger, flow **Parameters** are provided as JSON. The input differs depending on the debugger mode - this example shows **Basic** mode. See below for the difference between **Advanced** and **Basic** modes. The input parameters reflect what the flow would be provided when invoked by an Endpoint or another trigger.

In this example we're providing an object with a username property. You can access any of the provided parameters by using a `selector` type input in a flow-node. Here, in **Basic** mode we would use $.params.username to access the username.

![Screenshot_2020-09-24_at_11.09.26](/Images/Screenshot_2020-09-24_at_11.09.26.png)

3\. Click **Execute flow**. Clicking **Execute flow** will execute the flow. Once the flow execution is completed, the flow response will be displayed.

![Screenshot_2020-09-24_at_11.20.07](/Images/Screenshot_2020-09-24_at_11.20.07.png)

4\. To execute the flow again, click **Clear** and **Execute flow** button again.

5\. To remove all the parameters that are entered previously click **Reset.**

6\. To close the **Parameters** tool, click the **Debugger** icon.

## Basic mode

For flows that are bound to Endpoints the debugger has an **Basic** mode available, which is the default debugger state. You can tell you're in **Basic** mode if you see **Switch to Advanced** in the top right corner of the debugger.

![Screenshot_2020-09-24_at_10.30.48](/Images/Screenshot_2020-09-24_at_10.30.48.png)

Endpoint flows take **params**, **config**, **request** and **env** as flow parameters. **Basic** mode allows you to provide Endpoint parameters (**params)** to your flow, while **config**, **request** and **env** are automatically provided by the debugger.

All flow parameters can be accessed within the flow using JSONPath selectors. For Endpoint flows, the flow parameters

| Parameter | Selector | Description |
| --- | --- | --- |
| **params** | $.params | A map of Endpoint parameters (query, header, path etc..) by name. |
| **config** | $.config | The data loaded from {{% variables/apibuilder_prod_name %}} configuration files. |
| **request** | $.request | The HTTP request object for the current request. |
| **env** | $.env | A map of all the current environment variables provided to your service |

In the **Basic** mode example below, username will be available in the flow as the JSONPath selector `$.params.username`

In order to test your Endpoint flow with different values for **config**, **request** or **env**, see **Advanced mode**.

## Advanced mode

While **Basic** mode only allows you to test values of the **params** parameter and automatically provides other parameters, **Advanced** mode gives you full control over providing every parameter to your flow. All flows can be debugged in Advanced mode. This is the only mode available to flows which aren't bound to Endpoints, since these flows have customizable parameters and {{% variables/apibuilder_prod_name %}} won't be able to provide defaults.

For flows that also have **Basic** mode, you should first click on the **Switch to Advanced** button.

![Screenshot_2020-09-24_at_10.30.48](/Images/Screenshot_2020-09-24_at_10.30.48.png)

If you don't see this button, then the flow only has **Advanced** mode available.

![Screenshot_2020-09-24_at_10.42.49](/Images/Screenshot_2020-09-24_at_10.42.49.png)

In this mode, all required parameters must be provided. When you have a flow that selects parameters from the environment (e.g. _$.env.username_) or configuration (e.g. _$.config.salutation),_ these values must be provide explicitly as seen below:

![Screenshot_2020-09-24_at_10.27.02](/Images/Screenshot_2020-09-24_at_10.27.02.png)

## Troubleshoot Parameters field entries

When providing invalid JSON, the part that failed to parse will be highlighted. Hovering over the highlight will display troubleshooting tips for correcting the JSON.

![Screenshot_2020-09-24_at_11.29.31](/Images/Screenshot_2020-09-24_at_11.29.31.png)

If you get an error while debugging your flow, verify that all required parameters, and no additional parameters are present. If parameter entry is incomplete, errors will occur while debugging the flow. Provide a complete parameter entry and click **Retry**

![Screenshot_2020-09-24_at_11.31.07](/Images/Screenshot_2020-09-24_at_11.31.07.png)
