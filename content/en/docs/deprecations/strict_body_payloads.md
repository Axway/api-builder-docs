---
title: Change in the way body is handled for HTTP methods GET and HEAD
linkTitle: Change in the way body is handled for HTTP methods GET and HEAD
weight: 50
deprecation: D050
date: 2021-10-01
---

{{% alert title="Note" color="primary" %}}This document describes deprecation {{% deprecation/link D050 %}}{{% /alert %}}

Sending a payload body with HTTP methods GET or HEAD to Swagger 2.0 endpoints have been deprecated since {{% variables/apibuilder_prod_name %}} [Roberttown](/docs/release_notes/roberttown) release.

Beginning in the [Roberttown](/docs/release_notes/roberttown) release, payload body sent with GET or HEAD requests to Swagger 2.0 endpoints will be ignored.

## Why are we making this change

Prior to [Roberttown](/docs/release_notes/roberttown) release, it was possible to bypass the upload [limits](/docs/developer_guide/project/configuration/project_configuration/#limits) for a Swagger 2.0 endpoint that had a "get" or "head" path configured to allow a body (e.g., "application/json", "multipart/form-data", etc.). This would permit both GET and HEAD methods to process a body. This can lead to a DOS attack by sending a large payload body that could consume available resources. According to [RFC-7231](https://datatracker.ietf.org/doc/html/rfc7231#section-4.3), methods [GET](https://datatracker.ietf.org/doc/html/rfc7231#section-4.3.1) and [HEAD](https://datatracker.ietf.org/doc/html/rfc7231#section-4.3.2) have "no defined semantics", so we chose to ignore payloads for these methods.

## How does this impact my service

Most applications should not be effected by this as sending a payload with GET or HEAD is quite uncommon. However, if your application has Swagger 2.0 endpoints that have "get" or "head" paths configured to "consume" a body Content-Type, then these methods will no longer handle the body payload.

## Upgrading existing configuration

Updates contain important changes to improve the performance, stability, and security of your services. Installing them ensures that your software continues to run safely and efficiently.

It is strongly recommended you upgrade {{% variables/apibuilder_prod_name %}} to the latest version as well any data connectors you may have in your stack. This feature requires a minimum of:

* [{{% variables/apibuilder_prod_name %}} - Roberttown](/docs/release_notes/roberttown)

Enable the flag to ignore body payloads for HTTP methods GET and HEAD:

```javascript
// Enable strict body payloads
flags: {
    enableStrictBodyPayloads: true
}
```

You may want to visually audit your Swagger 2.0 endpoint definitions in `./endpoints`. Open each and inspect all methods for "get" and "head" requests that consume a body, e.g. "multipart/form-data". For example:

```javascript
// Example Swagger
/files:
  get:
    parameters:
    - in: formData
      name: file
      type: file
    consumes:
      - multipart/form-data
      - application/x-www-form-urlencoded
      - application/json
    responses:
      200:
        description: Success
```

Finally, be sure to run all of your unit-tests and integration tests against the upgraded service.
