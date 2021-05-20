---
title: Manage Endpoints
linkTitle: Manage Endpoints
description: ADD A DESCRIPTION
weight: 10
date: 2021-05-17
---

An API endpoint provides a way for a client to access your application, such as `GET <SERVER_ADDRESS>/api/users/query`, and access the application's models and custom code blocks to return data to the client application. To create API endpoints, see the API reference or follow the [Generate endpoints](#generate-endpoints) instructions. For reference information on flow orchestration and flow-node configuration, refer to [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).

## Import endpoints

{{% alert title="⚠️ Note" color="primary" %}}A Swagger API endpoint definition file can only be imported once. If you attempt to import a Swagger file for the same API endpoint definition, you will receive a server error message due to conflicting paths.{{% /alert %}}

When designing API to import, you should refer to the apiPrefix section in [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/#apiprefix) for important API design considerations.

To import API endpoints using the {{% variables/apibuilder_prod_name %}} user interface:

1. Select the **API Doc & Test** tab.

2. Click the **\+ API** button on the right side. The Import API Definition page is displayed.

    ![import_API](/Images/import_API.png)
3. Select a file from your local file system or enter a URL. A file can be selected by browsing or dragging and dropping it. The selected file must be a Swagger formatted JSON or YAML file. Once a file is selected, or a URL entered, the API summary review page is displayed.

    ![API_sum_review](/Images/API_sum_review.png)
4. Click the **Save** button on the right to import and save the selected API endpoint. Click the **Save and mock** button to save and mock the selected API endpoint. You can mock imported APIs to get early feedback from your API consumers and reduce your overall time-to-market. Click the **Cancel** button to cancel the import of the selected API endpoint. When the **Save** button or the **Save and mock** button is clicked, the server will restart. Once the server restart is completed, the imported API endpoints will be displayed on the APIs List page. The imported API endpoints will be disabled, and each will have a **Create Flow** and **Delete** icons. To create the API endpoint flows, refer to the Create flows instructions in [Manage Flows](/docs/developer_guide/flows/manage_flows/).

## Generate endpoints

{{% variables/apibuilder_prod_name %}} may auto-generate APIs for certain models. These APIs are hard-coded and cannot be used with flows or the orchestration flow editor.

To generate endpoints that have flows that can be edited within the flow editor using the {{% variables/apibuilder_prod_name %}} user interface:

1. Select the **Models** tab.

2. Click the **Gear** icon.

3. Select **Generate endpoints**. The previously generated Endpoints will be overwritten caution window is displayed.

    ![endpoint_gen_caution](/Images/endpoint_gen_caution.png)
4. Select **Proceed** to generate the model endpoint flows. Select **Cancel endpoint generation** to return to the Models tab.

5. If Proceed is selected, the new endpoints will be generated, and the server will be restarted. Once the endpoints are generated, the Endpoint has been generated success window is displayed.

    ![endpoint_gen_success](/Images/endpoint_gen_success.png)
6. To view and manage the Endpoints, select **Go to API details**. The method, path, nickname, description, and status (enabled, disabled, or error) of each generated endpoint is provided on the APIs List page. Additionally, **Flow** and **Delete** icons are provided for each Endpoint.

## Export endpoints

To export an API endpoint as a Swagger file using the {{% variables/apibuilder_prod_name %}} user interface:

1. Select the **API Doc &** **Test** tab.

2. Select the API endpoint to export from the API Endpoints list. Selecting the API endpoint to export will open the APIs List page.

3. Click the **Download Swagger** button to download the selected API endpoint as a Swagger file in the original format that it was imported (for example, JSON or YAML).

4. Select the file download location on your file system.

5. Confirm the file download.

## Delete endpoints

To delete endpoints using the {{% variables/apibuilder_prod_name %}} user interface:

1. Select the **API Doc &** **Test** tab.

2. Select the API endpoint to manage from the API Endpoints list. Selecting the API endpoint to manage will open the APIs List page.

3. Select the **Delete** icon for the endpoint to delete. The Endpoint delete caution window is displayed.

    ![endpoint_del_caution](/Images/55477532_endpoint_del_caution.png)
4. Select **Proceed** to delete the selected endpoint. Select **Cancel** to return to the _API List_ page. If **Proceed** is selected, the endpoint and any associated flow are deleted, and the server is restarted. Once the server restart is completed, the APIs List page is displayed.
