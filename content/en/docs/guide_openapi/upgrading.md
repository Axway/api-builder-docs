---
title: Upgrading from endpoints
weight: 90
date: 2022-03-01
description: If you are an existing customer, you may be familiar with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints) and have existing applications that you wish to upgrade to use **OpenAPI** flow-trigger. This document describes how to upgrade.
---

## Overview

While significant effort was made to make the new **OpenAPI** flow-trigger as compatible with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints) interface as possible, there are a number of key differences that were made for better design and UX, that may affect your application, or clients that use it.

The following document should help you upgrade your application and guide you through any issues you may encounter.

{{% alert title="Deprecation" color="warning" %}}
Support for [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints) will end on **31 March 2023**.
{{% /alert %}}

## Upgrading to OpenAPI flow-trigger

TODO

```bash
npm install @axway/api-builder-plugin-ft-oas
```

## Known differences

Below is a table of known differences between **OpenAPI** flow-trigger and [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints) that can affect your existing service and how you develop with OpenAPI, mostly around request and response validation. Before upgrading, you should have all your source under source control, and a suite of tests to ensure that your service works as expected after upgrade.

For example, if your endpoint has a parameter "IPAddress" that is a string with a format "ipv4", previously, this parameter value would not be validated with respect to the format.  After upgrade, this format will be validated and existing clients may receive a `400 Bad Request` error if they are sending invalid IP addresses.

| Feature | Swagger Endpoints | OpenAPI flow-trigger plugin |
| ------- | ----------------- | --------------------------- |
| OpenAPI 2.0 support | yes | yes |
| OpenAPI 3.0 support | no | yes |
| OpenAPI 3.1 support | no | no ¹ |
| OpenAPI 2.0 specification schema validation | yes | yes |
| OpenAPI 2.0 specification semantic validation | yes | yes |
| OpenAPI 3.0 specification schema validation | no | yes |
| OpenAPI 3.0 specification semantic validation | no | no ¹ |
| Updating (re-importing) OpenAPI specification | no | yes |
| OpenAPI 2.0 basePath used for bound paths | yes | no |
| Request validation | yes | yes ³ |
| Response validation | no | yes |
| Date parameters converted to JavaScript Date objects | yes | no ¹ |
| [Dedupe of API path](#api-prefix) if same as `config.apiPrefix` | no | yes |
| Default [response content-type header](#content-type-header) `application/json` | yes | no |
| Default 200 response with no flow [Response](/docs/developer_guide/flows/flow_nodes/http_response_flow_node) | yes | no |
| Permit undocumented [response content-type header](#content-type-header) | yes | no |
| Auto select [response content-type header](#content-type-header) | no | yes |
| JSON schema validation for format "date" | yes | yes |
| JSON schema validation for format "time" | yes | yes |
| JSON schema validation for format "date-time" | yes | yes |
| JSON schema validation for format "uri" | no | yes |
| JSON schema validation for format "uri-template" | no | yes |
| JSON schema validation for format "url" | no | yes |
| JSON schema validation for format "email" | no | yes |
| JSON schema validation for format "hostname" | no | yes |
| JSON schema validation for format "ipv4" | no | yes |
| JSON schema validation for format "ipv6" | no | yes |
| JSON schema validation for format "regex" | no | yes |
| JSON schema validation for format "uuid" | no | yes |
| JSON schema validation for format "json-pointer" | no | yes |
| JSON schema validation for format "relative-json-pointer" | no | yes |
| JSON schema validation for OpenAPI format "int32" | no | yes |
| JSON schema validation for OpenAPI format "int64" | no | yes |
| JSON schema validation for OpenAPI format "float" | no | no ² |
| JSON schema validation for OpenAPI format "double" | no | no ² |
| JSON schema validation for OpenAPI format "byte" | no | yes |
| JSON schema validation for OpenAPI format "binary" | no | no ² |
| JSON schema validation for OpenAPI format "password" | no | no ² |

1. Currently unsupported, but the feature is planned on the [roadmap](#roadmap).
1. Can be used for documentation purposes, but the format is not validated.

#### Generated /apidocs/swagger.json

Previously, {{% variables/apibuilder_prod_name %}} would take your Swagger specification and modify it, adding our own response codes and schema, any custom API, and model schemas. It was not possible to have an API owner produce and maintain a specification. The OpenAPI specification that you use for your service belongs to the API owner. So, the `/apidocs/swagger.json` is no longer generated - it is the same OpenAPI specification that you imported (with some [exceptions](/docs/guide_openapi/managing_apidocs#mutating-openapi-documents)).

#### Default to application/json

Previously, endpoints would automatically default to `application/json` unless it was explicitly set within the flow. With **OpenAPI** flow-trigger, your flows may fail if they explicitly set a `content-type` header that was not defined for the operation response, or if the flow does not set an `content-type` header (and a JSON-like one was not defined for the operation response).

#### Default to 200

Previously, endpoints would default to sending a HTTP status code `200` for flows that did not set an explicit response with the [HTTP Response flow-node](/docs/developer_guide/flows/flow_nodes/http_response_flow_node) before terminating. With **OpenAPI** flow-trigger, your flows can fail with `500` errors if they do not set a [HTTP Response flow-node](/docs/developer_guide/flows/flow_nodes/http_response_flow_node) through all paths through the flow.

#### Dates were objects

Previously, endpoints would pass date parameters (for example, having format "date-time") into the flow as [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects. While it may be useful, it is also really easy to create a `Date` from a string, but it is not easy to create a string from a `Date`. That is why we decided that date parameters shall remain as strings.

There is also an option, [Parse flow parameters](/docs/guide_openapi/flows) on the OpenAPI flow-trigger to do this for you. They can also be manually converted to a `Date`. For example:

```js
const date = new Date('2022-03-25');
```

#### Base path and prefix

TODO

#### No $.fields

TODO
