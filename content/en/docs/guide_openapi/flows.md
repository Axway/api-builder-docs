---
title: Flows
weight: 50
date: 2022-03-01
description: This chapter describes how to use flows with OpenAPI to receive the HTTP inputs and create an effective HTTP response.
---

## Flow-trigger

The **OpenAPI** flow-trigger represents the binding from the OpenAPI operation to the flow. It is responsible for gathering the [flow inputs](#flow-inputs) and invoking the flow. The name of the flow-trigger is the same name as the OpenAPI [`operationId`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#fixed-fields-8), or if not provided, a unique `operationId` will be generated. It is recommended that you use `operationId` (for more information see [Managing OpenAPI documents](/docs/guide_openapi/writing_apidocs#use-operationid)).

### Flow-trigger options

#### Method

This is the OpenAPI [`operationId`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#fixed-fields-8), that represents the binding between the OpenAPI operation and the flow. Changing the **Method** will completely change the [flow inputs](#flow-inputs), [flow outputs](#flow-outputs), and cause the flow to fail when executed.

#### Flatten parameters

When this option is enabled to `"true"`, all parameters will be accessible from `$.request.params`, as well as the normal ones from [flow input](#flow-inputs). This can make the flow less susceptible to changes in the OpenAPI operation. For example, if a query parameter `$.request.query.limit` is moved to a header, then the selector will change to `$.request.headers.limit`, and can break your flow. With this option enabled, it can be accessed `$.request.params.limit` regardless of where the parameter is moved. However, parameters are unique by their defined [OpenAPI parameter](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject) `name` and `in` properties, so if the names clash, then they can be overwritten.

#### Parse date parameters

When this option is enabled to `"true"`, all [OpenAPI parameter](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject) that are dates (with format `date` or `date-time`), will be converted to [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

#### Request validation

This option controls what happens when a request fails to validate. When the option is `"warn"`, a warning message will be logged to the console, but processing will continue. If the value is `"error"` (the default), then an error will be sent to the client. Required body and parameters are always enforced.

#### Lower-case all headers

When this option is enabled to `"true"`, all OpenAPI parameters will be written to `$.request.headers` in lower-case, regardless of the case used in the OpenAPI specification. HTTP headers are case-insensitive, but OpenAPI parameter names are case-sensitive. This feature ensures that the application will treat all HTTP headers as lower-case, including the ones specified as OpenAPI parameters.

#### Response validation

This option controls what happens when a response fails to validate against the OpenAPI specification. When the option is `"disabled"`, no validation will occur. When the option is `"warn"`, warning messages will be logged to the console, but processing will continue. If the value is `"error"` (the default), then an error will be sent to the client. Required body and parameters are always enforced.

## Flow inputs

The chapter on [request processing](/docs/guide_openapi/request_handling) details how the [**OpenAPI** flow-trigger](#flow-trigger) processes the raw HTTP request and turns it into flow inputs. This chapter details how to use those flow inputs in the [flow](/docs/developer_guide/flows).

When the HTTP request is processed, and its parameters, and body are decoded as per the [OpenAPI operation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#operationObject), then their values are delivered to the flow in the following selectors.

| Selector | See also | Description |
| -------- | --- | ----------- |
| $.request.body | [Request body](/docs/guide_openapi/request_handling#request-body) | The processed [OpenAPI `requestBody`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#requestBodyObject) body. |
| $.request.files | [Multipart files](/docs/guide_openapi/request_handling#multipart-files) | Any uploaded `multipart/form-data` file(s) |
| $.request.cookies | [Request cookie parameters](/docs/guide_openapi/request_handling#request-cookie-parameters) | The processed, case-sensitive, [OpenAPI `cookie` parameter(s)](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject), if provided. |
| $.request.headers | [Request header parameters](/docs/guide_openapi/request_handling#request-header-parameters) | The processed, case-sensitive, [OpenAPI `header` parameter(s)](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject), if provided. |
| $.request.query | [Request query parameters](/docs/guide_openapi/request_handling#request-query-parameters) | The processed, case-sensitive, [OpenAPI `query` parameter(s)](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject), if provided. |
| $.request.path | [Request path parameters](/docs/guide_openapi/request_handling#request-path-parameters) | The processed, case-sensitive, [OpenAPI `path` parameter(s)](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject), if provided. |

The flow inputs can be used in the [flow](/docs/developer_guide/flows) to write powerful integrations with existing backend services, such as [databases](/docs/developer_guide/connectors), [external REST services](/docs/developer_guide/flows/flow_nodes/rest_flow_node), [Kafka](/docs/developer_guide/flows/flow_triggers/kafka_consumer_flow_trigger), or even integrate with custom JavaScript components using our [SDK](/docs/developer_guide/sdk).

When done, it is necessary to set appropriate [flow output(s)](#flow-outputs).

## Flow outputs

The chapter on [response handling](/docs/guide_openapi/response_handling) details how {{% variables/apibuilder_prod_name %}} processes the outputs from the [flow](/docs/developer_guide/flows) before sending them on to the client. This chapter details how to correctly set those values using the [**HTTP response** flow-node](/docs/developer_guide/flows/flow_nodes/http_response_flow_node).

![HTTP response flow-node](/Images/flow_node_http_response.png)

Any HTTP response must consist of a valid HTTP status code, optional HTTP header(s), and an optional body.

### Status

The **Status** must be a valid [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status), and match one of the defined [OpenAPI responses object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#responses-object).

### Headers

The **Headers** is used to set custom HTTP headers that will be returned to the client. It is an Object of key/properties, where all the values are strings. With the exception of `content-type`, all headers must match those defined by the [OpenAPI response object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#responseObject), and any required headers must be provided. Any header returned that is not documented in the OpenAPI specification will result in an error.

#### Content-Type header

The `content-type` can be set to explicitly pick a defined [OpenAPI media type](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#mediaTypeObject). However, it can be picked automatically. See [response handling](/docs/guide_openapi/response_handling#content-type-header) for more information.

### Body

The **Body** is the value that will be returned to the client that initiated the request. There are rules as to how the body should be encoded that depends on the [content-type header](#content-type-header). See [response handling](/docs/guide_openapi/response_handling#body) for more information.
