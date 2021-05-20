---
title: Create a User
linkTitle: Create a user
description: ADD A DESCRIPTION
weight: 20
date: 2021-05-17
---

To configure a create a user flow:

1. Click the **Create Flow** icon associated with creating a simple user.
    The API Orchestration user interface is displayed.

2. Select and pull the testuser flow-node onto the flow editor from the Models list. Note that the Start flow-node is automatically connected to the input of the testuser flow-node.

3. Name the flow-node: Create testuser

4. Select the `create` method.

5. Select **Parameters**.

6. Configure the **data** parameter. If **selector** is selected from the _selector_ drop-down menu, as you begin typing in the **data** parameter field, a drop-down menu of valid or previously used selector options is displayed. You may optionally choose a selector from the list, or continue typing to configure the parameter manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). For additional information on the Model flow-node and General flow-node configuration parameters, refer to [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).

7. Select **Outputs**.

8. Configure the **next** output. As you begin typing in the **next** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.

9. Select and pull a JavaScript flow-node onto the flow editor from the Core list. If this is not available, you can install it following the instructions [here](/docs/developer_guide/flows/flow-nodes/javascript_flow-node/).

10. Name the flow-node: Set header location

11. Select **Parameters**.

12. Configure the **data** parameter. If **selector** is selected from the _selector_ drop-down menu, as you begin typing in the **data** parameter field, a drop-down menu of valid or previously used selector options is displayed. You may optionally choose a selector from the list, or continue typing to configure the parameter manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). For additional information on the Model flow-node and General flow-node configuration parameters, refer to [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).

13. Configure the **code** parameter. Select **Edit Javascript** and return an object which contains the **location** header.

14. Select **Outputs**.

15. Configure the **next** output. As you begin typing in the **next** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.

16. Configure the **error** output. As you begin typing in the **error** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.

17. Connect the next output of the Create user flow-node to the input of the Set header location flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

18. Select and pull an HTTP flow-node onto the flow editor from the Core list.

19. Name the flow-node: Create succeeded

20. Select **Parameters**.

21. For the **status** parameter, select **number** and enter `201` in the field.

22. Leave the **body** parameter disabled.

23. Enable and configure the **headers** parameter. If **selector** is selected from the _selector_ drop-down menu, as you begin typing in the **headers** parameter field, a drop-down menu of valid or previously used selector options is displayed. You may optionally choose a selector from the list, or continue typing to configure the parameter manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). For additional information on the Model flow-node and General flow-node configuration parameters, refer to [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).

24. Select and pull an HTTP flow-node onto the flow editor from the Core list.

25. Name the flow-node: Create failed

26. Select **Parameters**.

27. For the **status** parameter, select **number** and enter `400` in the field.

28. Leave the **body** and **headers** parameters disabled.

29. Connect the next output of the Set header location flow-node to the input of the Create succeeded flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

30. Connect the error output of the Set header location flow-node to the input of the Create failed flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). The completed flow is displayed.

    ![image2019-8-6_15_55_45](/Images/image2019-8-6_15_55_45.png)
31. Click **Apply**.

32. On the next screen, click **Proceed**. The server will be restarted, the _Create a user_ flow will be saved and enabled, and you will be returned to the API Orchestration user interface.

33. To exit API Orchestration user interface and return to API Lists page, click **Close**.
