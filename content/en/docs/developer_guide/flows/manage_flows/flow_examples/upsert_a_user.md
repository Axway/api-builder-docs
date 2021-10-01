---
title: Upsert a user
linkTitle: Upsert a user
weight: 110
date: 2021-10-01
---

To configure an upsert (update or insert) a user flow:

1. Click the **Create Flow** icon associated with updating or inserting a test user.
    The API Orchestration user interface is displayed.
1. Select and pull the testuser flow-node onto the flow editor from the Models list. Note that the Start flow-node is automatically connected to the input of the testuser flow-node.
1. Name the flow-node: Upsert testuser
1. Select the `upsert` method.
1. Select **Parameters**.
1. Configure the **value** parameter. If **selector** is selected from the _selector_ drop-down menu, as you begin typing in the **value** parameter field, a drop-down menu of valid or previously used selector options is displayed. You may optionally choose a selector from the list, or continue typing to configure the parameter manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). For additional information on the Model flow-node and General flow-node configuration parameters, refer to [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).
1. Select **Outputs**.
1. Configure the **update** output. As you begin typing in the **update** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.
1. Configure the **upsert** output. As you begin typing in the **upsert** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.
1. Select and pull a Set Context flow-node onto the flow editor from the Core list.
1. Name the flow-node: Set location
1. Select **Parameters**.
1. For the **value** parameter, select **selector** and select `$.model.id` from the selector options drop-down menu or continue typing to manually complete the selector configuration. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).
1. Connect the insert output of the Upsert a user flow-node to the input of the Set location flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).
1. Select and pull an HTTP flow-node onto the flow editor from the Core list.
1. Name the flow-node: Update succeeded
1. Select **Parameters**.
1. For the **status** parameter, select **number** and enter `204` in the field.
1. Leave the **body** and **headers** parameters disabled.
1. Connect the update output of the Upsert a user flow-node to the input of the Upsert succeeded flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).
1. Select and pull an HTTP flow-node onto the flow editor from the Core list.
1. Name the flow-node: Insert succeeded
1. Select **Parameters**.
1. For the **status** parameter, select **number** and enter `201` in the field.
1. Leave the **body** parameter disabled.
1. Enable the **headers** parameter, select **selector**, and select `$.headers` from the selector options drop-down menu or continue typing to complete the selector configuration manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).
1. Connect the insert output of the Upsert a user flow-node to the input of the Insert succeeded flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).
1. Connect the next output of the Set location flow-node to the input of the Insert succeeded flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). The completed flow is displayed.

    ![Upsert_latest](/Images/upsert_latest.png)
1. Click **Apply**.
1. On the next screen, click **Proceed**. The server will be restarted, the _Upsert a user_ flow will be saved and enabled, and you will be returned to the API Orchestration user interface.
1. To exit API Orchestration user interface and return to API Lists page, click **Close**.
