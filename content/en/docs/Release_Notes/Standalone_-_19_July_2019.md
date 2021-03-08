---
title: Standalone - Xapuri
linkTitle: Standalone - Xapuri
weight: 360
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

To update an existing {{% variables/apibuilder_prod_name %}} Standalone application, execute the following command from within the application directory:

```bash
npm update
```

## Features

* [#5891:](#5891) Add editor for 'javascript' format Flow-Node parameters

## Fixes

* [#5922:](#5922) Fix incorrect examples when testing Endpoints

## Release Notes

* #5891: The UI now renders a specialized javascript editor with syntax highlighting for Flow-Node parameters which are defined with `"format": "javascript"` and `"type": "string"` in their schema.

* #5891: Flow-nodes now support defining wrapper text for `multiline` and `javascript` format parameters. The wrapper text is displayed in the parameter editor but will not be part of the value when saved in the flow. This is useful for when context or comments are needed. For more information, refer to [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).

* #5922: Previously, the example body that was shown when testing Endpoints could be incorrect and include schema snippets such as `$ref` or `anyOf`. Now, the example will better represent the expected body and will not include these schema snippets.

## Updated modules

* [@axway/api-builder-runtime@4.11.44](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.11.44)

* [@axway/api-builder-admin@1.10.18](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.10.18)

## Updated plugins

* [@axway/api-builder-plugin-fn-base64@2.0.10](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/2.0.10)

* [@axway/api-builder-plugin-fn-dot@2.0.10](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/2.0.10)

* [@axway/api-builder-plugin-fn-json@2.0.10](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/2.0.10)

* [@axway/api-builder-plugin-fn-javascript@1.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/1.0.0)

* [@axway/api-builder-plugin-fn-restclient@2.0.13](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.13)

* [axway-flow-sdk@3.2.0](https://www.npmjs.com/package/axway-flow-sdk/v/3.2.0)

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