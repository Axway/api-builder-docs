---
title: Manage Flows
linkTitle: Manage Flows
weight: 20
date: 2021-03-02
no_list: true
---

Flows are acyclic directed graphs of operational flow-nodes, which are composed of inputs, logic, and outputs. They are used by endpoints, which require them for their runtime functionality of taking inputs and turning them into responses when an endpoint is hit. For reference information on flow orchestration and flow-node configuration, refer to [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).

## Add API endpoints

To import and add API endpoints and flows, refer to [Manage Endpoints](/docs/developer_guide/flows/manage_endpoints/).

## View flows

To view a flow using the {{% variables/apibuilder_prod_name %}} user interface:

1. Select the **API Doc & Test** tab.

2. Select an API Endpoint to view the API List of endpoints. The API Lists page is displayed. Endpoints that are flow-based have a **Flow** icon displayed. Endpoints that are programmatically-based do not have a **Flow** icon display. Additionally, the method, path, nickname, description, and status of each endpoint is provided on the APIs List page.

3. Select the **Flow** icon for the endpoint flow you want to view. The selected flow is displayed in the flow editor panel on the API Orchestration user interface.

4. To exit the API Orchestration user interface and return to the API Lists page, select **Close**.

## Create flows

To create a flow using the {{% variables/apibuilder_prod_name %}} user interface:

1. Import an API endpoint per the **Add endpoints** instructions in [Manage Endpoints](/docs/developer_guide/flows/manage_endpoints/). Once the API endpoints are imported, and the server is restarted, the imported API endpoints are displayed on the APIs List page. The imported API endpoints are disabled, and each endpoint has **Create Flow** and **Delete** icons. Additionally, the method, path, nickname, description, and status of each imported endpoint is provided on the APIs List page.

2. Click the **Create Flow** icon for an endpoint. The API Orchestration user interface is displayed, and a Start flow-node is presented in the flow editor panel.

3. Add flow-nodes to the flow. Refer to the **Add flow-node** instructions in [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

4. Configure the flow-nodes added to the flow. Refer to the **Configure flow-node** instructions in [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

5. Connect the flow-nodes in the flow. Refer to the **Connect flow-nodes** instructions in [Manage Flows](#).

6. When the flow is complete, click the **Apply** button. The Flow save caution window is displayed.

    {{% alert title="⚠️ Note" color="primary" %}}Only changes to valid flows can be applied.{{% /alert %}}

    ![save_caution](/Images/save_caution.png)

7. Select **Proceed** to save the flow. Select **Cancel** to return to the API Orchestration user interface. If **Proceed** is selected, the server is restarted, and the flow is saved. Once the server restart is completed, the API Orchestration user interface is displayed, and the flow is enabled. For flow creation examples, refer to [Flow Examples](/docs/developer_guide/flows/manage_flows/flow_examples/).

8. To exit the API Orchestration user interface and return to the API Lists page, select **Close**. If you select **Close** and there are unsaved changes to the flow, the Close caution window is displayed.

    ![close_caution](/Images/close_caution.png)
9. Select **Save and exit** to save the flow changes and return to the API Lists page. Select **Discard changes** to discard the unsaved changes to the flow and return to the API Lists page.

## Edit flows

To edit a flow using the {{% variables/apibuilder_prod_name %}} user interface:

1. Select the **API Doc & Test** tab.

2. Select an API Endpoint to view the API List of endpoints. The API Lists page is displayed.

3. Select the **Flow** icon for the API endpoint flow to edit. The selected flow is displayed in the flow editor panel on the API Orchestration user interface.

4. Make the required edits to the flow. For instructions on adding, configuring, and connecting flow-nodes or disconnecting and deleting flow-nodes, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

5. Once the flow edits are completed, click the **Apply** button. The Flow save caution window is displayed.

    ![save_caution](/Images/save_caution.png)
6. Select **Proceed** to save the flow. Select **Cancel** to return to the API Orchestration user interface. If **Proceed** is selected, the server is restarted, and the flow is saved. Once the server restart is completed, the API Orchestration user interface is displayed.

7. To exit the API Orchestration user interface and return to the API Lists page, select **Close**. If you select **Close** and there are unsaved changes to the flow, the Close caution window is displayed.

    ![close_caution](/Images/close_caution.png)
8. Select **Save and exit** to save the flow changes and return to the API Lists page. Select **Discard changes** to discard the unsaved changes to the flow and return to the API Lists page.

## Debug a flow

Beginning with the [Osaka](/docs/release_notes/standalone_-_1_march_2019/) release of {{% variables/apibuilder_prod_name %}}, the ability for Flows to be provided with parameters and executed without having to leave the Flow Editor has been added. For additional information and to get started using the Flow Editor debug feature, refer to [Debug a flow](/docs/how_to/debug_a_flow/).

## Delete endpoints

To delete an endpoint using the {{% variables/apibuilder_prod_name %}} user interface:

1. Select the **API Doc & Test** tab.

2. Select an API Endpoint to view the API List of endpoints. The API Lists page is displayed.

3. Select the **Delete** icon for the API endpoint to delete. The Endpoint delete caution window is displayed.

    ![endpoint_del_caution](/Images/55181383_endpoint_del_caution.png)
4. Select **Proceed** to delete the selected API endpoint. Select Cancel to return to the APIs List page. If **Proceed** is selected, the endpoint and any associated flow are deleted, and the server is restarted. Once the server restart is completed, the APIs List page is displayed.
