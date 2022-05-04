---
title: Madurai release notes
linkTitle: Madurai
description: 6 May 2022
date: 2022-05-06
Hide_readingtime: true
---
## Summary

**TODO**: summary

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features

* #7358: Added the ability to individually download any of the existing service API specifications directly from the API Doc & Test page.
* #7357: API Builder now dynamically generates an OpenAPI specification that documents the service programmatically defined APIs, routes, and dynamic APIs such as those automatically generated from from models. This specification is automatically generated and available on API Doc & Test page.
* #7371: The Microsoft [MSSQL connector](/docs/developer_guide/connectors/mssql_connector) plugin now supports tables created in schema other than "dbo".
* #7374: When creating Models, they no longer have API methods enabled by default.

## Fixes

* #7117: The API path conflict with other paths is now handled as log error/warning in the startup.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->

## Updated modules

* [@axway/api-builder-admin@1.61.2](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.61.2)
* [@axway/api-builder-runtime@4.87.3](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.87.3)

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
