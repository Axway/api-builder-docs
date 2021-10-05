---
title: Models
linkTitle: Models
weight: 10
date: 2021-10-01
---

## Introduction

This guide covers the basic instructions for creating Models. Models are a way of accessing data stored in either server memory or a backend service, such as a MySQL database, using a Connector. Models are accessed like standard REST objects using predefined endpoints that {{% variables/apibuilder_prod_name %}} automatically generates. You can either create a model by defining your schema, use an existing model defined by a connector, modify an existing model, or create a composite model by joining two or more models together.

In the **Models** tab, you will see a list of models (by name), connector names, descriptions, and any joins to other models. This page allows you also to create new models, edit an existing model, and compose the model into a new model.

![model_page_latest](/Images/model_page_latest.png)

## Create a new model

Models can be created in many different ways, but with the user interface (UI), you do not necessarily need to get your hands dirty with writing out code.

To create a new model using the UI:

1. Click the **\+ Model** button.
1. In the model window.
![new_model_%281%29_latest](/Images/55477331_new_model_(1)_latest.png)

    1. Enter the **Model name** (required).
    1. Select a **Connector** (required).
    1. Enter a **Description** for the new model. While this is an optional field, we encourage you to provide a clear and concise description of what the model does.
    1. Click **Next** to start the process of creating a new model.
1. In the New Model page, you will see the name of the model you just created with an option to edit that name and the Connector you selected for it to use.
1. To add a new field, click the **\+ Field** button. In the model window,

    1. Enter the **Field** name (required).
    1. Select the **Type** for this new field.
    1. Enter a **Default** **value** (optional).
    1. Enter a **Description**.
    1. Check off the **Read-only** or the **Required** boxes.
    1. Click **Add field to model** to complete the addition of this new field.
1. Repeat step 4 as needed to add as many fields as necessary.
1. At this point, you can edit any field you created by clicking the **Pencil** icon at the end of the field row.
1. If the field is not needed, you can remove it by clicking on the **Trashcan** icon at the end of the field row.

    {{% alert title="Note" color="primary" %}}There is no warning for deleting a field. When you delete a field, you will not be prompted for a confirmation of the action.{{% /alert %}}
1. Click the **Next** button.
1. Optional: on the endpoint generation page, select the methods that will be automatically generated for the API endpoints. When you click **Next**, you are brought to the API generation page where you can optionally generate an API definition for your new model, and choose the method(s) that you wish to generate. To generate API endpoints:

    1. Select the methods that will be automatically generated for the API endpoints.
    1. You can change the singular and plural values for this new model. These values are used in the API documentation (for example, "Create a user" or "Count users"), but these values are also used in the body of the API responses.
    1. If you are satisfied with your new field(s), click the **Save** button.
1. Also, on this page, you can change the singular and plural values for this new model.
1. If you are satisfied with your new field(s), click the **Save** button.
![compose_model_latest](/Images/compose_model_latest.png)

## Edit a model

To edit an existing model using the user interface:

1. Navigate to the **Models** tab.
1. Locate the model you wish to edit and click the **Gear** icon at the end of the row. A dialogue box will open.
![edit-compose-generate_model](/Images/edit_compose_generate_model.png)
1. Click **Edit this model**. A dialogue window will open up and allow you to make changes to your selected model.
1. You can edit the model name by clicking the **Pencil** icon next to the model name.
1. Locate the field you wish to edit and click the **Pencil** icon at the end of its row.
1. Modify the **Field** name, **Type**, **Default** value, or **Description** fields as necessary. You can also toggle the Read-only and Required checkboxes.
1. Once you are done modifying this field, click the Update field button.
1. Repeat steps 6-7 as necessary.
1. Click the **Next** button.
1. Modify any of the **API endpoints** and the **Singular** and **Plural** fields.
1. Click the **Save** button if you are satisfied with your changes.

## Composing a new model

To compose a new model using the user interface:

1. Click on the **Gear** icon at the end of the row for the model you wish to compose and select **Compose into new**.
1. Enter a model name (required) and a description.
![compose_model_latest](/Images/compose_model_latest.png)
1. In the Composite Model page, you can edit the name of the composite and modify the fields (as needed). If you want to rename the composite, click the **Pencil** icon and complete the fields of the Composite Model model window as necessary. Click **Update** when you have finished.
1. If you wish to modify the fields of this new composite, click the **Pencil** icon at the end of the row for the field in question.
1. Fill in the various fields and check the **Read-only** or **Required** checkboxes as necessary. Click **Update Field** once you have finished.
1. When you are done making any modifications, click the **Next** button.
1. Enable or disable any auto-generated API endpoints as you see fit.
1. Modify the **Singular** and **Plural** fields as necessary.
1. Click **Save** to commit your new composite model.

## Generate endpoints

To generate endpoints, refer to [Manage Endpoints](/docs/developer_guide/flows/manage_endpoints/).
