---
title: Melbourne release notes
linkTitle: Melbourne
date: 2019-02-01
description: 1 February 2019
Hide_readingtime: true
---
## Features

* 5436: Support Parameter Groups in flow-nodes and Flow editor
* 5478: Support apikey authentication in API Doc and Test for Endpoints

## Fixes

* 5442: Fix CORS for API with path parameters
* 5448: Apply CORS to static resources
* 5474: Update Dockerfile with correct file permissions in template
* 5485: Regression in Swagger plugin validation

## Release notes

* #5436: Previously, all parameters in the flow editor were rendered in a single group. Now, related parameters can be grouped together in collapsible panels by using the [axway-flow-sdk](https://www.npmjs.com/package/axway-flow-sdk).
* #5442: Previously, CORS requests were not working correctly on APIs that are bound on paths with parameters. Now, CORS is behaving correctly for these cases.
* #5448: Previously, if CORS was enabled in the application, the static files were not served with the correct headers. Now, the appropriate headers are attached.
* #5474: Previously, when building a Docker image using the default Dockerfile, there was a failure on macOS Mojave due to insufficient rights when copying the application into the app directory, and OS would succeed to create the container, but had incorrect file permissions that would disallow write. Now, new services are created with an updated Dockerfile which allows the image to be created successfully.
* #5478: Previously, the Test API functionality for endpoints would not work correctly when the service auth strategy was changed from 'basic'. Now, it works with the 'apikey' strategy too.

## Updated modules

* [@axway/api-builder-runtime@4.6.26](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.6.26)
* [@axway/api-builder-admin@1.6.1](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.6.1)
* [@axway/api-builder@4.5.5](https://www.npmjs.com/package/@axway/api-builder/v/4.5.5)

## Updated plugins

* [@axway/api-builder-plugin-dc-mongo@1.1.5](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mongo/v/1.1.5)
* [@axway/api-builder-plugin-dc-mssql@1.0.4](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/1.0.4)
* [@axway/api-builder-plugin-dc-mysql@2.2.4](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/2.2.4)
* [@axway/api-builder-plugin-dc-oracle@2.2.5](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/2.2.5)
* [@axway/api-builder-plugin-fn-base64@1.0.17](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/1.0.17)
* [@axway/api-builder-plugin-fn-dot@1.0.17](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/1.0.17)
* [@axway/api-builder-plugin-fn-json@1.0.17](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/1.0.17)
* [@axway/api-builder-plugin-fn-restclient@2.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.0)
* [@axway/api-builder-plugin-fn-swagger@2.1.4](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.1.4)
* [axway-flow-sdk@3.0.0](https://www.npmjs.com/package/axway-flow-sdk/v/3.0.0)


{{% releasenotes/previous %}}
