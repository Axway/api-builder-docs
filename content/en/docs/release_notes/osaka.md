---
title: Osaka release notes
linkTitle: Osaka
date: 2019-03-01
description: 1 March 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #5425: Support the ability to fix errors in Flows when a Flow-Node method ID changes
* #5454: Add the ability to execute Flows from within the Flow editor
* #5484: Support collapsing the Flow-Nodes panel in the Flow editor

## Fixes

* #5499: Create model with name containing invalid character will kill the server
* #5516: Provide model flow-node outputs and methods with friendly names
* #5526: Suppress "Translate this page?" prompt on Chrome
* #5539: API Example for web.js is incorrect
* #5545: HIGH vulnerability - All versions of \`handlebars\` are vulnerable to Prototype Pollution
* #5549: Moderate vulnerability lodash
* #5551: Changed field name gets reverted on composite model
* #5578: Update @axway/requester version in Swagger plugin

## Release notes

* #5425: Previously, it was difficult to know how to fix a Flow in the editor when a Flow-Node method which was in changed, rendering the Flow invalid. Now, the editor has been improved to show the friendly names of missing methods and outputs, and provide a useful error message.
* #5425: Previously, Flows would not be edited on disk when {{% variables/apibuilder_prod_name %}} performed any updates, and would require a manual edit before the changes persisted. Now, Flows will automatically be edited on disk if and when {{% variables/apibuilder_prod_name %}} makes any changes.
* #5454: Added the ability for Flows to be provided with parameters and executed without having to leave the Flow Editor. Click the **Bug** icon to start playing!
* #5484: The Flow-Nodes panel on the left of the Flow editor can now be collapsed to make more space to edit Flows.
* #5499: Previously, creating a Model with a name having any reserved ExpressJS regular expression characters `?`, `+`, `*`, `(`,or `)` could cause the server to fail to start, or could inadvertently cause a bound API to match unexpectedly. Now, the server will start and the API will match as expected. See deprecation {{% deprecation/link D012 %}}.
* #5516: Previously, the outputs and methods of Model flow-nodes did not have user-friendly names in the UI. Now, the displayed names are more user-friendly.
* #5526: Previously, the Chrome browser offered to translate {{% variables/apibuilder_prod_name %}} pages. Now, the Chrome browser will no longer offer to translate pages.
* #5539: Previously, API Endpoints examples for `node.js` and `web.js` were incorrect. Now, the displayed examples compile and are syntactically correct with respect to inputs, authentication, and responses.
* #5545: Previously, {{% variables/apibuilder_prod_name %}} had a dependency on handlebars library, which had a security vulnerability [755](https://www.npmjs.com/advisories/755) reported against it. Now, {{% variables/apibuilder_prod_name %}} is using a patched version of handlebars that fixes the vulnerability.
* #5549: Previously, {{% variables/apibuilder_prod_name %}} had a dependency on lodash and express-ipfilter libraries, which had a security vulnerabilities [782](https://nodesecurity.io/advisories/782) and [577](https://nodesecurity.io/advisories/577) reported against them, respectively. Now, {{% variables/apibuilder_prod_name %}} is using a patched version of lodash that fixes the vulnerability, and removed the express-ipfilter dependency.
* #5549: Your {{% variables/apibuilder_prod_name %}} projects have a direct dependency on a vulnerable nyc, used for code coverage. You should update nyc to the latest version (13.3.0 at the time of this release).
* #5551: Previously, when editing a composite model and change the name of a field, the field name gets reverted back to its original. Now, the changed field name persists through any other edit.

{{% releasenotes/deprecations %}}

## Updated modules

* [@axway/api-builder-runtime@4.8.6](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.8.6)
* [@axway/api-builder-admin@1.9.5](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.9.5)
* [@axway/api-builder@4.5.12](https://www.npmjs.com/package/@axway/api-builder/v/4.5.12)

## Updated plugins

* [@axway/api-builder-plugin-dc-mssql@1.0.5](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/1.0.5)
* [@axway/api-builder-plugin-dc-oracle@2.3.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/2.3.0)
* [@axway/api-builder-plugin-fn-restclient@2.0.2](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.2)
* [@axway/api-builder-plugin-fn-swagger@2.2.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.2.1)


{{% releasenotes/previous %}}
