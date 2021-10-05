---
title: Dublin release notes
linkTitle: Dublin
date: 2018-08-31
description: 31 August 2018
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #4967: Support Intercom in {{% variables/apibuilder_prod_name %}}
* #5004: Swagger plugin is generating many config files after editing one
* #5008: Support for plugin load failure terminating server

## Fixes

* #4976: Swagger: Generated swagger for services does not set "security"
* #4982: Versions of @axway/api-builder-plugin-dc-mysql prior to '2.2.0' are incompatible with {{% variables/apibuilder_prod_name %}} when the \`usePrimaryKey\` feature flag is enabled

## Release notes

* #4967: Added Intercom to the {{% variables/apibuilder_prod_name %}} Console UI.
* #4976: Previously, the `/apidoc/swagger.json` did not set the security requirements and generated Swagger in a way that was not representative of the services security mechanisms. Now, the generated Swagger document has a security requirement that ensures the security is correct.
* #4982: Previously, the `usePrimaryKeyType` feature flag was not compatible with versions of @axway/api-builder-plugin-dc-mysql prior to 2.2.0. Now, when the feature flag is enabled {{% variables/apibuilder_prod_name %}} is compatible with these versions of the plugin.
* #5004: Previously, the config generation did not behave correctly and did not preserve the service name during the creation of the service config if the initially generated config had its service name manually changed, ending up in generating configs endlessly on system restart. Now, the generated configs by the swagger plugin preserve the service name and stops once a config for the given service is created.
* #5008: Previously, errors when loading plugins were ignored. Now, these errors will terminate the service by default. **This is enabled with a feature flag.** See deprecation {{% deprecation/link D006 %}}.

{{% releasenotes/deprecations %}}

## Updated modules

* [@axway/api-builder-runtime@4.2.9](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.2.9)
* [@axway/api-builder-admin@1.2.5](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.2.5)
* [@axway/api-builder@4.2.2](https://www.npmjs.com/package/@axway/api-builder/v/4.2.2)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@1.0.14](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/1.0.14)

{{% releasenotes/previous %}}
