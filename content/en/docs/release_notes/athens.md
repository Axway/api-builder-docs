---
title: Athens release notes
linkTitle: Athens
date: 2018-07-24
description: 24 July 2018
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Fixes

* #4722: Update dependencies to improve application size
* #4727: Correct row count for composite models based on the Oracle database connector
* #4760: Correct the **default** response handling of service connectors and Swagger plug-ins when they are used in flows
* #4834: Update the {{% variables/apibuilder_prod_name %}} user interface to display error pages when internal errors occur
* #4838: Update the display endpoint IDs in the user interface breadcrumbs to use their friendly names
* #4860: Update Swagger plug-in to handle URI encoded JSON schema references in Swagger files
* #4867: Correct an issue with the UI listing configuration files incorrectly

## Updated modules

This release includes the following module updates:

* [@axway/api-builder-runtime@4.0.16](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.0.16)
* [@axway/api-builder@4.0.1](https://www.npmjs.com/package/@axway/api-builder/v/4.0.1)
* [@axway/api-builder-admin@1.0.14](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.0.14)

## Release notes

* #4722: Reduced the production install size of the default service by roughly 23%.
* #4727: Previously, when a count query was executed on a composite model that is being sourced from an Oracle DB Model the reported result count will never exceed 10 irrespective of how many actual rows there are. Now, the count result count matches the actual number of rows.
* #4760: Previously, service connectors and flow-nodes generated with `api-builder-plugin-fn-swagger` did not handle the cases where the swagger definition had a default response. Now, service connectors and flow-nodes generated with `api-builder-plugin-fn-swagger` use the proper response description even when a default description exists. For example, if the service returns an HTTP 301 code and there is not a described response for the HTTP 301 code the default response will be used if present in the Swagger document.
* #4834: Previously, errors in {{% variables/apibuilder_prod_name %}} runtime or invalid views in the console would not render an error page and may have caused browser errors. Now, a consumable error page is shown when most errors occur.
* #4838: Previously, the {{% variables/apibuilder_prod_name %}} user interface breadcrumbs did not display the friendly endpoint name. Now, the user interface breadcrumbs display the friendly endpoint name.
* #4860: Previously, `api-builder-plugin-fn-swagger` would throw "Error: Invalid reference token" when attempting to handle URI encoded JSON schema references in Swagger files. Now, invalid reference errors are not thrown.
* #4867: Previously, when listing files on the Configuration tab, some of them would disappear from the list. Now, configuration files do not disappear.

## Updated plugins

* [@axway/api-builder-plugin-dc-mongo@1.0.3](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mongo/v/1.0.3#changes)
* [@axway/api-builder-plugin-dc-mysql@1.1.4](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/1.1.4#changes)
* [@axway/api-builder-plugin-dc-oracle@1.0.4](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/1.0.4#changes)
* [@axway/api-builder-plugin-fn-base64@1.0.10](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/1.0.10#changes)
* [@axway/api-builder-plugin-fn-dot@1.0.10](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/1.0.10#changes)
* [@axway/api-builder-plugin-fn-json@1.0.10](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/1.0.10#changes)
* [@axway/api-builder-plugin-fn-restclient@1.0.10](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/1.0.10#changes)
* [@axway/api-builder-plugin-fn-swagger@1.0.6](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/1.0.6#changes)
* [axway-flow-sdk@2.0.10](https://www.npmjs.com/package/axway-flow-sdk/v/2.0.10#changes)

{{% releasenotes/previous %}}
