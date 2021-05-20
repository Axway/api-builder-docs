---
title: Count Users
linkTitle: Count users
description: ADD A DESCRIPTION
weight: 10
date: 2021-05-17
---

To configure a count users flow:

1. Click the **Create Flow** icon associated with counting test users.
    The API Orchestration user interface is displayed.

2. Select and pull the testuser flow-node onto the flow editor from the Models list. Note that the Start flow-node is automatically connected to the input of the testuser flow-node.

3. Name the flow-node: Count testusers

4. Select the `count` method.

5. Select **Parameters**.

6. Enable the `where` parameter and begin typing in the parameter field. If **selector** is selected from the _selector_ drop-down menu, as you begin typing in the **parameter** field, a drop-down menu of valid or previously used selector options is displayed. You may optionally choose a selector from the list, or continue typing to configure the parameter manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). For additional information on the Model flow-node and General flow-node configuration parameters, refer to [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).

7. Select **Outputs**.

8. Configure the **next** output. As you begin typing in the **next** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.

9. Select and pull an HTTP flow-node onto the flow editor from the Core list.

10. Name the flow-node: Count succeeded

11. Select **Parameters**.

12. For the **status** parameter, select **number** and enter `200` in the field.

13. Enable the **body** parameter, select **selector**, and enter `$.count` in the field.

14. Leave the **headers** parameter disabled.

15. Connect the next output of the Count users flow-node to the input of the Count succeeded flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). The completed flow is displayed.

    ![Count_01_latest](/Images/Count_01_latest.png)
16. Click **Apply**.

17. On the next screen, click **Proceed**. The server will be restarted, the _Count users_ flow will be saved and enabled, and you will be returned to the API Orchestration user interface.

18. To exit API Orchestration user interface and return to API Lists page, click **Close**.
