---
title: Upsert a User
linkTitle: Upsert a user
description: ADD A DESCRIPTION
weight: 110
date: 2021-05-17
---

To configure an upsert (update or insert) a user flow:

1. Click the **Create Flow** icon associated with updating or inserting a test user.
    The API Orchestration user interface is displayed.

2. Select and pull the testuser flow-node onto the flow editor from the Models list. Note that the Start flow-node is automatically connected to the input of the testuser flow-node.

3. Name the flow-node: Upsert testuser

4. Select the `upsert` method.

5. Select **Parameters**.

6. Configure the **value** parameter. If **selector** is selected from the _selector_ drop-down menu, as you begin typing in the **value** parameter field, a drop-down menu of valid or previously used selector options is displayed. You may optionally choose a selector from the list, or continue typing to configure the parameter manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). For additional information on the Model flow-node and General flow-node configuration parameters, refer to [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).

7. Select **Outputs**.

8. Configure the **update** output. As you begin typing in the **update** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.

9. Configure the **upsert** output. As you begin typing in the **upsert** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.

10. Select and pull a Set Context flow-node onto the flow editor from the Core list.

11. Name the flow-node: Set location

12. Select **Parameters**.

13. For the **value** parameter, select **selector** and select `$.model.id` from the selector options drop-down menu or continue typing to manually complete the selector configuration. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

14. Connect the insert output of the Upsert a user flow-node to the input of the Set location flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

15. Select and pull an HTTP flow-node onto the flow editor from the Core list.

16. Name the flow-node: Update succeeded

17. Select **Parameters**.

18. For the **status** parameter, select **number** and enter `204` in the field.

19. Leave the **body** and **headers** parameters disabled.

20. Connect the update output of the Upsert a user flow-node to the input of the Upsert succeeded flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

21. Select and pull an HTTP flow-node onto the flow editor from the Core list.

22. Name the flow-node: Insert succeeded

23. Select **Parameters**.

24. For the **status** parameter, select **number** and enter `201` in the field.

25. Leave the **body** parameter disabled.

26. Enable the **headers** parameter, select **selector**, and select `$.headers` from the selector options drop-down menu or continue typing to complete the selector configuration manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

27. Connect the insert output of the Upsert a user flow-node to the input of the Insert succeeded flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

28. Connect the next output of the Set location flow-node to the input of the Insert succeeded flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). The completed flow is displayed.

    ![Upsert_latest](/Images/Upsert_latest.png)
29. Click **Apply**.

30. On the next screen, click **Proceed**. The server will be restarted, the _Upsert a user_ flow will be saved and enabled, and you will be returned to the API Orchestration user interface.

31. To exit API Orchestration user interface and return to API Lists page, click **Close**.
