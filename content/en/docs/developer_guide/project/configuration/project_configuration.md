---
title: Project configuration
linkTitle: Project configuration
weight: 10
date: 2021-10-01
---

## Introduction

{{% variables/apibuilder_prod_name %}} uses the configuration files in the project's `conf` directory to initialize the application and its connectors. Each JavaScript file in the directory should expose an object of key-value pairs. You may add any arbitrary key-value pair beside the one described below. The values will be passed to any method that is passed the {{% variables/apibuilder_prod_name %}} configuration object.

{{% alert title="Note" color="primary" %}}API key values and session objects are auto-generated when you create a new project.{{% /alert %}}

### Configuration files

{{% variables/apibuilder_prod_name %}} will look for two types of configuration files in the **`./conf`** directory of the application, either "default" or "local", for example:

* default.js
* local.js
* oracle.default.js
* oracle.local.js

Files ending in `default.js` are part of the application, can be added to source control, and will be released into production, so these must never contain sensitive information, such as passwords.

Files ending in `local.js` are never be added to source control, and will not be released into production, so these files can contain sensitive information such as passwords. These are explicitly ignored in `.gitignore` and `.dockerignore`. If you use alternate source control or deployment methods, then you should ensure that these files are not deployed.

At startup, all "default" files are loaded and sorted and merged into a single configuration object. Then, all "local" files are loaded, sorted, and merged with the single configuration object, and can override the "default" configuration.

Usually, the values for configuration parameters are specified directly in the configuration file. However, for sensitive information, those values could be environmentalized (see the [Environmentalization guide](https://docs.axway.com/bundle/api-builder-security-guide/page/environmentalization.html) for more information). The important thing to know about environmentalized parameters is that all the values are provided to the application as strings, and might need subsequent type conversion like this:

```javascript
// default.js

module.exports = {
  // In this case we convert the string value that comes from the environment to
  // integer. Similar approach would be with floats.
  timeout: parseInt(process.env.TIMEOUT, 10),

  // In this case we convert the string value to boolean
  printEnvVars: process.env.PRINT_ENV_VARS === "true"
}
```

## Settings

<!-- lint disable heading-sentence-case -->

The following topics describe the project configuration settings.

### admin

\[object\] Configures the Admin Console. The `admin` object may contain the following key-value pairs:

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| allowedHosts | Array`<String>` | \- | Restricts access to the Admin Console to the specified hosts. |
| apiDocPrefix | String | '/apidoc' | **Deprecated {{% deprecation/link D002 %}}**. Prefix for the API documentation. |
| disableAPIDoc | Boolean | false | **Deprecated {{% deprecation/link D003 %}}**. Set to `true` to display the generated OpenAPI Docs. Changing the setting only works in production. Swagger documentation is always available in dev mode. |
| enabled | Boolean | true | Set to `true` to enable the Admin Console. |

### apidoc

\[object\] Configures the OpenAPI documentation since the {{% variables/apibuilder_prod_name %}} Standalone - Boston release. The `apidoc` object may contain the following key-value pairs:

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| prefix | String | '/apidoc' | Prefix for the API documentation. |
| overrides | object | {} | Overrides to Swagger documentation. Any values set here do not change the functionality of the server, only what is exposed in the Swagger. |
| overrides.host | string | \- | OpenAPI 2 specific override. Hostname and optional port on which the server can be accessed. The value can be set to `null` to clear the `host`. |
| overrides.schemes | array | \- | OpenAPI 2 specific override. Schemes which the server can be accessed using. Can be an array containing any of `http`, `https`, `ws`, or `wss`. The value can be set to `null` to clear the `schemes`.|
| overrides.basePath | string | \- | OpenAPI 2 specific override. The root path on which the APIs hosted by the server are available. If provided, this must start with a leading slash (`/`). The value can be set to `null` to clear the `basePath`. |
| overrides.servers | array | \- | OpenAPI 3 specific override. If provided, this must be an array of server objects, and each server must contain the server `url` as string. The value can be set to `null` to clear the `servers`. |

### apikey

\[string\] Generated API key.

### apiPrefix

\[string\] Required. Defaults to `/api`, and **must** start with a leading slash (`/`).

The `apiPrefix` forms the base of **all secured API** in the {{% variables/apibuilder_prod_name %}} service that you are developing. Authenticated access to all APIs that are bound to `apiPrefix` is controlled via `accessControl`.

For example, a model "user" would have its API bound to `/api/user`.

The `apiPrefix` is an important consideration when you are designing the interface for your service with OpenAPI as part of the API-first design process. See [Writing OpenAPI documents](/docs/guide_openapi/writing_apidocs/#api-prefix) for more information.

### limits

\[object\] Configures request limits for the {{% variables/apibuilder_prod_name %}} server.

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| multipartPartSize | number|string | Infinity | Configures the maximum allowed part size for `multipart/form-data` requests. If any part exceeds this limit, the server will respond with a [413 Payload Too Large](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413). Allowed values are:<br /><br />**number** - represents the maximum part size, in bytes.  <br />**string** - supports values such as "10B", "1KB", "100MB". Units are powers of two (1KB = 1024B). Stringified numbers without commas or decimals are also accepted. For example "65536". This allows full control via [environment](https://docs.axway.com/bundle/api-builder-security-guide/page/environmentalization.html) variables.<br /><br />Negative numbers and `Infinity` are equivalent and represent **no limit**. It is recommended that your service be configured with a limit, otherwise it can be subjected to [DoS attacks](https://en.wikipedia.org/wiki/Denial-of-service_attack).<br /><br />When no value is provided, the default behavior is **no limit** for file type parts and **1mb** for other types of multipart fields. Due to the inconsistency, This behavior is deprecated {{% deprecation/link D048 %}}<br /><br />When a limit is configured, 413 responses will be added to all methods in the service's Swagger document. |

### accessControl

\[object\] Configures authentication access since the {{% variables/apibuilder_prod_name %}} Standalone - Kobe release. The `accessControl` object may contain the following key-value pairs:

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| apiPrefixSecurity | string | none | Configures the authentication scheme to use on APIs that are hosted on `apiPrefix`. The built-in schemes are `none`, `basic`, `apikey`, and `ldap`. Also, it is possible to set this to `"plugin"` to provide custom authentication. |
| public | array | \- | An array of paths that are always accessible. The paths are prefixes, do not support any regex or parameterization, and should always start with a slash (for example, `/foo`). If `"/foo"` is a public path, then it is a path prefix (`"/foo/"`) such that all children are also public (for example, `"/foo/bar"`). If admin UI is enabled, then `/console` and `/adminapi` are automatic public paths. If `apidoc` is enabled, then `/apidoc` ([apidoc.prefix](#apidoc)) is also added. |
| plugin | string | \- | When `apiPrefixSecurity` is set to `"plugin"`, this should be the plugin module to load (see [Custom Authentication](/docs/developer_guide/project/configuration/authentication_schemes/#Customauthentication)). |

### APIKeyAuthPlugin

\[string\] Path to the authorization module js file. Only used if `APIKeyAuthType` is set to `plugin`.

For details, see [Authentication Schemes](/docs/developer_guide/project/configuration/authentication_schemes/). This key is deprecated {{% deprecation/link D010 %}}, use `accessControl` instead.

### APIKeyAuthType

\[string\] Value indicating the authorization type for the application. By default, it is set to '`basic'`.

For details, see [Authentication Schemes](/docs/developer_guide/project/configuration/authentication_schemes/). This key is deprecated {{% deprecation/link D010 %}}, use `accessControl` instead.

### connectors

\[object\] Configures the connectors used by the application. The connectors field is an object of key-value pairs where the key is the name of the connector, and the value is another key-value pair object used to configure the connector. The configuration object is specific to each connector.

Most connectors will have a default configuration file in the `conf` directory.

### cookieSecret

\[string\] If you want signed cookies, you can set this value. If you do not want to sign cookies, remove this value, or make it null.

### cors

\[object\] Configures the CORS settings. The `cors` object may contain the following key-value pairs:

| Key | Type | Description |
| --- | --- | --- |
| Access-Control-Allow-Origin | String | Specifies the URI that can access the server. Defaults to none. |
| Access-Control-Allow-Credentials | Boolean | Specifies whether or not to allow access by credentials. |
| Access-Control-Allow-Methods | String (comma separated or array) | If specified, only the listed methods will be allowed. All available methods are allowed by default. |
| Access-Control-Allow-Headers | String (comma separated or array) | Allowed request headers. |
| Access-Control-Expose-Headers | String (comma separated or array) | List of response headers exposed to the user. |

### proxy

\[string\] Configuration option for configuring the proxy server URL that can be leveraged in plugins that do HTTP or HTTPS communication.

Example:

proxy: `http://localhost:8081`

### flags

\[object\] Flags to enable features that are not ready for production or whose use may require manual upgrade steps in legacy services.

{{% flags/table %}}
<!-- Use the format below to add new rows to the flags table -->
<!-- | key | Boolean | a flag which is not in deprecations | -->

### logLevel

\[string\] Sets the log level for the logger utility. Accepted values are (in order of most-verbose to least) _trace_, _debug_, _info_, _warn_, _error_, _fatal, none_.

### session

\[object\] You can generally leave this as-is since it is generated for each new project you create. The `session` object may contain the following key-value pairs:

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| encryptionAlgorithm | String | aes256 | Encryption algorithm. |
| encryptionKey | String | \- | Encryption key. |
| signatureAlgorithm | String | sha512-drop256 | Signature algorithm. |
| signatureKey | String | \- | Signature key. |
| secret | String | \- | Should be a large un-guessable string. |
| duration | String | 86400000 | How long the session will stay valid in milliseconds. |
| activeDuration | String | 300000 | The session will be extended by activeDuration milliseconds. |

### port

\[number/string\] The port to listen on for HTTP requests. Defaults to 8080. This key is deprecated {{% deprecation/link D038 %}}, use http.port instead.

### http

\[object\] Your HTTP configuration goes here:

| Key | Type | Description |
| --- | --- | --- |
| port | Number | The port to listen on for HTTP requests. |
| disabled | Boolean | False by default. When this flag is set to True HTTP traffic is disabled. For this to work, _baseurl_ should point to https path and _`ssl`_ must be configured and used. |
| headers.etag | Boolean | True by default. Enabling will send an 'etag' response header which contains a unique key for a specific version of a resource. |
| headers\['content-md5'\] | Boolean | True by default. Enabling will send a 'content-md5' response header which contains an MD5 hash of the response body. |
| headers.server | Boolean | True by default. Enabling will send a 'server' response header which describes the server. i.e. `server: {{% variables/apibuilder_prod_name %}}/4.67.6` |

### ssl

\[object\] Your SSL configuration goes here. The options are the same as what is used by Node.js [https.createServer()](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener) method. A subset is as follows:

| Key | Type | Description |
| --- | --- | --- |
| port | Number | The port to listen on for HTTPS requests. |
| key | String/Buffer/Array | Private keys in PEM format. PEM allows the option of private keys being encrypted. Encrypted keys will be decrypted with `options.passphrase`. Multiple keys using different algorithms can be provided either as an array of unencrypted key strings or buffers, or an array of objects in the form `{pem: <string|buffer>[, passphrase: <string>]}`. The object form can only occur in an array. `object.passphrase` is optional. Encrypted keys will be decrypted with `object.passphrase` if provided, or `options.passphrase` if it is not. |
| cert | String/Buffer/Array | Cert chains in PEM format. One cert chain should be provided per private key. Each cert chain should consist of the PEM formatted certificate for a provided private `key`, followed by the PEM formatted intermediate certificates (if any), in order, and not including the root CA (the root CA must be pre-known to the peer, see `ca`). When providing multiple cert chains, they do not have to be in the same order as their private keys in `key`. If the intermediate certificates are not provided, the peer will not be able to validate the certificate, and the handshake will fail. |
| passphrase | string | Encrypted keys will be decrypted with this if provided. |

### timeout

\[number\] The number of milliseconds before timing out a request to the server.

### healthCheckAPI

\[string\] Path to a file that exports an express middleware function, which is used as a healthcheck. See [Middleware callback function examples](https://expressjs.com/en/4x/api.html#middleware-callback-function-examples) for more information on express middleware functions.

This healthcheck middleware is executed by invoking `GET /apibuilderPing.json`. By default, invoking this endpoint will return `{ success: <bool> }`, where `<bool>` is `true` as long as the service is not shutting down.

Example:

```javascript
// default.js

healthCheckAPI: '../healthcheckapi.js'
```

```javascript
// ../healthcheckapi.js

module.exports = function (req, resp) {
  return resp.json({ success: 'Service is up' });
}
```

### bindProcessHandlers

\[boolean\] True by default. When this is set to false, {{% variables/apibuilder_prod_name %}} will not automatically shut down or restart on process signals such as SIGUSR2, SIGINT and SIGABRT, as well as on exit and uncaught exception events. bindProcessHandlers should be set to false when starting {{% variables/apibuilder_prod_name %}} as part of another process (i.e. during mocha unit tests), otherwise any bound process handlers may interfere with the main process and cause unexpected behaviour.
