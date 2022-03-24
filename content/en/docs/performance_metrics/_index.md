---
title: Performance metrics
linkTitle: Performance metrics
weight: 140
date: 2021-10-01
---

Here, we define a baseline performance metric for {{% variables/apibuilder_prod_name %}} to help users with capacity planning or footprint estimations for deployments.

The figure we supply is an indicative baseline for the most basic sample flow: GreetFlow. We will use this figure as an upper bound for the performance you can expect from a running container.

The performance of a flow depends significantly on what the flow is doing. Connecting to external systems will be at the mercy of their response times and network latency, and complex data transformations (e.g. large XML transformations) will affect transaction processing. For this reason, we always recommend that you run your own performance benchmarking tests. You can find the tooling we used in the Apache Benchmark section at the end.

## Test environment

* MacBook Pro; 16 GB Memory; Intel Core i9 2.3 GHz; Mac OS Monterey
* Running single instance of {{% variables/apibuilder_prod_name %}} with logging disabled, and authentication set to "apikey"
* Running apache benchmark (ab):
  * Keep-Alive enabled
  * gzip enabled

## Performance metrics

|     |     |
| --- | --- |
| Date of test | November 2020 ([Johannesburg](/docs/release_notes/johannesburg)) |
| Number of requests | 100,000 |
| Concurrency | 10 |
| Total time | 75.487 seconds |
| Bytes transferred | 54,200,001 |
| Time per request (mean) | 7.549 ms |
| Time per request (mean, across all requests) | 0.755 ms |
| Memory idle | 11.80 MB |
| Memory max | 11.91 MB |
| **Requests per second** | **1,324.73** |

## Apache benchmark (ab)

[Apache benchmark](https://httpd.apache.org/docs/2.4/programs/ab.html) (ab) was used for these performance tests. This [site](https://www.tutorialspoint.com/apache_bench/apache_bench_environment_setup.htm) explains how to install it. To run:
```bash
$ ab -n 100000 -c 10 -k \
 -H "Accept-Encoding: gzip" \
 -H "Accept: application/json" \
 -H "APIKey: <key>"
 "http://localhost:8080/api/greet?username=bob"
```
