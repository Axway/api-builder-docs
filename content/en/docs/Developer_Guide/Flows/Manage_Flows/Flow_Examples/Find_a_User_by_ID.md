---
title: Find a User by ID
linkTitle: Find a User by ID
weight: 80
date: 2021-03-02
---

To configure a find a user by ID flow:

1. Click the **Create Flow** icon associated with finding a test user using their ID.
    The API Orchestration user interface is displayed.

2. Select and pull the testuser flow-node onto the flow editor from the Models list. Note that the Start flow-node is automatically connected to the input of the testuser flow-node.

3. Name the flow-node: Find a user by ID

4. Select the `findByID` method.

5. Select **Parameters**.

6. Configure the **id** parameter. If **selector** is selected from the _selector_ drop-down menu, as you begin typing in the **id** parameter field, a drop-down menu of valid or previously used selector options is displayed. You may optionally choose a selector from the list, or continue typing to configure the parameter manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). For additional information on the Model flow-node and General flow-node configuration parameters, refer to [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).

7. Select **Outputs**.

8. Configure the **next** output. As you begin typing in the **next** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.

9. Configure the **notfound** output. As you begin typing in the **notfound** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.

10. Select and pull an HTTP flow-node onto the flow editor from the Core list.

11. Name the flow-node: Find succeeded

12. Select **Parameters**.

13. For the **status** parameter, select **number** and enter `200` in the field.

14. Enable the **body** parameter, select **selector**, and select `$.model` from the selector options drop-down menu or continue typing to complete the selector configuration manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

15. Leave the **headers** parameter disabled.

16. Connect the next output of the Find a user by ID flow-node to the input of the Find succeeded flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

17. Select and pull an HTTP flow-node onto the flow editor from the Core list.

18. Name the flow-node: Find failed

19. Select **Parameters**.

20. For the **status** parameter, select **number** and enter `404` in the field.

21. Leave the **body** and **headers** parameters disabled.

22. Connect the notfound output of the Find a user by ID flow-node to the input of the User not found flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). The completed flow is displayed.

    ![Find_by_ID_latest](/Images/Find_by_ID_latest.png)
23. Click **Apply**.

24. On the next screen, click **Proceed**. The server will be restarted, the _Find a user by ID_ flow will be saved and enabled, and you will be returned to the API Orchestration user interface.

25. To exit API Orchestration user interface and return to API Lists page, click **Close**.
