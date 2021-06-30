---
title: Find a distinct user
linkTitle: Find a distinct user
description: ADD A DESCRIPTION
weight: 50
date: 2021-06-22
---

To configure a find a distinct user flow:

1. Click the **Create Flow** icon associated with finding a distinct test user.
    The API Orchestration user interface is displayed.

2. Select and pull the testuser flow-node onto the flow editor from the Models list. Note that the Start flow-node is automatically connected to the input of the testuser flow-node.

3. Name the flow-node: Find distinct testuser

4. Select the `distinct` method.

5. Select **Parameters**.

6. Enable all parameters and configure them. If **selector** is selected from the _selector_ drop-down menu, as you begin typing in the **parameter** field, a drop-down menu of valid or previously used selector options is displayed. You may optionally choose a selector from the list, or continue typing to configure the parameter manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). For additional information on the Model flow-node and General flow-node configuration parameters, refer to [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).

7. Select **Outputs**.

8. Configure the **next** output. As you begin typing in the **next** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.

9. Select and pull an HTTP flow-node onto the flow editor from the Core list.

10. Name the flow-node: Find succeeded

11. Select **Parameters**.

12. For the **status** parameter, select **number** and enter `200` in the field.

13. Enable the **body** parameter, select **selector**, and select `$.models` from the selector options drop-down menu or continue typing to complete the selector configuration manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

14. Leave the **headers** parameter disabled.

15. Connect the next output of the Find a distinct user flow-node to the input of the Find succeeded flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). The completed flow is displayed.

    ![Distinct_latest](/Images/distinct_latest.png)
16. Click **Apply**.

17. On the next screen, click **Proceed**. The server will be restarted, the _Find a distinct user_ flow will be saved and enabled, and you will be returned to the API Orchestration user interface.

18. To exit API Orchestration user interface and return to API Lists page, click **Close**.
