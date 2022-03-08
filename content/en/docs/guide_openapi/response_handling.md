---
title: Response handling
weight: 70
date: 2022-03-01
description: Technical details about how HTTP responses are handled by the product.
---

## HTTP response

{{% variables/apibuilder_prod_name %}} does additional processing after a flow completes, and before sending the response to the client. The [**HTTP response** flow-node](/docs/developer_guide/flows/flow_nodes/http_response_flow_node) is used to set the HTTP response from the flow. This chapter describes how the response is handled.

Flows should return a response that is suitable for the expected [OpenAPI response object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#responseObject). A HTTP response is set using the [**HTTP response** flow-node](/docs/developer_guide/flows/flow_nodes/http_response_flow_node).

![**HTTP response** flow-node](/Images/flow-node-http-response.png)

All possible flow execution paths must have a suitable [**HTTP response** flow-node](/docs/developer_guide/flows/flow_nodes/http_response_flow_node). Failure to use it will result in an `ERROR` being logged to the console and an [`500 Internal Server Error`](#internal-server-error-500) being returned to the client.

### Status

The **Status** is required and must be a valid [HTTP response status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status), and match a defined [OpenAPI responses object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#responses-object).

```yaml
responses:
  '200':
    description: Success
```

Returning an invalid **Status** code, or one not documented for the OpenAPI operation, will result in an `ERROR` being logged to the console and an [`500 Internal Server Error`](#internal-server-error-500) being returned to the client.

### Headers

The response **Headers** that you set in the flow are optional should reflect the expected header response from your [OpenAPI response object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#responseObject).

```yaml
responses:
  '200':
    description: Success
    headers:
      X-Rate-Limit-Limit:
        description: The number of allowed requests in the current period
        schema:
          type: integer
```

The **Headers** is an Object of key / properties where all the values are all strings. The flow must provide header(s) that match those defined by the [OpenAPI response object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#responseObject), with the exception of the `content-type` header.

The `content-type` header is [treated differently](#content-type-header). It cannot be specified as an OpenAPI response header. Instead, it is specified as an [OpenAPI media type object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#mediaTypeObject).

{{% alert title="Note" color="primary" %}}
{{% variables/apibuilder_prod_name %}} sets `request-id` and other headers for security purposes. In addition, it may set additional HTTP response headers for `server`, `content-md5` and `etag`, and they can be enabled or disabled in the [configuration](/docs/developer_guide/project/configuration/project_configuration#http).
{{% /alert %}}

Returning an undocumented header, or failing to return a required header in **Headers** for the documented OpenAPI operation, will result in an `ERROR` being logged to the console and an [`500 Internal Server Error`](#internal-server-error-500) being returned to the client.

#### Content-type header

The `content-type` header describes the response **Body**, if one is provided. You do not have to specify a `content-type` header in the HTTP response **Headers** as {{% variables/apibuilder_prod_name %}} will automatically pick and appropriate HTTP response `content-type` header, if the type of response **Body** set from the flow is unambiguous with respect to the defined [response object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#responseObject).

* If your flow explicitly sets a `content-type` header in **Headers**, it will be used.
* If there is only one [OpenAPI response content media type object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#mediaTypeObject), then that will be used as the `content-type` header.
* If exactly one of the documented [OpenAPI response content media type object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#mediaTypeObject) are a JSON (e.g. `application/json`), then that will be used as the `content-type` header.

All other cases will result in a [`500 Internal Server Error`](#internal-server-error-500) since the expected value is ambiguous, and you should ensure that an appropriate `content-type` header is set from your flow.

### Body

{{% variables/apibuilder_prod_name %}} will automatically handle response body content encoding if the type of response **Body** set from the flow is unambiguous with respect to the defined [OpenAPI response content media type object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#mediaTypeObject).

* If the flow explicitly sets a `Buffer`, then the content will be sent as-is.
* If the flow is a `string`, then that will be sent without any additional encoding. However, [Express.js](https://expressjs.com) will automatically explicitly set the charset to "utf-8".  If you do not want this, then you will have to use a `Buffer` instead and set the correct charset on your `content-type` header.
* If the flow sets a **Body** valid _other_ than `string` or `Buffer`, and the `content-type` header is JSON (e.g. either explicitly `application/json` or [automatically chosen](#content-type-header)), then the value with be automatically encoded with [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) with "utf-8" character encoding before sending to the client.
* If the **Body** value is ambiguous with respect to the [Status](#status), the [content-type header](#content-type-header), and the [OpenAPI response content media type object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#mediaTypeObject) defined, then this will result in an `ERROR` being logged to the console and an [`500 Internal Server Error`](#internal-server-error-500) being returned to the client.

## Response validation

TODO

### Disabling response validation

TODO

## Automatic responses

TODO

### Internal server error (500)

TODO
