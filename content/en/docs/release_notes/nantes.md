---
title: Nantes release notes
linkTitle: Nantes
description: 20 May 2022
date: 2022-05-20
Hide_readingtime: true
---
## Summary
In this release we added an API for external discoverability of all the API documents that the {{% variables/apibuilder_prod_name %}} service exposes.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features
* #7348: Added an API for external discoverability of all the API documents that the {{% variables/apibuilder_prod_name %}} service exposes. This is accessible on the `apidoc.prefix` (default `/apidoc`). For more information see [API discoverability](/docs/best_practices/#api-discoverability).

## Fixes
* #7287: HTTP request/response logs and flow logs for [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) no longer have a different request-id for the same request.
* #7394: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now validates the encoded JSON body against the response schema instead of validating a pre-encoded JavaScript object body which may have different type parameters or extra keys, and could incorrectly fail validation.
* #7403: Fix issue with npm causing failure to start project after installing using npm version 6 or lower, or using the `--legacy-peer-deps` flag.
* #7413: Fix issue with [@axway/api-builder-plugin-fn-xslt](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-xslt) where XSLT error messages became less detailed.

{{% releasenotes/deprecations %}}

## Updated modules
* [@axway/amplify-api-builder-cli@3.3.3](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/3.3.3)
* [@axway/api-builder@6.3.3](https://www.npmjs.com/package/@axway/api-builder/v/6.3.3)
* [@axway/api-builder-admin@1.63.4](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.63.4)
* [@axway/api-builder-oas-flow-node@2.6.2](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node/v/2.6.2)
* [@axway/api-builder-runtime@4.91.1](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.91.1)
* [@axway/api-builder-sdk@1.2.1](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.2.1)
* [@axway/api-builder-test-utils@1.5.7](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.5.7)
* [@axway/api-builder-openapi-upgrade@1.0.5](https://www.npmjs.com/package/@axway/api-builder-openapi-upgrade/v/1.0.5)

## Updated plugins
* [@axway/api-builder-plugin-fn-base64@4.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/4.1.1)
* [@axway/api-builder-plugin-fn-javascript@3.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/3.1.1)
* [@axway/api-builder-plugin-fn-json@4.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/4.1.1)
* [@axway/api-builder-plugin-fn-restclient@2.2.2](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.2.2)
* [@axway/api-builder-plugin-fn-swagger@3.2.2](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/3.2.2)
* [@axway/api-builder-plugin-fn-mustache@1.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache/v/1.1.1)
* [@axway/api-builder-plugin-fn-xslt@3.3.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-xslt/v/3.3.0)
* [@axway/api-builder-plugin-fn-logger@1.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-logger/v/1.1.1)
* [@axway/api-builder-plugin-ft-oas@1.5.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas/v/1.5.0)

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
