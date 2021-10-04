---
title: Raga release notes
linkTitle: Raga
date: 2019-04-12
description: 12 April 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}
## Major change

* #5583: New {{% variables/apibuilder_prod_name %}} CLI for {{% variables/platform_prod_name %}}

## Fixes

* #5626: Concurrent writes to same model file causes server to crash
* #5641: Error "Not possible to find intersection inside of the rectangle" when saving flow

## Release notes

* #5626: Previously, creating multiple models very quickly could cause model file corruption. Now, concurrency is handled correctly.
* #5641: Previously, using **Save and exit** in the Flow editor would successfully save the Flow and emit a console error, "Not possible to find intersection inside of the rectangle". Now, no error is emitted.

## Updated modules

* [@axway/api-builder-runtime@4.11.12](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.11.12)
* [@axway/api-builder-admin@1.10.9](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.10.9)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@2.5.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.5.0)

{{% releasenotes/previous %}}
