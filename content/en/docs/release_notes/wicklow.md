---
title: Wicklow release notes
linkTitle: Wicklow
description: 30 September 2022
date: 2022-09-30
Hide_readingtime: true
---
## Summary
Fixed a bug with `@axway/requester` on calculating the accurate `Content-Length` of the request `body`.

{{% releasenotes/update %}}

<!-- ## Breaking changes -->

<!-- ## Features -->

## Fixes
* #7538: Fixed a bug with `@axway/requester` module where the request content-length header was calculated incorrectly when the request body was a string that contains multi-byte characters.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
<!-- ## Updated modules -->

<!-- ## Updated plugins -->

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}