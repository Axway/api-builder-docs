---
title: Find and modify users
linkTitle: Find and modify users
weight: 70
date: 2021-10-01
---

To configure a find and modify users flow:

1. Click the **Create Flow** icon associated with finding and modifying a test user.
    The API Orchestration user interface is displayed.
1. Select and pull a Set Context flow-node onto the flow editor from the Core list. Note that the Start flow-node is automatically connected to the input of the Set Context flow-node.
1. Name the flow-node: Build args parameter (new)
1. Select **Parameters**.
1. For the **value** parameter, select **selector** and select `$.params.new` from the selector options drop-down menu or continue typing to complete the selector configuration manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow_nodes/).
1. Select **Outputs**.
1. Configure the **next** output. As you begin typing in the **next** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.
1. Select and pull a Set Context flow-node onto the flow editor from the Core list.
1. Name the flow-node: Build args parameter (upsert)
1. Select **Parameters**.
1. For the **value** parameter, select **selector** and select `$.params.upsert` from the selector options drop-down menu or continue typing to complete the selector configuration manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow_nodes/).
1. Select **Outputs**.
1. Configure the **next** output. As you begin typing in the **next** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.
1. Connect the next output of the Build args parameter (new) flow-node to the input of the Build args parameter (upsert) flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow_nodes/).
1. Select and pull the testuser flow-node onto the flow editor from the Models list.
1. Name the flow-node: Find and modify testuser
1. Select the `findAndModify` method.
1. Select **Parameters**.
1. Configure the **data** parameter. If **selector** is selected from the _selector_ drop-down menu, as you begin typing in the **data** parameter field, a drop-down menu of valid or previously used selector options is displayed. You may optionally choose a selector from the list, or continue typing to configure the parameter manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow_nodes/). For additional information on the Model flow-node and General flow-node configuration parameters, refer to [Flow-nodes](/docs/developer_guide/flows/flow_nodes/).
1. Enable the additional parameters and configure them according to the `findAndModify` parameters listed in [Flow-nodes](/docs/developer_guide/flows/flow_nodes/).
1. Select **Outputs**.
1. Configure the **next** output. As you begin typing in the **next** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.
1. Configure the **notfound** output. As you begin typing in the **notfound** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.
1. Connect the next output of the Build args parameter (upsert) to the input of the Find and modify users flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow_nodes/).
1. Select and pull an HTTP flow-node onto the flow editor from the Core list.
1. Name the flow-node: Find and modify succeeded
1. Select **Parameters**.
1. For the **status** parameter, select **number** and enter `204` in the field.
1. Leave the **body** and **headers** parameters disabled.
1. Connect the next output of the Find and modify users flow-node to the input of the Find and modify succeeded flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow_nodes/).
1. Select and pull an HTTP flow-node onto the flow editor from the Core list.
1. Name the flow-node: Find and modify failed
1. Select **Parameters**.
1. For the **status** parameter, select **number** and enter `404` in the field.
1. Leave the **body** and **headers** parameters disabled.
1. Connect the notfound output of the Find and modify users flow-node to the input of the Users not found flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow_nodes/). The completed flow is displayed.

    ![Find_and_modify_latest](/Images/find_and_modify_latest.png)

1. Click **Apply**.
1. On the next screen, click **Proceed**. The server will be restarted, the _Find and modify users_ flow will be saved and enabled, and you will be returned to the API Orchestration user interface.
1. To exit API Orchestration user interface and return to API Lists page, click **Close**.
