---
title: Utrecht release notes
linkTitle: Utrecht
date: 2021-08-27
description: 27 August 2021
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #5352: Added support for OAuth 2.0 client credentials grant flow with support for shared secret, [JWT authorization grant](https://datatracker.ietf.org/doc/html/rfc7523#section-2.1), and [JWT client authentication](https://datatracker.ietf.org/doc/html/rfc7523#section-2.2).
* #7010: @axway/api-builder-plugin-test-utils now supports validating input parameters.

## Fixes

* #7018: Previously, {{% variables/apibuilder_prod_name %}} CLI would exit with a "0" exit code when there was an error executing a command. Now, the CLI exits with 1 when errors occur.

## Updated modules

* [@axway/amplify-api-builder-cli@1.18.1](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.18.1)
* [@axway/api-builder@4.26.10](https://www.npmjs.com/package/@axway/api-builder/v/4.26.10)
* [@axway/api-builder-admin@1.44.13](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.44.13)
* [@axway/api-builder-oas-flow-node@2.0.0](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/2.0.0)
* [@axway/api-builder-runtime@4.69.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.69.0)
* [@axway/api-builder-sdk@1.1.13](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.1.13)
* [@axway/api-builder-test-utils@1.4.0](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.4.0)

## Updated plugins

* [@axway/api-builder-plugin-fn-base64@4.0.2](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/4.0.2)
* [@axway/api-builder-plugin-fn-javascript@3.0.2](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/3.0.2)
* [@axway/api-builder-plugin-fn-json@4.0.2](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/4.0.2)
* [@axway/api-builder-plugin-fn-restclient@2.0.24](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.24)
* [@axway/api-builder-plugin-fn-swagger@3.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/3.0.0)
* [@axway/api-builder-plugin-fn-mustache@1.0.10](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache/v/1.0.10)
* [@axway/api-builder-plugin-fn-xslt@3.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-xslt/v/3.1.1)
* [@axway/api-builder-plugin-fn-logger@1.0.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-logger/v/1.0.1)
* [@axway/api-builder-plugin-ft-event@1.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-event/v/1.1.1)
* [@axway/api-builder-plugin-ft-solace@1.0.3](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-solace/v/1.0.3)
* [@axway/api-builder-plugin-ft-kafka@1.1.4](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka/v/1.1.4)
* [@axway/api-builder-plugin-invoke-flow@1.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-invoke-flow/v/1.1.1)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues).

{{% releasenotes/previous %}}
