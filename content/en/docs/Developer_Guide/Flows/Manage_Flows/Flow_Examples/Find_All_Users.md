---
title: Find All Users
linkTitle: Find All Users
weight: 60
date: 2021-03-02
---

To configure a find all users flow:

1. Click the **Create Flow** icon associated with finding all test users.
    The API Orchestration user interface is displayed.

2. Select and pull the testuser flow-node onto the flow editor from the Models list. Note that the Start flow-node is automatically connected to the input of the testuser flow-node.

3. Name the flow-node: Find all testusers

4. Select the `findAll` method.

5. Select **Outputs**.

6. Configure the **next** output. As you begin typing in the **next** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.

7. Select and pull an HTTP flow-node onto the flow editor from the Core list.

8. Name the flow-node: Find succeeded

9. Select **Parameters**.

10. For the **status** parameter, select **number** and enter `200` in the field.

11. Enable the **body** parameter, select **selector**, and select `$.models` from the selector options drop-down menu or continue typing to manually complete the selector configuration. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

12. Leave the **headers** parameter disabled.

13. Connect the next output of the Find all users flow-node to the input of the Find succeeded flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). The completed flow is displayed.

    ![Find_all_latest](/Images/Find_all_latest.png)
14. Click **Apply**.

15. On the next screen, click **Proceed**. The server will be restarted, the _Find all users_ flow will be saved and enabled, and you will be returned to the API Orchestration user interface.

16. To exit API Orchestration user interface and return to API Lists page, click **Close**.
