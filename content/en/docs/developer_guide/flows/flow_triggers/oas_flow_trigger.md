---
title: OpenAPI flow-trigger
linkTitle: OpenAPI flow-trigger
weight: 10
date: 2021-10-27
---

The **OpenAPI** flow-trigger enables [OpenAPI specification](https://swagger.io/resources/open-api/) support for versions [OpenAPI 2.0](https://swagger.io/specification/v2/) and [OpenAPI 3.0](https://swagger.io/specification/) in {{% variables/apibuilder_prod_name %}}. This plugin enables {{% variables/apibuilder_prod_name %}} to support [API-first](https://blog.axway.com/amplify-products/api-management/api-first-design) design methodology, where the microservice's API interface can be designed by experienced API designers, and then integrations implemented in {{% variables/apibuilder_prod_name %}} using [Flows](/docs/developer_guide/flows). This feature replaces the existing Swagger [Endpoints](/docs/developer_guide/flows/manage_endpoints) feature, which will soon be deprecated.

You can manually install the **OpenAPI** flow-trigger plugin using the following command:

```bash
npm install @axway/api-builder-plugin-ft-oas
```

Installing the plugin enables new UI on the [API Doc & Test](/docs/developer_guide/console#api-doc-test-tab) page, and disables the old "legacy" Swagger 2.0 Endpoints that is currently built into {{% variables/apibuilder_prod_name %}}. The intention is to maintain a similar experience. To get started, you can import your OpenAPI specification using a new button, **+OpenAPI** on the [API Doc & Test](/docs/developer_guide/console#api-doc-test-tab) page.

## How to use the OpenAPI flow-trigger

To get started and learn more on how the flow-trigger plugin enables the use of Api-first in {{% variables/apibuilder_prod_name %}} see our [Quick start guide](/docs/guide_openapi/quick_start).

If you have an existing service that uses the old legacy endpoints you can upgrade your service with our guide [Upgrade endpoints](/docs/updates/upgrade_endpoints).

## Flow-trigger details

The following sections provide details of the available **OpenAPI** flow-trigger parameters.

### Trigger parameters

| Parameter | Type | Description | Configuration selection | Default | Required |
| --- | --- | --- | --- | --- | --- |
| API method | String | The OpenAPI [operationId](https://swagger.io/specification/#operationObject) of the method to bind. | Selector, String | - | Yes |
| Flatten Parameters | String | When this option is enabled to `"true"`, all parameters will be accessible from `$.request.params`, as well as the normal ones from [flow input](#flow-inputs). This can make the flow less susceptible to changes in the OpenAPI operation. For example, if a query parameter `$.request.query.limit` is moved to a header, then the selector will change to `$.request.headers.limit`, and can break your flow. With this option enabled, it can be accessed `$.request.params.limit` regardless of where the parameter is moved. However, parameters are unique by their defined [OpenAPI parameter](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterObject) `name` and `in` properties, so if the names clash, then they can be overwritten. | Selector, String | false | No |
| Lower-case all headers | String | When this option is enabled to `"true"`, all OpenAPI parameters will be written to `$.request.headers` in lower-case, regardless of the case used in the OpenAPI specification. HTTP headers are case-insensitive, but OpenAPI parameter names are case-sensitive. This feature ensures that the application will treat all HTTP headers as lower-case, including the ones specified as OpenAPI parameters. | Selector, String | false | No |
| Parse date parameters | String | When this option is enabled to `"true"`, all [OpenAPI parameter](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterObject) that are dates (with format `date` or `date-time`), will be converted to [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). | Selector, String | false | No |
| Request validation | String | This option controls what happens when a request fails to validate. When the option is `"warn"`, a warning message will be logged to the console, but processing will continue. If the value is `"error"` (the default), then an error will be sent to the client. Required body and parameters are always enforced. | Selector, String | error | No |
| Response validation | String | This option controls what happens when a response fails to validate against the OpenAPI specification. When the option is `"disabled"`, no validation will occur. When the option is `"warn"`, warning messages will be logged to the console, but processing will continue. If the value is `"error"` (the default), then an error will be sent to the client. Required body and parameters are always enforced. | Selector, String | error | No |
