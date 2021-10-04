---
title: Zams release notes
linkTitle: Zams
date: 2019-08-16
description: 16 August 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #5893: Replace doT with mustache flow-node

## Fixes

* #5679: arrow-orm fails on $like with val.replace error

## Release notes

* #5679: Previously, attempting to query a model where a field was filtered using $like and a non-string value (e.g. $like: 1) would cause a `TypeError: val.replace is not a function` exception to be thrown. Now, $like handles non-string values.
* #5893: Previously, {{% variables/apibuilder_prod_name %}} projects were bundled with [@axway/api-builder-plugin-fn-dot](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot) which was used to create string templates and objects, but it had a dependency with a security vulnerability (doT). Now, the dependency is removed and projects are bundled with [@axway/api-builder-plugin-fn-mustache](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache) for string templates, and the recommendation is to use [@axway/api-builder-plugin-fn-javascript](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript) for objects.

## Updated modules

* [@axway/api-builder-runtime@4.12.9](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.12.9)
* [@axway/api-builder-admin@1.10.26](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.10.26)
* [@axway/api-builder@4.9.0](https://www.npmjs.com/package/@axway/api-builder/v/4.9.0)

## Updated plugins

* [@axway/api-builder-plugin-fn-dot@2.0.13](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/2.0.13)

{{% releasenotes/previous %}}
