---
title: Authorization in Swagger plugin
linkTitle: Authorization in Swagger plugin
description: ADD A DESCRIPTION
weight: 40
date: 2021-06-22
---

## Overview

By default, {{% variables/apibuilder_prod_name %}} projects install the Swagger plugin - `@axway/api-builder-plugin-fn-swagger`. {{% variables/apibuilder_prod_name %}} supports the OpenAPI/Swagger 2.0 specification, and the Swagger plugin creates flow-nodes that allow {{% variables/apibuilder_prod_name %}} to interact with the services described in the Swagger documents. For more information, see [Swagger flow-node](/docs/developer_guide/flows/flow-nodes/swagger_flow-node/).

In OpenAPI/Swagger 2.0, the security mechanisms supported by the API are defined in a [Security Definitions Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#security-definitions-object). {{% variables/apibuilder_prod_name %}} uses this configuration information to create credential stubs to make getting started with authorized APIs easier.

## Swagger generated credentials

The Swagger plugin assists in creating managed credentials. When {{% variables/apibuilder_prod_name %}} loads new Swagger documents with `securityDefinitions` which have been placed in the `./swagger` directory, it will generate a configuration file for that Swagger service. For example, if {{% variables/apibuilder_prod_name %}} loaded the Swagger document `swagger/onedrive.json`, it would generate a configuration file `conf/onedrive.default.js`. This generated configuration will contain stub credentials suitable for accessing the Swagger service. These stub credentials are incomplete and contain `null` values where the application-specific information needs to be supplied.

The following security definitions are supported when generating stub credentials:

* HTTP Basic

* API Key

* OAuth 2.0 (only [accessCode grant flow](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#security-scheme-object))

{{% alert title="⚠️ Note" color="primary" %}}Any Swagger documents using any other OAuth 2.0 grant flows (for example implicit, password, and application) are not supported and will throw an exception on startup when the credential gets generated.{{% /alert %}}

### API Key

Swagger security definitions of type `apiKey` will generate an [API Key credential](/docs/developer_guide/credentials/configuring_credentials/api_key_credentials/). For example, given a Swagger document:

```json
// swagger/myswagger.json

"info":  {
...,
  "title": "My Swagger",
...
},
...,
"securityDefinitions": {
  "api_key": {
    "type": "apiKey",
    "name": "api_key",
    "in": "header"
  },
},
...
```

The Swagger plugin will generate a configuration file with the credential:

```javascript
// conf/myswagger.default.js

...,
    authorization: {
        credentials: {
            'My Swagger api_key': {
                type: 'apiKey',
                key: null
            }
        }
    }
...
```

Before this credential can be used in a flow, the `key` will need to be set.

### HTTP Basic

Swagger security definitions of type basic will generate an [HTTP Basic credential](/docs/developer_guide/credentials/configuring_credentials/http_basic_credentials/). For example, given a Swagger document:

```json
// swagger/myswagger.json

"info":  {
...,
  "title": "My Swagger",
...
},
...,
"securityDefinitions": {
  "basic_cred": {
    "type": "basic"
  },
},
...
```

The Swagger plugin will generate a configuration file with the credential:

```javascript
// conf/myswagger.default.js

...,
    authorization: {
        credentials: {
            'My Swagger basic_cred': {
                type: 'basic',
                username: null,
                password: null
            }
        }
    }
...
```

Before this credential can be used in a flow, both the `username` and the `password` must be set. If there is not a password or a username, set the value to an empty string, for example:

```javascript
// conf/myswagger.default.js

...,
    authorization: {
        credentials: {
            'My Swagger basic_cred': {
                type: 'basic',
                username: 'I have no password',
                password: ''
            }
        }
    }
...
```

### OAuth 2.0

Swagger security definitions of type `oauth2` will generate an [OAuth 2.0 credential](/docs/developer_guide/credentials/configuring_credentials/oauth_2.0_credentials/). For example, given a Swagger document:

```json
// swagger/myswagger.json

"info":  {
...,
  "title": "My Swagger",
...
},
...,
  "securityDefinitions": {
    "Oauth2": {
      "authorizationUrl": "https://accounts.google.com/o/oauth2/auth",
      "tokenUrl": "https://accounts.google.com/o/oauth2/token",
      "description": "Oauth 2.0 authentication",
      "flow": "accessCode",
      "scopes": {
        "https://mail.google.com/": "Read, send, delete, and manage your email",
        "https://www.googleapis.com/auth/gmail.compose": "Manage drafts and send emails",
        "https://www.googleapis.com/auth/gmail.insert": "Insert mail into your mailbox",
        "https://www.googleapis.com/auth/gmail.labels": "Manage mailbox labels",
        "https://www.googleapis.com/auth/gmail.metadata": "View your email message metadata such as labels and headers, but not the email body",
        "https://www.googleapis.com/auth/gmail.modify": "View and modify but not delete your email",
        "https://www.googleapis.com/auth/gmail.readonly": "View your email messages and settings",
        "https://www.googleapis.com/auth/gmail.send": "Send email on your behalf",
        "https://www.googleapis.com/auth/gmail.settings.basic": "Manage your basic mail settings",
        "https://www.googleapis.com/auth/gmail.settings.sharing": "Manage your sensitive mail settings, including who can manage your mail"
      },
      "type": "oauth2"
    }
  },
...
```

The Swagger plugin will generate a configuration file with the credential:

```javascript
// conf/myswagger.default.js

...,
  authorization: {
    credentials: {
      'Gmail Oauth2': {
        type: 'oauth2',
        flow: 'accessCode',
        authentication_url: 'https://accounts.google.com/o/oauth2/auth',
        token_url: 'https://accounts.google.com/o/oauth2/token',
        scope: 'https://mail.google.com/ https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.insert https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.settings.basic https://www.googleapis.com/auth/gmail.settings.sharing',
        client_id: null,
        client_secret: null,
        access_token: null,
        refresh_token: null
      }
    }
  }
...
```

Before this credential can be used in a development environment the `client_id` and `client_secret` must be set. This will allow {{% variables/apibuilder_prod_name %}} to perform an initial token grant in the Admin Console UI. For more information, see [OAuth 2.0 credentials](/docs/developer_guide/credentials/configuring_credentials/oauth_2.0_credentials/).

As discussed in the OAuth 2.0 credentials page, access tokens are generally short-lived, which makes using them in production environments problematic as they will expire soon after being deployed. To alleviate this, {{% variables/apibuilder_prod_name %}} manages the OAuth 2.0 credentials and will perform refresh grants to ensure their access tokens never expire. For this to be possible, the credential needs to be configured to request a refresh token. This is generally referred to as requesting offline access. However, how it is done is not standardized; some providers (like Google) require URL parameters while others may require specific scopes (like Microsoft's Graph API). It is unlikely that your Swagger document is going to have this pre-configured, and you will need to consult your service provider's documentation before updating the credential.

For example, requesting a refresh token for Google requires you to set an `access_type` and `prompt` on the `authentication_url`. For more information, see Google's [Using OAuth 2.0 for Web Server Applications](https://developers.google.com/identity/protocols/OAuth2WebServer).

```javascript
// conf/myswagger.default.js

...,
  authorization: {
    credentials: {
      'Gmail Oauth2': {
        ...,
        authentication_url: 'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent',
        ...
      }
    }
  }
...
```

This approach works great in development, allowing you to manage authorization via the Admin Console UI. However, to take this to a production environment where there is no Admin Console, you also need to set the `access_token` and `refresh_token` in the credential. For more information, see [Environmentalizing Credentials](/docs/developer_guide/credentials/environmentalizing_credentials/).
