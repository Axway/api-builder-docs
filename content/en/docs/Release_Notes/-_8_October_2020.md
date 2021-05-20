---
title: '- Yokohama'
linkTitle: '- yokohama'
description: ADD A DESCRIPTION
weight: 140
date: 2021-05-17
---

## Summary

This release includes:

* [Upgrade](#upgrade)

* [Features](#features)

* [Fixes](#fixes)

* [Updated Modules](#updated-modules)

* [Known Issues](#known-issues)

## Upgrade

Before updating, we recommend deleting package-lock.json if it exists.

To update an existing {{% variables/apibuilder_prod_name %}} application, execute the following command from within the application directory:

```bash
npm update
```

## Features

* #6563: The Flow editor now displays read-only nodes which show how the Flow is triggered. These reflect Endpoints or trigger plugins which have been configured on disk.

## Fixes

* #6548: Stopped Intercom chat bubble from appearing in the Flow editor.

## Updated modules

* [@axway/api-builder-admin@1.26.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.26.0)

* [@axway/api-builder-runtime@4.37.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.37.0)

## Known Issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues/).
