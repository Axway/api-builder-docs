---
title: Ufa release notes
linkTitle: Ufa
date: 2020-08-14
description: 14 August 2020
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6509: Previously, model flow-nodes would abort the flow when they encountered an unexpected error from the database. Now, model-flow-nodes have an Error output that enables the flow developer to handle unexpected errors. See deprecation {{% deprecation/link D043 %}}.
* #6522: Added the ability to create new Flows. This is now available under the Flows tab in the Admin UI.
* #6522: Added the ability to edit a flow's name and description from the title bar of the flow editor.

## Fixes

* #6523: Previously, if a Model was configured to use a connector that was not installed as a dependency, the startup would fail with the error, _Cannot read property 'usage' of undefined_. Now, the startup will fail with a more informative error message, _Error loading connector connector-name for model: model-name. Couldn't find a connector named: connector-name_.

{{% releasenotes/deprecations %}}

## Updated modules

* [@axway/amplify-api-builder-cli@1.11.0](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.11.0)
* [@axway/api-builder@4.20.0](https://www.npmjs.com/package/@axway/api-builder/v/4.20.0)
* [@axway/api-builder-admin@1.21.1](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.21.1)
* [@axway/api-builder-runtime@4.33.1](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.33.1)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues).

{{% releasenotes/previous %}}
