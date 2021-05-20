---
title: Create a new flow
linkTitle: Create a new flow
description: ADD A DESCRIPTION
weight: 10
date: 2021-05-17
---

Flows are acyclic directed graphs of f[low-nodes](/docs/developer_guide/flows/flow-nodes/). They are comprised of operational flow-nodes, which are composed of inputs, logic, and outputs. Flows are used to orchestrate data to provide a reusable, scalable, no-code/low-code way of building microservices to achieve complex integrations with existing data sources and systems.

The flows are source files and exist in the `./flows` directory of your application. Editing and saving a flow will also update its corresponding source file. Flows are tightly coupled with plugins that provide flow-nodes.

To create a new flow, go to the **Flows** page, and click +**Flow** to create a new flow.

![image2021-4-20_16_35_41](/Images/image2021-4-20_16_35_41.png)

This will take you into the flow editor.

![image2021-4-20_16_36_11](/Images/image2021-4-20_16_36_11.png)

Now is a good time to give your flow a unique name and description. Click the pencil next to "New Flow".

![image2021-4-20_16_36_28](/Images/image2021-4-20_16_36_28.png)

It will open this dialog. Give it some details for our example flow:

![image2021-4-20_16_39_50](/Images/image2021-4-20_16_39_50.png)

New flows only exist in memory until you click "Apply". However, the editor does not allow you to save invalid flows, and currently the flow is invalid because flows require at least one [flow-node](/docs/developer_guide/flows/flow-nodes/) for it to be considered valid. Input validation or other errors can also cause the flow to be invalid. Drag the **HTTP** flow node from the **Flow-Nodes > Core** panel on the left, into the graph on the right. It will automatically wire-up to the **Start** flow-node, and auto-select the flow-node, revealing a property panel on the right-hand side. This right-hand property panel is for configuring flow-nodes, and their outputs.

![image2021-4-20_16_40_15](/Images/image2021-4-20_16_40_15.png)

Change the **Status** to a Number by clicking the "Selector" drop-down, and choosing "Number". Input the value `200`. The flow will be re-validated when you click on a component outside of the field, or Tab out of the field.

![image2021-4-20_16_40_30](/Images/image2021-4-20_16_40_30.png)

Now click, **Apply** and then click **Proceed** to save the flow.

![image2021-4-20_16_40_54](/Images/image2021-4-20_16_40_54.png)

You have successfully created your first flow! You can continue editing, or click **Close** to exit the flow editor, and return to the **Flows** page.

![image2021-4-20_16_42_34](/Images/image2021-4-20_16_42_34.png)
