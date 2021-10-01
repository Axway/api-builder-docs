---
title: Managing credentials
linkTitle: Managing credentials
weight: 30
date: 2021-10-01
---

Credentials are used to grant your {{% variables/apibuilder_prod_name %}} service authorization to connect to another service. On the **Credentials** tab, you will see a card view listing of all the currently configured credentials.

![credentials_withauth_updated](/Images/credentials_withauth_updated.png)

Each card displays useful information about the credential.

![card](/Images/card.png)

|     |     |
| --- | --- |
| **Credential Name** | The credential name is the value that is used in the flows to access this credentials tokens. |
| **Credential Type** | The type of the credential - API Key, HTTP Basic or OAuth 2.0 |
| **Credential Actions** | The actions that can be performed on this credential. These will depend on the type of the credential and also on the status of the credential.<br /><br />For example, in the case where the credential is an OAuth 2.0 credential, but there is no access token, there will be an Authorize action that will perform the initial token grant in the UI. For more information see [OAuth 2.0 credentials](/docs/developer_guide/credentials/configuring_credentials/oauth_2.0_credentials/). |
| **Status Text** | This is a text description of the status of the credential. |
| **Status Icon** | Icon to indicate the status of the credential. |

## Credentials Notifications

When invalid credentials exist in your service, a red notification badge is displayed on the **Credentials** tab. It shows the total number of invalid credentials plus those that require authorization:

![Screen_Shot_2018-12-21_at_11.42.06_AM](/Images/screen_shot_2018_12_21_at_11_42_06_am.png)

An amber badge is shown when there are no invalid credentials, but there are existing OAuth2 credentials that need to be authorized:

![Screen_Shot_2018-12-21_at_11.42.55_AM](/Images/screen_shot_2018_12_21_at_11_42_55_am.png)
