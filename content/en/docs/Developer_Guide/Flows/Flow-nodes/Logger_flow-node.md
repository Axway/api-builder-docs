---
title: Logger flow-node
linkTitle: Logger flow-node
description: ADD A DESCRIPTION
weight: 130
date: 2021-06-22
---

## Overview

The Logger plugin, `@axway/api-builder-plugin-fn-logger`, allows the user to log inside a Flow.

To install the Logger plugin, execute the following command:

```bash
npm install @axway/api-builder-plugin-fn-logger
```

For additional getting started information, refer to the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/).

## Methods

The following sections provide details of the Logger flow-node methods.

### Log

Writes a message to the log.

#### Parameters

| Parameter | Description | Type | Default | Configuration selection | Required |
| --- | --- | --- | --- | --- | --- |
| message | The log message. | String | \- | Selector, String | Yes |
| level | The desired log level of the output logs. | String | info | Selector, String | No |

##### Parameter: message

The `message` parameter is the contents of what is going to be output at the logs.

##### Parameter: level

The `level` parameter refers to the level at which the output logs would be logged. You can pick from the following log levels: error, warn, info, debug and trace.

{{% alert title="❗️ Caution" color="danger" %}}The output logs would be only visible when the configured level is greater than or equal to the application's config logLevel in order of most-to-least verbose: trace, debug, info, warn, error. For more information, see [logLevel](/docs/developer_guide/project/configuration/project_configuration/#loglevel).{{% /alert %}}

#### Outputs

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | any | The flow-node does not output anything. | `-` |
| Error | Object | An unexpected error was encountered. | `$.error` |

## How to use the Logger plugin

After the installation of the Logger plugin, the flow-node will be then available in the tools panel when creating or editing Flows. It can be found under the Core section of our flow-node list:

![Screen_Shot_2021-04-07_at_2.09.20_PM](/Images/screen_shot_2021_04_07_at_2_09_20_pm.png)

You can drag and drop the Logger flow-node into the Flow Graph to expand its details:

![Screen_Shot_2021-04-07_at_2.09.51_PM](/Images/screen_shot_2021_04_07_at_2_09_51_pm.png)

### Example - Logging inside the Greet Flow

Here is how you could use the Logger flow-node in our Greet Flow example:

For the purpose of this example let's say you'd like to log the flow input parameter **_username_** at **_debug_** log level.

The first step is to drag and drop the Logger flow-node and wire it up in the flow graph as follows:

![Screen_Shot_2021-04-07_at_2.19.20_PM](/Images/screen_shot_2021_04_07_at_2_19_20_pm.png)

Note that the flow is in an error state. This is due to the fact that the flow-node requires a **Message** parameter and we have not provided one yet.

From the Greet Flow example, we know that the **_username_** could be accessed via the selector: **_$.params.username_**. So let's configure our node by first switching the type to selector and setting that value:

![Screen_Shot_2021-04-07_at_2.22.20_PM](/Images/screen_shot_2021_04_07_at_2_22_20_pm.png)

We now have the **Message** that we would like to output. Next, we need to set the log **Level** as we said we'd like to log it at _**debug**_ and by default the flow-node is logging at _**info**_.

To do this, toggle the **Level** parameter and select **_debug_** from the dropdown.

![Screen_Shot_2021-04-07_at_2.24.20_PM](/Images/screen_shot_2021_04_07_at_2_24_20_pm.png)

That is it! You could now try the flow through the debugger. Add an username and hit _**Execute Flow**_.

![Screen_Shot_2021-04-07_at_2.26.51_PM](/Images/screen_shot_2021_04_07_at_2_26_51_pm.png)

Which would return the already familiar salutation:

![Screen_Shot_2021-04-07_at_2.26.59_PM](/Images/screen_shot_2021_04_07_at_2_26_59_pm.png)

However, we are interested in the logs that are spit out in the terminal. This is what you could expect with the configuration we did:

![Screen_Shot_2021-04-07_at_2.27.43_PM](/Images/screen_shot_2021_04_07_at_2_27_43_pm.png)

If you would like to log at a different level the concept is the same - change the **Level** in the dropdown and try it out. In the same manner, you can log simple strings rather than using selectors.
