---
title: Oslo release notes
linkTitle: Oslo
date: 2020-05-20
description: 20 May 2020
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6396: Update CLI with latest SDK

## Fixes

* #6340: Update flow-node method on Model with ID that doesn't match any records fails to trigger "Not Found"
* #6369: CLI plugin init incorrectly parses hyphenated name

## Release notes

* #6340: Previously, When selecting a record by ID in a Model flow-node using the Update method, the "Not Found" output could never be triggered. Now, the "Not Found" output will be triggered when a valid id parameter does not match any records.
* #6369: Previously, when creating new plugins with hyphenated names such as `api-builder plugin init google-search`, the portion of the name before the first hyphen would be stripped, resulting in a flow-node name like `search`. Now, the flow-node name is generated as expected.
* #6396: Updated CLI to use latest SDK 0.6.0.

## Updated modules

* [@axway/amplify-api-builder-cli@1.5.0](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.5.0)
* [@axway/api-builder-sdk@0.6.0](https://www.npmjs.com/package/@axway/api-builder-sdk/v/0.6.0)
* [@axway/api-builder-runtime@4.27.22](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.27.22)
* [@axway/api-builder-admin@1.17.4](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.17.4)
* [@axway/api-builder@4.17.3](https://www.npmjs.com/package/@axway/api-builder/v/4.17.3)


{{% releasenotes/previous %}}
