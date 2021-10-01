---
title: Shanghai release notes
linkTitle: Shanghai
date: 2020-07-17
description: 17 July 2020
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6474: Added a new pluggable feature called flow-triggers that enables triggering flows from things other than API Endpoints, such as timers, events, queues, and more. Released our first flow-trigger plugin for invoking flows on a regular interval [@axway/api-builder-plugin-ft-timer](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-timer).

## Fixes

* #6294: Previously, {{% variables/apibuilder_prod_name %}} failed to authorize OAuth 2.0 credentials when the token URL had a non-JSON response by default. This would result in Github OAuth 2.0 requests failing with an error, "Unsupported mime-type: application/x-www-form-urlencoded; charset=utf-8". Now, {{% variables/apibuilder_prod_name %}} includes the `Accept: "application/json"` request header, so services such as Github, which support JSON responses, will now authorize successfully.
* #6323: Previously, while filtering the items from `get-catalog` to download, a fuzzy search was used that filtered and matched items that were seemingly inaccurate or unexpected. Now, it filters using consecutive letters and gives more accurate results, e.g. "er" will match APIs "Pattern" and "Manager".

## Updated modules

* [@axway/amplify-api-builder-cli@1.9.1](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.9.1)
* [@axway/api-builder@4.19.7](https://www.npmjs.com/package/@axway/api-builder/v/4.19.7)
* [@axway/api-builder-admin@1.18.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.18.0)
* [@axway/api-builder-runtime@4.29.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.29.0)

## Updated plugins

* [@axway/api-builder-plugin-ft-timer@0.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-timer/v/0.1.0)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues).

{{% releasenotes/previous %}}
