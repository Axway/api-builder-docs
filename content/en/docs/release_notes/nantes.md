---
title: Nantes release notes
linkTitle: Nantes
description: 20 May 2022
date: 2022-05-20
Hide_readingtime: true
---
## Summary
Brief summary of the notable release contents.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features
* #7348: Added an API for external discoverability of all the API documents that the {{% variables/apibuilder_prod_name %}} service exposes. This is accessible on the `apidoc.prefix` (default `/apidoc`). For more information see [API discoverability](/docs/best_practices/_index.md#api_discoverability).

## Fixes
* #7287: HTTP request/response logs and flow logs for [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) no longer have a different request-id for the same request.
* #7394: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now  validates the encoded JSON body against the response schema instead of validating a pre-encoded JavaScript object body which may have different type parameters or extra keys, and could incorrectly fail validation.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
## Updated modules
* [@axway/amplify-api-builder-cli@3.3.3](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/3.3.3)
* [@axway/api-builder@6.3.3](https://www.npmjs.com/package/@axway/api-builder/v/6.3.3)
* [@axway/api-builder-runtime@4.89.1](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.89.1)
* [@axway/api-builder-openapi-upgrade@1.0.5](https://www.npmjs.com/package/@axway/api-builder-openapi-upgrade/v/1.0.5)

<!-- ## Updated plugins -->

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
