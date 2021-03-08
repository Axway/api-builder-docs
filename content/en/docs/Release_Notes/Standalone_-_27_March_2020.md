---
title: Standalone - Kharkiv
linkTitle: Standalone - Kharkiv
weight: 230
date: 2021-03-02
---

## Summary

This release includes:

* [Upgrade](#upgrade)

* [Features](#features)

* [Fixes](#fixes)

* [Release Notes](#release-notes)

* [Updated Modules](#updated-modules)

* [Plugins](#updated-plugins)

* [Known Issues](#known-issues)

## Upgrade

Before updating, we recommend deleting package-lock.json if it exists.

To update an existing {{% variables/apibuilder_prod_name %}} Standalone application, execute the following command from within the application directory:

```bash
npm update
```

## Features

* [#5012:](#5012) Add authorization support to the {{% variables/apibuilder_prod_name %}} SDK

* [#6176:](#6176) Add support for community components

* [#6265:](#6265) Provide service directory to plugins

* [#6277:](#6277) Support OAS3 in api-builder-plugin-fn-swagger

## Fixes

* [#6252:](#6252) Builder emits Responses with no Request

* [#6283:](#6283) Fixed internal issues with dependencies

## Release Notes

* #5012: Added 'authorization' method in {{% variables/apibuilder_prod_name %}} SDK that allows defining the available authorizations for a method.

* #6176: Added support for listing plugins provided by community.

* #6252: Previously, requests from the UI for static resources would log a "Response" at info level (with no corresponding "Request"). Now, requests for UI static resources are logged at trace level.

* #6265: {{% variables/apibuilder_prod_name %}} now provides the service directory as `options.appDir` to plugins.

* #6277:[@axway/api-builder-plugin-fn-swagger](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger) now supports OAS 2 and OAS 3. Please see the [README](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger) for supported features.

* #6283: Fixed internal issues with dependencies.

## Updated modules

* [@axway/api-builder-sdk@0.2.1](https://www.npmjs.com/package/@axway/api-builder-sdk/v/0.2.1)

* [@axway/api-builder-runtime@4.27.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.27.0)

* [@axway/api-builder-admin@1.16.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.16.0)

## Updated plugins

* [@axway/api-builder-plugin-fn-restclient@2.0.20](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.20)

* [@axway/api-builder-plugin-fn-swagger@2.7.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.7.0)

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

* #4735: Invoking Upsert will fail for all data connectors when creating a composite model from an existing model and renaming one of the fields.

* #4749: A query on a `distinct` API created from the Mongo plugin (`@axway/api-builder-plugin-dc-mongo`) does not honor the value of the `order` parameter.

* #4750: The Upsert or FindAndModify methods are not present in the APIs generated from Mongo or MySQL connector based models.

* #4751: The FindAndModify method from APIs created using the Mongo plugin (`@axway/api-builder-plugin-dc-mongo`) responds with a 404 error rather than creating a new entry when the `upsert` parameter is `true`.

* #4752: The format of a distinct query response depends on the type of connector.

* #4759: Calling Update or FindAndModify on a model that uses the composite connector and contains the required fields may fail and cause the server to terminate.

* #4795: The MongoDB plugin `@axway/api-builder-plugin-dc-mongo` does not support primary keys that are not object identifiers correctly. The MongoDB specification allows for primary keys of other types. As a result, trying to use the plugin will result in errors:

    ```
    {
     "message": "Invalid Value for Find By ID: 'YOUR_STRING_PK_NAME'",
     "success": false,
     "request-id": "c118f187-2090-4a68-b939-37367ac55b80"
    }
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

* #6150: Stoplight always encodes default parameter values as strings, even though the type may not be a string (e.g. "number"). The Swagger validation will fail with an error, e.g. "Not a valid number". To work around the problem, you can manually change the parameter default from a string (e.g. `"42"`) to a number (e.g. `42`) by editing the Swagger directly, but that is not always an option. Alternatively, you can change the parameter type to a "string", and add a validation "pattern", e.g. `"[0-9]+"`.