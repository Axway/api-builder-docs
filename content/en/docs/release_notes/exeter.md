---
title: Exeter release notes
linkTitle: Exeter
description: 14 January 2022
date: 2022-01-14
Hide_readingtime: true
---
## Summary
Added a new [plugin](/docs/how_to/enable_prometheus_metrics) to enable [Prometheus](https://prometheus.io/) compatible metrics in the application. Additionally, added support for automatically detecting XML request bodies and parsing them as a string instead of a Buffer.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features
* #7196: Made changes to [@axway/api-builder-runtime](https://www.npmjs.com/package/@axway/api-builder-runtime) startup to enable loading middleware from plugins such as [@axway/api-builder-plugin-prometheus](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus).
* #7196: Added a new plugin [@axway/api-builder-plugin-prometheus](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus) that will enable [Prometheus](https://prometheus.io/) compatible metrics in the application. Metrics will be available on a different port to the main service. For more information and how to get started, [see here](/docs/how_to/enable_prometheus_metrics).
* #7193: Request bodies (such as for Endpoints and OpenAPI flow-triggers) will now be a `string` instead of a `Buffer` when the request has an XML-like type content-type header (e.g. application/xml). Newly handled XML content-types are as follows:
  * application/xml
  * application/xml-dtd
  * application/xml-external-parsed-entity
  * application/*+xml
  * image/svg+xml
  * model/x3d+xml
* #7166: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/plugin-ft-oas) now supports documenting TLS hosts in the OpenAPI 2.0 and 3.0 api-docs when `config.ssl` is enabled.

## Fixes
* #7199: Fixed issue in [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/plugin-ft-oas) where it failed to decode parameter of "any" type.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
## Updated modules
* [@axway/api-builder-admin@1.48.6](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.48.6)
* [@axway/api-builder-oas-flow-node@2.2.1](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/2.2.1)
* [@axway/api-builder-runtime@4.78.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.78.0)
* [@axway/api-builder-sdk@1.1.17](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.1.17)
* [@axway/api-builder-test-utils@1.5.3](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.5.3)

## Updated plugins
* [@axway/api-builder-plugin-fn-swagger@3.0.10](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/3.0.10)
* [@axway/api-builder-plugin-ft-oas@0.5.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas/v/0.5.0)
* [@axway/api-builder-plugin-prometheus@1.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus/v/1.0.0)

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
