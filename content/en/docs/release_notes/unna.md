---
title: Unna release notes
linkTitle: Unna
description: 26 August 2022
date: 2022-08-26
Hide_readingtime: true
---
## Summary

<<<<<<< HEAD
In this release, we continued our effort on providing the necessary information to users to keep their applications up to date. With this release, all upgrades that are available to the {{% variables/apibuilder_prod_name %}} Core and the installed plugin components in their services will be now shown alongside any potential updates in the [**Updates** tab](/docs/developer_guide/console/#updates-tab). We also introduced a way to provide unit-test improvements to users more easily.
=======
In this release weintroduced a way to provide unit-test improvements to users more easily.
>>>>>>> 08d4c54 (rename to unna)

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features
<<<<<<< HEAD

* #7405: Projects will now check for upgrades on startup, and they are displayed in the [**Updates** tab](/docs/developer_guide/console/#updates-tab).
* #7498: Added new metrics to [@axway/api-builder-plugin-prometheus](https://www.npmjs.com/package/@axway/api-builder-plugin-prometheus) for 'nodejs_active_resources' and 'nodejs_active_resources_total'.
=======
* #7470: {{% variables/apibuilder_prod_name %}} has been updated to allow configuration from files in `/conf` to be overridden when creating a new `APIBuilder` instance by passing `configOverrides` as a key to the second `options` argument in the constructor.
* #7470: [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils) updates will now be displayed in the [**Updates** tab](/docs/developer_guide/console/#updates-tab).
* #7470: [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils) now has a [`Runtime`](TODO: add link to test utils readme when we add the documentation) feature that can be used to test a real {{% variables/apibuilder_prod_name %}} project.
* #7470: New projects now have a devDependency on [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils), and use the `Runtime` feature in unit tests. Existing users should follow [this guide](/docs/updates/2022_08_27_update_unit_tests_with_test_utils) to find out how to benefit from the new feature.
>>>>>>> 08d4c54 (rename to unna)

## Fixes

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
<<<<<<< HEAD
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
=======

## Updated modules

<!-- ## Updated plugins -->
>>>>>>> 08d4c54 (rename to unna)

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
