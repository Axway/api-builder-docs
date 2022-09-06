---
title: Villasimius release notes
linkTitle: Villasimius
description: 9 September 2022
date: 2022-09-09
Hide_readingtime: true
---
## Summary
Brief summary of the notable release contents.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features
* #7406: When installing plugins from the **Plugins** page, if the latest version of a plugin is not compatible with the current version of {{% variables/apibuilder_prod_name %}} or Node.js a previous compatible version will be installed instead, if possible. This feature only applies when using Node.js 12.13.0 and above.
* #7470: {{% variables/apibuilder_prod_name %}} has been updated to allow configuration from files in `./conf` to be overridden when creating a new `APIBuilder` instance by passing `configOverrides` as a key to the second `options` argument in the constructor.
* #7470: Updates to [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils) will now be displayed in the [**Updates** tab](/docs/developer_guide/console/#updates-tab).
* #7470: [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils) now has a [`Runtime`](https://www.npmjs.com/package/@axway/api-builder-test-utils#runtime-api) feature that can be used to test an {{% variables/apibuilder_prod_name %}} project.
* #7470: New projects now have a `devDependency` on [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils), and use the `Runtime` feature in unit tests. Existing users should follow [this guide](/docs/updates/2022_09_09_update_unit_tests_with_test_utils) to find out how to benefit from the new feature.

## Fixes
* #7500: Fixed the unexpected re-rendering of UI components in the _API Doc & Test_ page after a restart.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
