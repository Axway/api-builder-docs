---
title: Standalone - Barcelona
linkTitle: Standalone - Barcelona
weight: 320
date: 2021-03-02
---

## Summary

This release includes:

* [Upgrade](#upgrade)

* [Features](#features)

* [Fixes](#fixes)

* [Release Notes](#release-notes)

* [New Deprecations](#new-deprecations)

* [Updated Modules](#updated-modules)

* [Known Issues](#known-issues)

## Upgrade

To update an existing {{% variables/apibuilder_prod_name %}} Standalone application, execute the following command from within the application directory:

```bash
npm update
```

## Features

* [#5994:](#5994) Add API for arrowPing.json to improve ARS compatibility

* [#6024:](#6024) Connector models generate friendlier API

* [#6068:](#6068) Support development environment file

## Fixes

* [#6036:](#6036) MBS connector errors leave {{% variables/apibuilder_prod_name %}} hanging due to uncleared interval

* [#6075:](#6075) Save and mock admin API swallows up errors

## Release Notes

* #5994: Improved compatibility with ARS by including the default ARS healthcheck endpoint "/arrowPing.json". This behaves identically to "/apibuilderPing.json" and can be overridden in the same way.

* #6024: Previously, {{% variables/apibuilder_prod_name %}} would generate API for models that originate from connectors in a way that included a slash, e.g. "oracle/user", and would generate an API that URL encodes "oracle/user" as `/api/oracle%2Fuser/query`. Now, the slash between the connector name and model name is preserved and will render as `/api/oracle/user/query`. See deprecation [#15](#15).

* #6036: Previously, if data connectors failed to connect to a data source, the actual error may be lost behind a "callback called twice" error. Now, the original error is kept and the callback is not called twice.

* #6068: {{% variables/apibuilder_prod_name %}} now supports the ability to load a `.env` file containing environment variables to assist in running services with development-specific values. New projects are scaffolded with an example `.env` file in the `./conf` directory. For further information, see: [Environmentalization Guide](/docs/how_to/environmentalization/).

* #6068: Projects will no longer be scaffolded with nyc as a dependency.

* #6075: Previously, errors during Endpoint creation and mocking may be swallowed up and unclear. Now, the cause of the error is logged.

## New Deprecations

* #15 Model names which are prefixed with their connector name (in other words, oracle/user) will no longer have the slash encoded as %2F in auto-generated API paths. This will be the default behavior for all new services. For information on how to be prepared for the change, and to start using the new behavior now, refer to [Change in the way model name with connector prefix is encoded in paths](/docs/deprecations/change_in_the_way_model_name_with_connector_prefix_is_encoded_in_paths/).

## Updated modules

* [@axway/api-builder-runtime@4.16.2](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.16.2)

* [@axway/api-builder-admin@1.10.33](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.10.33)

* [@axway/api-builder@4.11.1](https://www.npmjs.com/package/@axway/api-builder/v/4.11.1)

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
