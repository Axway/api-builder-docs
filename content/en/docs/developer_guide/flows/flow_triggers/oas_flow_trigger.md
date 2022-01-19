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

## API prefix

Your service is configured with an [apiPrefix](/docs/developer_guide/project/configuration/project_configuration#apiprefix) which {{% variables/apibuilder_prod_name %}} uses to apply authentication to all paths under this prefix. By default this is `/api`, but can be configured.
All paths defined in your imported OpenAPI document will be bound to this prefix. For example `/service/user` will be bound as `/api/service/user`.

If all your designed paths begin with a common prefix, i.e. `/service`, then by changing your `apiPrefix` in configuration to match this prefix, {{% variables/apibuilder_prod_name %}} will not apply the prefix twice, and allow `/service/user` to be bound as-is.

## API specification

The OpenAPI specification is bound to `/apidoc/swagger.json`, `/apidoc/swagger.yaml` (both for legacy purposes), as well as `/apidoc/openapi.json` and `/apidoc/openapi.yaml`. On startup, users will see only one path in the log. For OpenAPI 2.0, it is `/apidoc/swagger.json`, otherwise, it is `/apidoc/openapi.json`.
The prefix (`/apidoc`) is configured by changing [`apidoc.prefix` in configuration](/docs/developer_guide/project/configuration/project_configuration#apidoc).

<!-- ## Request handling
Describe what we do on an inbound request before hitting the flow. Write about what validation, massaging, coercing, response codes to expect and when. -->

## Response handling

{{% variables/apibuilder_prod_name %}} and the OpenAPI flow-trigger do additional processing after a flow completes, before sending the response. This section describes the areas that are processed

## Response body
You can send a `string` or `Buffer` as the response body in a HTTP request.

When a different data type is set as the response body, we may encode it as JSON if your OpenAPI spec documents a _single_ `application/json` type response for that status code (or default if the code in use is not documented). Otherwise, the encoding is ambiguous so results in a 500 Internal Server Error. In this case, you should ensure you encode the body within the flow and set an appropriate `content-type` header for the encoding used.

### Response headers

All response headers set by the HTTP Response flow-node will be sent in the response, although there will be some cases where additional heads may be set.

{{% variables/apibuilder_prod_name %}} can automatically set `server`, `content-md5` and `etag` on every response, and they can be configured [here](/docs/developer_guide/project/configuration/project_configuration#http).

#### Content type

It's recommended to always set a `content-type` header in your flow if sending a response body, however, in the OpenAPI flow-trigger `content-type` may automatically be set based on the `HTTP Response` body, and the OpenAPI specification.

If a response body is not provided, content-type will never be automatically set. If a `content-type` header was set in the flow, a warning will be logged. This indicates a bug or misconfigured flow.

If a response body is provided, `content-type` will be set to the `produces` (OpenAPI 2) or `content` media type (OpenAPI 3) only if one media type is documented for the status code (or default if the code in use is not documented). All other cases will result in a 500 error since the expected value is ambiguous, and you should ensure that an appropriate `content-type` header is set from your flow.

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
