---
title: Find a user by id
linkTitle: Find a user by id
weight: 80
date: 2021-10-01
---

To configure a find a user by ID flow:

1. Click the **Create Flow** icon associated with finding a test user using their ID.
    The API Orchestration user interface is displayed.
1. Select and pull the testuser flow-node onto the flow editor from the Models list. Note that the Start flow-node is automatically connected to the input of the testuser flow-node.
1. Name the flow-node: Find a user by ID
1. Select the `findByID` method.
1. Select **Parameters**.
1. Configure the **id** parameter. If **selector** is selected from the _selector_ drop-down menu, as you begin typing in the **id** parameter field, a drop-down menu of valid or previously used selector options is displayed. You may optionally choose a selector from the list, or continue typing to configure the parameter manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). For additional information on the Model flow-node and General flow-node configuration parameters, refer to [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).
1. Select **Outputs**.
1. Configure the **next** output. As you begin typing in the **next** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.
1. Configure the **notfound** output. As you begin typing in the **notfound** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.
1. Select and pull an HTTP flow-node onto the flow editor from the Core list.
1. Name the flow-node: Find succeeded
1. Select **Parameters**.
1. For the **status** parameter, select **number** and enter `200` in the field.
1. Enable the **body** parameter, select **selector**, and select `$.model` from the selector options drop-down menu or continue typing to complete the selector configuration manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).
1. Leave the **headers** parameter disabled.
1. Connect the next output of the Find a user by ID flow-node to the input of the Find succeeded flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).
1. Select and pull an HTTP flow-node onto the flow editor from the Core list.
1. Name the flow-node: Find failed
1. Select **Parameters**.
1. For the **status** parameter, select **number** and enter `404` in the field.
1. Leave the **body** and **headers** parameters disabled.
1. Connect the notfound output of the Find a user by ID flow-node to the input of the User not found flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). The completed flow is displayed.

    ![Find_by_ID_latest](/Images/find_by_id_latest.png)
1. Click **Apply**.
1. On the next screen, click **Proceed**. The server will be restarted, the _Find a user by ID_ flow will be saved and enabled, and you will be returned to the API Orchestration user interface.
1. To exit API Orchestration user interface and return to API Lists page, click **Close**.
