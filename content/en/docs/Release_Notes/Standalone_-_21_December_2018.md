---
title: Standalone - Kobe
linkTitle: Standalone - Kobe
weight: 490
date: 2021-03-02
---

## Summary

This release includes:

* [Features](#features)

* [Fixes](#fixes)

* [Release Notes](#release-notes)

* [Updated Modules](#updated-modules)

* [Plugins](#updated-plugins)

* [Known Issues](#known-issues)

## Features

* [#5155:](#5155) Add a nav badge to attract attention to credential errors

* [#5357:](#5357) Clarify next steps to take when viewing an invalid credential

## Fixes

* [#5388:](#5388) Fix server error when rendering endpoints with path parameters defined using $ref pointers

* [#5389:](#5389) Endpoint headers are too verbose and unclear

* [#5393:](#5393) Importing API causes {{% variables/apibuilder_prod_name %}} to exit

* [#5394:](#5394) Fix issue where API Key credential with an empty string value is resolved as null

## Release Notes

* #5155: Introduced notification badges in the navigation menu to attract attention to Credentials that need attention.

* #5357: Add documentation links for credentials that were invalid or incomplete to clarify next steps to take.

* #5388: Previously, {{% variables/apibuilder_prod_name %}} console would fail to render imported endpoints with path parameters which were defined with a `$ref` pointer. Now, {{% variables/apibuilder_prod_name %}} console will render these endpoints correctly.

* #5389: Previously, messages describing "setting headers" would be logged out when getting a response from an endpoint. These logs were unclear and displayed duplicate information as the headers were also logged in the response. Now, these logs have been removed.

* #5393: Previously, Swagger files with invalid 'default' properties that do not match the type of the property they refer to were loaded successfully and were failing during endpoint invocation. Now, such Swagger files are not loaded successfully during initial file loading.

* #5394: Previously, an API key credential with a value of an empty string was resolved as '`null`'. Now, it is resolved as an empty string.

## Updated modules

* [@axway/api-builder-runtime@4.5.8](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.5.8)

* [@axway/api-builder-admin@1.5.5](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.5.5)

* [@axway/api-builder@4.4.3](https://www.npmjs.com/package/@axway/api-builder/v/4.4.3)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@2.0.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.0.5)

## Known Issues

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
