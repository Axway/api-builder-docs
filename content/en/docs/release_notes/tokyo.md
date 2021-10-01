---
title: Tokyo release notes
linkTitle: Tokyo
date: 2020-07-31
description: 31 July 2020
Hide_readingtime: true
---

## Summary

This release includes:

* [Upgrade](#upgrade)
* [Features](#features)
* [Fixes](#fixes)
* [Deprecations](#deprecations)
* [Updated Modules](#updated-modules)
* [Plugins](#updated-plugins)
* [Known Issues](#known-issues)

## Upgrade

Before updating, we recommend deleting package-lock.json if it exists.

To update an existing {{% variables/apibuilder_prod_name %}} application, execute the following command from within the application directory:

```bash
npm update
```

## Features

* #6493: Added a new tab to the Admin UI: Flows. This tab shows all the Flows which are part of an {{% variables/apibuilder_prod_name %}} application, as well as their flow-triggers, including those which are invoked by Endpoints. This tab is in a preview state currently and subject to change.
* #6494: Added Event, a new flow-node and pluggable flow-trigger that enables producing and consuming Events [@axway/api-builder-plugin-ft-event](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-event).
* #6510: Added two new features to the `APIBuilder` programmatic interface to allow a shutdown to be triggered via an event `("shutdown")`, and also to allow the system to be marked as unstable/unavailable via an event `("system-unavailable", "message")`. After receiving the "system-unavailable" event, the healthcheck API ](/Images/apibuilderPing.json`) will return **success: false**, allowing for external monitoring systems (just as Docker or Kubernetes) to detect that the system is unhealthy.
* #6515: Previously, API Endpoints always returned the HTTP response with the Content-Type header set to "application/json" and always JSON encoded the response body. Now, the Content-Type header can be overridden in the flow editor using the HTTP Response flow-node and setting a custom header value in **Headers**, or when not set, it will use the type of body to choose an appropriate Content-Type. If the body is a Buffer, the Content-Type is "application/octet-stream". If the body is a string or number, the Content-Type is "text/plain". If the body is an Object, then the Content-Type is "application/json". See deprecation [\[D042\]](#D042).

## Fixes

* #5617: Previously, long responses would cause the debugger in the Flow Editor to expand wider than the browser width, resulting in a lot of horizontal scrolling and potentially losing track of the Flow graph. Now, the debugger only will resize to the available screen space.
* #6407: Previously, a newly scaffolded {{% variables/apibuilder_prod_name %}} app was coming with "timeout" set in app config to 120000ms (2 minutes) and "start-period" parameter of the Docker HEALTHCHECK set to 10 seconds. Now, the "timeout" is set to 90000ms and the "start-period" parameter is set to 45 seconds.
* #6506: Previously, {{% variables/apibuilder_prod_name %}} could crash on startup with the error "Error: no schema with key or ref" due to a missing dependency on `ajv`. Now, {{% variables/apibuilder_prod_name %}} will no longer crash with this error.

## Deprecations

These are the deprecations introduced in this release. Click [here](/docs/deprecations/) for a list of all deprecations.

* **\[[D042](/docs/deprecations/#D042)\] enableOverrideEndpointContentType**: API Endpoints will no longer return the Content-Type "application/json" in all cases, the Content-Type will either be explicitly set the Content-Type from within a Flow, or set according to the type of response body. See [Change in the way Endpoints return Content-Type](/docs/deprecations/change_in_the_way_endpoints_return_content-type/).

## Updated modules

* [@axway/amplify-api-builder-cli@1.10.0](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.10.0)
* [@axway/api-builder@4.19.8](https://www.npmjs.com/package/@axway/api-builder/v/4.19.8)
* [@axway/api-builder-admin@1.21.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.21.0)
* [@axway/api-builder-runtime@4.32.2](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.32.2)

## Updated plugins

* [@axway/api-builder-plugin-ft-timer@0.1.2](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-timer/v/0.1.2)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues/).
