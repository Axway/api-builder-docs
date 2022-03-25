---
title: Quick start
weight: 10
date: 2022-03-01
description: Quickly get started to write your first flow, and learn the basics of OpenAPI development.
---

## Import your first API

1. Navigate to _API Doc & Test_
1. Click on the **+ OpenAPI** button
1. In the input box, enter:<br>https://docs.axway.com/bundle/api-builder/page/samples/openapi/bookstore.yaml
1. Click **Fetch from URL**
1. It will show a Summary of the API. Click **Save** to finish importing the API

![OpenAPI import](/Images/openapi_quickstart_import.gif)

## Your first flow

After importing the API, the _API Doc & Test_ shows the rendered OpenAPI specification. The role of the developer in {{% variables/apibuilder_prod_name %}} is to implement these operations using [flows](/docs/developer_guide/flows), so we will start by creating a flow for **GET /books/{isbn}**.

1. Find the operation for **GET /books/{isbn}** and click the **Create Flow** button. This will bring you to the flow editor.
1. In the _Flow-Nodes_ panel to the left, find the [**HTTP response flow-node**](/docs/developer_guide/flows/flow_nodes/http_response_flow_node) ![HTTP response flow-node](/Images/flow_node_http_response.png)
1. Then click and drag the [**HTTP response flow-node**](/docs/developer_guide/flows/flow_nodes/http_response_flow_node) on to the graph on the right. It will automatically add this to the **Start** node.
1. In the flow-node properties panel on the right, find the **Status** property.
1. In the **Status** property, change the _Selector_ drop-down to _Number_.
1. In the **Status** property, enter the value: `200`, representing HTTP success.
1. In the flow-node properties panel on the right, find **Body** property. It should appear disabled.
1. In the **Body** property, enable the property by clicking the toggle switch.
1. In the **Body** property, change the _Selector_ drop-down to _Object_.
1. In the **Body** property, enter the value:<br>
`{"id":"1234","isbn":"1234", "title":"Moby Dick", "author":"Herman Melville","published":"1851-10-18"}`
1. Click **Close** and then **Save and exit**

![OpenAPI edit flow](/Images/openapi_quickstart_flow.gif)

After the server restarts, you are brought back to the _API Doc & Test_ page with the summary of your API. Note that the button associated with the **GET /books/{isbn}** operation now says, **Edit Flow**. This is because this operation is now bound to a flow. You can edit the flow as many times as is necessary to fully implement the operation. You can read more about flows [here](/docs/developer_guide/flows).

{{% alert title="Note" color="primary" %}}
When a flow is created for an OpenAPI operation, we say the operation is "bound" to a flow.
{{% /alert %}}

## Try your API

Now that your **GET /books/{isbn}** is implemented, you can invoke your API.

1. Click the **GET /books/{isbn}** row to expand the GET operation
1. Click **Try it out**
1. In the **isbn** parameter field, input `1234`
1. Click the **Execute** button (you may need to scroll down)

## Accessing the API specification

The OpenAPI specification you imported is served by the {{% variables/apibuilder_prod_name %}} application. From the UI, you can click on the **Summary** page, and then click on **Download OpenAPI specification**.

The OpenAPI specification is bound to the following paths and is exposed by the service for download:

* `/apidoc/swagger.json` (for model API and custom API)
* `/apidoc/swagger.yaml` (for model API and custom API)
* `/apidoc/openapi.json`
* `/apidoc/openapi.yaml`

Administrators will see only one path in the log. For OpenAPI 2.0, it is `/apidoc/swagger.json`, otherwise, it is `/apidoc/openapi.json`. Some parts of the API specification can be tweaked from the [apidocs.overrides configuration](/docs/developer_guide/project/configuration/project_configuration#apidoc). The "/apidoc" prefix is configured by changing the [`apidoc.prefix`](/docs/developer_guide/project/configuration/project_configuration#apidoc) in the configuration.

For example, the OpenAPI specification can be downloaded from: http://localhost:8080/apidoc/openapi.yaml
