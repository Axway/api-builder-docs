---
title: Sydney release notes
linkTitle: Sydney
date: 2021-07-30
description: 30 July 2021
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6967: Released a new plugin @axway/api-builder-plugin-invoke-flow, which contains a flow-trigger and flow-nodes that can be used to invoke a flow once or multiple times, looping over an array of items. This succeeds the community plugins @alasdair/api-builder-plugin-invoke-flow and @api-builder-ext/api-builder-plugin-for-each. These community plugins have now been removed from the Plugins tab, and users should migrate to the new official plugin.

## Fixes

* #6905: Previously, when using {{% variables/apibuilder_prod_name %}} CLI `get-catalog` command, and prompted to pick from multiple accounts, the account list would feature service accounts (DOSA) which cannot be used for this purpose. Selecting one would fail with "Cannot destructure property 'org' of 'result' as it is null.". Now, service accounts will not be listed for selection.
* #6906: Previously, when using {{% variables/apibuilder_prod_name %}} CLI `get-catalog` command, and prompted to pick from multiple accounts, the account list would be covered up by a "Fetching API Catalog" spinner. Now, This spinner has been removed and all accounts are visible for selection.
* #6957: Previously, inbound HTTP request headers were fully logged to info level. Now, apikey and authorization header values are redacted in production.

## Updated modules

* [@axway/amplify-api-builder-cli@1.17.7](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.17.7)
* [@axway/api-builder@4.26.7](https://www.npmjs.com/package/@axway/api-builder/v/4.26.7)
* [@axway/api-builder-admin@1.44.10](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.44.10)
* [@axway/api-builder-runtime@4.67.4](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.67.4)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues).

{{% releasenotes/previous %}}
