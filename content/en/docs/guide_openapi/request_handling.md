---
title: Request handling
weight: 60
date: 2022-03-01
description: Technical details about how HTTP requests are handled by the product.
---

## HTTP Requests

{{% variables/apibuilder_prod_name %}} will pre-process HTTP requests. Any errors processing, decoding, or validating the request will result in an [automatic response](#automatic-responses). Flows will only ever be executed with valid inputs. If the HTTP request matches a bound OpenAPI operation, then all of the defined OpenAPI operation inputs are gathered into [flow inputs](#flow-inputs) and handled as described in the following sections.

## Flow inputs

When the HTTP request is processed, and its parameters, and body are decoded as per the [OpenAPI operation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#operationObject), then their values are delivered to the flow. The following sections detail how the flow inputs are achieved.

### Request parameters

[OpenAPI parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject) are processed as described in the following sections. [Parameter encoding styles](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#fixed-fields-10) are supported.

If any parameter fails to parse, or if the parameters fail to validate against their JSON schema, it will result in a [`400 Bad Request`](#bad-request-errors-400) error response being sent to the client. The flow will not be executed.

#### Request cookie parameters

If the [OpenAPI operation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#operationObject) defines cookie parameter(s), they will be decoded with respect to the defined [OpenAPI parameter](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameter-object) and can be accessed from within the flow using their case-sensitive parameter names from `$.request.cookies`. For example, `$.request.cookies.session`.

#### Request header parameters

If the [OpenAPI operation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#operationObject) defines header parameter(s), they will be decoded with respect to the defined [OpenAPI parameter](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameter-object) and can be accessed from within the flow using their case-sensitive parameter names from `$.request.headers`. For example, `$.request.headers.limit`.

All remaining non-parameter HTTP request headers are lower-cased and will be passed into the flow, and are accessible from `$.request.headers`. For example, `$.request.headers['content-type']`.

#### Request query parameters

If the [OpenAPI operation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#operationObject) defines query parameter(s), they will be decoded according to the [OpenAPI specification](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameter-object) and can be accessed from within the flow using their case-sensitive parameter names from `$.request.query`. For example, `$.request.query.limit`.

#### Request path parameters

If the [OpenAPI operation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#operationObject) defines path parameter(s), they will be decoded according to the [OpenAPI specification](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameter-object) and can be accessed from within the flow using their case-sensitive parameter names from `$.request.path`. For example, `$.request.query.path`.

### Request body

If the client sends a HTTP request body, it will be parsed and validated according to the [OpenAPI request body object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#requestBodyObject). If the OpenAPI specification does not define a body, and the client does not send one, then the body will be `undefined`. Otherwise, the body is parsed and validated and delivered to the flow as `$.request.body`.

The OpenAPI supports decoding and validating the body for the following `content-types`:

* `application/x-www-form-urlencoded`
* `multipart/form-data`
* `application/json`
* `application/*+json`
* `application/xml`¹
* `application/*+xml`¹
* `application/xml-dtd`¹
* `application/xml-external-parsed-entity`¹
* `image/svg+xml`¹
* `model/x3d+xml`¹

1. XML types will be handled as strings and are not decoded. However, the XML can be processed within the flow with the [**XSLT** flow-node](/docs/developer_guide/flows/flow_nodes/xslt_flow_node).

All other unknown `content-type` will be handled as [`Buffer`](https://nodejs.org/api/buffer.html).

The following sections provide examples of how to achieve common HTTP patterns with [OpenAPI request body object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#requestBodyObject).

#### JSON body

If the [OpenAPI operation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#operationObject) defines content with `application/json`, then it will be automatically decoded and verified against the supplied JSON schema, and will be accessible from `$.request.body`.

For example, this defines the body is JSON, and the decoded `User` object is the value of `$.request.body`:

```yaml
content:
  'application/json':
    schema:
      $ref: '#/components/schemas/User'
```

Any failure to validate the request body will result in a [`400 Bad Request`](#bad-request-errors-400) error and the flow will not be executed.

#### Multipart and form body

If the [OpenAPI operation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#operationObject) defines content with `x-www-form-urlencoded` or `multipart/form-data`, then the client request body will be automatically decoded and verified against the supplied JSON schema, and non-file fields (see [multipart files](#multipart-files)) will be accessible from `$.request.body`.

For example, this form field `id` can be accessed from `$.request.body.id`:

```yaml
requestBody:
  content:
    application/x-www-form-urlencoded:
      schema:
        type: object
        properties:
          id:
            type: string
            format: uuid
```

Any failure to validate the request body will result in a [`400 Bad Request`](#bad-request-errors-400) error and the flow will not be executed.

#### Multipart files

Multipart files are handled differently than regular form fields. As part of the HTTP request pre-processing, files are uploaded to the OS temp directory (e.g. `/tmp`), and can be accessed later from the flow when needed, rather than keeping the value in memory. The field values are the actual file location on disk.

For example, this form field `image` can be accessed from `$.request.body.image`:

```yaml
requestBody:
  content:
    multipart/form-data:
      schema:
        properties:
          image:
      type: string
      format: binary
```

The `$.request.body.image` is an object that fully describes the uploaded file:

```js
image: {
  file: '/tmp/abc-123-unique-id/image.png',
  filename: 'image.png',
  encoding: '7bit',
  mimetype: 'image/png'
}
```

{{% alert title="Note" color="primary" %}}
{{% variables/apibuilder_prod_name %}} does not support arrays of files. They have to be defined as different keys.
{{% /alert %}}

#### Raw text body

If the [OpenAPI operation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#operationObject) defines content with `text/plain`, then it will be verified against any supplied JSON schema, and will be accessible from `$.request.body`.

```yaml
requestBody:
  content:
    text/plain:
      schema:
      type: string
    maxLength: 1024
```

#### Raw body

If the [OpenAPI operation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#operationObject) defines only an `application/octet-stream`, or defines media-types that is not processable (i.e. that are _not_ `application/*json`, `x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`), then the body will be accessible from `$.request.body` as a [`Buffer`](https://nodejs.org/api/buffer.html), and will _not_ be validated against the JSON schema.

## Request body validation

Before invoking the flow, {{% variables/apibuilder_prod_name %}} will validate the request body with respect to the OpenAPI operation. For performance, JSON schema validation occurs "just in time". This means that the first time the request is validated for this particular operation, the JSON schema will be compiled and cached for future use. Then, the request body will be validated against the compiled JSON schema. This can lead to production errors if the JSON schema is invalid (e.g invalid references) and if there is inadequate testing.

{{% alert title="Note" color="primary" %}}
It is a good idea to develop a robust set of tests for your application before going to production. You can use the supplied mocha tests, or use [postman for regression testing](/docs/how_to/use_postman_tests_as_api_builder_regression_tests).
{{% /alert %}}

Failure to validate the request's body against the OpenAPI operation will result in a [`400 Bad Request`](#bad-request-errors-400) error response being sent to the client. The flow will not be executed.

### Disabling request validation

There is possibility to disable the request validation via [**Request validation**](/docs/guide_openapi/flows#request-validation) option.

## Automatic responses

If {{% variables/apibuilder_prod_name %}} encounters errors with the client's HTTP request, it will send automatic errors without invoking the flow. The errors are detailed in the following sections. Note that your OpenAPI document should include these errors in its specification for correctness. A [list of errors](/docs/guide_openapi/writing_apidocs#default-error-codes-and-responses) has been provided for convenience.

* Any request for a bound OpenAPI operation that fails to parse, or fails to validate with respect to the OpenAPI specification, will result in an automatic [`400 Bad Request`](#bad-request-errors-400) error response being sent to the client. The flow will not be executed.
* Any request failing authentication will result in an an automatic [`401 Unauthorized`](#unauthorized-401) error response being sent to the client. The flow will not be executed.
* Any request for an unimplemented method will result in an automatic [`404 Not Found`](#not-found-404) error response being sent to the client.

### Bad request errors (400)

The client sent an invalid request. The client needs to examine the error(s) and their request to determine how to correct the issue.

```json
{
  "success": false,
  "code": 400,
  "request-id": "a-unique-identifier",
  "message": "A summary message",
  "errors": [
    "Detailed error"
  ]
}
```

### Unauthorized (401)

The client failed to send valid credentials, or the credentials were invalid.

```json
{
  "id":"com.appcelerator.api.unauthorized",
  "success": false,
  "message": "Unauthorized"
}
```

### Not found (404)

The client tried to access a resource that does not exist. This may be because the OpenAPI operation is not yet bound, or it may be that the client provided an incorrect HTTP method or path.

```json
{
  "success": false,
  "code": 404,
  "request-id": "a-unique-identifier",
  "message": "Not found"
}
```
