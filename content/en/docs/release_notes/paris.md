---
title: Paris release notes
linkTitle: Paris
description: 17 June 2022
date: 2022-06-17
Hide_readingtime: true
---
## Summary

In this release we enhanced the metrics reported by the Prometheus plugin to show the API Builder version as well as support for a number of Prometheus recommended system metrics.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features

* #7362: In [@axway/api-builder-plugin-prometheus](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus), added configuration option `options.promClient.collectDefaultMetrics` to enable system metrics recommended by Prometheus (https://github.com/siimon/prom-client#default-metrics). These metrics are enabled by default on new plugin installs.
* #7362: In [@axway/api-builder-plugin-prometheus](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus), added API Builder version information to the available metrics (`version_info`).

<!-- ## Fixes -->

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
## Updated modules
* [@axway/api-builder-admin@1.64.4](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.64.4)
* [@axway/api-builder-oas-flow-node@2.6.3](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/2.6.3)
* [@axway/api-builder-runtime@4.91.11](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.91.11)
* [@axway/api-builder-sdk@1.2.3](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.2.3)
* [@axway/api-builder-test-utils@1.5.9](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.5.9)

## Updated plugins
* [@axway/api-builder-plugin-dc-mssql@3.3.1](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/3.3.1)
* [@axway/api-builder-plugin-fn-restclient@2.2.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.2.3)
* [@axway/api-builder-plugin-fn-swagger@3.2.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/3.2.3)
* [@axway/api-builder-plugin-fn-xslt@3.3.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-xslt/v/3.3.1)
* [@axway/api-builder-plugin-ft-oas@1.6.1](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas/v/1.6.1)
* [@axway/api-builder-plugin-prometheus@1.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus/v/1.1.0)

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
