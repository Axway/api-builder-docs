---
title: Enable Prometheus metrics
linkTitle: Enable Prometheus metrics
date: 2022-01-07
---

This document describes how to enable Prometheus metrics in your {{% variables/apibuilder_prod_name %}} application.

## Overview

The [@axway/api-builder-plugin-prometheus](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus) is used to enable [Prometheus](https://prometheus.io/) metrics reporting in your {{% variables/apibuilder_prod_name %}} application via [express-prom-bundle](https://www.npmjs.com/package/express-prom-bundle).

Metrics will be aggregated for paths bound to the `config.apiPrefix` (e.g. `"/api"`). Public paths will not be aggregated (i.e. `config.accessControl.public`). On startup, using the defaults, the Metrics will be available at: http://localhost:8081/metrics. The metrics do not persist between application restarts.

## Limitations

* Currently, this plugin does not work with [pm2](https://www.npmjs.com/package/pm2) clustering.

## Prerequisites

Requires an API Builder application with a minimum [@axway/api-builder-runtime](https://www.npmjs.com/package/@axway/api-builder-runtime) version of `4.76.0` ([Exeter](/docs/release_notes/exeter)). 

## Installation

You can install the plugin via the Plugins page in the UI, or from the command line.

```bash
npm install @axway/api-builder-plugin-prometheus
```

The endpoint http://localhost:8081/metrics will return metrics, for example this histogram:

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

Installation will install a default configuration file, `conf/prometheus.default.js` and the next time your application starts, metrics can be accessed at: http://localhost:8081/metrics. The `/metrics` endpoint as well as the port the metrics are bound are configurable via the configuration file. By default, the plugin will bind to `8081`, but this can be changed in the configuration or by setting the environment variable `API_BUILDER_PROMETHEUS_PORT`. The metrics do not persist between application restarts.

```js
module.exports = {
  pluginConfig: {
    '@axway/api-builder-plugin-prometheus': {
      enabled: true,
      http: {
				// note that the port must be different than the runtime
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
* **http.port** (`integer|string`): Sets the metrics port (note that `process.env.API_BUILDER_PROMETHEUS_PORT` takes precedence). The port **cannot** be the same port that API Builder is using. Default `8081`.
* **options** (`object`): These are the `express-prom-bundle` options, such as the route used to access the metrics (defaults to `/metrics`). See [options](https://www.npmjs.com/package/express-prom-bundle#options) for further details.
