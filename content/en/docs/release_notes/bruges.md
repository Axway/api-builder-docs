---
title: Bruges release notes
linkTitle: Bruges
date: 2020-11-20
description: 20 November 2020
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6588: Flow-trigger parameter values are now editable from the Flow editor.
* #6612: Added a feature to support the definition of custom HTTP responses in programmatic API. It is now possible to define custom responses that are compatible with the Swagger 2.0 [responseObject](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#responseObject). The custom responses will be included in the application's Swagger. For more information and limitations, please see [{{% variables/apibuilder_prod_name %}} APIs](https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/api_builder_apis.html#APIBuilderAPIs-Introduction).
* #6638: Previously, loaded JSON schemas with problems due to missing references would not be validated fully. Additionally, the Swagger API documentation for the service was not validated and could be invalid or even fail to download. Now, these components will be validated on startup and emit a warning if they are invalid. See deprecation {{% deprecation/link D045 %}}.

## Fixes

* #6616: Fixed flow graph not rendering correctly centered with multiple triggers in the flow.
* #6616: Fixed an issue in the Flow editor where flow-nodes which could not be connected would in not render as disabled while connecting edges.
* #6624: Previously, when using Schema with invalid references in a custom API then trying to download the Swagger for your service, the download would fail with an error saying "cannot read property replace of undefined", hiding the original error. Now, the original error will not be swallowed, and will be printed to the console, while the server will respond with 500 "Server Error".
* #6626: Previously, Model generated Endpoints contained a 401 response for each method without a descriptive schema. Now, these 401 responses are removed from the Endpoint on disk, since when the service Swagger is downloaded, the methods will already describe 401 responses with an UnauthorizedError schema when authorization is enabled.
* #6635: Previously, if trigger plugins threw a non-standard undefined/null exception on startup, the trigger would be rejected and not loaded properly. Now, trigger plugins that throw unexpected non-standard undefined/null exceptions will be loaded in an error state with the error, "Unknown error".

{{% releasenotes/deprecations %}}

## Updated modules

* [@axway/amplify-api-builder-cli@1.12.0](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.12.0)
* [@axway/api-builder@4.21.0](https://www.npmjs.com/package/@axway/api-builder/v/4.21.0)
* [@axway/api-builder-admin@1.29.2](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.29.2)
* [@axway/api-builder-runtime@4.44.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.44.0)
* [@axway/api-builder-sdk@1.0.8](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.0.8)
* [@axway/api-builder-test-utils@1.1.5](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.1.5)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues).

{{% releasenotes/previous %}}
