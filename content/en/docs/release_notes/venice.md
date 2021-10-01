---
title: Venice release notes
linkTitle: Venice
date: 2021-09-10
description: 10 September 2021
Hide_readingtime: true
---

## Summary

This release includes:

* [Upgrade](#upgrade)
* [Features](#features)
* [Fixes](#fixes)
* [Updated Modules](#updated-modules)
* [Plugins](#updated-plugins)
* [Known Issues](#known-issues)

## Upgrade

To update an existing {{% variables/apibuilder_prod_name %}} application, execute the following command from within the application directory:

```bash
npm update
```

To update the {{% variables/apibuilder_prod_name %}} CLI, execute the following command:

```
axway pm update
```

## Features

* #7006: The plugins tab has been updated to show available and installed plugins separately. Additionally, community plugins now have their own tab with clarification of what community plugins are, and confirmation before install.
* #7030: The @axway/api-builder-plugin-invoke-flow plugin will now be included in new {{% variables/apibuilder_prod_name %}} projects by default.
* #7035: Added support to the Oracle database connector for querying ranges of all applicable data types with $gt, $gte, $lt and $lte. For example:

    ```
    { AGE: { $gt: 0, $lt: 99 }
    ```

## Fixes

* #6295: Previously, the Server URL parameter of flow-nodes from `@axway/api-builder-plugin-fn-swagger` or custom OAS plugins only allowed server URLs to be picked from a predefined list. Now, custom URLs can easily be provided.

## Updated modules

* [@axway/amplify-api-builder-cli@1.18.2](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.18.2)
* [@axway/api-builder@4.26.11](https://www.npmjs.com/package/@axway/api-builder/v/4.26.11)
* [@axway/api-builder-admin@1.45.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.45.0)
* [@axway/api-builder-oas-flow-node@2.0.1](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/2.0.1)
* [@axway/api-builder-runtime@4.69.3](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.69.3)

## Updated plugins

* [@axway/api-builder-plugin-dc-oracle@3.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/3.2.0)
* [@axway/api-builder-plugin-fn-restclient@2.0.25](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.25)
* [@axway/api-builder-plugin-fn-swagger@3.0.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/3.0.1)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues/).
