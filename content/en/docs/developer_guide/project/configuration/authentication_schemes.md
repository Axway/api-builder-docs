---
title: Authentication schemes
linkTitle: Authentication schemes
weight: 20
date: 2021-10-01
---

## Introduction

An {{% variables/apibuilder_prod_name %}} project provides different types of security mechanisms to authenticate requests. Typically, you want to restrict which client applications have access to your APIs, and you want the client to prove it has permission to access your {{% variables/apibuilder_prod_name %}} application's APIs.

By default, a new {{% variables/apibuilder_prod_name %}} project uses [HTTP basic authentication](#http-basic-authentication). A new {{% variables/apibuilder_prod_name %}} project contains a generated API key, `apikey`, located in the `conf/default.js` file. You may change the value of the key, but make sure you generate a sufficiently unique key and do not share the key with other API projects as it controls access to your API. The key should only be used by one {{% variables/apibuilder_prod_name %}} project.

To change the authentication mechanism, open the `conf/default.js` file, and change the `accessControl.apiPrefixSecurity` key to one of the following:

* **`none`** : No authentication. The client does not need any authentication to access these APIs. In this case, all client requests are accepted without any security. Use the value `none` for the key `accessControl.apiPrefixSecurity`.
* **`basic`** : Use [HTTP basic authentication](#http-basic-authentication) (default). The client uses the HTTP `Authorization` header to send an encoded version of the API Key using the [HTTP Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication) standard. The username part is the value of the API Key, and the password part should be blank (empty string).
* **`apikey`** : Use [HTTP header authentication](#http-header-authentication). The client sets the HTTP `APIKey` header to the value of the API Key. In this scenario, the server must only support HTTPS endpoints, so the key is not passed in plain text.
* `plugin`: Use a [custom authentication mechanism](#custom-authentication-plugin). Using the plugin authentication, you can extend the authentication to use any third-party or custom API authentication. To use your plugin, you must also set the `accessControl.plugin` key to the location of your plugin. The location can be a file path (relative to the current work directory of your server project directory) or the name of a dependency available in `node_modules`.

The following headers describe the available authentication mechanisms.

## HTTP basic authentication

In HTTP basic access authentication, the client needs to send a username and password, sent as a base-64 encoded string `"<username>:<password>"`, in the Authorization header of the HTTP request. The server should be configured only communicate over HTTPS, so the header is not sent as plain text (unencrypted).

```http
GET api/model HTTP/1.0
Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
```

For {{% variables/apibuilder_prod_name %}} applications, the username is the API key, and the password field is left blank.

## HTTP header authentication

In HTTP header authentication, the client sends the API key in a custom APIKey header. The server should be configured only communicate over HTTPS, so the key is not sent as plain text (unencrypted).

```javascript
var xhr = Ti.Network.createHTTPClient({
    onload: function onLoad() {
        alert(`Loaded: ${this.status}: ${this.responseText}`);
    },
    onerror: function onError() {
        alert(`Error: ${this.status}: ${this.responseText}`);
    }
});

xhr.open('GET', REQUEST_URL);
xhr.setRequestHeader('APIKey', API_KEY);
xhr.send();
```

## Custom authentication plugin

To use a custom authentication mechanism, you need to create a CommonJS module that exposes a plugin class and implements the following methods. All methods are optional, but to validate requests, you need to implement the `validateRequest` method, either the synchronous version or asynchronous version.

| Method Signature | Description |
| --- | --- |
| Plugin(server) | Constructor. Passed the server instance. The passed server instance has not registered any models or connectors and has not been started. |
| Plugin.prototype.matchURL(request): Boolean | Determines if the URL should be authenticated by the plugin. Return true if the plugin should handle the validation else return false. This method is **[deprecated](/docs/deprecations/change_in_the_way_of_handling_authentication_and_authentication_plugins/)**. It is unsafe and should not be used. |
| Plugin.prototype.validateRequest(request, response): Boolean | Validates the request synchronously. Return a Boolean value indicating if the request passed validation (true) or not (false). Do not implement if you implemented the asynchronous version of this method. |
| Plugin.prototype.validateRequest(request, response, callback): void | Validates the request asynchronously. Pass the callback an Error as its first argument (or null if successful) and a Boolean indicating if validation was a success or not as its second argument. Do not implement it if you implemented the synchronous version of this method. |
| Plugin.prototype.getSwaggerSecurity | Used by Swagger generation to describe the [Swagger Definitions Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#security-definitions-object) and the [Swagger Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#security-requirement-object) authentication mechanism. |

In the `conf/default.js` file, set the `accessControl.plugin` key to the location of the plugin file or the name of the flow-node module if you specify it as a dependency in the `package.json` file.

For example, if your client applications send a custom header, called `X-Secret`, for each request and you want to check the value sent with the request against one stored in your configuration file, you can use the plugin below.

```javascript
// conf/default.js

module.exports = {
    ...
    accessControl: {
        apiPrefixSecurity: 'plugin',
        plugin: './lib/plugin.js'
    },
    secret: 'secret'
    ...
}
```

```javascript
// lib/plugin.js

// Constructor to get a reference to the config object
function Plugin(server) {
    this.config = server.config || { secret: null};
}

// Check if the request has the X-Secret header and its value matches the config file
Plugin.prototype.validateRequest = function(request, response) {
    if (request.headers['x-secret'] && request.headers['x-secret'] === this.config.secret) {
        return true;
    } else {
        return false;
    }
};

// Describe the x-security header for the Swagger 2.0 feed
Plugin.prototype.getSwaggerSecurity = function () {
  return {
    securityDefinitions: {
      app_auth: {
        type: 'apiKey',
        name: 'x-secret',
        in: 'header',
        description: 'Require authorized access to API'
      }
    },
    security: [{
      app_auth: []
    }]
  }
}

module.exports = Plugin;
```

To test the plugin, add the `-H 'X-Secret: secret'` command-line option to the cURL request.

```bash
curl "http://127.0.0.1:8080/api/foo"
{"id":"com.appcelerator.api.unauthorized","message":"Unauthorized","success":false}
curl "http://127.0.0.1:8080/api/foo" -H 'X-Secret: secret'
{"success":true,"request-id":"0d2141f7-57ea-4c78-82cf-b6fa9497c16a", "foo":"bar"}
```
