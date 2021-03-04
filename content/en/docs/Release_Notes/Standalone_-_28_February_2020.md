---
title: Standalone - Jackson
linkTitle: Standalone - Jackson
weight: 240
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

Before updating, we recommend deleting package-lock.json if it exists.

To update an existing {{% variables/apibuilder_prod_name %}} Standalone application, execute the following command from within the application directory:

```bash
npm update
```

## Features

* [#6215:](#6215) Support async/promise action functions in flow-nodes

* [#6220:](#6220) Update image for bundled Dockerfile

* [#6225:](#6225) Deprecate use of Node.js v10 and all unmaintained versions (v8, v9, v11)

## Fixes

* [#6186:](#6186) Reduce log level of admin api calls to trace

* [#6238:](#6238) Plugin SDK deletes falsy \`description\` field for flow-node methods but it is required

## Release Notes

* #6186: Previously, request and response logs for {{% variables/apibuilder_prod_name %}} admin were logged at info level and would pollute the console making API and Endpoint logs difficult to debug during development. Now, they are logged at trace level.

* #6186: The logRequest and logResponse functions of the scoped {{% variables/apibuilder_prod_name %}} logger have been deprecated. See deprecation [\[D041\]](#D041).

* #6215: Previously, the flow engine only supported standard functions as actions. Now, async functions are also supported.

* #6220: Updated the Dockerfile in newly created projects to use the latest Node.js 12 LTS image instead of Node.js 8, which is out of support.

* #6225: Using {{% variables/apibuilder_prod_name %}} with Node.js v8, v9 and v11 have been deprecated due to security concerns and because it is no longer maintained. Compatibility with Node.js v8.9.0+ will be maintained in all {{% variables/apibuilder_prod_name %}} v4 releases. Going forward, {{% variables/apibuilder_prod_name %}} will no longer support or recommend any future Node.js version which is no longer maintained. See deprecation [\[D039\]](#D039).

* #6225: Using {{% variables/apibuilder_prod_name %}} with Node.js v10 has been deprecated. See deprecation [\[D040\]](#D040).

* #6238: Previously, with [@axway/api-builder-sdk](https://www.npmjs.com/package/@axway/api-builder-sdk), it was possible to create flow-nodes that would fail to validate if a method was created with an empty or undefined `description`. Now, method `description` will be set to empty string instead.

## Deprecations

These are the deprecations introduced in this release. Click [here](/docs/deprecations/) for a list of all deprecations.

* **\[[D039](/docs/deprecations/#D039)\] Unmaintained Node.js versions**: All unmaintained Node.js versions (e.g. 8, 9 and 11) have been deprecated due to security issues. Use the latest Node.js LTS instead. See {{% variables/apibuilder_prod_name %}}'s [Node.js support policy](/docs/node.js_support_policy/). This also applies to any future unmaintained versions. While these versions are unrecommended, compatibility will be maintained for all {{% variables/apibuilder_prod_name %}} v4 releases.

* **\[[D040](/docs/deprecations/#D040)\] Node.js v10**: Node.js v10 has been deprecated. Use the latest Node.js LTS instead. See {{% variables/apibuilder_prod_name %}}'s [Node.js support policy](/docs/node.js_support_policy/). While this version is unrecommended, compatibility will be maintained for all {{% variables/apibuilder_prod_name %}} v4 releases.

* **\[[D041](/docs/deprecations/#D041)\] loggger.logRequest and logger.logResponse**: the `logRequest` and `logResponse` functions on the {{% variables/apibuilder_prod_name %}} logger are deprecated an will be removed in a future version of the product.

## Updated modules

* [@axway/amplify-api-builder-cli@1.2.7](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.2.7)

* [@axway/api-builder-sdk@0.2.0](https://www.npmjs.com/package/@axway/api-builder-sdk/v/0.2.0)

* [@axway/api-builder-runtime@4.25.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.25.0)

* [@axway/api-builder-admin@1.15.2](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.15.2)

* [@axway/api-builder@4.16.0](https://www.npmjs.com/package/@axway/api-builder/v/4.16.0)

## Updated plugins

* [@axway/api-builder-plugin-fn-javascript@1.2.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/1.2.3)

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
