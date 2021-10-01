---
title: Vancouver release notes
linkTitle: Vancouver
date: 2020-08-28
description: 28 August 2020
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}
## Fixes

* #6530: Improved Flow and Configuration editors to include a more prominent document title and help link.
* #6533: Previously, new flows created from the Flows tab would not be able to be run using the debugger within the flow editor. They also required env, config, and request (as an object type) to be provided by their flow-trigger. Now, these parameters are no longer required, and the debugger works out of the box.
* #6535: Added new info message to the flow editor to let users know the first steps to take when creating a flow, as well a as context-specific error message when the start node is disconnected.

## Updated modules

* [@axway/api-builder-admin@1.22.3](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.22.3)
* [@axway/api-builder-runtime@4.33.9](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.33.9)
* [@axway/api-builder-sdk@1.0.6](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.0.6)
* [@axway/api-builder-test-utils@1.1.3](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.1.3)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues).

{{% releasenotes/previous %}}
