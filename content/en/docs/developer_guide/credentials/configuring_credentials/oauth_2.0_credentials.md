---
title: OAuth 2.0 credentials
linkTitle: OAuth 2.0 credentials
weight: 30
date: 2021-10-01
---

## Overview

Services that use [OAuth 2.0 authorization](https://oauth.net/2/) require that requests present an `access_token` to prove they can access the resources they are requesting. For security reasons, these access tokens are often short-lived, expiry times of 1 hour are common. This presents an issue to services that are trying to consume the resources; after an hour, the access token expires, preventing access to the resources. This makes the use of a static credential like API Key or HTTP Basic infeasible.

{{% variables/apibuilder_prod_name %}} solves this by managing the refresh of access tokens and ensuring that there is always a valid access token available for use within the flows. To achieve this, {{% variables/apibuilder_prod_name %}} performs a [refresh token grant](https://tools.ietf.org/html/rfc6749#section-1.5) before the expiration of the access token to ensure it always has a valid access token. Each third-party service that wish to access will have their own policies and processes for enabling and configuring OAuth support. It is necessary to read the third-party documentation and configure the access correctly in their application, and also configure it correctly in {{% variables/apibuilder_prod_name %}}.

## Authorization code credentials

{{% variables/apibuilder_prod_name %}} supports managing credentials for the [OAuth 2.0 authorization code grant](https://datatracker.ietf.org/doc/html/rfc6749#page-8).

| Key | Description |
| --- | --- |
| type | The type is `oauth2` for this credential. |
| flow | This is the OAuth flow required for this credential. For this credential, the value is `accessCode`. |
| authentication_url | This is the URL of the authorization endpoint. If {{% variables/apibuilder_prod_name %}} does not have a refresh_token configured and the authentication URL has been specified, then you can perform an initial token grant to get the initial access token. |
| basic_auth | When `true`, the client_id and client_secret will be passed to the authorization server using the HTTP Basic authentication scheme. Defaults to `false`. |
| token_url | This is the URL of the token endpoint. {{% variables/apibuilder_prod_name %}} will call this endpoint to redeem an authorization code or refresh token and retrieve a new access token. |
| client_id | This is the OAuth application ID as configured in the third party service. |
| client_secret | This is the OAuth application secret as configured in the third party service. |
| scope | The space-separated list of OAuth scopes for which authorization is requested. |
| redirect_uri | This is an override to allow customizing the redirect URI for the credential. When performing an authorization code grant, this is the URI that the authorization server will redirect to with the authorization code. In general, the default value should be sufficient, and there will be no need to set this.<br /><br />Default: `http://localhost:8080/auth/callback` |
| access_token | Although most services provide short-lived access tokens, there are a few exceptions that supply long-lived access tokens.<br /><br />When deploying to production, there will be no user interaction to authorize manually. Instead, the pre-obtained tokens should be provided. |
| refresh_token | This is the refresh token that {{% variables/apibuilder_prod_name %}} will use to ensure that it always has a valid access token.<br /><br />When deploying to production, there will be no user interaction to authorize manually. Instead, the pre-obtained tokens should be provided. |

### Configuring the Redirect URI

When configuring your external service to support OAuth, it will request a redirect URI. After the user has authorized {{% variables/apibuilder_prod_name %}} access, this is the URI to which the browser is redirected with the authorization code. Where you configure this in your OAuth application is highly dependent on the service provider you're using. For example, if you are creating a Microsoft Application ([https://apps.dev.microsoft.com](https://apps.dev.microsoft.com/)), it is configured as a `Platform` setting.

![apps.dev.microsoft.com_](/Images/apps_dev_microsoft_com_.png)

If you're configuring a Google Application ([https://console.developers.google.com](https://console.developers.google.com/)), it is configured under the **Restrictions**.

![console.developers.google.com](/Images/console_developers_google_com.png)

The default Redirect URL for {{% variables/apibuilder_prod_name %}} is `http://localhost:8080/auth/callback`.

As this is the URL that the user's browser will be redirected to after they perform the authorization in the popup window, it is important to note that the Redirect URI is relative to the browser from which the authorization is performed. So by default, authorization will only work when your browser is running on the same host as the {{% variables/apibuilder_prod_name %}} service.

There may be scenarios where the default `localhost` Redirect URI is not sufficient for access requirements; for example, if the developer is working on a machine that is remote to the {{% variables/apibuilder_prod_name %}} service. The default Redirect URL is generated from the configuration values of `baseurl`, `port`, and `authorization.callback`. Alternatively, the redirect_uri can be set explicitly on each credential in the configuration.

However, be aware that most services require the use of HTTPs when the Redirect URI is something other than `localhost`. For more information on enabling HTTPs in {{% variables/apibuilder_prod_name %}}, see [Enable a secure HTTPS listener](/docs/how_to/enable_a_secure_https_listener/).

### Example

Depending on the deployment scenario, not all settings may be required, but any setting that is not required **must** be set to `null`. The following is an example configuration for a credential that is accessing Google's Gmail API:

```javascript
// default.js

authorization: {
  credentials: {
    mygmail: {
      type: 'oauth2',
      flow: 'accessCode',
      authentication_url: 'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent',
      token_url: 'https://accounts.google.com/o/oauth2/token',
      client_id: 'myid.apps.googleusercontent.com',
      client_secret: 'mysecret',
      scope: 'https://mail.google.com/',
      access_token: null,
      refresh_token: null
    }
  }
}
```

Many services will not issue a `refresh_token` by default, consult your service providers OAuth documentation for information on how to ensure that a refresh token is issued. Generally, it requires custom query parameters on the authentication URL or a custom scope setting. In this example case, the `authentication_url` has `access_type=offline&prompt=consent`, which tells Google to issue a refresh token.

## Client credentials (client password)

{{% variables/apibuilder_prod_name %}} supports managing credentials for the [OAuth 2.0 client credentials grant](https://datatracker.ietf.org/doc/html/rfc6749#section-1.3.4). These tokens are automatically obtained on startup, and also refreshed before they expire.

| Key | Description |
| --- | --- |
| type | The type is `oauth2` for this credential. |
| flow | This is the OAuth flow required for this credential. For this credential, the value is `clientCredentials`. |
| basic_auth | When `true`, the `client_id` and `client_secret` will be passed to the authorization server using the HTTP Basic authentication scheme. Defaults to `false`. |
| token_url | This is the URL of the token endpoint. {{% variables/apibuilder_prod_name %}} will call this endpoint to redeem an authorization code or refresh token and retrieve a new access token. |
| client_id | This is the OAuth application ID as configured in the third party service. |
| client_secret | This is the OAuth application secret as configured in the third party service. |
| scope | The space-separated list of OAuth scopes for which authorization is requested. |
| access_token | Typically, `null` for this grant as the service will obtain a new token on startup. |

### Example

Depending on the deployment scenario, not all settings may be required, but any setting that is not required **must** be set to `null`. The following is an example configuration for a credential that uses a `client_id` and `client_secret` for client credentials grant.

```javascript
// default.js

authorization: {
  credentials: {
    example: {
      type: 'oauth2',
      flow: 'clientCredentials',
      token_url: 'http://authz.io/token',
      client_id: 'example',
      client_secret: 'mysecret',
      scope: 'read',
      access_token: null
    }
  }
}
```

## Client credentials (JWT client authentication)

{{% variables/apibuilder_prod_name %}} supports managing credentials for [OAuth 2.0 client credentials extention grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.5) using [JWT for client authentication](https://datatracker.ietf.org/doc/html/rfc7523#section-2.2). These tokens are automatically obtained on startup, and also refreshed before they expire.

| Key | Description |
| --- | --- |
| type | The type is `oauth2` for this credential. |
| flow | This is the OAuth flow required for this credential. For this credential, the value is `clientCredentials`. |
| basic_auth | When `true`, the `client_id` and `client_secret` will be passed to the authorization server using the HTTP Basic authentication scheme. Defaults to `false`. |
| token_url | This is the URL of the token endpoint. {{% variables/apibuilder_prod_name %}} will call this endpoint to redeem an authorization code or refresh token and retrieve a new access token. |
| client_id | This is the OAuth application ID as configured in the third party service. |
| assertion_type | The assertion type is `jwtClientAuth`. |
| private_key | A PEM encoded private key used to sign JWT. |
| passphrase | A passphrase to use to decrypt the `private_key`. |
| scope | The space-separated list of OAuth scopes for which authorization is requested. |
| access_token | Typically, `null` for this grant as the service will obtain a new token on startup. |

### Example

Depending on the deployment scenario, not all settings may be required, but any setting that is not required **must** be set to `null`. The following is an example configuration for a credential that uses JWT for client authentication.

```javascript
// default.js

authorization: {
  credentials: {
    example: {
      type: 'oauth2',
      flow: 'clientCredentials',
      assertion_type: 'jwtClientAuth',
      token_url: 'http://authz.io/token',
      client_id: 'example',
      private_key: require('fs').readFileSync('./private.pem').toString(),
      passphrase: 'secret',
      scope: 'read',
      access_token: null
    }
  }
}
```

## Client credentials (JWT authorization grant)

{{% variables/apibuilder_prod_name %}} supports managing credentials for [OAuth 2.0 client credentials extention grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.5) using [JWT for client authentication](https://datatracker.ietf.org/doc/html/rfc7523#section-2.2). These tokens are automatically obtained on startup, and also refreshed before they expire.

| Key | Description |
| --- | --- |
| type | The type is `oauth2` for this credential. |
| flow | This is the OAuth flow required for this credential. For this credential, the value is `clientCredentials`. |
| basic_auth | When `true`, the `client_id` and `client_secret` will be passed to the authorization server using the HTTP Basic authentication scheme. Defaults to `false`. |
| token_url | This is the URL of the token endpoint. {{% variables/apibuilder_prod_name %}} will call this endpoint to redeem an authorization code or refresh token and retrieve a new access token. |
| client_id | This is the OAuth application ID as configured in the third party service. |
| assertion_type | The assertion type is `jwtClientAuth`. |
| private_key | A PEM encoded private key used to sign JWT. |
| passphrase | A passphrase to use to decrypt the `private_key`. |
| scope | The space-separated list of OAuth scopes for which authorization is requested. |
| access_token | Typically, `null` for this grant as the service will obtain a new token on startup. |

### Example

Depending on the deployment scenario, not all settings may be required, but any setting that is not required **must** be set to `null`. The following is an example configuration for a credential that uses JWT for authorization grant.

```javascript
// default.js

authorization: {
  credentials: {
    example: {
      type: 'oauth2',
      flow: 'clientCredentials',
      assertion_type: 'jwtAuthGrant',
      token_url: 'http://authz.io/token',
      client_id: 'example',
      private_key: require('fs').readFileSync('./private.pem').toString(),
      passphrase: 'secret',
      scope: 'read',
      access_token: null
    }
  }
}
```

## Managing token refresh schedule

As mentioned previously, {{% variables/apibuilder_prod_name %}} solves the problem of expiring access tokens by refreshing them before expiration. The default behavior is for {{% variables/apibuilder_prod_name %}} to refresh the access token on startup and then to continually refresh the access token 1 minute before the access token's expiration. The default behavior should be sufficient for the majority of scenarios; however, finer-grained control over the refresh schedule is available by adjusting the refresh settings in the credential configuration.

| Name | Description |
| --- | --- |
| refreshPolicy | `beforeexpiry` - This is the default refresh behavior, {{% variables/apibuilder_prod_name %}} will begin attempting to refresh the access token a configured number of seconds (`refreshOffset`) before the token expiry.<br /><br />`onexpiry` - Some services may not allow refresh before token expiry. {{% variables/apibuilder_prod_name %}} will only begin attempting to refresh the access token once it has expired. This may mean there is a window where {{% variables/apibuilder_prod_name %}} does not have an access token for the credential.<br /><br />`periodic` - Periodic refresh tells {{% variables/apibuilder_prod_name %}} to refresh the access token on a fixed interval (`refreshPeriod`), independent of the token's expiration. |
| refreshOffest | Set the number of seconds before token expiry (`beforeexpiry`) to perform the token refresh. Default: `60`. |
| refreshPeriod | Set the periodic interval between token refreshes. Default: 3600. |

## Initial token grant

A common scenario that you may encounter is where you have the configuration information but no access or refresh tokens. This can happen as a result of you manually configuring a credential or when you install a Swagger document, which creates a default credential configuration. In this case, if the service supports the [authorization code grant](https://tools.ietf.org/html/rfc6749#section-1.3.1), it is possible to perform authorization from the {{% variables/apibuilder_prod_name %}} Console UI to get the initial access token and refresh token.

{{% alert title="Note" color="primary" %}}Tokens issued in this manner are not persisted and so this only suitable for use during development. When deploying to production, the tokens should be provided as environmentalized values.{{% /alert %}}

![credentials_latest](/Images/credentials_latest.png)

In the above screenshot, the _Gmail App_ credential and the _My Onedrive_ credential are both OAuth 2.0 credentials that have not been authorized. Click **Authorize** to start the authorization process.

![credentials_authorization_latest](/Images/credentials_authorization_latest.png)

Once authorization is completed, the status of the credential will be updated, and the credential will be available for use in a flow.

![credentials_authorized_latest](/Images/credentials_authorized_latest.png)

If the service supports refresh, and the credential is configured to request a refresh token, {{% variables/apibuilder_prod_name %}} will keep the access token valid by refreshing it before its expiry. However, these tokens are not persistent, and if {{% variables/apibuilder_prod_name %}} is restarted, the authorization process will need to be repeated. This makes this Initial Token Grant approach only suitable for development; once in production, the tokens need to be environmentalized. For more information, see [Environmentalizing Credentials](/docs/developer_guide/credentials/environmentalizing_credentials/).

## Additional information

For additional credential management information, refer to [{{% variables/apibuilder_prod_name %}} credential management](https://devblog.axway.com/apis/new-release-api-builder-standalone-with-credential-management/). For how-to information on accessing Gmail using a Swagger flow-node, refer to [Access Gmail using a Swagger flow-node](/docs/how_to/authorization_-_access_gmail_using_swagger_flow-node/). For how-to information on accessing Microsoft OneDrive using a REST flow-node, refer to [Access Microsoft OneDrive using a REST flow-node](/docs/how_to/authorization_-_access_microsoft_onedrive_using_rest_flow-node/).
