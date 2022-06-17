---
title: Enable Prometheus metrics
linkTitle: Enable Prometheus metrics
weight: 110
date: 2022-01-07
---

This document describes how to enable Prometheus metrics in your {{% variables/apibuilder_prod_name %}} application.

## Overview

The [@axway/api-builder-plugin-prometheus](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus) is used to enable [Prometheus](https://prometheus.io/) metrics reporting in your {{% variables/apibuilder_prod_name %}} application via [express-prom-bundle](https://www.npmjs.com/package/express-prom-bundle).

Metrics will be aggregated for paths bound to the `config.apiPrefix` (e.g. `"/api"`). Public paths will not be aggregated (i.e. `config.accessControl.public`). On startup, using the defaults, the Metrics will be available at: http://localhost:8081/metrics. The metrics do not persist between application restarts.

## Limitations

* Currently, this plugin does not work with [pm2](https://www.npmjs.com/package/pm2) clustering.

## Prerequisites

Requires {{% variables/apibuilder_prod_name %}} [Exeter](/docs/release_notes/exeter) or later.

## Installation

You can install the plugin via the Plugins page in the UI, or from the command line.

```bash
npm install @axway/api-builder-plugin-prometheus
```

The endpoint http://localhost:8081/metrics will return metrics, for example this histogram:

```text
# HELP version_info apibuilder runtime version
# TYPE version_info gauge
version_info{version="4.91.8",release="Paris"} 1

# HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.
# TYPE process_cpu_user_seconds_total counter
process_cpu_user_seconds_total 19.468999999999998

# HELP process_cpu_system_seconds_total Total system CPU time spent in seconds.
# TYPE process_cpu_system_seconds_total counter
process_cpu_system_seconds_total 6.844

# HELP process_cpu_seconds_total Total user and system CPU time spent in seconds.
# TYPE process_cpu_seconds_total counter
process_cpu_seconds_total 26.313

# HELP process_start_time_seconds Start time of the process since unix epoch in seconds.
# TYPE process_start_time_seconds gauge
process_start_time_seconds 1654879217

# HELP process_resident_memory_bytes Resident memory size in bytes.
# TYPE process_resident_memory_bytes gauge
process_resident_memory_bytes 322686976

# HELP nodejs_eventloop_lag_seconds Lag of event loop in seconds.
# TYPE nodejs_eventloop_lag_seconds gauge
nodejs_eventloop_lag_seconds 0.0104857

# HELP nodejs_eventloop_lag_min_seconds The minimum recorded event loop delay.
# TYPE nodejs_eventloop_lag_min_seconds gauge
nodejs_eventloop_lag_min_seconds 0.013549568

# HELP nodejs_eventloop_lag_max_seconds The maximum recorded event loop delay.
# TYPE nodejs_eventloop_lag_max_seconds gauge
nodejs_eventloop_lag_max_seconds 0.026427391

# HELP nodejs_eventloop_lag_mean_seconds The mean of the recorded event loop delays.
# TYPE nodejs_eventloop_lag_mean_seconds gauge
nodejs_eventloop_lag_mean_seconds 0.016185344

# HELP nodejs_eventloop_lag_stddev_seconds The standard deviation of the recorded event loop delays.
# TYPE nodejs_eventloop_lag_stddev_seconds gauge
nodejs_eventloop_lag_stddev_seconds 0.0034687723934547217

# HELP nodejs_eventloop_lag_p50_seconds The 50th percentile of the recorded event loop delays.
# TYPE nodejs_eventloop_lag_p50_seconds gauge
nodejs_eventloop_lag_p50_seconds 0.015253503

# HELP nodejs_eventloop_lag_p90_seconds The 90th percentile of the recorded event loop delays.
# TYPE nodejs_eventloop_lag_p90_seconds gauge
nodejs_eventloop_lag_p90_seconds 0.015720447

# HELP nodejs_eventloop_lag_p99_seconds The 99th percentile of the recorded event loop delays.
# TYPE nodejs_eventloop_lag_p99_seconds gauge
nodejs_eventloop_lag_p99_seconds 0.026427391

# HELP nodejs_active_handles Number of active libuv handles grouped by handle type. Every handle type is C++ class name.
# TYPE nodejs_active_handles gauge
nodejs_active_handles{type="WriteStream"} 2
nodejs_active_handles{type="ReadStream"} 1
nodejs_active_handles{type="Server"} 2
nodejs_active_handles{type="Socket"} 4
nodejs_active_handles{type="FSWatcher"} 6447

# HELP nodejs_active_handles_total Total number of active handles.
# TYPE nodejs_active_handles_total gauge
nodejs_active_handles_total 6456

# HELP nodejs_active_requests Number of active libuv requests grouped by request type. Every request type is C++ class name.
# TYPE nodejs_active_requests gauge

# HELP nodejs_active_requests_total Total number of active requests.
# TYPE nodejs_active_requests_total gauge
nodejs_active_requests_total 0

# HELP nodejs_heap_size_total_bytes Process heap size from Node.js in bytes.
# TYPE nodejs_heap_size_total_bytes gauge
nodejs_heap_size_total_bytes 223289344

# HELP nodejs_heap_size_used_bytes Process heap size used from Node.js in bytes.
# TYPE nodejs_heap_size_used_bytes gauge
nodejs_heap_size_used_bytes 204953376

# HELP nodejs_external_memory_bytes Node.js external memory size in bytes.
# TYPE nodejs_external_memory_bytes gauge
nodejs_external_memory_bytes 21847061

# HELP nodejs_heap_space_size_total_bytes Process heap space size total from Node.js in bytes.
# TYPE nodejs_heap_space_size_total_bytes gauge
nodejs_heap_space_size_total_bytes{space="read_only"} 176128
nodejs_heap_space_size_total_bytes{space="old"} 161648640
nodejs_heap_space_size_total_bytes{space="code"} 10330112
nodejs_heap_space_size_total_bytes{space="map"} 5251072
nodejs_heap_space_size_total_bytes{space="large_object"} 43962368
nodejs_heap_space_size_total_bytes{space="code_large_object"} 872448
nodejs_heap_space_size_total_bytes{space="new_large_object"} 0
nodejs_heap_space_size_total_bytes{space="new"} 1048576

# HELP nodejs_heap_space_size_used_bytes Process heap space size used from Node.js in bytes.
# TYPE nodejs_heap_space_size_used_bytes gauge
nodejs_heap_space_size_used_bytes{space="read_only"} 170944
nodejs_heap_space_size_used_bytes{space="old"} 148464800
nodejs_heap_space_size_used_bytes{space="code"} 9255072
nodejs_heap_space_size_used_bytes{space="map"} 2457288
nodejs_heap_space_size_used_bytes{space="large_object"} 43558176
nodejs_heap_space_size_used_bytes{space="code_large_object"} 812608
nodejs_heap_space_size_used_bytes{space="new_large_object"} 0
nodejs_heap_space_size_used_bytes{space="new"} 239720

# HELP nodejs_heap_space_size_available_bytes Process heap space size available from Node.js in bytes.
# TYPE nodejs_heap_space_size_available_bytes gauge
nodejs_heap_space_size_available_bytes{space="read_only"} 0
nodejs_heap_space_size_available_bytes{space="old"} 10152752
nodejs_heap_space_size_available_bytes{space="code"} 419680
nodejs_heap_space_size_available_bytes{space="map"} 2701824
nodejs_heap_space_size_available_bytes{space="large_object"} 0
nodejs_heap_space_size_available_bytes{space="code_large_object"} 0
nodejs_heap_space_size_available_bytes{space="new_large_object"} 1031072
nodejs_heap_space_size_available_bytes{space="new"} 791352

# HELP nodejs_version_info Node.js version info.
# TYPE nodejs_version_info gauge
nodejs_version_info{version="v16.14.2",major="16",minor="14",patch="2"} 1

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
        metricType: 'histogram',
        promClient: {
          // This option configures the default metrics recommended
          // by prometheus and provided by prom-client. For the available
          // configuration, see https://github.com/siimon/prom-client#default-metrics.
          // To disable default metrics, delete the `collectDefaultMetrics` key.
          collectDefaultMetrics: {}
        }
      }
    }
  }
};
```

### Options

* **enabled** (`boolean`): Enables or disables the plugin. Default: `true`.
* **http.port** (`integer|string`): Sets the metrics port (note that `process.env.API_BUILDER_PROMETHEUS_PORT` takes precedence). The port **cannot** be the same port that {{% variables/apibuilder_prod_name %}} is using. Default `8081`.
* **options** (`object`): These are the `express-prom-bundle` options, such as the route used to access the metrics (defaults to `/metrics`). See [options](https://www.npmjs.com/package/express-prom-bundle#options) for further details.

### Docker

If you are running {{% variables/apibuilder_prod_name %}} from Docker, then you will want to expose the port {{% variables/apibuilder_prod_name %}} is running on (e.g. 8080), as well as the Prometheus metrics (e.g. 8081).

```bash
docker build -t myapp ./
docker run --name myapp -e PORT=8080 -e API_BUILDER_PROMETHEUS_PORT=8081 -p 8080:8080 -p 8081:8081 myapp:latest
```

For more information about how to use Docker with {{% variables/apibuilder_prod_name %}}, please see [Dockerize an {{% variables/apibuilder_prod_name %}} service](/docs/how_to/dockerize_an_api_builder_service).
