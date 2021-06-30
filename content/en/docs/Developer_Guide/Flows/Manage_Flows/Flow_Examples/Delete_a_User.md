---
title: Delete a user
linkTitle: Delete a user
description: ADD A DESCRIPTION
weight: 40
date: 2021-06-22
---

To configure a delete a user flow:

1. Click the **Create Flow** icon associated with deleting a test user.
    The API Orchestration user interface is displayed.

2. Select and pull the testuser flow-node onto the flow editor from the Models list. Note that the Start flow-node is automatically connected to the input of the testuser flow-node.

3. Name the flow-node: Delete testuser

4. Select the `delete` method.

5. Select **Parameters**.

6. Configure the **id** parameter. If **selector** is selected from the _selector_ drop-down menu, as you begin typing in the **id** parameter field, a drop-down menu of valid or previously used selector options is displayed. You may optionally choose a selector from the list, or continue typing to configure the parameter manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). For additional information on the Model flow-node and General flow-node configuration parameters, refer to [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).

7. Select **Outputs**.

8. Configure the **next** output. As you begin typing in the **next** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.

9. Configure the **notfound** output. As you begin typing in the **notfound** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.

10. Select and pull an HTTP flow-node onto the flow editor from the Core list.

11. Name the flow-node: Delete succeeded

12. Select **Parameters**.

13. For the **status** parameter, select **number** and enter `204` in the field.

14. Leave the **body** and **headers** parameters disabled.

15. Select and pull an HTTP flow-node onto the flow editor from the Core list.

16. Name the flow-node: Delete failed

17. Select **Parameters**.

18. For the **status** parameter, select **number** and enter `404` in the field.

19. Leave the **body** and **headers** parameters disabled.

20. Connect the next output of the Delete a user flow-node to the input of the Delete succeeded flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

21. Connect the notfound output of the Delete a user flow-node to the input of the User not found flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). The completed flow is displayed.

    ![Delete_01_latest](/Images/delete_01_latest.png)
22. Click **Apply**.

23. On the next screen, click **Proceed**. The server will be restarted, the _Delete a user_ flow will be saved and enabled, and you will be returned to the API Orchestration user interface.

24. To exit API Orchestration user interface and return to API Lists page, click **Close**.
