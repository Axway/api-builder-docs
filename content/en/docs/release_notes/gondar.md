---
title: Gondar release notes
linkTitle: Gondar
description: 11 February 2022
date: 2022-02-11
Hide_readingtime: true
---
## Summary

In this release, in {{% variables/apibuilder_prod_name %}}, we added support to view and resolve errors when re-importing an updated OpenAPI specification. We also added the ability to delete flows and automatically pan while connecting flow-nodes.

{{% releasenotes/upgrade %}}

## Breaking changes
* #7140: [@axway/api-builder-plugin-ft-oas](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas) now requires a minimum {{% variables/apibuilder_prod_name %}} version of Gondar.

## Features
* #7248: Added the ability to delete flows from the flow editor. The exception is that flows used by endpoints cannot be deleted.
* #7249: Added the ability to display flow-triggers errors when re-importing an API document.
* #7273: The flow graph will now pan towards the cursor while connecting flow-nodes and dragging outside the bounds of the editor.

<!-- ## Fixes -->

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
## Updated modules
* [@axway/api-builder-admin@1.53.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.53.0)
* [@axway/api-builder-runtime@4.82.2](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.82.2)

## Updated plugins
* [@axway/api-builder-plugin-ft-oas@0.10.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas/v/0.10.0)

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
