---
title: Ulaanbaatar release notes
linkTitle: Ulaanbaatar
description: 26 August 2022
date: 2022-08-26
Hide_readingtime: true
---
## Summary

In this release weintroduced a way to provide unit-test improvements to users more easily.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features
* #7470: {{% variables/apibuilder_prod_name %}} has been updated to allow configuration from files in `/conf` to be overridden when creating a new `APIBuilder` instance by passing `configOverrides` as a key to the second `options` argument in the constructor.
* #7470: [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils) updates will now be displayed in the [**Updates** tab](/docs/developer_guide/console/#updates-tab).
* #7470: [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils) now has a [`Runtime`](TODO: add link to test utils readme when we add the documentation) feature that can be used to test a real {{% variables/apibuilder_prod_name %}} project.
* #7470: New projects now have a devDependency on [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils), and use the `Runtime` feature in unit tests. Existing users should follow [this guide](/docs/updates/2022_08_27_update_unit_tests_with_test_utils) to find out how to benefit from the new feature.

## Fixes

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->

## Updated modules

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}