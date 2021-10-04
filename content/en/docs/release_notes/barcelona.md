---
title: Barcelona release notes
linkTitle: Barcelona
date: 2019-09-27
description: 27 September 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #5994: Add API for arrowPing.json to improve ARS compatibility
* #6024: Connector models generate friendlier API
* #6068: Support development environment file

## Fixes

* #6036: MBS connector errors leave {{% variables/apibuilder_prod_name %}} hanging due to uncleared interval
* #6075: Save and mock admin API swallows up errors

## Release notes

* #5994: Improved compatibility with ARS by including the default ARS healthcheck endpoint "/arrowPing.json". This behaves identically to "/apibuilderPing.json" and can be overridden in the same way.
* #6024: Previously, {{% variables/apibuilder_prod_name %}} would generate API for models that originate from connectors in a way that included a slash, e.g. "oracle/user", and would generate an API that URL encodes "oracle/user" as `/api/oracle%2Fuser/query`. Now, the slash between the connector name and model name is preserved and will render as `/api/oracle/user/query`. See deprecation {{% deprecation/link D015 %}}.
* #6036: Previously, if data connectors failed to connect to a data source, the actual error may be lost behind a "callback called twice" error. Now, the original error is kept and the callback is not called twice.
* #6068: {{% variables/apibuilder_prod_name %}} now supports the ability to load a `.env` file containing environment variables to assist in running services with development-specific values. New projects are scaffolded with an example `.env` file in the `./conf` directory. For further information, see: [Environmentalization Guide](/docs/how_to/environmentalization/).
* #6068: Projects will no longer be scaffolded with nyc as a dependency.
* #6075: Previously, errors during Endpoint creation and mocking may be swallowed up and unclear. Now, the cause of the error is logged.

{{% releasenotes/deprecations %}}

## Updated modules

* [@axway/api-builder-runtime@4.16.2](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.16.2)
* [@axway/api-builder-admin@1.10.33](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.10.33)
* [@axway/api-builder@4.11.1](https://www.npmjs.com/package/@axway/api-builder/v/4.11.1)

{{% releasenotes/previous %}}
