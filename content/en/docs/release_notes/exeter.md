---
title: Exeter release notes
linkTitle: Exeter
description: 14 January 2022
date: 2022-01-14
Hide_readingtime: true
---
## Summary
Added a new plugin [@axway/api-builder-plugin-prometheus](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus) that will enable [Prometheus](https://prometheus.io/) compatible metrics to the application.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features
* #7196: Made changes to [@axway/api-builder-runtime](https://www.npmjs.com/package/@axway/api-builder-runtime) startup to enable loading [@axway/api-builder-plugin-prometheus](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus).
* #7193: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/plugin-ft-oas) now supports passing XML body to the flow as a string, as opposed to a `Buffer`, when the request has an "XML" type content-type header (e.g. application/xml).
* #7166: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/plugin-ft-oas) now supports documenting TLS in the OpenAPI 2.0 and 3.0 api-docs when `config.ssl` is enabled.

## Fixes
* #7199: Fixed issue in [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/plugin-ft-oas) where it failed to decode parameter of "any" type.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
## Updated modules
* [@axway/api-builder-admin@1.48.5](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.48.5)
* [@axway/api-builder-runtime@4.76.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.76.0)

## Updated plugins
* [@axway/api-builder-plugin-prometheus@1.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus/v/1.0.0)

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
