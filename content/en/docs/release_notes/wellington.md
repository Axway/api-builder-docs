---
title: Wellington release notes
linkTitle: Wellington
date: 2019-07-05
description: 5 July 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #5823: Support Docker HEALTHCHECK
* #5829: Add process.env.PORT to conf/default.js

## Release notes

* #5823: Added HEALTHCHECK to the Dockerfile created in new {{% variables/apibuilder_prod_name %}} services. When the service is built using Docker, it will be polled every 30 seconds to check if it is running and healthy.
* #5829: Previously, {{% variables/apibuilder_prod_name %}} projects had configuration which hard-coded port 8080 by default. Now, while {{% variables/apibuilder_prod_name %}} projects still default to 8080, the PORT environment variable can be used to specify a different port. e.g. `PORT=8081 npm start` which allows for a better out-of the-box experience for containerization.

## Updated modules

* [@axway/api-builder-runtime@4.11.39](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.11.39)
* [@axway/api-builder@4.7.0](https://www.npmjs.com/package/@axway/api-builder/v/4.7.0)

## Updated plugins

* [@axway/api-builder-plugin-fn-base64@2.0.6](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/2.0.6)
* [@axway/api-builder-plugin-fn-dot@2.0.6](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/2.0.6)
* [@axway/api-builder-plugin-fn-json@2.0.6](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/2.0.6)
* [@axway/api-builder-plugin-fn-restclient@2.0.9](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.9)
* [axway-flow-sdk@3.1.8](https://www.npmjs.com/package/axway-flow-sdk/v/3.1.8)

{{% releasenotes/previous %}}
