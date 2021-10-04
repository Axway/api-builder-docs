---
title: Marrakech release notes
linkTitle: Marrakech
date: 2020-04-24
description: 24 April 2020
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}
## Fixes

* #5616: Remove useless/confusing log message when invoking Create from the model generated API

## Release notes

* #5616: Previously, @axway/api-builder-runtime emitted a superfluous log message \\{"ignore":true,"nocontent":true,"status":201,"path":1\\} when handling requests to the model API for the create method. Now, it does not.

## Updated modules

* [@axway/amplify-api-builder-cli@1.3.2](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.3.2)
* [@axway/api-builder-sdk@0.4.0](https://www.npmjs.com/package/@axway/api-builder-sdk/v/0.4.0)
* [@axway/api-builder-runtime@4.27.10](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.27.10)
* [@axway/api-builder@4.16.3](https://www.npmjs.com/package/@axway/api-builder/v/4.16.3)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@2.7.4](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.7.4)

{{% releasenotes/previous %}}
