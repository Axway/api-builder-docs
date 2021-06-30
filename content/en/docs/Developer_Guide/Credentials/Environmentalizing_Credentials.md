---
title: Environmentalizing credentials
linkTitle: Environmentalizing credentials
description: ADD A DESCRIPTION
weight: 20
date: 2021-06-22
---

## Overview

Environmentalizing the configuration variables allows you to tailor the {{% variables/apibuilder_prod_name %}} configuration to the environment it is being deployed to at deployment time. Additionally, environmentalizing the credentials also ensures their security. Credentials, by their very nature, contain sensitive information that you do not want to expose by committing them to your source control management (SCM). Credentials may also contain time-sensitive information, such as OAuth 2.0 access tokens.

## Configuring Credentials

The credential configuration uses the same approach for environmentalization as the rest of the {{% variables/apibuilder_prod_name %}} configuration; any value can be read from an environment variable on startup by replacing it with `process.env.VAR_NAME`.

If {{% variables/apibuilder_prod_name %}} is running in a containerized environment, these environment variables are passed into the container on startup. For information on containerizing an {{% variables/apibuilder_prod_name %}} application, see [Dockerize an {{% variables/apibuilder_prod_name %}} Service](/docs/how_to/dockerize_an_api_builder_service/).

### API Key

For API Key credentials, you should environmentalize the `key` variable. For example, the `key` is read from the environment variable `WEATHER_KEY` on startup:

```javascript
// default.js

...,
authorization: {
    credentials: {
        "My Weather": {
            type: "apiKey",
            key: process.env.WEATHER_KEY
        }
    }
},
...
```

### HTTP Basic

For HTTP Basic credentials, you should environmentalize the `username` and `password` variables. For example, the `username` and `password` are read from the environment variables `SERVICE_USER` and `SERVICE_PASS` respectively on startup:

```javascript
// default.js

authorization: {
    credentials: {
        "{{% variables/apibuilder_prod_name %}} service": {
            type: "basic",
            username: process.env.SERVICE_USER,
            password: process.env.SERVICE_PASS
        }
    }
```

### OAuth 2.0

OAuth 2.0 credentials contain both sensitive information and time-sensitive information. In most cases, you should environmentalize the `client_id`, `client_secret`, `refresh_token`, and `access_token`.

```javascript
// default.js

authorization: {
    credentials: {
        gmail: {
            type: 'oauth2',
            flow: 'accessCode',
            authentication_url: 'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent',
            token_url: 'https://accounts.google.com/o/oauth2/token',
            client_id: process.env.GMAIL_CLIENT_ID,
            client_secret: process.env.GMAIL_CLIENT_SECRET,
            scope: 'https://mail.google.com/',
            access_token: process.env.GMAIL_ACCESS_TOKEN || null,
            refresh_token: process.env.GMAIL_REFRESH_TOKEN || null
        }
    }
}
```

The `|| null` on the `access_token` and `refresh_token` is not required, but if it is omitted, you _must_ have set the environment variables. With the `|| null` included, {{% variables/apibuilder_prod_name %}} will start, and while developing, you can perform the initial token grant in the Admin Console UI.
