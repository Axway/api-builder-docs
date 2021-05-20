---
title: Standalone - Quebec
linkTitle: Standalone - quebec
description: ADD A DESCRIPTION
weight: 480
date: 2021-05-17
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

* [#5440:](#5440) Support flow-node change of parameter name

* [#5602:](#5602) Fix Model responses to include null fields

## Fixes

* [#5547:](#5547) Fix crash when generating Endpoints for Models with names starting with colon

* [#5556:](#5556) Fix an issue displaying long default values of parameters in the Flow editor

* [#5577:](#5577) Fix crashes on concurrent restarts

## Release Notes

* #5440: Previously, when using updated Flow-nodes (or Swagger documents using the swagger plugin) with renamed or removed parameters, the Flow would be invalid and not editable or fixable without making manual edits. Now, these issues can be resolved in the Flow editor.

* #5547: Previously, generating endpoints for models with names starting with a colon ":" would emit an "Error loading endpoint" error on startup and exit. Now, generate endpoints works as expected. See deprecation [#14](#14).

* #5556: Previously, a regression caused the default value of parameters in the Flow editor to render in an unusable format such as \[Object object\] when the value was an object or array. Now, objects and arrays will be rendered in a JSON stringified format.

* #5577: Previously, the server would crash on concurrent reloads. Now, the server will process the first reload, and ignore reloads that occur concurrently.

* #5602: Previously, null fields from models would not be returned in responses such as findAll. Now, they will be included in the response. missing or undefined fields will behave the same. Use this feature is limited by connector support for null fields. See deprecation [#13](#13).

## New Deprecations

* #13: Queries on Models which have fields with `null` values can now return that field in the response rather than hiding the field. Support for this behavior is dependent on the connector being used. This will be the default behavior for all new services. For information on how to be prepared for the change, and to start using the new behavior now, refer to [Change in the way null fields are returned in Models](/docs/deprecations/change_in_the_way_null_fields_are_returned_in_models/).

* #14: Model names are now URI encoded as per [RFC-3986](https://www.ietf.org/rfc/rfc3986.txt) and the APIs that are created from Generate endpoints for models will bind to their URI equivalent. This will be the default behavior for all new services. For information on how to be prepared for the change, and to start using the new behavior now, refer to [Change in the way model name is encoded in S](/docs/deprecations/change_in_the_way_model_name_is_encoded_in_uri/)[wagger](/docs/deprecations/change_in_the_way_model_name_is_encoded_in_swagger/).

## Updated modules

* [@axway/api-builder-runtime@4.11.2](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.11.2)

* [@axway/api-builder-admin@1.10.2](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.10.2)

* [@axway/api-builder@4.5.17](https://www.npmjs.com/package/@axway/api-builder/v/4.5.17)

## Updated plugins

* [@axway/api-builder-plugin-dc-oracle@2.3.3](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/2.3.3)

* [@axway/api-builder-plugin-fn-swagger@2.4.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.4.0)

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

* #5538: A model with a single-quote "'foo" is a valid model name, but not a valid endpoint name, so the single-quote will be stripped when generating endpoints. If another model "foo" exists and has generated endpoints, then generating endpoints for "'foo" with single-quote, will overwrite existing endpoints for "foo". The following characters are stripped from model names: `"?", ":", "'",` and `"."`.
