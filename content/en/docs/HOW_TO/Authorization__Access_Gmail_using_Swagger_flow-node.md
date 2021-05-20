---
title: 'Authorization: Access Gmail using Swagger flow-node'
linkTitle: 'Authorization: access Gmail using Swagger flow-node'
description: ADD A DESCRIPTION
weight: 10
date: 2021-05-17
---

## Overview

This example demonstrates how to configure an {{% variables/apibuilder_prod_name %}} application to work with Gmail. It will walk you through the steps of registering and configuring an application with Google. It will then walk you through setting up {{% variables/apibuilder_prod_name %}} and authorizing it to access the Google application.

We will then create a flow that uses the [Swagger flow-node](/docs/developer_guide/flows/flow-nodes/swagger_flow-node/) to invoke the Gmail API and retrieve the number of the emails received from a provided address.

## Creating and configuring Google Application

Before starting on {{% variables/apibuilder_prod_name %}}, you need to register your application on the Google developer console ([https://console.developers.google.com/cloud-resource-manager](https://console.developers.google.com/cloud-resource-manager)).

To create a project:

1. Click **Create a project**. ![image2018-11-30_11_57_52](/Images/image2018-11-30_11_57_52.png)

2. Name your application`Gmail Example Project` and click **Create**. ![image2018-11-30_11_59_24](/Images/image2018-11-30_11_59_24.png)

3. Navigate to **APIs & Services** from the menu. ![image2018-11-30_12_0_39](/Images/image2018-11-30_12_0_39.png)

4. Find and select **Gmail API**. ![image2018-11-30_12_1_31](/Images/image2018-11-30_12_1_31.png)

5. Click **Enable**. ![image2018-11-30_12_2_0](/Images/image2018-11-30_12_2_0.png)

6. Click **Create Credentials** in the information banner that appears. ![image2018-11-30_13_18_39](/Images/image2018-11-30_13_18_39.png)

7. Fill in the following fields and click **What credentials do I need?**. ![image2018-11-30_13_19_34](/Images/image2018-11-30_13_19_34.png)

8. Fill in the client ID. In this case, we used `gmail-auth-client` and add `http://localhost:8080/auth/callback` as the redirect URI. Then click **Create OAuth client ID**. ![image2018-11-30_13_26_15](/Images/image2018-11-30_13_26_15.png)

9. Configure the OAuth login screen by providing the product name, in this case, `Gmail Connection Service` and click **Continue**. ![image2018-11-30_13_27_56](/Images/image2018-11-30_13_27_56.png)

10. When the credentials are provided, click **Done**. We will get the client ID and client secret with the next step.
    ![image2018-11-30_16_12_56](/Images/image2018-11-30_16_12_56.png)

11. You should now see the **gmail-auth-client** in a list of credentials. Click the name.

    ![image2018-11-30_16_14_50](/Images/image2018-11-30_16_14_50.png)
12. Take note of the Client ID and client secret at the top of the page to which you are redirected. We will be using these values in {{% variables/apibuilder_prod_name %}}.
    ![image2018-11-30_16_16_42](/Images/image2018-11-30_16_16_42.png)

## Setting up {{% variables/apibuilder_prod_name %}}

Create an example application and install Version 2 of the Swagger plugin:

```bash
$ npx @axway/api-builder init gmail-auth
$ cd gmail-auth
$ npm install --no-optional
$ node .
```

Your service is now running and is accessible on `http://localhost:8080/console`.

## Import the Gmail Swagger flow-node

We will use the Swagger plugin to connect to the Gmail service. To do this, we should locate an up-to-date Swagger 2.0 definition describing the service. A simplified Gmail Swagger definition is available here:

```json
// gmail.json

{
  "swagger": "2.0",
  "schemes": [
    "https"
  ],
  "host": "www.googleapis.com",
  "basePath": "/gmail/v1/users",
  "info": {
    "contact": {
      "name": "Google",
      "url": "https://google.com"
    },
    "description": "Access Gmail mailboxes including sending user email.",
    "title": "Gmail",
    "version": "v1"
  },
  "externalDocs": {
    "url": "https://developers.google.com/gmail/api/"
  },
  "securityDefinitions": {
    "Oauth2": {
      "authorizationUrl": "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent",
      "tokenUrl": "https://accounts.google.com/o/oauth2/token",
      "description": "Oauth 2.0 authentication",
      "flow": "accessCode",
      "scopes": {
        "https://mail.google.com/": "Read, send, delete, and manage your email",
        "https://www.googleapis.com/auth/gmail.readonly": "View your email messages and settings"
      },
      "type": "oauth2"
    }
  },
  "tags": [
    {
      "name": "users"
    }
  ],
  "paths": {
    "/{userId}/messages": {
      "get": {
        "description": "Lists the messages in the user's mailbox.",
        "operationId": "gmail.users.messages.list",
        "parameters": [
          {
            "default": false,
            "description": "Include messages from SPAM and TRASH in the results.",
            "in": "query",
            "name": "includeSpamTrash",
            "type": "boolean"
          },
          {
            "default": 100,
            "description": "Maximum number of messages to return.",
            "in": "query",
            "name": "maxResults",
            "type": "integer"
          },
          {
            "description": "Page token to retrieve a specific page of results in the list.",
            "in": "query",
            "name": "pageToken",
            "type": "string"
          },
          {
            "description": "Only return messages matching the specified query. Supports the same query format as the Gmail search box. For example, \"from:someuser@example.com rfc822msgid:<somemsgid@example.com> is:unread\". Parameter cannot be used when accessing the api using the gmail.metadata scope.",
            "in": "query",
            "name": "q",
            "type": "string"
          },
          {
            "default": "me",
            "description": "The user's email address. The special value me can be used to indicate the authenticated user.",
            "in": "path",
            "name": "userId",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "schema": {
              "$ref": "#/definitions/ListMessagesResponse"
            }
          }
        },
        "security": [
          {
            "Oauth2": [
              "https://mail.google.com/"
            ]
          },
          {
            "Oauth2": [
              "https://www.googleapis.com/auth/gmail.readonly"
            ]
          }
        ],
        "tags": [
          "users"
        ]
      }
    }
  },
  "definitions": {
    "ListMessagesResponse": {
      "properties": {
        "messages": {
          "description": "List of messages.",
          "items": {
            "$ref": "#/definitions/Message"
          },
          "type": "array"
        },
        "nextPageToken": {
          "description": "Token to retrieve the next page of results in the list.",
          "type": "string"
        },
        "resultSizeEstimate": {
          "description": "Estimated total number of results.",
          "format": "uint32",
          "type": "integer"
        }
      },
      "type": "object"
    },
    "Message": {
      "description": "An email message.",
      "properties": {
        "historyId": {
          "description": "The ID of the last history record that modified this message.",
          "format": "uint64",
          "type": "string"
        },
        "id": {
          "description": "The immutable ID of the message.",
          "type": "string"
        },
        "internalDate": {
          "description": "The internal message creation timestamp (epoch ms), which determines ordering in the inbox. For normal SMTP-received email, this represents the time the message was originally accepted by Google, which is more reliable than the Date header. However, for API-migrated mail, it can be configured by client to be based on the Date header.",
          "format": "int64",
          "type": "string"
        },
        "labelIds": {
          "description": "List of IDs of labels applied to this message.",
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "payload": {
          "$ref": "#/definitions/MessagePart",
          "description": "The parsed email structure in the message parts."
        },
        "raw": {
          "description": "The entire email message in an RFC 2822 formatted and base64url encoded string. Returned in messages.get and drafts.get responses when the format=RAW parameter is supplied.",
          "format": "byte",
          "type": "string"
        },
        "sizeEstimate": {
          "description": "Estimated size in bytes of the message.",
          "format": "int32",
          "type": "integer"
        },
        "snippet": {
          "description": "A short part of the message text.",
          "type": "string"
        },
        "threadId": {
          "description": "The ID of the thread the message belongs to. To add a message or draft to a thread, the following criteria must be met: \n- The requested threadId must be specified on the Message or Draft.Message you supply with your request. \n- The References and In-Reply-To headers must be set in compliance with the RFC 2822 standard. \n- The Subject headers must match.",
          "type": "string"
        }
      },
      "type": "object"
    },
    "MessagePart": {
      "description": "A single MIME message part.",
      "properties": {
        "body": {
          "$ref": "#/definitions/MessagePartBody",
          "description": "The message part body for this part, which may be empty for container MIME message parts."
        },
        "filename": {
          "description": "The filename of the attachment. Only present if this message part represents an attachment.",
          "type": "string"
        },
        "headers": {
          "description": "List of headers on this message part. For the top-level message part, representing the entire message payload, it will contain the standard RFC 2822 email headers such as To, From, and Subject.",
          "items": {
            "$ref": "#/definitions/MessagePartHeader"
          },
          "type": "array"
        },
        "mimeType": {
          "description": "The MIME type of the message part.",
          "type": "string"
        },
        "partId": {
          "description": "The immutable ID of the message part.",
          "type": "string"
        },
        "parts": {
          "description": "The child MIME message parts of this part. This only applies to container MIME message parts, for example multipart/*. For non- container MIME message part types, such as text/plain, this field is empty. For more information, see RFC 1521.",
          "items": {
            "type": "object"
          },
          "type": "array"
        }
      },
      "type": "object"
    },
    "MessagePartBody": {
      "description": "The body of a single MIME message part.",
      "properties": {
        "attachmentId": {
          "description": "When present, contains the ID of an external attachment that can be retrieved in a separate messages.attachments.get request. When not present, the entire content of the message part body is contained in the data field.",
          "type": "string"
        },
        "data": {
          "description": "The body data of a MIME message part as a base64url encoded string. May be empty for MIME container types that have no message body or when the body data is sent as a separate attachment. An attachment ID is present if the body data is contained in a separate attachment.",
          "format": "byte",
          "type": "string"
        },
        "size": {
          "description": "Number of bytes for the message part data (encoding notwithstanding).",
          "format": "int32",
          "type": "integer"
        }
      },
      "type": "object"
    },
    "MessagePartHeader": {
      "properties": {
        "name": {
          "description": "The name of the header before the : separator. For example, To.",
          "type": "string"
        },
        "value": {
          "description": "The value of the header after the : separator. For example, someuser@example.com.",
          "type": "string"
        }
      },
      "type": "object"
    }
  }
}
```

We will also provide an icon with the Swagger definition to make it more identifiable. Any svg, png, gif, bmp, jpg, or tiff format file can be used. In this example, we use an image from [iconfinder.com](http://iconfinder.com).

1. Save the Swagger definition above to a file named `gmail.json`.

2. Place the file `gmail.json` inside the `/swagger` directory of your project.

3. Navigate to [https://www.iconfinder.com/icons/132837/gmail_icon](https://www.iconfinder.com/icons/132837/gmail_icon).

4. Click **Download PNG**.

    ![image2018-11-30_16_31_49](/Images/image2018-11-30_16_31_49.png)
5. Save the downloaded file as `gmail.png` in the `/swagger` directory of your project. It is important that the file name matches the Swagger file name.

6. Restart your service.

7. Navigate to the **Credentials** tab and notice that a Gmail credential has been automatically created. For the credential to be ready, we need to provide the client id and client secret.

    ![image2018-11-30_17_1_11](/Images/image2018-11-30_17_1_11.png)

## Configure Gmail Credential

For more information on OAuth 2.0 credentials, see [OAuth 2.0 credentials](/docs/developer_guide/credentials/configuring_credentials/oauth_2.0_credentials/).

For Gmail, to get the credential ready, we need to configure the generated credential with our tokens. This credential is inside a configuration file that was generated by the Swagger plugin when the service was last started.

1. Navigate to the **Configuration** tab.

    ![image2018-11-30_17_16_28](/Images/image2018-11-30_17_16_28.png)
2. Select **gmail.default.j**s. This is the configuration file that was generated.

    ![image2018-11-30_17_17_51](/Images/image2018-11-30_17_17_51.png)
3. We then need to get the Gmail Client ID and Client Secret from the Google developer console and add them to the configuration file as `client_id` and `client_secret`.

    ![image2018-11-30_17_20_16](/Images/image2018-11-30_17_20_16.png)
4. Click **Save** and then **Proceed** on the subsequent modal.

5. After the service restarts, open the **Credentials** tab.

    ![image2018-11-30_17_21_48](/Images/image2018-11-30_17_21_48.png)

    If everything went well, your Gmail Oauth2 credential would have changed from an error state to requiring authorization.

6. To authorize the credential, click **Authorize**.

7. You will be prompted to choose a Google account or log in. Here you will log in with the account that you wish to count the emails from. The account must also have the Gmail service enabled.

    ![image2018-11-30_17_24_37](/Images/image2018-11-30_17_24_37.png)
8. Once you've logged in, you will be prompted to authorize access.

    ![image2018-11-30_17_27_48](/Images/image2018-11-30_17_27_48.png)
9. Click **Allow** to authorize the service. The credential is now ready to use.
    ![image2018-11-30_17_40_22](/Images/image2018-11-30_17_40_22.png)

{{% alert title="⚠️ Note" color="primary" %}}By default, the access tokens issued by Google will expire in 1 hour. {{% variables/apibuilder_prod_name %}} will keep the access token valid by refreshing it before its expiration. However, the access token and refresh token are stored in memory only, and if you restart {{% variables/apibuilder_prod_name %}}, you will need to authorize the credential again.{{% /alert %}}

## Create an API to count your emails

Before creating the flow, you need to import the API that will expose your flow. [Stoplight.io](https://stoplight.io/) is a great resource for designing APIs and was used to create a very simple API used for this example. This is a very simple API with a single endpoint.

### Create the countEmail.json Swagger document

1. Copy the following code into a text editor such as Notepad++:

    ```json
    // countEmail.json

    {
      "swagger": "2.0",
      "info": {
        "title": "Gmail Count Service API",
        "version": "1.0"
      },
      "host": "localhost:8080",
      "basePath": "/api",
      "paths": {
        "/gmail/count": {
          "get": {
            "responses": {
              "200": {
                "description": "Count",
                "schema": {
                  "type": "number",
                  "minimum": 0
                }
              },
              "500": {
                "description": "Error Occurred",
                "schema": {
                  "type": "object"
                }
              }
            },
            "parameters": [
              {
                "in": "query",
                "name": "from",
                "type": "string",
                "required": true,
                "format": "email"
              }
            ],
            "operationId": "countGmailEmails",
            "produces": [
              "application/json"
            ],
            "description": "Count the emails received from a user"
          }
        }
      }
    }
    ```

2. Name the file `countEmail.json` and save the file. You will import this file as an [API Endpoint](#import-the-api-endpoint).

### Import the API Endpoint

1. Open the **API Doc & Test** tab.

    ![image2018-11-30_17_53_9](/Images/image2018-11-30_17_53_9.png)
2. Click **+API**.

3. Import the `countEmail.json` Swagger document. Refer to [Create the countEmail.json Swagger document](#create-the-countemailjson-swagger-document).

    ![image2018-11-30_17_55_53](/Images/image2018-11-30_17_55_53.png)
4. Click **Save**. This will create the API endpoint in a disabled state, as there is no flow attached to it.

### Create the flow for the API Endpoint

On the disabled endpoint, there is a **Create Flow** icon. Clicking **Create Flow** will start the Flow Editor where you can create the logic for your API.

We will go through the steps to create the flow, but for reference, the completed flow that we're building will look like this:

![image2018-11-30_18_42_13](/Images/image2018-11-30_18_42_13.png)

1. Drag a Mustache node from the tool panel. We will use this node to create a Gmail query string that will contain filter the emails from a certain address.

    1. Click on the Format string title and rename it to Format Query for clarity.

    2. On the **Parameters** tab, set **data** to be the selector `$.params.from.`

    3. Click Edit Mustache and set the value to the following string:

        ```
        from:{{data}}
        ```

    4. On the **Outputs** tab, change the **Next** output to `$.query`.
        ![image2019-8-6_16_22_19](/Images/image2019-8-6_16_22_19.png) ![image2019-8-6_16_26_14](/Images/image2019-8-6_16_26_14.png)

        ![image2019-8-6_16_22_35](/Images/image2019-8-6_16_22_35.png)
2. Connect the Start node to the Format query node. Drag in a Gmail flow-node from the tool panel and make sure that the `gmail.users.messages.list` method is selected. We will use this to connect to Gmail and request the emails.

    1. Click on the gmail.users.messages.list title and rename it to Get Emails for clarity.

    2. Connect the **Next** output of the Format Query node to the new Get Emails node.

    3. On the **Parameters** tab, change the type of the parameter to **Credential** and then select the credential we configured earlier - `Gmail Oauth2`.

    4. Set **userId** to the string value `me` indicates that we want to access emails for the authenticated user.

    5. Set **q** to the selector`$.query.`

        On the **Outputs** tab, you will see that the **200** response is stored as `$.response`. We will extract the response data from that later. ![image2018-11-30_18_26_7](/Images/image2018-11-30_18_26_7.png) ![image2018-11-30_18_27_31](/Images/image2018-11-30_18_27_31.png)

3. Drag an HTTP flow-node from the tool panel; this only has a single `Set HTTP Response` method. We will use this node to configure the response that is returned to the caller.

    1. Connect the **200** output of the Get Emails node to the new Set HTTP Response node.

    2. Click on the Set HTTP Response title and rename it to `Success` for clarity.

    3. On the **Parameters** tab, set the **status** to be of type Number with the value 200. Set the **body** to $.response.data.resultSizeEstimate.

        ![image2018-11-30_18_29_36](/Images/image2018-11-30_18_29_36.png)
4. Drag in another HTTP flow-node from the tool panel. We will use this node to configure the error response that is returned to the caller in the event of an error. For this demonstration, we will have a single error status - 500.

    1. Connect each of the Error outputs from the `Format Query` and `Get Emails` nodes to this Set HTTP Response node.

    2. Click on the Set HTTP Response title and rename it to `Server Error` for clarity.

    3. On the **Parameters** tab, set the **status** to be of type Number with the value 500. Set the **body** to `$.error.message`. In production, this is not recommended but helps to debug any error which may occur during development.

5. Drag a Set Context flow-node from the tool panel. This will be used to create a new Error that we will return if the Default output of Get Emails is triggered.

    1. Connect the Default output of Get Emails to the Set Context node.

    2. Click on the Set Context title and rename it to`Set Error.`

    3. On the **Parameters** tab, set the **value** to be an object representing the error that we want to return from the API. In this example, we use the following Object value:
        `{ "message": "Unexpected gmail response" }`

    4. On the **Outputs** tab, set the **Next** output to $.error
        ![image2018-11-30_18_40_0](/Images/image2018-11-30_18_40_0.png) ![image2018-11-30_18_39_49](/Images/image2018-11-30_18_39_49.png)

    5. Connect the **Next** output of `Set Error` to the `Server Error` node.

    6. Click **Apply** and **Close**.

## Test your Endpoint

1. Open the **Credentials** tab and check that your credential is authorized. If it isn't, perform the credential authorization.

2. Open the **API Doc & Test** tab.

    ![image2018-11-30_18_44_51](/Images/image2018-11-30_18_44_51.png)
3. Click on your Gmail Count Service API and expand the GET method.

    ![image2018-11-30_18_46_23](/Images/image2018-11-30_18_46_23.png)
4. Input an email address for as the value for **from** and click **Execute** to test your API. You should get back a number indicating the number of emails from that address.

    ![image2018-11-30_18_50_0](/Images/image2018-11-30_18_50_0.png)

This was a simple integration between {{% variables/apibuilder_prod_name %}} and Gmail to access the list of contents. You can use a similar approach to work with any API; all you need to provide is the Swagger document describing the API and {{% variables/apibuilder_prod_name %}} can integrate with it seamlessly.
