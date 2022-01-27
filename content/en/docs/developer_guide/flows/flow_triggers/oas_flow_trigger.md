---
title: OpenAPI flow-trigger
linkTitle: OpenAPI flow-trigger
weight: 10
date: 2021-10-27
---

{{% alert title="Note" color="primary" %}}This component is currently alpha release and should not be considered production ready. It can be used to try the latest version of {{% variables/apibuilder_prod_name %}} with OpenAPI specifications and provide feedback, but should not be used in production.{{% /alert %}}

The **OpenAPI** flow-trigger enables [OpenAPI specification](https://swagger.io/resources/open-api/) support for versions [OpenAPI 2.0](https://swagger.io/specification/v2/) and [OpenAPI 3.0](https://swagger.io/specification/) in {{% variables/apibuilder_prod_name %}}. This plugin enables {{% variables/apibuilder_prod_name %}} to support [API First](https://blog.axway.com/amplify-products/api-management/api-first-design) design methodology, where the microservice's API interface can be designed by experienced API designers, and then integrations implemented in {{% variables/apibuilder_prod_name %}} using [Flows](/docs/developer_guide/flows/).

You can manually install the **OpenAPI** plugin using the following command:

```bash
npm install @axway/api-builder-plugin-ft-oas
```

## Flow-trigger details

The following sections provide details of the available **OpenAPI** flow-trigger parameters.

### Trigger parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| API method | String | The OAS [operationId](https://swagger.io/specification/#operationObject) of the method to bind. | Selector, String | Yes |

## How to use OpenAPI flow-trigger

Currently, the plugin is in alpha, so it should only be used in new applications.  You must first manually remove the existing Greet flow and endpoint.

```bash
rm -rf endpoints/*
rm -rf flows/*
```

After, you can successfully start your application.

```bash
npm start
```

Installing the plugin enables new UI on the [API Doc & Test](/docs/developer_guide/console#api-doc-test-tab) page, and disables the old "legacy" Swagger 2.0 Endpoints that is currently built into {{% variables/apibuilder_prod_name %}}. We are trying to maintain a similar experience. To get started, you can import your OpenAPI specification using a new button, **+OpenAPI** on the [API Doc & Test](/docs/developer_guide/console#api-doc-test-tab) page.

## Configuration

### API prefix

Your service is configured with an [apiPrefix](/docs/developer_guide/project/configuration/project_configuration#apiprefix) which {{% variables/apibuilder_prod_name %}} uses to apply authentication to all paths under this prefix. It defaults to `/api`, but it can be configured. All paths defined in your imported OpenAPI document will be bound to this prefix. For example, `/service/user` will be bound as `/api/service/user`.

If all your designed paths begin with a common prefix, i.e. `/service`, then by changing your `apiPrefix` in configuration to match this prefix, {{% variables/apibuilder_prod_name %}} will not apply the prefix twice, and allow `/service/user` to be bound as-is.

### Overrides

There is a list of optional [`apidoc.overrides`](/docs/developer_guide/project/configuration/project_configuration#apidoc) that you can specify as part of your service configuration that would allow you to tweak how the API specification is generated. This allows you to tweak specific OpenAPI values that are useful when the service is not consumed directly, such as when the services is exposed through a proxy.

## Accessing the API specification

The OpenAPI specification is bound to the following paths and is exposed by the service for download:
* `/apidoc/swagger.json` (for legacy purposes)
* `/apidoc/swagger.yaml` (for legacy purposes)
* `/apidoc/openapi.json`
* `/apidoc/openapi.yaml`

On startup, administrators will see only one path in the log. For OpenAPI 2.0, it is `/apidoc/swagger.json`, otherwise, it is `/apidoc/openapi.json`. Some parts of the API specification can be tweaked from the [configuration](#configuration). The "/apidoc" prefix is configured by changing the [`apidoc.prefix`](/docs/developer_guide/project/configuration/project_configuration#apidoc) in the configuration.

<!-- TODO:
## Request handling
Describe what we do on an inbound request before hitting the flow. Write about what validation, massaging, coercing, response codes to expect and when.
-->

## Response handling

{{% variables/apibuilder_prod_name %}} and the OpenAPI flow-trigger do additional processing after a flow completes, before sending the response. This section describes the areas that are processed.

In your flow, you can use the [HTTP Respose flow-node](/docs/developer_guide/flows/flow_nodes/http_response_flow_node) to set the HTTP response **Status**, **Body**, and **Headers**, and these dictate the response you wish to send to the client.  However, {{% variables/apibuilder_prod_name %}} and the OpenAPI flow-trigger do additional processing after a flow completes, before sending the actual response. The following sections describe how the response might be effected.

### Response status

The response **Status** that you set in the flow should be a valid [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status), and should match one of the documented HTTP response(s) from your OpenAPI specification. This **Status** code dictates how the OpenAPI flow-trigger handles the response body.

### Response body

The combined response **Body** _and_ **Status** code that you set in the flow should match one of the documented HTTP response(s) from your OpenAPI specification (or "default" if it is defined).

If the **Body** is a "raw" `string` or `Buffer`, then no additional processing will be done, and the client will receive the body as-is.

If the **Body** is a type _other_ than `string` or `Buffer` (e.g. an `Object` or `Array`), then OpenAPI flow-trigger may automatically JSON encode response if there is exactly one response media type that is JSON (e.g. "application/json"). Otherwise, the response content encoding is ambiguous, and results in a `500 Internal Server Error`. In this case, you should ensure you encode the **Body** within the flow and set an appropriate `content-type` header in **Headers** that matches the encoding for the **Body**.

{{% alert title="Note" color="primary" %}}
Currently, the response body is not validated against the JSON schema, so it is possible to send _invalid_ responses. This will be improved in a future release.
{{% /alert %}}

### Response headers

The response **Headers** that you set in the flow are optional.  All response headers set by the [HTTP Respose flow-node](/docs/developer_guide/flows/flow_nodes/http_response_flow_node) will be sent in the response. {{% variables/apibuilder_prod_name %}} may set additional HTTP response headers for `server`, `content-md5` and `etag`, and they can be enabled or disabled in the [configuration](/docs/developer_guide/project/configuration/project_configuration#http).

#### Content-type header

{{% variables/apibuilder_prod_name %}} will automatically handle response content encoding and the HTTP response `content-type` header, if the type of response **Body** set from the flow is unambiguous with respect to the `responseBody` media type(s) defined.

* If you explicitly set a `content-type` header in **Headers**, it will be used.
* If there is only one media type, then that will be used.
* If exactly one of the documented response media type(s) are a JSON (e.g. "application/json"), then that will be used.

All other cases will result in a 500 error since the expected value is ambiguous, and you should ensure that an appropriate `content-type` header is set from your flow.

Also note that if the response **Body** is a `string`, then [Express.js](https://expressjs.com) will automatically explicitly set the charset to "utf-8".  If you do not want this, then you will have to use a `Buffer` instead and set the correct charset on your `content-type` header.

## Unsupported features

* OAS 3 parameter `in.cookie` with [style](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#style-examples) `form` and explode `true`
* OAS 3 parameter [content](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) is currently not supported, and `schema` is required.
* OAS 3 [link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#link-object).
* OAS 3 parameter [media type encoding](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#encodingObject).
* OAS 3 [discriminator](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#discriminatorObject).
* OAS 2 [collectionFormat](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#fixed-fields-7) for `tsv` (tab separated value).
* OAS 2 [collectionFormat](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#fixed-fields-7) array of items more than one level deep (i.e. does not support array of array items).
* OAS 2 [collectionFormat](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#fixed-fields-7) `pipes` and `ssv` are not supported in `cookie`, `formData`, `header`, or `path` (only supported in `query`).
* `multipart/form-data` with arrays of binary data is not supported, e.g. `curl -F file[]=a -F file[]=b`.
* OAS 3 [byte format](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#data-types) is supported, but it will not automatically decode the base64 data.
* OAS 3 [base64 format](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#considerations-for-file-uploads) is not supported because it is not really a valid format.
* OAS 3 cookie parameters for objects and arrays, `style="form", explode=true` [style](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#style-examples) is not supported.
* OAS body content-types `application/json`, `application/*+json`, `application/x-www-form-urlencoded`, or `multipart/form-data` will be decoded, "XML" types such as `application/xml` will be handled as strings but not decoded, all others will be handled as `Buffer`.
* In API Doc & Test, APIs with `multipart/form-data` or `application/x-www-form-urlencoded` bodies will fail to render examples and execute correctly if the body schema is missing an implicit `type: object`.

## Roadmap

* \[X] Support import and validation of 3.0 specifications
* \[X] Download OpenAPI specification
* \[X] Bind flows to OpenAPI methods
* \[X] Invoke flows with limited support (may not work with all OpenAPI features or parameters)
* \[X] HTTP request parameter and JSON schema validation
* \[X] Support import and validation of 2.0 specifications
* \[ ] Support import and validation of 3.1 specifications
* \[ ] Support updating imported specifications
* \[ ] Updating the API-first specification
* \[ ] Improve UX to assist in flow creation
* \[ ] Improve UX to prevent misconfiguration
* \[ ] Improve UX to improve API First experience
* \[ ] Add streaming capability
