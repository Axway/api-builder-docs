---
title: OpenAPI flow-trigger
linkTitle: OpenAPI flow-trigger
weight: 10
date: 2021-10-27
---

{{% alert title="Note" color="primary" %}}This component is currently alpha release and should not be considered production ready.  It can be used to try the latest version of API Builder with OpenAPI 3.x specifications and provide feedback, but should not be used in production.{{% /alert %}}

The **OpenAPI** flow-trigger enables [OpenAPI specification](https://swagger.io/resources/open-api/) support for versions [OAS 2.0](https://swagger.io/specification/v2/) and [OAS 3.0](https://swagger.io/specification/) in API Builder. This plugin enables API Builder to support [API First](https://blog.axway.com/amplify-products/api-management/api-first-design) design methodology, where the microservice's API interface can be designed by experienced API designers, and then integrations implemented in API Builder using [Flows](/docs/developer_guide/flows/).

You can manually install the **OpenAPI** plugin using the following command:

```bash
npm install @axway/api-builder-plugin-ft-oas
```

## Flow-trigger details

The following sections provide details of the available **OpenAPI** flow-trigger parameters.

### Trigger Parameters

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

Installing the plugin enables new UI on the [API Doc & Test](/docs/developer_guide/console#api-doc-test-tab) page, and disables the old "legacy" Swagger 2.0 implementation that is currently built into API Builder runtime. We are trying to maintain a similar experience. To get started, you can import your OpenAPI specification using a new button, **+OpenAPI** on the [API Doc & Test](/docs/developer_guide/console#api-doc-test-tab) page.

## Roadmap

* \[X] Support import and validation of 3.0 specifications
* \[X] Download OAS specification
* \[X] Bind flows to OAS methods
* \[X] Invoke flows with limited support (may not work with all OAS features or parameters)
* \[X] HTTP request parameter and JSON schema validation
* \[ ] Support import and validation of 2.0 specifications
* \[ ] Support import and validation of 3.1 specifications
* \[ ] Updating the API-first specification
* \[ ] Improve UX to assist in flow creation
* \[ ] Improve UX to prevent misconfiguration
* \[ ] Improve UX to improve API First experience
