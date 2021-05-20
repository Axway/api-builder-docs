---
title: Standalone - Sofia
linkTitle: Standalone - sofia
description: ADD A DESCRIPTION
weight: 460
date: 2021-05-17
---

## Summary

This release includes:

* [Upgrade](#upgrade)

* [Fixes](#fixes)

* [Release Notes](#release-notes)

* [Updated Modules](#updated-modules)

* [Plugins](#updated-plugins)

* [Known Issues](#known-issues)

## Upgrade

To update an existing {{% variables/apibuilder_prod_name %}} Standalone application, execute the following command from within the application directory:

```bash
npm update
```

## Fixes

* [#5650:](#5650) @axway/amplify-api-builder-cli readme mentions wrong package

* [#5662:](#5662) Fix issue corrupting files and stacking reloads on concurrent calls to Admin APIs

## Release Notes

* #5650: Previously, the readme for @axway/amplify-api-builder-cli incorrectly referenced itself as @axway/amplify-builder-cli. Now, this is corrected.

* #5662: Previously, {{% variables/apibuilder_prod_name %}} was not able to handle concurrent calls to admin APIs which modified the service, for example, edit model, and could corrupt the file being written. Multiple reloads could also happen subsequently. Now, admin APIs which modify the server cannot be called concurrently.

* #5662: Previously, {{% variables/apibuilder_prod_name %}} would allow API calls while the server was reloading and in an unstable state. Now, during reload requests will respond with 503.

## Updated modules

* [@axway/api-builder-runtime@4.11.18](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.11.18)

* [@axway/api-builder-admin@1.10.10](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.10.10)

* [@axway/api-builder@4.5.18](https://www.npmjs.com/package/@axway/api-builder/v/4.5.18)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@2.6.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.6.1)

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

* #5685: The following packages have a dependency on the [doT](https://www.npmjs.com/package/dot) npm module, which is vulnerable to command injection (see advisory [#798](https://www.npmjs.com/advisories/798)): [@axway/api-builder-plugin-fn-dot](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot), [@axway/api-builder-plugin-fn-base64](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64), [@axway/api-builder-plugin-fn-restclient](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient), [@axway/api-builder-plugin-fn-swagger](https://www.npmjs.com/package/@axway/@axway/api-builder-plugin-fn-swagger), and [axway-flow-sdk](https://www.npmjs.com/package/axway-flow-sdk).
