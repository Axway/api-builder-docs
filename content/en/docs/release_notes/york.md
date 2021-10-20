---
title: York release notes
linkTitle: York
description: 22 October 2021
date: 2021-10-22
Hide_readingtime: true
---
## Summary
Brief summary of the notable release contents.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

<!-- ## Features -->

## Fixes

* #7100: Fixed an issue installing [@axway/amplify-api-builder-cli](https://www.npmjs.com/package/@axway/amplify-api-builder-cli) version `1.20.0` that resulted in the error "error syscall spawn git" when installing `git://github.com/wickedest/inquirer-checkbox-plus-prompt.git`.
* #7059: Fixed an issue in [@axway/api-builder-plugin-fn-swagger](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger) and [@axway/api-builder-oas-flow-node](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node) loading OAS spec with the error "Cannot convert undefined or null to object". The issue was encountered on OAS specs containing mixed references to component properties, e.g. `#/components/schemas/Pet/properties/name` and references to components, e.g. `#/components/schemas/Pet`.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
## Updated modules
* [@axway/amplify-api-builder-cli@1.20.1](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.20.1)
* [@axway/api-builder@4.27.3](https://www.npmjs.com/package/@axway/api-builder/v/4.27.3)
* [@axway/api-builder-runtime@4.70.8](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.70.8)

<!-- ## Updated plugins -->

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
