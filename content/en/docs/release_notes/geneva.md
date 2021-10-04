---
title: Geneva release notes
linkTitle: Geneva
date: 2018-10-12
description: 12 October 2018
Hide_readingtime: true
---
## Features

* #5075: Remove Connectors page
* #5129: Change the page title on the Summary screen
* #5177: Support HTTP Proxy configuration on the swagger plugin

## Fixes

* #5069: Add 401 response to swagger definition for endpoints which require auth
* #5103: Update flow validation to handle superfluous authorization parameters
* #5123: Improve flow editor side-panel UX for long names

## Release notes

* #5069: Previously, the swagger document built by {{% variables/apibuilder_prod_name %}} declared only the available responses for each endpoint and API. Now, {{% variables/apibuilder_prod_name %}} adds 401 response by default for all endpoints and API that are missing description for 401 response. Adding 401 responses is not done in case `APIKeyAuthType` config parameter is set to `none`.
* #5075: The Connectors page has been removed. The page lacked clarity on what was being displayed and served no function.
* #5103: Previously, flows with superfluous authorization parameters were not failing validation when loaded. Now, they will fail to validate.
* #5123: Previously, the Flow Editor displayed the tools in square boxes which limits the amount of space for the tool name. Now, the tools are displayed in rectangular boxes which have more room for the text and the mouse over text now also contains the name of the tool.
* #5129: Previously, the title on the Summary page was the application name, which was inconsistent with the rest of the API Builder UI. Now, the available information on the Summary page contains the correct title and the project information is displayed in a more clear and consistent way.
* #5177: A new optional configuration parameter called 'proxy' has been added. When specified, it must be a string and must hold valid url of a proxy server. This url could be passed down to plugins that do http/s communication so they can tunnel the traffic through that proxy server.

## Updated modules

* [@axway/api-builder-runtime@4.3.1](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.3.1)
* [@axway/api-builder-admin@1.3.4](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.3.4)
* [@axway/api-builder@4.3.0](https://www.npmjs.com/package/@axway/api-builder/v/4.3.0)

## New plugins

* [@axway/api-builder-plugin-dc-mssql](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@1.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/1.1.0)

{{% releasenotes/previous %}}
