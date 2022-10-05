---
title: Dickens release notes
linkTitle: Dickens
description: 7 October 2022
date: 2022-10-07
Hide_readingtime: true
---
## Summary
Fixed a bug with `@axway/requester` on calculating the accurate `Content-Length` of the request `body`.

{{% releasenotes/update %}}

<!-- ## Breaking changes -->

<!-- ## Features -->

## Fixes
* #7538: Fixed a bug calculating the accurate `Content-Length` of the request `body` that impacted a number of modules, including `@axway/api-builder-plugin-fn-restclient`, `@axway/api-builder-plugin-fn-swagger`, and `@axway/api-builder-oas-flow-node`.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
## Updated modules
* [@axway/api-builder-admin@5.0.3](https://www.npmjs.com/package/@axway/api-builder-admin/v/5.0.3)
* [@axway/api-builder-runtime@5.0.3](https://www.npmjs.com/package/@axway/api-builder-runtime/v/5.0.3)

<!-- ## Updated plugins -->

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
