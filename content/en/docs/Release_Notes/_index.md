---
title: Release notes
linkTitle: Release notes
description: ADD A DESCRIPTION
weight: 70
date: 2021-06-22
---

## {{% variables/apibuilder_prod_name %}} - Perm

### Summary

This release includes:

* [Upgrade](#upgrade)

* [Features](#features)

* [Fixes](#fixes)

* [Updated Modules](#updated-modules)

* [Plugins](#updated-plugins)

* [Known Issues](#known-issues)

### Upgrade

Before updating, we recommend deleting package-lock.json if it exists.

To update an existing {{% variables/apibuilder_prod_name %}} application, execute the following command from within the application directory:

```bash
npm update
```

### Features

* #6909: The Oracle plugin [@axway/api-builder-plugin-dc-oracle](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle) now supports models from all tables to which the user has access. The configuration option, [generateModelsFromSchema](/docs/developer_guide/connectors/oracle_connector/#configuration) can now be used to specify the tables used for auto-generated Models.

### Fixes

* #6899: Previously, model flow-nodes were not named with the full model name. This would end up causing ambiguity between models from different connectors with the same table name, for example "User" and "oracle/User" both showing as "User" in the flow-node palette. Now, all model flow-nodes have the full model name.

### Updated modules

* [@axway/api-builder@4.26.2](https://www.npmjs.com/package/@axway/api-builder/v/4.26.2)

* [@axway/api-builder-runtime@4.66.10](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.66.10)

### Updated plugins

* [@axway/api-builder-plugin-dc-mssql@3.0.2](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/3.0.2)

* [@axway/api-builder-plugin-dc-mysql@2.2.17](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/2.2.17)

* [@axway/api-builder-plugin-dc-oracle@3.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/3.1.0)

### Known Issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues/).

## Recent Releases
