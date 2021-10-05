---
title: Authorization - access Microsoft OneDrive using REST flow-node
linkTitle: Authorization - access Microsoft OneDrive using REST flow-node
weight: 20
date: 2021-10-01
---

## Overview

This example demonstrates how to configure {{% variables/apibuilder_prod_name %}} to work with OneDrive. It will walk you through the steps of registering and configuring an Application with Microsoft. It will then walk you through setting up {{% variables/apibuilder_prod_name %}} and authorizing it to access the Microsoft application.

We will then create a flow that uses the [REST flow-node](/docs/developer_guide/flows/flow-nodes/rest_flow-node/) to invoke the OneDrive API and retrieve a list of contents.

## Creating and configuring Microsoft Application

Before starting on {{% variables/apibuilder_prod_name %}}, you need to register your application on the Microsoft application portal ([https://apps.dev.microsoft.com/](https://apps.dev.microsoft.com/)).

![apps.dev.microsoft.com](/Images/apps_dev_microsoft_com.png)

### Add an app

1. Click **Add an app**.
![apps.dev.microsoft.com_portal_register-app](/Images/apps_dev_microsoft_com_portal_register_app.png)

1. Name your application `OneDrive Example` and click **Create**.
![apps.dev.microsoft.com_init_app](/Images/apps_dev_microsoft_com_init_app.png)

1. Click **Save**.

### Configure application secrets

The `Application Id` displayed in the _Properties_ section will be the value of the `client_id` in the {{% variables/apibuilder_prod_name %}} credential. You also need to create a `client_secret`.

![apps.dev.microsoft.com_secret](/Images/apps_dev_microsoft_com_secret.png)

Click **Generate New Password**. The value displayed will be your `client_secret`; this is the only time it is visible, so make a note of the value and do not lose it. If you lose it, you can repeat this step to generate a new client secret.

![apps.dev.microsoft.com_client_secret](/Images/apps_dev_microsoft_com_client_secret.png)

### Configure platform

1. You need to add OAuth support to your application and add the {{% variables/apibuilder_prod_name %}} redirect URI. Under _Platforms_, click **Add Platform**.

    ![apps.dev.microsoft.com_webapp](/Images/apps_dev_microsoft_com_webapp.png)

1. Select **Web**.

    ![apps.dev.microsoft.com_platform](/Images/apps_dev_microsoft_com_platform.png)

    This will add a **Web** panel to the _Platforms_ list.
1. Uncheck **Allow Implicit Flow** ({{% variables/apibuilder_prod_name %}} will not be doing an implicit grant).
1. Set the Redirect URLs to `http://localhost:8080/auth/callback`.

### Configure permissions

In this example, you will be reading the user's files.

![apps.dev.microsoft.com_perms](/Images/apps_dev_microsoft_com_perms.png)

Click **Add** next to _Delegated Permissions_. From the list select:

* Files.Read
* offline_access

![apps.dev.microsoft.com_perms_done](/Images/apps_dev_microsoft_com_perms_done.png)

### Save your application

If you have not already done it, save your application.

## Setting up {{% variables/apibuilder_prod_name %}}

Create an example application:

```bash
npx @axway/api-builder init onedrive-example
cd onedrive-example
npm install --no-optional
node .
```

Your service is now running and is accessible on `http://localhost:8080/console`.

## Create OneDrive credential

For more information on OAuth 2.0 credentials, see [OAuth 2.0 credentials](/docs/developer_guide/credentials/configuring_credentials/oauth_2.0_credentials/).

To create the credential, you need the following information.

| Key | Value | Description |
| --- | --- | --- |
| flow | accessCode | The OAuth 2.0 access code grant flow. |
| authentication_url | [https://login.microsoftonline.com/common/oauth2/v2.0/authorize](https://login.microsoftonline.com/common/oauth2/v2.0/authorize) | The authorization URL will depend on the service to which you are connecting. Consult the vendor documentation for the values, for Microsoft's identity service, see: [https://developer.microsoft.com/en-us/graph/docs/concepts/auth_overview](https://developer.microsoft.com/en-us/graph/docs/concepts/auth_overview) |
| token_url | [https://login.microsoftonline.com/common/oauth2/v2.0/token](https://login.microsoftonline.com/common/oauth2/v2.0/token) | The token URL, like the authorization URL, will depend on the service you are connecting to. Consult the vendor documentation for the values, for Microsoft's identity service, see: [https://developer.microsoft.com/en-us/graph/docs/concepts/auth_overview](https://developer.microsoft.com/en-us/graph/docs/concepts/auth_overview) |
| client_id | 47d6acc1-d388-4449-b16d-7d43d8dfe107 | This is the Application Id for the application you registered. |
| client_secret | bFJGT4298@uesjeeBJD0~}; | This is the secret you generated when registering the application. |
| scope | [https://graph.microsoft.com/files.read](https://graph.microsoft.com/files.read) offline_access | These are the scopes that our example application will require and which we have enabled earlier when creating the Application.<br /><br />For information on how scopes are formatted in Microsoft Graph see [https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent) |
| access_token | null | This value must be present, and `null` for this example. |
| refresh_token | null | This value must be present, and `null` for this example. |

1. On the **Configuration** tab, open the `default.js` file. Scroll to the `credential` section of the file. Create a new OAuth 2.0 credential:

    ```javascript
    // default.js

    authorization: {
        callback: '/auth/callback',
        credentials: {
              'My OneDrive': {
                type: 'oauth2',
                flow: 'accessCode',
                authentication_url: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
                token_url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
                client_id: '47d6acc1-d388-4449-b16d-7d43d8dfe107',
                client_secret: 'bFJGT4298@uesjeeBJD0~};',
                scope: 'https://graph.microsoft.com/files.read offline_access',
                access_token: null,
                refresh_token: null
              }
        }
      }
    ```
1. Click **Save** and then open the **Credentials** tab.

    ![onedrive_unauthorized_lat](/Images/onedrive_unauthorized_lat.png)

    If everything went well, you should now have a credential named _My OneDrive_.
1. The credential has not been authorized. To authorize the credential, click **Authorize**.
1. Once you have logged in, you will be prompted to authorize access.

    ![image2018-11-16_18_43_14](/Images/image2018_11_16_18_43_14.png)
1. Click **Accept**. The credential is now ready to use.

    ![project_credentials_auth_lat](/Images/project_credentials_auth_lat.png)

{{% alert title="Note" color="primary" %}}By default, the access tokens issued by Microsoft will expire in 1 hour. {{% variables/apibuilder_prod_name %}} will keep the access token valid by refreshing it before its expiration; this is why it needs the `offline_access` scope. However, the access token and refresh token are stored in memory only, and if you restart {{% variables/apibuilder_prod_name %}}, you will need to authorize the credential again.{{% /alert %}}

### Create a flow to list the OneDrive contents

Before creating the flow, you need to import the API that will expose your flow. [Stoplight.io](https://stoplight.io/) is a great resource for designing APIs and was used to create a very simple API used for this example. This is a very simple API with a single endpoint.

### Create the onedrive.json Swagger document

1. Copy the following code into a text editor such as Notepad++:

    ```json
    // onedrive.json

    {
      "swagger": "2.0",
      "info": {
        "title": "One Drive Auth Demo API",
        "version": "1.0",
        "description": "A sample API for the {{% variables/apibuilder_prod_name %}} OneFrive Authorization Demo.",
        "license": {
          "name": "MIT"
        },
        "contact": {
          "name": "Axway",
          "email": "sales@axway.com",
          "url": "http://www.axway.com"
        }
      },
      "host": "localhost:8080",
      "paths": {
        "/contents": {
          "get": {
            "responses": {
              "200": {
                "description": "",
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              },
              "400": {
                "description": ""
              },
              "500": {
                "description": ""
              }
            },
            "summary": "This endpoint will list the contents of the OneDrive account.",
            "operationId": "GetContents",
            "consumes": [
              "application/json"
            ],
            "produces": [
              "application/json"
            ],
            "description": "Get the contents of the OneDrive account.",
            "tags": [
              "api-builder",
              "onedrive",
              "authorization"
            ]
          }
        }
      },
      "basePath": "/api",
      "schemes": [
        "http"
      ],
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "tags": [
        {
          "name": "api-builder onedrive authorization"
        },
        {
          "name": "api-builder"
        },
        {
          "name": "onedrive"
        },
        {
          "name": "authorization"
        }
      ]
    }
    ```
1. Name the file `onedrive.json` and save the file. You will import this file as an [API Endpoint](#import-the-api-endpoint).

### Import the API Endpoint

1. Open the **API Doc & Test** tab.

    ![api_doc_lat](/Images/api_doc_lat.png)
1. Click **+API**.
1. Import the `onedrive.json` Swagger document. Refer to [Create the onedrive.json Swagger document](#create-the-onedrivejson-swagger-document).

    ![api_import_lat](/Images/api_import_lat.png)
1. Click **Save**. This will create the API endpoint in a disabled state, as there is no flow attached to it.

### Create the flow for the API Endpoint

On the disabled endpoint, there is a **Create Flow** icon. Clicking **Create Flow** will start the Flow Editor where you can create the logic for your API.

![api_disabled_lat](/Images/api_disabled_lat.png)

We will go through the steps to create the flow, but for reference, the completed flow that we're building will look like this:

![Screenshot_2018-11-28_at_15.32.48](/Images/screenshot_2018_11_28_at_15_32_48.png)

1. Drag an Authorization flow-node from the tool panel. The Authorization flow-node only has a single `Get Credential` method. This method allows us to retrieve the managed credential token from {{% variables/apibuilder_prod_name %}}.

    1. On the **Parameters** tab, set the **name** to be `My OneDrive`. This is the name you gave your OneDrive credential when creating it in the configuration.
    1. On the **Outputs** tab, you can see that the credential token is stored in `$.credential`. We will use this later when invoking OneDrive.
        ![Screenshot_2018-11-28_at_15.19.50](/Images/screenshot_2018_11_28_at_15_19_50.png) ![Screenshot_2018-11-28_at_15.20.05](/Images/screenshot_2018_11_28_at_15_20_05.png)
1. Drag a Compose flow-node from the tool panel and select the `Format object` method. We will use this node to create the request headers object that will contain the authorization token.

    1. Connect the **next** output of the Get Credential node to the new Format object node.
    1. Click on the Format object title and rename it to Format Headers for clarity.
    1. On the **Parameters** tab, set the data to be `$.credential,` and set the template to:
      ```javascript
        {
            "Authorization": "Bearer {{=it}}"
        }
      ```
    1. On the **Outputs** tab, change the **Next** output to `$.headers`.

        ![format_headers_params](/Images/format_headers_params.png) ![format_headers_outputs](/Images/format_headers_outputs.png)
1. Drag in a REST flow-node from the tool panel and select the GET method. This is the node that will make the request.

    1. Connect the **Next** output of the Format Headers node to the new GET node.
    1. On the **Parameters** tab, set the **URL** to [https://graph.microsoft.com/v1.0/me/drive/root/children](https://graph.microsoft.com/v1.0/me/drive/root/children). Microsoft has a useful [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) tool that you can use to explorer their API.
    1. Also, set the **Headers** to `$.headers`, which is the object you created in the previous step.

        On the **Outputs** tab, you will see that the **2XX** response is stored as `$.response`. We will extract the response data from that later.

        ![get_params](/Images/get_params.png) ![get_outputs](/Images/get_outputs.png)
1. Drag in another Compose flow-node from the tool panel and select the `Format object`method. We will use this node to create a response body.

    1. Connect the **2XX** output of the GET node to the new Format object node.
    1. Click on the Format object title and rename it to Format Response for clarity.
    1. On the **Parameters** tab, set the data to be `$.response.body` and set the template to:

        ```javascript
        [
        {{~it.value :entry:index}}
        {{? index }}, {{?}}
        {
          "name": {{=JSON.stringify(entry.name)}},
          "webUrl": {{=JSON.stringify(entry.webUrl)}}
        }
        {{~}}
        ]
        ```

        For more information on the DoT template language, see [Use doT template language](/docs/developer_guide/flows/flow-nodes/dot_flow-node/).
    1. On the **Outputs** tab, change the **Next** output to `$.contents`.
        ![responsedot_params](/Images/responsedot_params.png) ![responsedot_outputs](/Images/responsedot_outputs.png)
1. Drag an HTTP flow-node from the tool panel; this only has a single `Set HTTP Response` method. We will use this node to configure the response that is returned to the caller.

    1. Connect the **Next** output of the Format Response node to the new Set HTTP Response node.
    1. Click on the Set HTTP Response title and rename it to Success for clarity.
    1. On the **Parameters** tab, set the **status** to be of type Number with the value 200. Set the **body** to $.contents.
1. Drag in another HTTP flow-node from the tool panel. We will use this node to configure the error response that is returned to the caller in the event of an error. For this demonstration, we will have a single error status - 400.

    1. Connect all the error outputs and all the unconnected outputs from the GET node to the Set HTTP Response node.
    1. Click on the Set HTTP Response title and rename it to Bad Request for clarity.
    1. On the **Parameters** tab, set the **status** to be of type Number with the value 400. Set the **body** to `$.error.message`.
1. Click **Apply** and **Close**.

### Test your Endpoint

1. Open the **Credentials** tab and check that your credential is authorized. If it is not, perform the credential authorization.
1. Open the **API Doc & Test** tab.
  ![doctest_done_lat](/Images/doctest_done_lat.png)
1. Click on your One Drive Auth Demo API and expand the GET method.
  ![test_lat](/Images/test_lat.png)
1. Click **Execute** to test your API. You should get back a list of the name and webUrls of the contents of your OneDrive account.

    ![test_result](/Images/test_result.png)

This was a simple integration between {{% variables/apibuilder_prod_name %}} and OneDrive to access the list of contents, but this same approach applies to the entire Microsoft Graph API, and so the integration possibilities are endless.
