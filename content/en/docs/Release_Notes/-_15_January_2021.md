---
title: '- Edirne'
linkTitle: '- edirne'
description: ADD A DESCRIPTION
weight: 80
date: 2021-05-17
---

## Summary

This release includes:

* [Upgrade](#upgrade)

* [Fixes](#fixes)

* [Updated Modules](#updated-modules)

* [Known Issues](#known-issues)

## Upgrade

Before updating, we recommend deleting package-lock.json if it exists.

To update an existing {{% variables/apibuilder_prod_name %}} application, execute the following command from within the application directory:

```bash
npm update
```

## Fixes

* #6684: Previously, when editing a flow with two or more flow-triggers sharing the same channel, modifying the parameter of one flow-trigger would fail to update the parameter of the other flow-triggers that share the same channel. Now, channel parameter changes will be reflected in all triggers that share that channel.

## Updated modules

* [@axway/api-builder-admin@1.35.2](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.35.2)

* [@axway/api-builder-runtime@4.50.2](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.50.2)

## Known Issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues/).
