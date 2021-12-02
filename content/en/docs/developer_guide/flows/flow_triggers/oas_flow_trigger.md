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

If all your desgined paths begin with a common prefix, i.e. `/service`, then by changing your `apiPrefix` in configuration to match this prefix, {{% variables/apibuilder_prod_name %}} will not apply the prefix twice, and allow `/service/user` to be bound as-is.

## API specification

The OpenAPI specification is bound to `/apidoc/swagger.json`, `/apidoc/swagger.yaml` (both for legacy purposes), as well as `/apidoc/openapi.json` and `/apidoc/openapi.yaml`. On startup, users will see only one path in the log. For OpenAPI 2.0, it is `/apidoc/swagger.json`, otherwise, it is `/apidoc/openapi.json`.
The prefix (`/apidoc`) is configured by changing [`apidoc.prefix` in configuration](/docs/developer_guide/project/configuration/project_configuration#apidoc). 

## Currently unsupported features

* OAS 3 parameter `in.cookie` with [style](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#style-examples) `form` and explode `true`
* OAS 3 parameter [content](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) is currently not supported, and `schema` is required.
* OAS 3 [link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#link-object).
* OAS 3 parameter [media type encoding](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#encodingObject).
* OAS 3 [discriminator](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#discriminatorObject).
* OAS 2 [collectionFormat](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#fixed-fields-7) for `tsv` (tab separated value).
* OAS 2 [collectionFormat](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#fixed-fields-7) array of items more than one level deep (i.e. does not support array of array items).
* OAS 2 [collectionFormat](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#fixed-fields-7) `pipes` and `ssv` are not supported in `cookie`, `formData`, `header`, or `path` (only supported in `query`).

## Roadmap

* \[X] Support import and validation of 3.0 specifications
* \[X] Download OAS specification
* \[X] Bind flows to OAS methods
* \[X] Invoke flows with limited support (may not work with all OAS features or parameters)
* \[X] HTTP request parameter and JSON schema validation
* \[X] Support import and validation of 2.0 specifications
* \[ ] Support import and validation of 3.1 specifications
* \[ ] Updating the API-first specification
* \[ ] Improve UX to assist in flow creation
* \[ ] Improve UX to prevent misconfiguration
* \[ ] Improve UX to improve API First experience
* \[ ] Add streaming capability
