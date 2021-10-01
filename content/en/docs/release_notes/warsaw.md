---
title: Warsaw release notes
linkTitle: Warsaw
date: 2020-09-11
description: 11 September 2020
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6296: Added optional Advanced HTTP Options **Headers** parameter to Swagger plugin flow-nodes and custom OAS flow-nodes. This allows overriding headers, as well as defining any headers not in the OAS spec.
* #6485: Added Solace plugin to support publishing and subscribing to Solace topics.
* #6490: Added Kafka plugin to support publishing and subscribing to Kafka topics.
* #6549: Fixed regression with @axway/api-builder-plugin-fn-swagger where `basePath` could not be overridden in config for OAS2 documents.
* #6549: Add support to @axway/api-builder-plugin-fn-swagger for overriding an existing `basePath` with an empty string in config for OAS2 documents.

## Fixes

* #6519: Previously, when creating a new flow, clicking "Save and Exit" would not exit the Flow editor. Now, "Save and Exit" will work as expected.

## Updated modules

* [@axway/api-builder-admin@1.24.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.24.0)
* [@axway/api-builder-runtime@4.35.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.35.0)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@2.9.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.9.0)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues).

{{% releasenotes/previous %}}
