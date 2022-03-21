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

Below is a table of known differences between **OpenAPI** flow-trigger and [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints) features that can affect your existing service and how you develop with OpenAPI, mostly around request and response validation. Before upgrading, you should have all your source under source control, and a suite of tests to ensure that your service works as expected after upgrade.

For example, if your endpoint has a parameter "IPAddress" that is a string with a format "ipv4", previously, this parameter value would not be validated with respect to the format. After upgrade, this format will be validated and existing clients may receive a `400 Bad Request` error if they are sending invalid IP addresses.

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
| [Dedupe of API path](/docs/guide_openapi/writing_apidocs#api-prefix) if same as `config.apiPrefix` | no | yes |
| Default [response content-type header](/docs/guide_openapi/response_handling#content-type-header) `application/json` | yes | no |
| Default 200 response with no flow [Response](/docs/developer_guide/flows/flow_nodes/http_response_flow_node) | yes | no |
| Permit undocumented [response content-type header](/docs/guide_openapi/response_handling#content-type-header) | yes | no |
| Auto select [response content-type header](/docs/guide_openapi/response_handling#content-type-header) | no | yes |
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

1. Currently unsupported, but the feature is planned on the [roadmap](/docs/guide_openapi/writing_apidocs#openapi-roadmap).
1. Can be used for documentation purposes, but the format is not validated.

### Generated /apidocs/swagger.json

Previously, {{% variables/apibuilder_prod_name %}} would take your Swagger specification and modify it, adding our own response codes and schema, any custom API, and model schemas. It was not possible to have an API owner produce and maintain a specification. The OpenAPI specification that you use for your service belongs to the API owner. So, the `/apidocs/swagger.json` is no longer generated - it is the same OpenAPI specification that you imported (with some [exceptions](/docs/guide_openapi/writing_apidocs#security-definitions-are-removed)).

### Default to application/json

Previously, endpoints would automatically default to `application/json` unless it was explicitly set within the flow. With **OpenAPI** flow-trigger, your flows may fail if they explicitly set a `content-type` header that was not defined for the operation response, or if the flow does not set an `content-type` header (and a JSON-like one was not defined for the operation response).

### Default to 200

Previously, endpoints would default to sending a HTTP status code `200` for flows that did not set an explicit response with the [HTTP Response flow-node](/docs/developer_guide/flows/flow_nodes/http_response_flow_node) before terminating. With **OpenAPI** flow-trigger, your flows can fail with `500` errors if they do not set a [HTTP Response flow-node](/docs/developer_guide/flows/flow_nodes/http_response_flow_node) through all paths through the flow.

### Dates

Previously, endpoints would pass date parameters (for example, having format "date-time") into the flow as [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects. While it may be useful, it is also really easy to create a `Date` from a string with:

```js
const date = new Date('2022-03-25');
```

However, it is not easy to create a string from a `Date`. That is why we decided that date parameters shall remain as strings. If it is desirable to continue to use `$.params`, then there is an option on the **OpenAPI** flow-trigger to [Parse flow parameters](/docs/guide_openapi/flows) that will convert date strings to `Date` objects before they are passed to the flow. Note that with this option on the following two cases will previously not be converted to Date objects, while now they will be:

* "text/plain" bodies accessible with $.request.body selector 
* "x-www-form-urlencoded" form parameters accessible, for example, with $.request.body.date

### OpenAPI 2.0 basePath is ignored

Previously, with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints), the OpenAPI 2.0 Swagger [`basePath`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#fixed-fields) was used in conjunction with the [`config.apiPrefix`](/docs/developer_guide/project/configuration/project_configuration#apiprefix), and all of the [`paths`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#pathsObject) in the Swagger specification, to build a path on which the API would be invoked. Now, Swagger `basePath` is ignored.

This change was made because `basePath`, `host`, and `schemes` all describe where the API is "hosted", and do not describe _how_ to host the API. Furthermore, it was difficult for developers to build an application that correctly conformed to the API Owner's expectations. Now, {{% variables/apibuilder_prod_name %}} will update these fields according to how the product is configured. The [`apiPrefix`](/docs/developer_guide/project/configuration/project_configuration#apiprefix) will be used for the `basePath`, unless it is [`overridden`](/docs/developer_guide/project/configuration/project_configuration#apidoc).

### The $.request is different

Previously, with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints), the `$.request` was the full [Node.js `ClientRequest`](https://nodejs.org/api/http.html#class-httpclientrequest). It provided access to things that were not part of the OpenAPI specification, such as `$.request.hostname` and `$.request.socket`. Now, it is restricted to the following properties that are more tightly aligned with the OpenAPI specification.

| Selector | See also | Description |
| -------- | --- | ----------- |
| $.request.body | [Request body](/docs/guide_openapi/request_handling#request-body) | The processed [OpenAPI `requestBody`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#requestBodyObject) body. |
| $.request.files | [Multipart files](/docs/guide_openapi/request_handling#multipart-files) | Any uploaded `multipart/form-data` file(s) |
| $.request.cookies | [Request cookie parameters](/docs/guide_openapi/request_handling#request-cookie-parameters) | The processed, case-sensitive, [OpenAPI `cookie` parameter(s)](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject), if provided. |
| $.request.headers | [Request header parameters](/docs/guide_openapi/request_handling#request-header-parameters) | The processed, case-sensitive, [OpenAPI `header` parameter(s)](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject), if provided. |
| $.request.query | [Request query parameters](/docs/guide_openapi/request_handling#request-query-parameters) | The processed, case-sensitive, [OpenAPI `query` parameter(s)](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject), if provided. |
| $.request.path | [Request path parameters](/docs/guide_openapi/request_handling#request-path-parameters) | The processed, case-sensitive, [OpenAPI `path` parameter(s)](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject), if provided. |

This change was made because it provided full access to the raw request that could be used in an unsafe manner. It also exposes the flow to changes to the `ClientRequest` that can occur between implementations of Node.js.

### No $.request.fields

Previously, with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints), HTTP form fields from `application/x-www-form-urlencoded` and `multipart/form-data` would be passed to the flow using `$.request.fields`. Now, only documented fields are passed to the flow using `$.request.body`.

This change was made because HTTP form fields are part of the request body. They are not an actual component of the HTTP client request and only increased complexity.

### No $.request.files

Previously, with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints), HTTP `multipart/form-data` files would be passed to the flow using `$.request.files`. Now, only documented files are passed to the flow using `$.request.body`.

This change was made because HTTP form files are part of the request body. They are not an actual component of the HTTP client request and only increased complexity.

### The $.request.headers are different

Previously, with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints), all HTTP headers from the request would be passed to the flow where all of the keys were lower-case. While this is still true, if any HTTP header is an [OpenAPI parameter](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject), then the case will be preserved.

If it is desirable to ensure all headers are lower-case, then there is an option on the **OpenAPI** flow-trigger to [Lower-case all headers](/docs/guide_openapi/flows#lower-case-all-headers).

This change was made because OpenAPI parameters are uniquely identified by the properties `in` and `name`, where `name` is case-sensitive. Because of this, all parameters are now accessed through their [HTTP request component parts](/docs/guide_openapi/upgrading#the-request-is-different), which guarantees uniqueness, but also preserves case (when applicable).

### Removed $.params

Previously, with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints), all OpenAPI parameters were parsed and passed to the flow through `$.params`. Now, all OpenAPI parameters are accessed through their [HTTP request component parts](/docs/guide_openapi/upgrading#the-request-is-different).

If it is desirable to continue to use `$.params`, then there is an option on the **OpenAPI** flow-trigger to [Flatten parameters](/docs/guide_openapi/flows#flatten-parameters).

This change was made because OpenAPI parameters are uniquely identified by the properties `in` and `name`, where `name` is case-sensitive. This means that when using `$.params`, it is possible for parameter names to clash. Because of this, all parameters are now accessed through their[HTTP request component parts](/docs/guide_openapi/upgrading#the-request-is-different) which guarantees uniqueness.

### Removed $.request.params

Previously, with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints), OpenAPI path parameters were passed through the case-sensitive map of `$.request.params`. Now, these are all accessible from `$.request.path`.

This change was made because it is was not user-friendly. The "params" is too closely tied to the [Express](https://expressjs.com).

### Removed $.request.cookies

Previously, with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints), all HTTP cookies were parsed and passed through `$.request.cookies`. Now, only actual OpenAPI 3.x [cookie parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject) are passed to the flow from `$.request.cookies`. In OpenAPI 2.0, there is no such thing as a "cookie parameter". However, the raw cookie is accessible from `$.request.headers.cookie` if it is needed.

This change was made because the OpenAPI specification should dictate the components that are passed into the flow.
