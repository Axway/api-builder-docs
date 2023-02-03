---
title: Ellison release notes
linkTitle: Ellison
description: 02 February 2023
date: 2023-02-02
Hide_readingtime: true
---
## Summary
In this release, we fixed high security vulnerabilities with the package "jsonwebtoken".

{{% releasenotes/update %}}

<!-- ## Breaking changes -->

<!-- ## Features -->

## Fixes
* #7575: Fixed security issues in "jsonwbtoken" package - [CVE-2022-23540](https://nvd.nist.gov/vuln/detail/CVE-2022-23540) and [CVE-2022-23541](https://nvd.nist.gov/vuln/detail/CVE-2022-23541).

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
## Updated modules
* [@axway/api-builder-admin@5.0.4](https://www.npmjs.com/package/@axway/api-builder-admin/v/5.0.4)
* [@axway/api-builder-runtime@5.0.4](https://www.npmjs.com/package/@axway/api-builder-runtime/v/5.0.4)

<!-- ## Updated plugins -->

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}