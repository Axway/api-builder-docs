---
title: Upgrading endpoints
weight: 40
date: 2022-03-01
description: If you are an existing customer, you may be familiar with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints) and have existing applications that you wish to upgrade to use the **OpenAPI** flow-trigger. This document describes how to upgrade.
---

## Overview

While significant effort was made to make the new **OpenAPI** flow-trigger as compatible with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints) interface as possible, there are a number of key differences that were made for better design and UX, that may affect your application, or clients that use it.

One of the main driving forces for this change is that the modules we used to support Swagger endpoints are no longer maintained and they only support OpenAPI 2.0. That, and combined with architecture changes, it is now possible to support pluggable modules that can support HTTP and API-first, such as OpenAPI. **OpenAPI** flow-trigger provides a better experience and support.

The following document should help you upgrade your application and guide you through any issues you may encounter.

{{% alert title="Deprecation" color="warning" %}}
Support for [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints) will end on **31 March 2023**.
{{% /alert %}}

## Upgrading to OpenAPI flow-trigger

Before upgrading, we recommend the following:

1. Read this guide and get familiar with the [known differences](#known-differences) between Swagger endpoints and the new **OpenAPI** flow-trigger. For most applications, this upgrade should be very simple.
1. Ensure that your application currently works as expected, and that all code paths are covered by tests. It will be much easier to test any change, including upgrades, if adequate tests are in place.
1. Ensure your application is committed under source control, or backed up.

Open a command prompt and change to the directory of the {{% variables/apibuilder_prod_name %}} project that you wish to upgrade. Note that this command will upgrade your application, and re-install your `node_modules` using npm.  If you do not want this, then you can provide the `--no-install` option:

```bash
npx @axway/api-builder-openapi-upgrade
```

After running, the command, you should see output similar to this:

```text
API Builder OpenAPI upgrade, version 1.0.0

✔ Created: /project/apidocs/openapi/myapi.json
✔ Remove node_modules
✔ Install dependencies

Your application is now successfully upgraded.
```

To finalise the upgrade, and to fully disable the endpoints feature, add the following setting to your `default.js` file.

```javascript
flags: {
    disableEndpoints: true
}
```

1. Ensure that your application's tests pass. There are a number of differences in behavior listed below that should be accounted for.
1. Remove the `./endpoints` directory because it is no longer used (the files have been moved to `./apidocs/openapi`).
1. Commit your changes to source control.

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

1. Currently unsupported.
1. Can be used for documentation purposes, but the format is not validated.

### Dynamic /apidocs/swagger.json

{{% variables/apibuilder_prod_name %}} has a generated OpenAPI 2.0 specification that can be accessed from `http://localhost:8080/apidocs/swagger.json`. This dynamic specification contains a mash-up of any [custom API](/docs/developer_guide/apis), [model API](/docs/developer_guide/console/models), and your [Swagger endpoint specifications](https://docs.axway.com/bundle/api-builder/page/docs/developer_guide/flows/manage_endpoints/index.html), and is updated as API or models are added or changed. It does _not_ contain any API-first specifications after upgrading from endpoints.

The API-first specification(s) will be hosted on their own separate [`apidocs` URL](/docs/guide_openapi/quick_start/#accessing-the-api-specifications). This means that external applications that might rely on `/apidocs/swagger.json` will have to have some knowledge about these API-first specification URLs, and where to access them.

### Default to application/json

Previously, endpoints would automatically default to `application/json` unless it was explicitly set within the flow. With **OpenAPI** flow-trigger, your flows may fail if they explicitly set a `content-type` header that was not defined for the operation response, or if the flow does not set an `content-type` header (and a JSON-like one was not defined for the operation response).

If your flows are failing because of `content-type`, you may need to modify your OpenAPI 2.0 specification to add a `produces` or you may need to modify your flow to set a `content-type` that matches the `produces` defined in your OpenAPI 2.0 specification.

### Default to 200

Previously, endpoints would default to sending a HTTP status code `200` for flows that did not set an explicit response with the [**HTTP Response flow-node**](/docs/developer_guide/flows/flow_nodes/http_response_flow_node) before terminating. With **OpenAPI** flow-trigger, your flows can fail with `500` errors if they do not set a **HTTP Response flow-node** through all paths through the flow.

If your flows are failing for this reason, then you may need to modify your flows to explicitly handle failing code paths (e.g. from `Error` outputs) to `400 Bad Request` to send proper error responses to the client.

### Dates

Previously, endpoints would pass date parameters (for example, having format "date-time") into the flow as [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects. While it may be useful, it is also really easy to create a `Date` from a string with:

```js
const date = new Date('2022-03-25');
```

However, it is not easy to create a string from a `Date`. That is why we decided that date parameters shall remain as strings. If it is desirable to continue to use `$.params`, then there is an option on the **OpenAPI** flow-trigger to [**Parse date parameters**](/docs/guide_openapi/flows#parse-date-parameters) that will convert date strings to `Date` objects before they are passed to the flow. Note that with this option on the following two cases will previously not be converted to Date objects, while now they will be:

* `text/plain` bodies accessible with $.request.body selector
* `x-www-form-urlencoded` form parameters accessible, for example, with $.request.body.date

{{% alert title="Tip" color="primary" %}}
The [OpenAPI upgrade](#upgrading-to-openapi-flow-trigger) will automatically enable [**Lower-case all headers**](/docs/guide_openapi/flows#lower-case-all-headers) for upgraded flows.
{{% /alert %}}

### OpenAPI 2.0 basePath is ignored

Previously, with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints), the OpenAPI 2.0 Swagger [`basePath`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#fixed-fields) was used in conjunction with the [`config.apiPrefix`](/docs/developer_guide/project/configuration/project_configuration#apiprefix), and all of the [`paths`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#pathsObject) in the Swagger specification, to build a path on which the API would be invoked. Now, Swagger `basePath` is ignored.

This change was made because `basePath`, `host`, and `schemes` all describe where the API is "hosted", and do not describe _how_ to host the API. Furthermore, it was difficult for developers to build an application that correctly conformed to the API Owner's expectations. Now, {{% variables/apibuilder_prod_name %}} will update these fields according to how the product is configured. The [`apiPrefix`](/docs/developer_guide/project/configuration/project_configuration#apiprefix) will be used for the `basePath`, unless it is [`overridden`](/docs/developer_guide/project/configuration/project_configuration#apidoc).

It is very likely that your OpenAPI 2.0 specification contains a `basePath`. If this is the case, then your API will be hosted on a different URL after the upgrade. If you need an equivalent path, then you can change the [`apiPrefix`](/docs/developer_guide/project/configuration/project_configuration#apiprefix) to match the `basePath`.

### The $.request is different

Previously, with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints), the `$.request` was the full [Node.js `ClientRequest`](https://nodejs.org/api/http.html#class-httpclientrequest). It provided access to things that were not part of the OpenAPI specification, such as `$.request.hostname` and `$.request.socket`. Now, it is restricted to the following properties that are more tightly aligned with the OpenAPI specification.

| Selector | See also | Description |
| -------- | --- | ----------- |
| $.request.body | [Request body](/docs/guide_openapi/request_handling#request-body) | The processed [OpenAPI `requestBody`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#requestBodyObject). |
| $.request.files | [Multipart files](/docs/guide_openapi/request_handling#multipart-files) | Any uploaded `multipart/form-data` file(s) |
| $.request.cookies | [Request cookie parameters](/docs/guide_openapi/request_handling#request-cookie-parameters) | The processed, case-sensitive, [OpenAPI `cookie` parameter(s)](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterObject), if provided. |
| $.request.headers | [Request header parameters](/docs/guide_openapi/request_handling#request-header-parameters) | The processed, case-sensitive, [OpenAPI `header` parameter(s)](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterObject), if provided. |
| $.request.query | [Request query parameters](/docs/guide_openapi/request_handling#request-query-parameters) | The processed, case-sensitive, [OpenAPI `query` parameter(s)](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterObject), if provided. |
| $.request.path | [Request path parameters](/docs/guide_openapi/request_handling#request-path-parameters) | The processed, case-sensitive, [OpenAPI `path` parameter(s)](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterObject), if provided. |
| $.request.id | [Request ID](/docs/guide_openapi/request_handling#request-id) | Added in [@axway/api-builder-plugin-ft-oas@1.6.0](/docs/release_notes/oyo). The {{% variables/apibuilder_prod_name %}} HTTP request ID. |

This change was made because it provided full access to the raw request that could be used in an unsafe manner. It also exposes the flow to changes to the `ClientRequest` that can occur between implementations of Node.js.

If you encounter an issue where you need to access additional properties from `$.request`, please submit a change request with the {{% variables/apibuilder_prod_name %}} team, and we will consider the request.

### No $.request.fields

Previously, with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints), HTTP form fields from `application/x-www-form-urlencoded` and `multipart/form-data` would be passed to the flow using `$.request.fields`. Now, only documented fields are passed to the flow using `$.request.body`.

This change was made because HTTP form fields are part of the request body. They are not an actual component of the HTTP client request and only increased complexity.

If you encounter this issue, you should change your flow to access the fields from `$.request.body`.

### No $.request.files

Previously, with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints), HTTP `multipart/form-data` files would be passed to the flow using `$.request.files`. Now, only documented files are passed to the flow using `$.request.body`.

This change was made because HTTP form files are part of the request body. They are not an actual component of the HTTP client request and only increased complexity.

If you encounter this issue, you should change your flow to access the fields from `$.request.body`.

### The $.request.headers are different

Previously, with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints), all HTTP headers from the request would be passed to the flow where all of the keys were lower-case. While this is still true, if any HTTP header is an [OpenAPI parameter](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterObject), then the case will be preserved.

This change was made because OpenAPI parameters are uniquely identified by the properties `in` and `name`, where `name` is case-sensitive. Because of this, all parameters are now accessed through their [HTTP request component parts](#the-request-is-different), which guarantees uniqueness, but also preserves case (when applicable).

If it is desirable to ensure all headers are lower-case, then there is an option on the **OpenAPI** flow-trigger to [**Lower-case all headers**](/docs/guide_openapi/flows#lower-case-all-headers).

{{% alert title="Tip" color="primary" %}}
The [OpenAPI upgrade](#upgrading-to-openapi-flow-trigger) will automatically enable [**Lower-case all headers**](/docs/guide_openapi/flows#lower-case-all-headers) for upgraded flows.
{{% /alert %}}

### Removed $.params

Previously, with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints), all OpenAPI parameters were parsed and passed to the flow through `$.params`. Now, all OpenAPI parameters are accessed through their [HTTP request component parts](#the-request-is-different). Also note that [OpenAPI 2.0 body parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameterObject) could be accessed from the `$.params` using their parameter name. Now, the body parameter is always `$.request.body`.

This change was made because OpenAPI parameters are uniquely identified by the properties `in` and `name`, where `name` is case-sensitive. This means that when using `$.params`, it is possible for parameter names to clash. Because of this, all parameters are now accessed through their [HTTP request component parts](#the-request-is-different) which guarantees uniqueness.

If it is desirable to continue to use `$.params`, then there is an option on the **OpenAPI** flow-trigger to [**Flatten parameters**](/docs/guide_openapi/flows#flatten-parameters).

{{% alert title="Tip" color="primary" %}}
The [OpenAPI upgrade](#upgrading-to-openapi-flow-trigger) will automatically enable [**Flatten parameters**](/docs/guide_openapi/flows#flatten-parameters) for upgraded flows.
{{% /alert %}}

### Removed $.request.params

Previously, with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints), OpenAPI path parameters were passed through the case-sensitive map of `$.request.params`. Now, these are all accessible from `$.request.path`.

This change was made because it is was not user-friendly. The "params" is too closely tied to the [Express](https://expressjs.com).

If you encounter this issue, you should change your flow to access the parameters from `$.request.path`.

{{% alert title="Tip" color="primary" %}}
The [OpenAPI upgrade](#upgrading-to-openapi-flow-trigger) will automatically enable [**Flatten parameters**](/docs/guide_openapi/flows#flatten-parameters) for upgraded flows, and these parameters can also be accessed from `$.params`.
{{% /alert %}}

### Removed $.request.cookies

Previously, with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints), all HTTP cookies were parsed and passed through `$.request.cookies`. Now, only actual OpenAPI 3.x [cookie parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterObject) are passed to the flow from `$.request.cookies`. In OpenAPI 2.0, there is no such thing as a "cookie parameter". However, the raw cookie is accessible from `$.request.headers.cookie` if it is needed.

This change was made because the OpenAPI specification should dictate the components that are passed into the flow.

If you encounter an issue where you need to access parsed cookies from `$.request`, please submit a change request with the {{% variables/apibuilder_prod_name %}} team, and we will consider the request.

### Axway schema references

Previously, with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints), Axway schema references were supported (for example, `$ref` that start with `schema:///`). Now, they are not supported.

This change was made because there is currently no consistent way to support these. They are external to the API-first OpenAPI specification and there is currently no way to expose them to the clients, and therefore would not be consumable.

If you encounter this issue, we recommend you add the schema to your OpenAPI specification and reference them that way.

### Removed $.request.getId()
Previously, with [Swagger endpoints](/docs/developer_guide/flows/manage_endpoints), the HTTP request ID was accessible from `$.request.getId()`. This was not accessible the initial release of the OpenAPI flow-trigger. Now, from version [1.6.0](/docs/release_notes/oyo), the request ID is accessible from `$.request.id`.
