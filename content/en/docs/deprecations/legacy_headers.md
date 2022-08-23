---
title: Change in default behavior for HTTP response headers
weight: 56
deprecation: D056
date: 2022-08-26
---

{{% alert title="Note" color="primary" %}}This document describes deprecation {{% deprecation/link D056 %}}{{% /alert %}}

HTTP responses from {{% variables/apibuilder_prod_name %}} automatically include headers for "server", "content-md5", and "etag" by default (unless explicitly configured to be disabled in [`http.headers` configuration](/docs/developer_guide/project/configuration/project_configuration)).

This behavior has been deprecated since {{% variables/apibuilder_prod_name %}} - [Unna](/docs/release_notes/unna) release.

Beginning with the [Unna](/docs/release_notes/unna) release, the HTTP headers "server", "content-md5", and "etag" are regarded as legacy headers, and will not be sent unless explicitly enabled in [`http.headers` configuration](/docs/developer_guide/project/configuration/project_configuration).

This will be the default behavior in all new services.

## Why are we deprecating this feature

The "server" header is used to identify the product and version of the server, e.g. `server: API Builder/4.93.0`. It is excluded by default for security purposes. If included in HTTP responses, it can aid attackers in targeted exploits.

The "etag" (or [entity tag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag)) identifies a specific version of a resource that can be used for caching by the browser. The "etag" is computationally expensive and not necessary if clients do not use it. It is excluded by default for performance purposes.

The "content-md5" is a MD5 hash of the HTTP response, and is used to ensure the response body was not tampered with between the server and the client. It is computationally expensive and not necessary if clients do check the header or if more modern security mechanisms are in place (e.g. TLS). It is excluded by default for performance purposes.

## How does this impact my service

This is now the default behavior for all new services. Any existing services will continue to work as they previously did, though it is strongly recommended you enable the `disableLegacyHeaders` flag on existing services to ensure your applications handle this deprecation.

The changed behavior may impact existing clients that rely on "server", "etag" or "content-md5".

## Upgrading existing services

Updates contain important changes to improve the performance, stability, and security of your services. Installing them ensures that your software continues to run safely and efficiently.

It is strongly recommended you upgrade {{% variables/apibuilder_prod_name %}} to the latest version as well any data connectors you may have in your stack. This feature requires a minimum of:

* {{% variables/apibuilder_prod_name %}} - [Unna](/docs/release_notes/unna)

After upgrading, the `disableLegacyHeaders` feature will not be active until you enable it. To enable it, add the following setting to your `default.js` file.

```javascript
flags: {
    disableLegacyHeaders: true
}
```

Once `disableLegacyHeaders` is set to `true`, if clients of your service require "server", "content-md5", or "etag", then you can individually enable them in your `config.http.headers`, e.g.:

```javascript
	http: {
		// This is the port the service will be bound to. Defaults to 8080.
		port: parseInt(process.env.PORT) || 8080,

		// When this is true, the service will no longer listen on requests over http.
		// Disabling http requires 'ssl' to be configured.
		disabled: false,

		// Controls certain header algorithms.
		headers: {
			server: true
		}
	},
```

For more detailed information on the configuration options, see [Project configuration](/docs/developer_guide/project/configuration/project_configuration/#http).

Once enabled, ensure any clients do not depend on the deprecated behavior.
