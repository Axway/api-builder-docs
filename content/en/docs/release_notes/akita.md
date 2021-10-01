---
title: Akita release notes
linkTitle: Akita
date: 2019-08-30
description: 30 August 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* 5674: Fix Memory connector to return collections

## Fixes

* 6005: Ignore 'unsel' in Connector queries when 'sel' is provided

## Release notes

* #5674: Previously, the Memory connector would return an array of objects instead of a Collection of objects when calling `query` or `distinct`. Now, the Memory connector correctly returns a Collection.
* #5674: Previously, the Memory connector would return an array of objects that contained all fields when performing a distinct operation, instead of objects containing only the distinct field. Now, the Memory connector returns a Collection of distinct objects that contain only the distinct field.
* #6005: Previously, some Connectors were executing queries incorrectly considering both `sel` and `unsel`. Now, all Connectors will ignore `unsel` when `sel` is provided.

## Updated modules

* [@axway/api-builder-runtime@4.13.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.13.0)
* [@axway/api-builder-admin@1.10.29](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.10.29)

## Updated plugins

* [@axway/api-builder-plugin-dc-mbs@0.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mbs/v/0.1.0)

{{% releasenotes/previous %}}
