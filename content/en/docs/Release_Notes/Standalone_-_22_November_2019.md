---
title: Standalone - Ennis
linkTitle: Standalone - Ennis
weight: 290
date: 2021-03-02
---

## Summary

This release includes:

* [Upgrade](#upgrade)

* [Features](#features)

* [Fixes](#fixes)

* [Release Notes](#release-notes)

* [Deprecations](#deprecations)

* [Updated Modules](#updated-modules)

* [Plugins](#updated-plugins)

* [Known Issues](#known-issues)

## Upgrade

To update an existing {{% variables/apibuilder_prod_name %}} Standalone application, execute the following command from within the application directory:

```bash
npm update
```

## Features

* [#5643:](#5643) Filter get-catalog results to only Unified Catalog entries

* [#6092:](#6092) Fix sorting algorithm for bound paths

## Fixes

* [#6121:](#6121) API Key should be logged at debug, not info

* [#6126:](#6126) Builder CLI - Filter catalog items by swagger v2 type

## Release Notes

* #5643: The amplify builder CLI now supports filtering when downloading the API Catalog.

* #6092: Previously, APIs would be sorted and bound in an inconsistent order based on the load order and `sort` property, Node.js version, and other factors. Now, APIs will be always bound in a consistent order. Removed the explicit maximum supported Node.js version limitation. See deprecation [\[D037\]](#D037).

* #6121: Previously, on server startup the application's API Key was logged at the 'info' log level. Now, the API Key is logged at the 'debug' log level.

* #6126: Previously, Amplify Builder CLI fetched from the API Catalog all the available catalog items. Now, the CLI fetches only the items with API type.

## Deprecations

These are the deprecations introduced in this release. Click [here](/docs/deprecations/) for a list of all deprecations.

* **\[[D037](/docs/deprecations/#D037)\] Sort**: Creating an API or Route with the `sort` property is deprecated in favor of a more robust internal sort mechanism.

## Updated modules

* [@axway/amplify-api-builder-cli@1.2.1](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.2.1)

* [@axway/api-builder-runtime@4.17.11](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.17.11)

## Updated plugins

* [@axway/api-builder-plugin-dc-mssql@1.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/1.1.0)

* [@axway/api-builder-plugin-dc-oracle@3.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/3.0.0)

* [@axway/api-builder-plugin-fn-base64@2.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/2.1.0)

* [@axway/api-builder-plugin-fn-dot@2.1.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/2.1.0)

* [@axway/api-builder-plugin-fn-javascript@1.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/1.2.0)

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
