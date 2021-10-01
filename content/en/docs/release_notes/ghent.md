---
title: Ghent release notes
linkTitle: Ghent
date: 2019-12-20
description: 20 December 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6138: Introduce list of available and installed Connectors

## Fixes

* #6143: Make it easier to configure SSL
* #6144: Saving flow a second time causes an error that a flow already exists
* #6146: Composite model using SQL join having primary key does not return expected results
* #6153: Fix link to JavaScript flow-node

## Release notes

* #6138: Introduced a new feature that allows the easy discoverability of all existing {{% variables/apibuilder_prod_name %}} connectors and plugins. These {{% variables/apibuilder_prod_name %}} components are now accessible within the scaffolded application on the Connector's page.
* #6143: Configuration file now includes clear explanation and example of how to configure SSL.
* #6144: Previously, new flows would fail to save using _Apply_ a second time. Now, they save as expected.
* #6146: Previously, a composite model (A) that joins one model with another (B) where the name of the field being joined on B was the same name as the primary key for A, would fail to join as expected and return unpredictable results. Now, composite models will join as expected.

## Updated modules

* [@axway/amplify-api-builder-cli@1.2.5](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.2.5)
* [@axway/api-builder-runtime@4.20.1](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.20.1)
* [@axway/api-builder-admin@1.13.1](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.13.1)
* [@axway/api-builder@4.13.1](https://www.npmjs.com/package/@axway/api-builder/v/4.13.1)

## Updated plugins

* [@axway/api-builder-plugin-fn-javascript@1.2.2](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/1.2.2)


{{% releasenotes/previous %}}
