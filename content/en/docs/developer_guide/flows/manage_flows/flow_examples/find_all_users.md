---
title: Find all users
linkTitle: Find all users
weight: 60
date: 2021-10-01
---

To configure a find all users flow:

1. Click the **Create Flow** icon associated with finding all test users.
    The API Orchestration user interface is displayed.
1. Select and pull the testuser flow-node onto the flow editor from the Models list. Note that the Start flow-node is automatically connected to the input of the testuser flow-node.
1. Name the flow-node: Find all testusers
1. Select the `findAll` method.
1. Select **Outputs**.
1. Configure the **next** output. As you begin typing in the **next** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.
1. Select and pull an HTTP flow-node onto the flow editor from the Core list.
1. Name the flow-node: Find succeeded
1. Select **Parameters**.
1. For the **status** parameter, select **number** and enter `200` in the field.
1. Enable the **body** parameter, select **selector**, and select `$.models` from the selector options drop-down menu or continue typing to manually complete the selector configuration. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).
1. Leave the **headers** parameter disabled.
1. Connect the next output of the Find all users flow-node to the input of the Find succeeded flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). The completed flow is displayed.
![Find_all_latest](/Images/find_all_latest.png)
1. Click **Apply**.
1. On the next screen, click **Proceed**. The server will be restarted, the _Find all users_ flow will be saved and enabled, and you will be returned to the API Orchestration user interface.
1. To exit API Orchestration user interface and return to API Lists page, click **Close**.
