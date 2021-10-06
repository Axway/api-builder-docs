---
title: Change in the way of handling authentication and authentication plugins
linkTitle: Change in the way of handling authentication and authentication plugins
weight: 10
deprecation: D010
date: 2021-10-01
---

{{% alert title="Note" color="primary" %}}This document describes deprecation {{% deprecation/link D010 %}}{{% /alert %}}

Configuration options for authentication and authentication plugins have changed, and have been moved to a new `accessControl` configuration section. The moved `APIKeyAuthType` and `APIKeyAuthPlugin` options have been deprecated alongside the custom `matchURL` authentication plugin method.

Beginning with the [Lisbon](/docs/release_notes/lisbon) release, authentication and authentication plugins have changed to ensure _all_ paths are secured by default. Authentication is applied to the API path (`apiPrefix`), and authentication is controlled using a new configuration section, [accessControl](http://localhost:1313/docs/developer_guide/project/configuration/project_configuration/#accesscontrol). All other paths are **denied** by default unless they are made explicitly public by adding them to `accessControl.paths`. There are several public paths added implicitly:

* `/adminapi` - this path is added if `config.admin.enabled` is true, and the application is installed in development mode (for example, it is not production and api-builder-admin).
* `/console` - same as above.
* `/apidoc` - the `config.apidoc.prefix` path is added if `config.apidoc.disabled` is not true (the default apidoc prefix is /apidoc).

## Why we are making this change

Before the [Lisbon](/docs/release_notes/lisbon) release, authentication was using a URL path matching mechanism where each URL path was tested first, and then credentials were tested separately. If a custom authentication plugin was used, it would technically allow different security mechanisms to be applied to different paths. However, it was also dangerous because it relied on the authentication plugins to match the URL correctly. If the URL matching was not implemented correctly, there is a chance that the authentication could be bypassed, and routing would continue. With this change, we are consolidating routing and authentication. The use of `matchURL` in the authentication plugins does not fit into this security model, and so it has been deprecated.

From the [Lisbon](/docs/release_notes/lisbon) release, the chosen authentication scheme will **always** be applied to paths bound to the `apiPrefix`. The type of authentication applied to these paths can be controlled in the configuration. {{% variables/apibuilder_prod_name %}} still supports `matchURL` for backward compatibility and the ability to apply security against paths _other_ than `apiPrefix`, but as already explained, this is not secure, so if your application uses `matchURL`, it will emit a warning, for example:

```javascript
// matchURL warning
Deprecation: The configured authentication plugin is using using a deprecated method 'matchURL' for applying security to paths and is potentially insecure.
```

{{% alert title="Note" color="primary" %}}Continuing to use the `matchURL` feature on custom authentication plugins is potentially insecure.{{% /alert %}}

This fix explicitly forces a security check against **all requests** that match the `apiPrefix`. This means that you are using a custom authentication plugin, and you previously did _not_ require authentication on `/api/foo` (in other words, `matchURL` would return false), then after this fix, your plugin will now be forced to validate requests for `/api/foo`. While this is an edge-case, it is a breaking change, but a necessary one for security purposes. If you wish to maintain this behavior, please see [legacy unauthenticated access](#legacy-unauthenticated-access-to-paths-having-apiprefix-plugin) below.

Additionally, except for a select few paths (mentioned above), access to all other paths will be denied by default. To opt-out of this behavior, paths intended to be public must be explicitly declared within the `accessControl.public` configuration.

## How does this impact my service

These changes are compatible with the existing configuration. You should follow the upgrade guide to update your service to comply with the latest security recommendations and features introduced in the [Lisbon](/docs/release_notes/lisbon) release.

## Upgrading the existing configuration

Continuing to use old configuration will emit a warning:

```javascript
// Old configuration warning
Deprecation: Config settings related to authentication have been deprecated (APIKeyAuthType, and APIKeyAuthPlugin), use accessControl for API security instead
```

### Upgrading authentication: basic, apikey, or none

If using the standard authentication mechanisms: basic, apikey, or none, your existing configuration will look similar to this:

```javascript
// Example configuration
apikey: 'kL51Ag9PtCR4xeTInjvhlolMlQqJ6FW3',
APIKeyAuthType: 'basic',
```

To upgrade, create a new key `accessControl`, and copy the value of `APIKeyAuthType` to `accessControl.apiPrefixSecurity`. You should delete the key `APIKeyAuthType`. For example:

```javascript
// Upgraded configuration
apikey: 'kL51Ag9PtCR4xeTInjvhlolMlQqJ6FW3',
accessControl: {
    apiPrefixSecurity: 'basic',
    public: []
}
```

### Upgrading authentication: ldap

If using ldap, it will look similar to this:

```javascript
// Example configuration
APIKeyAuthType: 'ldap',
ldap: {
    url: 'ldap://ldap.acme.io:1389',
    adminDn: 'cn=read-only-admin,dc=example,dc=com',
    adminPassword: 'password',
    searchBase: 'dc=example,dc=com',
    searchFilter: '(uid={{username}})',
    reconnect: false,
    connectTimeout: 2000
},
```

To upgrade, create a new key `accessControl`, and set the value of `accessControl.apiPrefixSecurity` to `'ldap'`. You should delete the key `APIKeyAuthType`. For example:

```javascript
// Upgraded configuration
accessControl: {
  apiPrefixSecurity: 'ldap',
    public: []
},
ldap: {
    url: 'ldap://ldap.acme.io:1389',
    adminDn: 'cn=read-only-admin,dc=example,dc=com',
    adminPassword: 'password',
    searchBase: 'dc=example,dc=com',
    searchFilter: '(uid={{username}})',
    reconnect: false,
    connectTimeout: 2000
}
```

### Upgrading custom authentication: plugin

If using a custom authentication plugin, your configuration will look similar to this:

```javascript
// Example configuration
APIKeyAuthType: 'plugin',
APIKeyAuthPlugin: 'custom-plugin.js'
```

To upgrade, create a new key `accessControl`, and set the value of `accessControl.apiPrefixSecurity` to `'plugin'`. Then, copy the value of `APIKeyAuthPlugin` to `accessControl.plugin`. You should delete the keys `APIKeyAuthType` and `APIKeyAuthPlugin`.

```javascript
// Upgraded configuration
apikey: 'kL51Ag9PtCR4xeTInjvhlolMlQqJ6FW3',
accessControl: {
    apiPrefixSecurity: 'plugin',
    plugin: 'custom-plugin.js',
    public: []
}
```

Your upgraded custom authentication plugin should not contain `matchURL`. For example:

```javascript
// Upgraded custom authentication plugin
function Plugin() {
}

Plugin.prototype.validateRequest = function (request, response, callback) {
    // TODO: custom authentication
    callback(null, true); // success!
};

module.exports = Plugin;
```

### Legacy unauthenticated access to paths having apiPrefix: plugin

We _highly_ recommend that if you need unauthenticated paths, you use the [public paths mechanism for unauthenticated access](/docs/developer_guide/project/configuration/project_configuration/). However, as stated above, if you implement a plugin where matchURL returned false for paths residing on the `apiPrefix` (for example, `/api` by default) and wish to continue to provide unauthenticated access those path(s), then you must implement this logic in `validateRequest,`and be careful when testing the path. The code below does a case-insensitive test on the `request.path`.

```javascript
// Upgraded custom authentication plugin
function Plugin() {
}

Plugin.prototype.validateRequest = function (request, response, callback) {
    if (request.path.toLowerCase().indexOf('/api/foo') === 0) {
        // unauthenticated URL
        return true;
    }
    // TODO: custom authentication
    callback(null, true); // success!
};

module.exports = Plugin;
```
