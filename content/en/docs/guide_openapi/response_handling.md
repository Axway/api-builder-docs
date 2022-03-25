---
title: Response handling
weight: 70
date: 2022-03-01
description: Technical details about how HTTP responses are handled by the product.
---

## HTTP response

{{% variables/apibuilder_prod_name %}} does additional processing after a flow completes, and before sending the response to the client. The [**HTTP response** flow-node](/docs/developer_guide/flows/flow_nodes/http_response_flow_node) is used to set the HTTP response from the flow. This chapter describes how the response is handled.

Flows should return a response that is suitable for the expected [OpenAPI response](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#responseObject). A HTTP response is set using the [**HTTP response** flow-node](/docs/developer_guide/flows/flow_nodes/http_response_flow_node).

![**HTTP response** flow-node](/Images/flow_node_http_response.png)

All possible flow execution paths must have a suitable [**HTTP response** flow-node](/docs/developer_guide/flows/flow_nodes/http_response_flow_node). Failure to use it will result in an `ERROR` being logged to the console and an [`500 Internal Server Error`](#internal-server-error-500) being returned to the client.

For more information on how to use the **HTTP response** flow-node with the **OpenAPI** flow-trigger, see [flow outputs](/docs/guide_openapi/flows#flow-outputs).

### Status

The **Status** is required and must be a valid [HTTP response status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status), and match a defined [OpenAPI response](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#responses-object).

```yaml
responses:
  '200':
    description: Success
```

Returning an invalid **Status** code, or one not documented for the OpenAPI operation, will result in an `ERROR` being logged to the console and an [`500 Internal Server Error`](#internal-server-error-500) being returned to the client.

Note that if `default` is defined in [OpenAPI responses](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#responses-object), then any status code is valid..

### Headers

The response **Headers** that you set in the flow are optional should reflect the expected header response from your [OpenAPI response](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#responseObject).

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

The **Headers** is an Object of key / properties where all the values are all strings. The flow must provide header(s) that match those defined by the [OpenAPI response](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#responseObject), with the exception of the `content-type` header.

The `content-type` header is [treated differently](#content-type-header). It cannot be specified as an OpenAPI response header. Instead, it is specified as an [OpenAPI media type object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#mediaTypeObject).

{{% alert title="Note" color="primary" %}}
{{% variables/apibuilder_prod_name %}} sets `request-id` and other headers for security purposes. In addition, it may set additional HTTP response headers for `server`, `content-md5` and `etag`, and they can be enabled or disabled in the [configuration](/docs/developer_guide/project/configuration/project_configuration#http).
{{% /alert %}}

Returning an undocumented header, or failing to return a required header in **Headers** for the documented OpenAPI operation, will result in an `ERROR` being logged to the console and an [`500 Internal Server Error`](#internal-server-error-500) being returned to the client.

#### Content-type header

The `content-type` header describes the response **Body**, if one is provided. You may not have to specify a `content-type` header in the HTTP response **Headers** as {{% variables/apibuilder_prod_name %}} can automatically pick an appropriate HTTP response `content-type` header, if the type of response **Body** set from the flow is matches the defined [OpenAPI response](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#responseObject).

If the type of response **Body** set from the flow is ambiguous with respect to the defined [OpenAPI response](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#responseObject), you will have to specify a `content-type` header in the HTTP response **Headers**.

* If your flow explicitly sets a `content-type` header in **Headers**, it will be used.
* If your flow does not set a response **Body** then a `content-type` header will not be set.
* If there is only one [OpenAPI response content media type](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#mediaTypeObject), then that will be used as the `content-type` header.
* If exactly one of the documented [OpenAPI response content media types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#mediaTypeObject) is JSON (e.g. `application/json`), and the flow sets a valid **Body** _other_ than `string` or `Buffer`, then that media type will be used as the `content-type` header. [The response **Body** will also be encoded as JSON](#body).

All other cases will result in a [`500 Internal Server Error`](#internal-server-error-500) since the expected value is ambiguous, and you should ensure that an appropriate `content-type` header is set from your flow.

{{% alert title="Note" color="primary" %}}
Currently wildcard media-types and parameters such as `charset` are not supported.
{{% /alert %}}

### Body

If a response **Body** is expected from the OpenAPI operation [response](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#responses-object) (i.e. a response [content](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#fixed-fields-15) is defined), then the flow must set a response **Body**.

If the response **Body** value from the flow does not match any defined [Status](#status), [content-type header](#content-type-header), and the [OpenAPI response content media type](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#mediaTypeObject), then this will result in an `ERROR` being logged to the console and an [`500 Internal Server Error`](#internal-server-error-500) being returned to the client.

If the response **Body** is required and not provided, then this will result in an `ERROR` being logged to the console and an [`500 Internal Server Error`](#internal-server-error-500) being returned to the client.

{{% variables/apibuilder_prod_name %}} will automatically handle response body content encoding, if the type of response **Body** set from the flow matches the defined [OpenAPI response content media type](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#mediaTypeObject).

* If the flow explicitly sets a `Buffer`, then the content will be sent as-is.
* If the flow is a `string`, then that will be sent without any additional encoding. However, [Express.js](https://expressjs.com) will automatically explicitly set the charset to "utf-8". If you do not want this, then you will have to use a `Buffer` instead and set the correct charset on your `content-type` header.
* If the flow sets a response **Body** valid _other_ than `string` or `Buffer`, and the `content-type` header is JSON (e.g. either explicitly `application/json` or [automatically chosen](#content-type-header)), then the value with be automatically encoded with [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) with "utf-8" character encoding before sending to the client.

### Required response body

* If the **Body** is required and not provided, then this will result in an `ERROR` being logged to the console and an [`500 Internal Server Error`](#internal-server-error-500) being returned to the client.
* If the **Body** is provided and not expected, then this will result in an `ERROR` being logged to the console and an [`500 Internal Server Error`](#internal-server-error-500) being returned to the client.

In OpenAPI 3.0, a response body is required when at least one [OpenAPI response content media type](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#mediaTypeObject) is defined.

```yaml
description: The user object
content:
  application/json:
    schema:
      $ref: '#/components/schemas/User'
```

In OpenAPI 3.0, if the response `content` is not defined, or if it is an empty Object, then a response body must not be returned.

```yaml
description: An empty response
content: {}
```

In OpenAPI 2.0, a required response body is one that defines an [OpenAPI response `schema`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#responseObject). Otherwise, a response body must not be returned.

```yaml
description: The user object
schema:
  $ref: '#/components/schemas/User'
```

## Response validation

If the response `content-type` is JSON, the response body will be validated as JSON. If a JSON schema is documented for the [OpenAPI response content media type](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#mediaTypeObject), the body will be validated against it. If the response `content-type` is not JSON, then it will not be validated against the defined `schema`.

### Disabling response validation

It is possible to disable response validation against the OpenAPI specification using the [**Response validation**](/docs/guide_openapi/flows#response-validation) option.

## Automatic responses

If {{% variables/apibuilder_prod_name %}} encounters any error with the the flow's [HTTP response](#http-response), it will result in an `ERROR` being logged to the console and an [`500 Internal Server Error`](#internal-server-error-500) being returned to the client. The error is detailed in the following section. Note that your OpenAPI document should include this error in its specification for correctness. A [list of errors](/docs/guide_openapi/writing_apidocs#default-error-codes-and-responses) has been provided for convenience.

### Internal server error (500)

```json
{
  "success": false,
  "code": 500,
  "request-id": "a-unique-uuid",
  "message": "Internal Server Error"
}
```
