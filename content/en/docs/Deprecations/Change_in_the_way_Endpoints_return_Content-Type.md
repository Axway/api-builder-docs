---
title: Change in the way Endpoints return Content-Type
linkTitle: Change in the way Endpoints return Content-Type
description: ADD A DESCRIPTION
weight: 80
date: 2021-06-22
---

{{% alert title="Note" color="primary" %}}This document describes deprecation \[[D042](/docs/deprecations/#D042)\]{{% /alert %}}

## Change in the way Endpoints return Content-Type

API Endpoints always return application/json, irrespective of what is set by the [HTTP Response flow-node](/docs/developer_guide/flows/flow-nodes/http_response_flow-node/), or what is defined in the [Swagger produces](https://swagger.io/docs/specification/2-0/describing-responses/).

This behavior has been deprecated since the [{{% variables/apibuilder_prod_name %}} - Tokyo](/docs/release_notes/-_31_july_2020/) release.

Beginning with the [Tokyo](/docs/release_notes/-_31_july_2020/) release, if the flow defines a Content-Type header in the [HTTP Response](/docs/developer_guide/flows/flow-nodes/http_response_flow-node/) Headers, then the header will always be used. If the Content-Type header is not set in [HTTP Response](/docs/developer_guide/flows/flow-nodes/http_response_flow-node/) Headers, then the Content-Type is derived according to the type of response body. If the response body is a [Buffer](https://nodejs.org/api/buffer.html), then the Content-Type is "application/octet-stream". For all other types, then the Content-Type the body is encoded as a JSON string and the Content-Type is "application/json".

This will be the default behavior for all new services.

### Why are we deprecating this feature

It is a significant limitation if API Endpoints cannot return any Content-Type, not just "application/json".

### How does this impact my service

This is now the default behavior for all new services. Any existing services will continue to work as they previously did, though it is strongly recommended you enable the new behavior on existing services. The following examples show the previous behavior when making a HTTP request to an {{% variables/apibuilder_prod_name %}} endpoint.

#### Previous behavior

| Body value | Body type | Flow Set HTTP Response Headers | HTTP Response Content-Type | HTTP Response Body |
| --- | --- | --- | --- | --- |
| `Buffer.from('AAECAwQ=', 'base64')` | `Buffer` | { "content-type": "image/png" } | application/json | `{ "type":"Buffer","data":[0,1,2,3,4] }` |
| "banana" | string | { "content-type": "image/png" } | application/json | `"banana"` |
| 1234 | number | { "content-type": "image/png" } | application/json | `1234` |
| `{ "test":"data" }` | Object | { "content-type": "image/png" } | application/json | `{ "test":"data" }` |
| `Buffer.from('AAECAwQ=', 'base64')` | `Buffer` |  | application/json | `{ "type":"Buffer","data":[0,1,2,3,4] }` |
| "banana" | string |  | application/json | `"banana"` |
| 1234 | number |  | application/json | `1234` |
| `{ "test":"data" }` | Object |  | application/json | `{ "test":"data" }` |

#### New behavior (enableOverrideEndpointContentType flag enabled)

| Body value | Body type | Flow Set HTTP Response Headers | HTTP Response Content-Type | HTTP Response Body |
| --- | --- | --- | --- | --- |
| `Buffer.from('AAECAwQ=', 'base64')` | `Buffer` | { "content-type": "image/png" } | image/png | `[0x0, 0x1, 0x2, 0x3, 0x4]` |
| "banana" | string | { "content-type": "image/png" } | image/png | `"banana"` |
| 1234 | number | { "content-type": "image/png" } | image/png | `1234` |
| `{ "test":"data" }` | Object | { "content-type": "image/png" } | image/png | `{ "test":"data" }` |
| `Buffer.from('AAECAwQ=', 'base64')` | `Buffer` |  | applicaton/octet-stream | `[0x0, 0x1, 0x2, 0x3, 0x4]` |
| "banana" | string |  | application/json | `"banana"` |
| 1234 | number |  | application/json | `1234` |
| `{ "test":"data" }` | Object |  | application/json | `{ "test":"data" }` |

### Upgrading existing services

This only effects services that are using API endpoints (e.g. endpoints/Greet.json) and that have flows that currently explicitly set the Content-Type HTTP Response Header (to no effect), or currently return a body that is a Buffer. Flows that return an Object will continue to work as before (i.e. the Content-Type will be "application/json").

It is strongly recommended you upgrade {{% variables/apibuilder_prod_name %}} to the latest version as well any data connectors you may have in your stack. This feature requires a minimum of:

* {{% variables/apibuilder_prod_name %}} - Tokyo

After upgrading, the `enableOverrideEndpointContentType` feature will not be active until you enable it. To enable it, add the following setting to your `conf/default.js` file:

```
// Service configuration

{
  flags: {
    enableOverrideEndpointContentType: true
  }
}
```

More `conf/default.js` configuration file information can be found here: [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/#flags).

Once enabled, review your service to ensure that you have no logic in your flows or APIs that depends on the deprecated behavior.
