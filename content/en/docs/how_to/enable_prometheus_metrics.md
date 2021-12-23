---
title: Enable Prometheus metrics
linkTitle: Enable Prometheus metrics
date: 2021-12-22
---

This document describes how to enable Prometheus metrics in your {{% variables/apibuilder_prod_name %}} application.

## Overview

The [@axway/api-builder-plugin-prometheus](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus) is used to enable [Prometheus](https://prometheus.io/) metrics reporting in your {{% variables/apibuilder_prod_name %}} application via the [express-prom-bundle](https://www.npmjs.com/package/express-prom-bundle)

Installation will install a default configuration file. Once installed, it exposes a configurable endpoint that can be polled from an aggregator application. The plugin will bind to `8081` by default, but this can be changed in the configuration, or by setting the environment variable `API_BUILDER_PROMETHEUS_PORT`. The metrics do not persist between application restarts. With the default configuration, the next time your application starts, metrics can be accessed at: http://localhost:8081/metrics.

Metrics will be aggregated for paths bound to the `apiPrefix` (e.g. `"/api"`). Public paths will not be aggregated (i.e. `config.accessControl.public`).

## Limitations

* Currently, this plugin does not work with [pm2](https://www.npmjs.com/package/pm2) clustering.

## Prerequisites

Requires an API Builder application with a minimum [@axway/api-builder-runtime](https://www.npmjs.com/package/@axway/api-builder-runtime) version of `4.76.0`.

## Installation

You can install the plugin via the Plugins page in the UI, or from the command line.

```bash
npm install @axway/api-builder-plugin-prometheus
```

Calling that endpoint will return histogram metrics, for example:

```text
# HELP http_request_duration_seconds duration histogram of http responses labeled with: status_code
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{le="0.003",status_code="200"} 0
http_request_duration_seconds_bucket{le="0.03",status_code="200"} 0
http_request_duration_seconds_bucket{le="0.1",status_code="200"} 1
http_request_duration_seconds_bucket{le="0.3",status_code="200"} 1
http_request_duration_seconds_bucket{le="1.5",status_code="200"} 1
http_request_duration_seconds_bucket{le="10",status_code="200"} 1
http_request_duration_seconds_bucket{le="+Inf",status_code="200"} 1
http_request_duration_seconds_sum{status_code="200"} 0.053406219
http_request_duration_seconds_count{status_code="200"} 1

# HELP up 1 = up, 0 = not up
# TYPE up gauge
up 1
```

## Configuration

Installing the plugin should create a new configuration file `conf/prometheus.default.js`.

```js
module.exports = {
  pluginConfig: {
    '@axway/api-builder-plugin-prometheus': {
      enabled: true,
      http: {
        port: process.env.API_BUILDER_PROMETHEUS_PORT || 8081
      },
      options: {
        // These are the main options and their defaults. For the
        // complete list of options, see:
        // https://www.npmjs.com/package/express-prom-bundle#options
        metricsPath: '/metrics',
        includeStatusCode: true,
        includeMethod: false,
        includePath: false,
        includeUp: true,
        metricType: 'histogram'
      }
    }
  }
};
```

### Options

* **enabled** (`boolean`): Enables or disables the plugin. Default: `true`.
* **http.port** (`integer|string`): Sets the metrics port.  This **cannot** be the same port. Default `8081`.
* **options** (`object`): These are the `express-prom-bundle` options, such as the route used to access the metrics (defaults to `/metrics`).  See [options](https://www.npmjs.com/package/express-prom-bundle#options) for further details.
