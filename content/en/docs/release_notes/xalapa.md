---
title: Xalapa release notes
linkTitle: Xalapa
description: 8 October 2021
date: 2021-10-08
Hide_readingtime: true
---
## Summary
In this release, performance has been improved for new projects and dependencies have been updated. Our documentation is now [open source](https://github.com/Axway/api-builder-docs).

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features
* #7049: The {{% variables/apibuilder_prod_name %}} documentation is now [open source](https://github.com/Axway/api-builder-docs) and is now accessible from https://docs.axway.com/bundle/api-builder.
* #7071: New {{% variables/apibuilder_prod_name %}} projects will now depend on `mocha@^9.12`.
* #7072: Previously, new {{% variables/apibuilder_prod_name %}} projects were created with a "web" folder to serve static resources alongside APIs. Now, new projects will no longer have the "web" folder for performance reasons. To serve static files, the user must opt-in by creating the folder manually. If your service is not serving static files or using {{% variables/apibuilder_prod_name %}} Web, you can safely delete the "web" folder to improve performance.

<!-- ## Fixes -->

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
<!-- ## Updated modules -->

<!-- ## Updated plugins -->

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues).

{{% releasenotes/previous %}}
