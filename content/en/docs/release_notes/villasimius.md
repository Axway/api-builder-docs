---
title: Villasimius release notes
linkTitle: Villasimius
description: 9 September 2022
date: 2022-09-09
Hide_readingtime: true
---
## Summary
In this release, we added smarter behavior when installing plugins, so that when your environment is not fully up-to-date, you will still get a working plugin version. We also provided a new way of testing your {{% variables/apibuilder_prod_name %}} service while being able to see and absorb test framework updates much more easily.

In this release, {{% variables/apibuilder_prod_name %}} v4 enters the maintenance phase for one year and will only receive security patches. See the [Release schedule](/docs/release_schedule) for more information about active and maintenance phases. We strongly recommend upgrading to the latest major version of {{% variables/apibuilder_prod_name %}}.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features
* #7470: [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils) now has a [`Runtime`](https://www.npmjs.com/package/@axway/api-builder-test-utils#runtime-api) feature that can be used to test an {{% variables/apibuilder_prod_name %}} project and significantly remove boilerplate code from project unit tests. Existing users are recommended to follow [this guide](/docs/updates/project_updates/2022_09_09_update_unit_tests_with_test_utils) to benefit from this feature.
* #7470: New projects now have a `devDependency` on [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils), and use the `Runtime` feature in unit tests.
* #7470: Updates to [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils) will now be displayed in the [_Updates_ tab](/docs/developer_guide/console/#updates-tab).
* #7406: When installing plugins from the _Plugins_ page, if the latest version of a plugin is not compatible with the current version of {{% variables/apibuilder_prod_name %}} or Node.js a previous compatible version will be installed instead, if possible. This feature only applies when using Node.js 12.13.0 and above.
* #7470: {{% variables/apibuilder_prod_name %}} has been updated to allow configuration from files in `./conf` to be overridden when creating a new `APIBuilder` instance by passing `configOverrides` as a key to the second `options` argument in the constructor.

## Fixes
* #7500: Fixed the unexpected re-rendering of UI components in the _API Doc & Test_ page after a restart.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
## Updated modules
* [@axway/amplify-api-builder-cli@6.4.0](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/6.4.0)
* [@axway/api-builder@6.4.0](https://www.npmjs.com/package/@axway/api-builder/v/6.4.0)
* [@axway/api-builder-admin@1.69.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.69.0)
* [@axway/api-builder-oas-flow-node@2.6.7](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/2.6.7)
* [@axway/api-builder-runtime@4.94.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.94.0)
* [@axway/api-builder-sdk@1.2.6](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.2.6)
* [@axway/api-builder-test-utils@1.6.0](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.6.0)
* [@axway/api-builder-openapi-upgrade@1.0.11](https://www.npmjs.com/package/@axway/api-builder-openapi-upgrade/v/1.0.11)

## Updated plugins
* [@axway/api-builder-plugin-fn-base64@4.1.6](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/4.1.6)
* [@axway/api-builder-plugin-fn-javascript@3.1.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/3.1.5)
* [@axway/api-builder-plugin-fn-json@4.1.6](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/4.1.6)
* [@axway/api-builder-plugin-fn-restclient@2.2.7](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.2.7)
* [@axway/api-builder-plugin-fn-swagger@3.2.8](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/3.2.8)
* [@axway/api-builder-plugin-fn-mustache@1.1.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache/v/1.1.5)
* [@axway/api-builder-plugin-fn-xslt@3.3.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-xslt/v/3.3.5)
* [@axway/api-builder-plugin-fn-logger@1.1.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-logger/v/1.1.5)
* [@axway/api-builder-plugin-ft-event@1.2.4](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-event/v/1.2.4)
* [@axway/api-builder-plugin-ft-solace@1.1.4](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-solace/v/1.1.4)
* [@axway/api-builder-plugin-ft-kafka@1.2.4](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka/v/1.2.4)
* [@axway/api-builder-plugin-ft-oas@1.6.6](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas/v/1.6.6)
* [@axway/api-builder-plugin-invoke-flow@1.2.4](https://www.npmjs.com/package/@axway/api-builder-plugin-invoke-flow/v/1.2.4)

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
