---
title: Find and Modify Users
linkTitle: Find and Modify Users
weight: 70
date: 2021-03-02
---

To configure a find and modify users flow:

1. Click the **Create Flow** icon associated with finding and modifying a test user.
    The API Orchestration user interface is displayed.

2. Select and pull a Set Context flow-node onto the flow editor from the Core list. Note that the Start flow-node is automatically connected to the input of the Set Context flow-node.

3. Name the flow-node: Build args parameter (new)

4. Select **Parameters**.

5. For the **value** parameter, select **selector** and select `$.params.new` from the selector options drop-down menu or continue typing to complete the selector configuration manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

6. Select **Outputs**.

7. Configure the **next** output. As you begin typing in the **next** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.

8. Select and pull a Set Context flow-node onto the flow editor from the Core list.

9. Name the flow-node: Build args parameter (upsert)

10. Select **Parameters**.

11. For the **value** parameter, select **selector** and select `$.params.upsert` from the selector options drop-down menu or continue typing to complete the selector configuration manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

12. Select **Outputs**.

13. Configure the **next** output. As you begin typing in the **next** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.

14. Connect the next output of the Build args parameter (new) flow-node to the input of the Build args parameter (upsert) flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

15. Select and pull the testuser flow-node onto the flow editor from the Models list.

16. Name the flow-node: Find and modify testuser

17. Select the `findAndModify` method.

18. Select **Parameters**.

19. Configure the **data** parameter. If **selector** is selected from the _selector_ drop-down menu, as you begin typing in the **data** parameter field, a drop-down menu of valid or previously used selector options is displayed. You may optionally choose a selector from the list, or continue typing to configure the parameter manually. For additional selector auto-complete information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). For additional information on the Model flow-node and General flow-node configuration parameters, refer to [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).

20. Enable the additional parameters and configure them according to the `findAndModify` parameters listed in [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).

21. Select **Outputs**.

22. Configure the **next** output. As you begin typing in the **next** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.

23. Configure the **notfound** output. As you begin typing in the **notfound** field, a drop-down menu of valid or previously used output options is displayed. You may optionally choose an output from the list, or continue typing to configure the parameter manually.

24. Connect the next output of the Build args parameter (upsert) to the input of the Find and modify users flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

25. Select and pull an HTTP flow-node onto the flow editor from the Core list.

26. Name the flow-node: Find and modify succeeded

27. Select **Parameters**.

28. For the **status** parameter, select **number** and enter `204` in the field.

29. Leave the **body** and **headers** parameters disabled.

30. Connect the next output of the Find and modify users flow-node to the input of the Find and modify succeeded flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

31. Select and pull an HTTP flow-node onto the flow editor from the Core list.

32. Name the flow-node: Find and modify failed

33. Select **Parameters**.

34. For the **status** parameter, select **number** and enter `404` in the field.

35. Leave the **body** and **headers** parameters disabled.

36. Connect the notfound output of the Find and modify users flow-node to the input of the Users not found flow-node. For additional information on connecting flow-nodes in a flow, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). The completed flow is displayed.

    ![Find_and_modify_latest](/Images/Find_and_modify_latest.png)
37. Click **Apply**.

38. On the next screen, click **Proceed**. The server will be restarted, the _Find and modify users_ flow will be saved and enabled, and you will be returned to the API Orchestration user interface.

39. To exit API Orchestration user interface and return to API Lists page, click **Close**.
