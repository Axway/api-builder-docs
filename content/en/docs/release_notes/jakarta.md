---
title: Jakarta release notes
linkTitle: Jakarta
date: 2018-12-07
description: 7 December 2018
Hide_readingtime: true
---
## Features

* 5349: Release authorizations in flows feature.

## Fixes

* 5353: Preserve authorization across reloads.
* 5374: Fix invalid deprecation URL for enableScopedConfig.

## Release notes

* #5349: Introducing support of authorization in {{% variables/apibuilder_prod_name %}} flows. {{% variables/apibuilder_prod_name %}} now manages credentials and ensures tokens are kept valid. These credentials can be used directly by Swagger flow-nodes or retrieved using the Authorization flow-node. For more information, see: [{{% variables/apibuilder_prod_name %}} Credentials](/docs/developer_guide/credentials/).
* #5353: Previously, the system invalidated the authorized credentials on each system restart. Now, the system preserves the authorized credentials on system restart as long as the credential has not been updated within the corresponding configuration file.
* #5374: Previously, the `enableScopedConfig` deprecation warning had an invalid URL. Now, the deprecation warning has the correct URL.

## Updated modules

* [@axway/api-builder-runtime@4.5.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.5.0)
* [@axway/api-builder-admin@1.5.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.5.0)
* [@axway/api-builder@4.4.2](https://www.npmjs.com/package/@axway/api-builder/v/4.4.2)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@2.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.0.0)


{{% releasenotes/previous %}}
