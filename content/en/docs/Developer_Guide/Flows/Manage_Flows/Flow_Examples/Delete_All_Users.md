---
title: Delete all users
linkTitle: Delete all users
description: ADD A DESCRIPTION
weight: 30
date: 2021-06-22
---

To configure a delete all users flow:

1. Click the **Create Flow** icon associated with deleting all test users.
    The API Orchestration user interface is displayed.

2. Select and pull the testuser flow-node onto the flow editor from the Models list. Note that the Start flow-node is automatically connected to the input of the testuser flow-node.

3. Name the flow-node: Delete all testusers

4. Select the `deleteAll` method.

5. Select **Outputs**.

6. Configure the **next** output. As you begin typing in the **next** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.

7. Select and pull an HTTP flow-node onto the flow editor from the Core list.

8. Name the flow-node: Delete succeeded

9. Select **Parameters**.

10. For the **status** parameter, select **number** and enter `204` in the field.

11. Leave the **body** and **headers** parameters disabled.

12. Connect the next output of the Delete all users flow-node to the input of the Delete succeeded flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). The completed flow is displayed.

    ![Delete_all_latest](/Images/delete_all_latest.png)
13. Click **Apply**.

14. On the next screen, click **Proceed**. The server will be restarted, the _Delete all users_ flow will be saved and enabled, and you will be returned to the API Orchestration user interface.

15. To exit API Orchestration user interface and return to API Lists page, click **Close**.
