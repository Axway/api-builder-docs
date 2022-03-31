---
title: Kabul release notes
linkTitle: Kabul
description: 8 April 2022
date: 2022-04-08
Hide_readingtime: true
---
## Summary

Brief summary of the notable release contents.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features

* #7268: Prevents OpenAPI specification flow-triggers from being deleted in the flow editor.
* #7268: Hides Flow-Triggers in Flow-Node panel when editing flows that are bound to OpenAPI specifications.
* #7268: Hides OpenAPI flow-triggers from the list of Flow-Triggers in Flow-Node panel when editing flows.

## Fixes

* #7347: Updated [json-schema-faker](https://www.npmjs.com/package/json-schema-faker) to address npm-audit security issue #1067281 with sabotaged [faker](https://www.npmjs.com/package/faker) module.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
<!-- ## Updated modules -->

<!-- ## Updated plugins -->

## Known issues

For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
