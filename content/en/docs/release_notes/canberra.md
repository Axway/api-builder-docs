---
title: Canberra release notes
linkTitle: Canberra
date: 2018-08-17
description: 17 August 2018
Hide_readingtime: true
---
## Features

* 4532: Support data connectors actual primary key type in API, models, and flows
* 4724: Support for Models based on tables that have no primary key.

## Fixes

* 4791: Model flow-node distinct method's schema does not support the PK field
* 4834: UI not showing error pages when internal errors occur.
* 4855: Show better CLI error when using unsupported node version
* 4869: Config: apiPrefix is not validated for a required leading slash.
* 4916: Endpoints with names that require URI encoding can't be opened in the UI
* 4920: Improve the findAndModify Swagger documentation

## Release notes

* #4532: Previously, APIs and flows generated for models created by data connectors assumed IDs were of type string. Now, the APIs and flows will use the primary key type for the IDs. **This is enabled with a feature flag.** See deprecation {{% deprecation/link D005 %}}.
* #4724: Previously, if a model was created for a table that had no primary key the auto-generated APIs did not work. Now, the correct set of APIs will be generated and work as expected. **This is enabled with a feature flag.** See deprecation {{% deprecation/link D004 %}}.
* #4791: Previously, distinct method schema did not allow using of the primary key field. Now, the primary key field is added to the schema and can be specified in distinct queries.
* #4834: Previously, errors in {{% variables/apibuilder_prod_name %}} runtime or invalid views in the console would not render an error page and may have caused errors in the browser. Now, a consumable error page is shown when most errors occur.
* #4855: Previously, when running the {{% variables/apibuilder_prod_name %}} CLI on an unsupported Node.js version, there would be an unhelpful syntax error. Now, a useful error is output on install and when running a command which tells the user which version of Node.js to use.
* #4869: Previously, setting value without leading slash to apiPrefix configuration parameter resulted in active service with improperly bound paths. Now, validation has been added for the `apiPrefix` parameter, if the leading slash is missing exceptions are thrown and the service loading is interrupted.
* #4916: Previously, if the endpoint filename contained a % symbol the {{% variables/apibuilder_prod_name %}} Console could not open the detail page for that endpoint. Now, the endpoint detail page will open as expected.
* #4920: Previously, the findAndModify method had a misleading description stated that only a single object is found and modified. Now, it is corrected to denote that multiple objects could be found but only the first one in the list gets modified.

{{% releasenotes/deprecations %}}

## Updated plugins

* [@axway/api-builder-plugin-dc-mongo@1.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mongo/v/1.1.1)
* [@axway/api-builder-plugin-dc-mysql@2.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/2.2.0)
* [@axway/api-builder-plugin-dc-oracle@2.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/2.2.0)
* [@axway/api-builder-plugin-fn-swagger@1.0.11](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/1.0.11)


{{% releasenotes/previous %}}
