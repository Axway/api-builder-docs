---
title: Unna release notes
linkTitle: Unna
description: 26 August 2022
date: 2022-08-26
Hide_readingtime: true
---
## Summary

In this release, we continued our effort on providing the necessary information to users to keep their applications up to date. With this release, all upgrades that are available to the {{% variables/apibuilder_prod_name %}} Core and the installed plugin components in their services will be now shown alongside any potential updates in the [**Updates** tab](/docs/developer_guide/console/#updates-tab).

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features
* #7405: Projects will now check for upgrades on startup, and they are displayed in the [**Updates** tab](/docs/developer_guide/console/#updates-tab).
* #7498: Added new metrics to [@axway/api-builder-plugin-prometheus](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus) for 'nodejs_active_resources' and 'nodejs_active_resources_total'.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
## Updated modules
* [@axway/amplify-api-builder-cli@6.3.8](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/6.3.8)
* [@axway/api-builder@6.3.8](https://www.npmjs.com/package/@axway/api-builder/v/6.3.8)
* [@axway/api-builder-admin@1.68.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.68.0)
* [@axway/api-builder-runtime@4.93.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.93.0)
* [@axway/api-builder-openapi-upgrade@1.0.10](https://www.npmjs.com/package/@axway/api-builder-openapi-upgrade/v/1.0.10)

## Updated plugins
* [@axway/api-builder-plugin-dc-oracle@3.3.2](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/3.3.2)
* [@axway/api-builder-plugin-fn-base64@4.1.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/4.1.5)
* [@axway/api-builder-plugin-fn-json@4.1.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/4.1.5)
* [@axway/api-builder-plugin-fn-swagger@3.2.7](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/3.2.7)
* [@axway/api-builder-plugin-prometheus@1.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus/v/1.2.0)

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
