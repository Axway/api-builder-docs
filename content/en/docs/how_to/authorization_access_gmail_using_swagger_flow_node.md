---
title: Authorization - access Gmail using Swagger flow-node
linkTitle: Authorization - access Gmail using Swagger flow-node
weight: 10
date: 2021-10-01
---

## Overview

This example demonstrates how to configure an {{% variables/apibuilder_prod_name %}} application to work with Gmail. It will walk you through the steps of registering and configuring an application with Google. It will then walk you through setting up {{% variables/apibuilder_prod_name %}} and authorizing it to access the Google application.

We will then create a flow that uses the [Swagger flow-node](/docs/developer_guide/flows/flow-nodes/swagger_flow-node/) to invoke the Gmail API and retrieve the number of the emails received from a provided address.

## Creating a new Google application

Before starting on {{% variables/apibuilder_prod_name %}}, you need to register your application on the Google developer console ([https://console.developers.google.com/cloud-resource-manager](https://console.developers.google.com/cloud-resource-manager)).

To create a project, click **Create project**.

![image2021-8-20_10_12_44](/Images/image2021_8_20_10_12_44.png)

Name your application, "Gmail Project" and click **Create**.

![image2021-8-20_10_13_41](/Images/image2021_8_20_10_13_41.png)

Click **Select Project** for the new "Gmail Project", and from the top-left hamburger menu, Navigate to **Products** > **APIs and services** > **Library**.

![image2021-8-20_10_14_26](/Images/image2021_8_20_10_14_26.png)

Find and select **Gmail API**, and then click **Enable**.

![image2021-8-20_10_18_59](/Images/image2021_8_20_10_18_59.png)

Click **Create Credentials** in the information banner that appears.

![image2021-8-20_10_20_49](/Images/image2021_8_20_10_20_49.png)

On the **Credential Type** screen that appears, in the panel **Which API are you using** select, "Gmail API".

![image2021-8-20_10_23_12](/Images/image2021_8_20_10_23_12.png)

In the sub-panel, **What data will you be accessing**, choose "User data", and then click **Next**.

![image2021-8-20_10_24_23](/Images/image2021_8_20_10_24_23.png)

In the **OAuth consent screen**, enter your **App information**, where the **App name** is "{{% variables/apibuilder_prod_name %}} Gmail", the **User support email** is one related to this Google account, and the Developer contact information is the same, and then click **Save and Continue** (do not click Done yet).

![image2021-8-20_10_28_47](/Images/image2021_8_20_10_28_47.png)

You can skip the optional **Scopes**, click **Save and Continue**. In the OAuth Client ID screen, choose the **Application type**, "Web application".

![image2021-8-20_10_31_30](/Images/image2021_8_20_10_31_30.png)

In the **Authorized JavaScript origins**, add the URL "http://localhost:8080", and dd an **Authorized redirect URI** to "http://localhost:8080/auth/callback", and then click **Create**.

![image2021-8-20_10_34_10](/Images/image2021_8_20_10_34_10.png)

You can then copy or **Download** your client credentials, and then click **Done**.

Finally, click on **OAuth consent screen** from the left menu, and find the **Test users** section, and add the gmail address of the user that you will use to test this OAuth application. The same user that created the application can be used to test, then click **Save**.

![image2021-8-20_11_12_39](/Images/image2021_8_20_11_12_39.png)

## Setting up {{% variables/apibuilder_prod_name %}}

Create an example application:

```bash
axway builder init gmail-auth
cd gmail-auth
npm start
```

Your service is now running and is accessible on`http://localhost:8080/console`.

## Import the Gmail Swagger flow-node

1. We will use the [Swagger plugin](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger) to connect to the Gmail service. To do this, we can use a simplified Gmail Swagger 2.0 definition is that available here. Download [gmail.json](/files/gmail.json) and install it into the `./swagger` directory as `gmail.json`.
1. Navigate to [https://www.iconfinder.com/icons/132837/gmail_icon](https://www.iconfinder.com/icons/132837/gmail_icon) and save this icon as `./swagger/gmail.png` (it is important that the base file names are the same). Note that any image file can be used svg, png, gif, bmp, jpg, or diff formats.
1. Restart your service (npm start)
1. Navigate to the **Credentials** tab and notice that a Gmail credential has been automatically created. Note that the credential is _not_ ready to be used. For the credential to be ready, we need to provide the client id and client secret that we created above in [Creating a new Google application](#creating-a-new-google-application).

![image2021-8-20_10_53_22](/Images/image2021_8_20_10_53_22.png)

## Configure Gmail credential

For more information on OAuth 2.0 credentials, see [OAuth 2.0 credentials](/docs/developer_guide/credentials/configuring_credentials/oauth_2.0_credentials/).

For Gmail, to get the credential ready, we need to configure the generated credential with our client_id and client_secret. This credential is within a configuration file that was generated by the Swagger plugin when the service was last started. Navigate to the **Configuration** tab.

![image2021-8-20_10_55_41](/Images/image2021_8_20_10_55_41.png)

Select the **gmail.default.js** configuration file (this is the configuration file that was generated by the Swagger plugin), and enter the Gmail `client_id` and `client_secret` that you downloaded previously.
![image2021-8-20_10_57_43](/Images/image2021_8_20_10_57_43.png)

Click **Save** and then **Proceed** on the subsequent modal.

After the service restarts, open the **Credentials** tab.
![image2021-8-20_11_0_13](/Images/image2021_8_20_11_0_13.png)
If everything went well, your Gmail Oauth2 credential is now in a state "Requires Authorization".

## Authorize the Gmail credential

Once the Gmail credential is configured, you need to manually authorize the credential to use it. Click on the **Credentials** tab and click **Authorize**. You will be prompted to choose a Google account or log in. The account must also have the Gmail service enabled.

![image2021-8-20_11_6_5](/Images/image2021_8_20_11_6_5.png)

You may see a screen informing you that Google has not yet verified the application. That can be done from the Google console at a later stage when you publish your application, for now, click **Continue**, and then click **Allow** to approve the scope(s) to access to the account.

![image2021-8-20_11_15_3](/Images/image2021_8_20_11_15_3.png)
The credential is now "green", and ready to use.

![image2021-8-20_11_17_29](/Images/image2021_8_20_11_17_29.png)

{{% alert title="Note" color="primary" %}}By default, the access tokens issued by Google will expire in 1 hour. {{% variables/apibuilder_prod_name %}} will keep the access token valid by refreshing it before its expiration. However, the access token and refresh token are stored in memory only, and if you restart {{% variables/apibuilder_prod_name %}}, you will need to authorize the credential again.{{% /alert %}}

## Create a flow to count your emails

In {{% variables/apibuilder_prod_name %}}, create a new flow by clicking **Flows** and then the add **Flow** button in the upper-right. This will bring you into the flow editor.

![image2021-8-20_11_20_52](/Images/image2021_8_20_11_20_52.png)

Drag and drop the **Gmail** icon from the **Flow-Nodes** panel on the left into the graph on the right.

![image2021-8-20_11_22_7](/Images/image2021_8_20_11_22_7.png)

In property panel on the right, change the **Oauth2** input to "Credential" and use the "Gmail Oauth2" credential. Then, change the **userId** to String, and enter "me". It should look like the image below.

![image2021-8-20_11_24_28](/Images/image2021_8_20_11_24_28.png)

Then click the debug icon in the upper-right of the flow graph, and then click **Execute Flow**.

![image2021-8-20_11_26_32](/Images/image2021_8_20_11_26_32.png)

All going well, you should see a list of message identifiers retrieved from the Gmail service in the debug panel, and in the console.

![image2021-8-20_11_27_46](/Images/image2021_8_20_11_27_46.png)

This was a simple integration between {{% variables/apibuilder_prod_name %}} and Gmail to access the list of contents. You can use a similar approach to work with any API; all you need to provide is the Swagger document describing the API and {{% variables/apibuilder_prod_name %}} can integrate with it seamlessly.
