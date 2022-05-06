---
title: Madurai release notes
linkTitle: Madurai
description: 6 May 2022
date: 2022-05-06
Hide_readingtime: true
---
## Summary

In this release we enhanced the **API Doc & Test** page to specifically list all available API specifications that the service implements, as well as where these documents can be accessed from. As usual, the specifications can be viewed, and APIs they contain can be tested and it is now more easy to download. The _Dynamic_ OpenAPI specification created for every service is no longer hidden and is now visible on the **API Doc & Test** page. Additionally, we added support for non-default table schemas in the MSSQL plugin.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features

* #7358: The **API Doc & Test** page has been updated to show all top level API specifications documented by your service, and where they can be downloaded.
* #7357: A new item for the _Dynamic_ OpenAPI specification (`/apidoc/swagger.json`) has been added to **API Doc & Test** for all services. Individual API groups (for example for auto-generated model APIs or programmatic APIs) have been removed from this list and are now visible and testable as part of the _Dynamic_ API specification. 
* #7356: Added the ability to individually download any of the existing service API specifications directly from the **API Doc & Test** page, as well as from the respective specification pages.
* #7371: The [MSSQL connector](/docs/developer_guide/connectors/mssql_connector) plugin now supports tables created in schema other than the database user's default schema (usually `dbo`).
* #7374: When creating new models, API methods are not enabled by default.

## Fixes

* #7117: Previously unhandled conflicts between OpenAPI paths and other API paths in your service are now detected.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
## Updated modules
* [@axway/api-builder-admin@1.63.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.63.0)
* [@axway/api-builder-runtime@4.89.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.89.0)

## Updated plugins
* [@axway/api-builder-plugin-dc-mssql@3.3.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/3.3.0)

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
