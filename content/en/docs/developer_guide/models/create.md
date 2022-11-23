---
title: Models - create
linkTitle: Models - create
weight: 10
date: 2021-10-01
---

## Create a new model

Let's create a new model. In the Admin Console:

1. Click the **Models** tab.
1. Click the **\+ Model** button on the right side.
1. In the New Model step:

    ![new_model_%281%29_latest](/Images/55476489_new_model_(1)_latest.png)

    1. Enter "simpleuser" in the **Model name** field (required). The name must be unique for all of the application's models.
    1. Select a **Connector** from the drop-down list (required). Connectors are used to persist data to the model.
    1. Add a description.
    1. Click **Next** to move onto the fields step.
1. In the Create Model Fields step:

    ![add_fields](/Images/add_fields.png)

    1. Click the **\+ Field** button.
    1. Enter "first_name" in the Field name field (required).
    ![create_fields](/Images/create_fields.png)
    1. Set Type to String.
    1. Leave Default value empty.
    1. Add a description.
    1. Check the boxes for Read-only or Required as necessary.
    1. Click the **Add field to model** button.
    1. Repeat step 4 as necessary to add the "last_name" and "email" fields to this model. After you add the fields, you can configure them by changing properties or adding validation or return logic.
    1. Click **Next** to move onto the endpoint step.
1. In the API endpoint page:

    ![add_endpoints](/Images/add_endpoints.png)

    1. Make sure the **Create**, **Retrieve**, **Update**, and **Delete** methods are checked.
    1. Click Save to commit your new model to the app.

If you look in your project's `models` folder, notice you have a new file called `simpleuser.js`. This file was just created by the Admin Console. Instead of creating a model using the Admin Console, you can define one using JavaScript files in the project's `models` folder.

## Access model data

Now that you have created the simpleuser model, let's try to retrieve the model data from the application.

In the Admin Console

1. Click the **API Docs & Test** tab. This page lists all the API endpoints that your application exposes. You can also add or import API endpoints via the **\+ API** button. For additional information, refer to [Manage Endpoints](/docs/developer_guide/flows/manage_endpoints/).
![API_Doc_n_Test_latest](/Images/api_doc_n_test_latest.png)
1. Click anywhere on the row of any one of the API endpoints that you recently created. The Admin Console presents all the API endpoints that can be used to access a particular model. You can also export API endpoints via the **Download Swagger** button. For additional information, refer to [Manage Endpoints](/docs/developer_guide/flows/manage_endpoints/).
![APIs_list_testuser_latest](/Images/apis_list_testuser_latest.png)
1. **Expand one of the GET methods** in your endpoint. The code example for the curl should be visible. If it is not, scroll down until the Examples section is visible and select **curl**.
![API_Doc_n_Test_curl_latest](/Images/api_doc_n_test_curl_latest.png)
1. **Copy a curl command** and **run it in a terminal**. Note the message returned by this command. Alternatively, you can test the select GET method in the user interface. Scroll until the Test API section is visible; if available complete the Request, Path parameters, and Query parameters fields and then click **Execute**. Note the Result returned in the user interface.
