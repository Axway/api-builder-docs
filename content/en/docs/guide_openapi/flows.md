---
title: Flows
weight: 50
date: 2022-03-01
description: Learn how to use flows with **OpenAPI** flow-trigger.
---

## Flow inputs

The [Request processing](/docs/guide_openapi/request_handling) section details how the [**OpenAPI** flow-trigger](#flow-trigger) processes the raw HTTP request and turns it into flow inputs. This section details how to use those flow inputs in the [flow](docs/developer_guide/flows).

When the HTTP request is processed, and its parameters, and body are decoded as per the [OpenAPI operation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#operationObject), then their values are delivered to the flow in the following selectors.

| Selector | See also | Description |
| -------- | --- | ----------- |
| $.request.body | [Request body](/docs/guide_openapi/request_handling#request-body) | The processed [OpenAPI `requestBody`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#requestBodyObject) body. |
| $.request.files | [Multipart files](/docs/guide_openapi/request_handling#multipart-files) | Any uploaded `multipart/form-data` file(s) |
| $.request.cookies | [Request cookie parameters](/docs/guide_openapi/request_handling#request-cookie-parameters) | The processed, case-sensitive, [OpenAPI `cookie` parameter(s)](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject), if provided. |
| $.request.headers | [Request header parameters](/docs/guide_openapi/request_handling#request-header-parameters) | The processed, case-sensitive, [OpenAPI `header` parameter(s)](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject), if provided. |
| $.request.query | [Request query parameters](/docs/guide_openapi/request_handling#request-query-parameters) | The processed, case-sensitive, [OpenAPI `query` parameter(s)](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject), if provided. |
| $.request.path | [Request path parameters](/docs/guide_openapi/request_handling#request-path-parameters) | The processed, case-sensitive, [OpenAPI `path` parameter(s)](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject), if provided. |

The flow inputs can be used in the [flow](docs/developer_guide/flows) to write powerful integrations with existing backend services, such as [databases](/docs/developer_guide/connectors), [external REST services](/docs/developer_guide/flows/flow_nodes/rest_flow_node), [Kafka](/docs/developer_guide/flows/flow_triggers/kafka_consumer_flow_trigger), or even integrate with custom JavaScript components using our [SDK](/docs/developer_guide/sdk).

When done, it is necessary to set appropriate [flow output(s)](#flow-outputs).

## Flow outputs

The [Response processing](/docs/guide_openapi/request_handling) section details how {{% variables/apibuilder_prod_name %}} processes the outputs from the [flow](docs/developer_guide/flows) before sending them on to the client. This section details how to correctly set those values in [**HTTP response** flow-node](/docs/developer_guide/flows/flow_nodes/http_response_flow_node).

![HTTP response flow-node](/Images/flow_node_http_response.png)

Any HTTP response must consist of a valid [HTTP response status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status), optional HTTP header(s), and an optional body.

### Status

The **Status** must be a valid HTTP status code, and match a defined [OpenAPI responses object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#responses-object).

### Headers

The **Headers** is an Object of key / properties where all the values are all strings. Any header provided must match those defined by the [OpenAPI response object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#responseObject), and any required headers must be provided. Any header returned that is not documented in the OpenAPI specification will result in an error.

The only exception is the `content-type` header. This is treated differently. It cannot be specified as an OpenAPI response header. Instead, it is specified as an [OpenAPI media type object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#mediaTypeObject).

#### Content-Type header

You do not have to specify a `content-type` header. {{% variables/apibuilder_prod_name %}} can [auto-pick](/docs/guide_openapi/response_handling#response-headers) an appropriate `content-type` header from the list of defined [OpenAPI media type object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#mediaTypeObject).

### Body

TODO

## Flow-trigger

The **OpenAPI** flow-trigger represents the binding from the OpenAPI operation to the flow. It is responsible for gathering the [flow inputs](#flow-inputs) and invoking the flow. The name of the flow-trigger is the same name as the OpenAPI [`operationId`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#fixed-fields-8), or if not provided, a unique `operationId` will be generated. It is recommended that you use `operationId` (for more information see [Managing OpenAPI documents](/docs/guide_openapi/managing_apidocs#use-operationid)).

### Flow-trigger options

#### Method

This is the OpenAPI [`operationId`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#fixed-fields-8), that represents the binding between the OpenAPI operation and the flow. Changing the **Method** will completely change the [flow inputs](#flow-inputs), [flow outputs](#flow-outputs), and cause the flow to fail when executed.

#### Flatten parameters

When this option is enabled to `"true"`, all parameters will be accessible from `$.request.params`, as well as the normal ones from [flow input](#flow-input). This can make the flow less susceptible to changes in the OpenAPI operation. For example, if a query parameter `$.request.query.limit` is moved to a header, then the selector will change to `$.request.headers.limit`, and can break your flow. With this option enabled, it can be accessed `$.request.params.limit` regardless of where the parameter is moved. However, parameters are unique by their defined [OpenAPI parameter](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject) `name` and `in` properties, so if the names clash, then they can be overwritten.

#### Parse date parameters

TODO

#### Lower-case all headers

When this option is enabled to `"true"`, all OpenAPI parameters will be written to `$.request.headers` in lower-case, regardless of the case used in the OpenAPI specification. HTTP headers are case-insensitive, but OpenAPI parameter names are case-sensitive. This feature ensures that the application will treat all HTTP headers as lower-case, including the ones specified as OpenAPI parameters.
