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

## Updated modules
* [@axway/api-builder-runtime@4.91.9](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.91.9)

## Updated plugins
* [@axway/api-builder-plugin-prometheus](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus/v/1.1.0)

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
