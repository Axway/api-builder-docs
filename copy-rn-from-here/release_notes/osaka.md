---
title: Osaka release notes
linkTitle: Osaka
date: 2019-03-01
description: 1 March 2019
Hide_readingtime: true
---

## Summary

This release includes:

* [Upgrade](#upgrade)
* [Features](#features)
* [Fixes](#fixes)
* [Release Notes](#release-notes)
* [New Deprecations](#new-deprecations)
* [Updated Modules](#updated-modules)
* [Plugins](#updated-plugins)
* [Known Issues](#known-issues)

## Upgrade

To update an existing {{% variables/apibuilder_prod_name %}} Standalone application, execute the following command from within the application directory:

```bash
npm update
```

## Features

* [#5425:](#5425) Support the ability to fix errors in Flows when a Flow-Node method ID changes
* [#5454:](#5454) Add the ability to execute Flows from within the Flow editor
* [#5484:](#5484) Support collapsing the Flow-Nodes panel in the Flow editor

## Fixes

* [#5499:](#5499) Create model with name containing invalid character will kill the server
* [#5516:](#5516) Provide model flow-node outputs and methods with friendly names
* [#5526:](#5526) Suppress "Translate this page?" prompt on Chrome
* [#5539:](#5539) API Example for web.js is incorrect
* [#5545:](#5545) HIGH vulnerability - All versions of \`handlebars\` are vulnerable to Prototype Pollution
* [#5549:](#5549) Moderate vulnerability lodash
* [#5551:](#5551) Changed field name gets reverted on composite model
* [#5578:](#5578) Update @axway/requester version in Swagger plugin

## Release notes

* #5425: Previously, it was difficult to know how to fix a Flow in the editor when a Flow-Node method which was in changed, rendering the Flow invalid. Now, the editor has been improved to show the friendly names of missing methods and outputs, and provide a useful error message.
* #5425: Previously, Flows would not be edited on disk when {{% variables/apibuilder_prod_name %}} performed any updates, and would require a manual edit before the changes persisted. Now, Flows will automatically be edited on disk if and when {{% variables/apibuilder_prod_name %}} makes any changes.
* #5454: Added the ability for Flows to be provided with parameters and executed without having to leave the Flow Editor. Click the **Bug** icon to start playing!
* #5484: The Flow-Nodes panel on the left of the Flow editor can now be collapsed to make more space to edit Flows.
* #5499: Previously, creating a Model with a name having any reserved ExpressJS regular expression characters `?`, `+`, `*`, `(`,or `)` could cause the server to fail to start, or could inadvertently cause a bound API to match unexpectedly. Now, the server will start and the API will match as expected. See deprecation [12](#12).
* #5516: Previously, the outputs and methods of Model flow-nodes did not have user-friendly names in the UI. Now, the displayed names are more user-friendly.
* #5526: Previously, the Chrome browser offered to translate {{% variables/apibuilder_prod_name %}} pages. Now, the Chrome browser will no longer offer to translate pages.
* #5539: Previously, API Endpoints examples for `node.js` and `web.js` were incorrect. Now, the displayed examples compile and are syntactically correct with respect to inputs, authentication, and responses.
* #5545: Previously, {{% variables/apibuilder_prod_name %}} had a dependency on handlebars library, which had a security vulnerability [755](https://www.npmjs.com/advisories/755) reported against it. Now, {{% variables/apibuilder_prod_name %}} is using a patched version of handlebars that fixes the vulnerability.
* #5549: Previously, {{% variables/apibuilder_prod_name %}} had a dependency on lodash and express-ipfilter libraries, which had a security vulnerabilities [782](https://nodesecurity.io/advisories/782) and [577](https://nodesecurity.io/advisories/577) reported against them, respectively. Now, {{% variables/apibuilder_prod_name %}} is using a patched version of lodash that fixes the vulnerability, and removed the express-ipfilter dependency.
* #5549: Your {{% variables/apibuilder_prod_name %}} projects have a direct dependency on a vulnerable nyc, used for code coverage. You should update nyc to the latest version (13.3.0 at the time of this release).
* #5551: Previously, when editing a composite model and change the name of a field, the field name gets reverted back to its original. Now, the changed field name persists through any other edit.

## New deprecations

* #12: Model names are now URI encoded as per [RFC-3986](https://www.ietf.org/rfc/rfc3986.txt) and the APIs that are auto-generated for models will bind to their URI equivalent. This will be the default behavior for all new services. For information on how to be prepared for the change, and to start using the new behavior now, refer to [Change in the way model name is encoded in URI](/docs/deprecations/change_in_the_way_model_name_is_encoded_in_uri/).

## Updated modules

* [@axway/api-builder-runtime@4.8.6](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.8.6)
* [@axway/api-builder-admin@1.9.5](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.9.5)
* [@axway/api-builder@4.5.12](https://www.npmjs.com/package/@axway/api-builder/v/4.5.12)

## Updated plugins

* [@axway/api-builder-plugin-dc-mssql@1.0.5](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/1.0.5)
* [@axway/api-builder-plugin-dc-oracle@2.3.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/2.3.0)
* [@axway/api-builder-plugin-fn-restclient@2.0.2](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.2)
* [@axway/api-builder-plugin-fn-swagger@2.2.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.2.1)

## Known issues

* #3825: Filtering the {{% variables/apibuilder_prod_name %}} Console administrator access using IPv6 addresses may cause ENOTFOUND errors.
* #3867: When attempting to create and save a flow for an imported Swagger endpoint that contains a path or paths defined by references, the save will fail.
* #3979: Attempting to delete an endpoint in the UI that was created as a result of dereferencing a JSON `$ref` will yield a 404 error. {{% variables/apibuilder_prod_name %}} will fail to locate the method since it only exists when the whole Swagger document is dereferenced. An example of a Swagger document using `$ref`:

    ```
    {
      "swagger": "2.0",
      "paths" {
        "x-path": {
          "get": {}
        },
        "/find": {
          "$ref": "#/paths/x-path"
        },
        "/search": {
          "$ref": "#/paths/x-path"
        }

      }
    }
    ```
* #4528: Initializing a new project with `api-builder init 1234` where `1234` is any number will throw an ERR_INVALID_ARG_TYPE error rather than an "invalid npm package name" error.
* #4595: When using a `distinct` API backed by the Memory connector and passing a `field` which does not exist on the model, the first record is returned instead of an error.
* #4735: Invoking Upsert will fail for all data connectors when creating a composite model from an existing model and renaming one of the fields.
* #4749: A query on a `distinct` API created from the Mongo plugin (`@axway/api-builder-plugin-dc-mongo`) does not honor the value of the `order` parameter.
* #4750: The Upsert or FindAndModify methods are not present in the APIs generated from Mongo or MySQL connector based models.
* #4751: The FindAndModify method from APIs created using the Mongo plugin (`@axway/api-builder-plugin-dc-mongo`) responds with a 404 error rather than creating a new entry when the `upsert` parameter is `true`.
* #4752: The format of a distinct query response depends on the type of connector.
* #4759: Calling Update or FindAndModify on a model that uses the composite connector and contains the required fields may fail and cause the server to terminate.
* #4795: The MongoDB plugin `@axway/api-builder-plugin-dc-mongo` does not support primary keys that are not object identifiers correctly. The MongoDB specification allows for primary keys of other types. As a result, trying to use the plugin will result in errors:

    ```
    { "message": "Invalid Value for Find By ID: "YOUR_STRING_PK_NAME", "success": false, "request-id": "c118f187-2090-4a68-b939-37367ac55b80" }
    ```
* #4813: If the endpoint Swagger file in the `/endpoints` folder contains special characters in its name, for example `[test].json`, the endpoint is not rendered correctly in the UI.
* #4856: Passing in an invalid column name as a parameter to APIs generated from data connectors may result in an exception being thrown rather than the callback being executed with an error. A similar error may occur when using model flow-nodes, resulting in an error which cannot be handled by the flow.
* #4859: When endpoints are generated from a model, the endpoint descriptions do not use the correct plurals defined by the model.
* #4865: The Swagger flow-node plugin strips characters from valid object definition names which can result in schema ID collisions.
* #4865: The Swagger flow-node plugin does not handle valid object definition names with `~` or `/` in their name which can result in an invalid schema references in Swagger flow-nodes.
* #4951: When endpoint or flow files with URL encoded characters in the filename are present in a project, unexpected errors may occur. For example, the wrong flow or endpoint could be modified. Using files with encoded characters in their names is not recommended.
* #4961: Having the `%` symbol in various file names can cause problems in the {{% variables/apibuilder_prod_name %}} Console and with direct linking. It is therefore advisable to avoid using `%` in API, Endpoint, Flow, Model, and Configuration file names. This is a result of an issue in react-router/history. For additional information, refer to [https://github.com/ReactTraining/history/issues/505](https://github.com/ReactTraining/history/issues/505).
* #4966: {{% variables/apibuilder_prod_name %}} will generate invalid Swagger for programmatic APIs in `./apis` that bind to a path other than the `apiPrefix` defined in the configuration. These APIs must be bound to the same root path as defined by the `apiPrefix`.
* #5538: A model with a single-quote "'foo" is a valid model name, but not a valid endpoint name, so the single-quote will be stripped when generating endpoints. If another model "foo" exists and has generated endpoints, then generating endpoints for "'foo" with single-quote, will overwrite existing endpoints for "foo". The following characters are stripped from model names: `"?", ":", "'",` and `"."`.
