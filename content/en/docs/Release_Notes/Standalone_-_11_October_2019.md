---
title: Standalone - Cairo
linkTitle: Standalone - cairo
description: ADD A DESCRIPTION
weight: 360
date: 2021-05-17
---

## Summary

This release includes:

* [Upgrade](#upgrade)

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

## Fixes

* [#1835:](#1835) Deprecate the APIBuilder.remove\* methods

* [#4926:](#4926) Deprecate APIBuilder.debug

* [#4927:](#4927) Deprecate APIBuilder.app.locals

* [#5246:](#5246) Adjust custom inspect functions to work with newer Node versions

* [#6019:](#6019) Deprecate Model.reduce

* [#6020:](#6020) Deprecate Model.prototype.extend (extend a model instance)

* [#6026:](#6026) Document maximum supported Node.js version (10.x)

* [#6028:](#6028) Deprecate Codeblocks

* [#6038:](#6038) Always use full Connector name in Swagger operationIDs

* [#6053:](#6053) Deprecate Model "prefix"

* [#6072:](#6072) Deprecate @axway/api-builder-react-engine

* [#6079:](#6079) Deprecate Model.define

* [#6082:](#6082) Document deprecated Logger functions

* [#6084:](#6084) Deprecate APIBuilder.get

* [#6085:](#6085) Deprecate APIBuilder.pluralize and singularize

* [#6086:](#6086) Deprecate Model.fields\[name\].optional and API.parameters\[name\].optional

* [#6097:](#6097) Enabling plugin authentication denies access to /console

## Release Notes

* #1835: APIBuilder.removeModel, APIBuilder.removeConnector, APIBuilder.removeBlock, APIBuilder.removeAPI, APIBuilder.removeAPIByFilename, APIBuilder.removeRoute functions are deprecated, and will now generate a deprecation warning. They will be removed in a future version of the product. See deprecations [\[D018\]](#D018), [\[D019\]](#D019), [\[D020\]](#D020), [\[D021\]](#D021), [\[D022\]](#D022), [\[D023\]](#D023).

* #4926: APIBuilder.debug is deprecated, and will now generate a deprecation warning. It will be removed in a future version of the product. See deprecation [\[D027\]](#D027).

* #4927: APIBuilder.app.locals is deprecated, and will now accessing appc_external_url, appc_external_apidoc_path_legacy, appc_external_apidoc_path, or appc_external_apidoc_url will generate a deprecation warning. They will be removed in a future version of the product. See deprecation [\[D026\]](#D026).

* #5246: Previously, using `util.inspect` to inspect {{% variables/apibuilder_prod_name %}} components such as the {{% variables/apibuilder_prod_name %}} app, models, or connectors, would emit the deprecation message "`[DEP0079] DeprecationWarning: Custom inspection function on Objects via .inspect() is deprecated`" with Node.js >10.0.0 and returns a different string with Node.js >11.0.0. Now, the deprecation warning is no longer emitted.

* #6019: Model instance `reduce` and `APIBuilder.Model.reduce` functions are deprecated, and will now generate a deprecation warning. They will be removed in a future version of the product. See deprecation [\[D017\]](#D017).

* #6020: Extending a model instance (Model.prototype.extend) is deprecated and will now generate a deprecation warning. It will be removed in a future version of the product. Instead, use Model.extend. See deprecation [\[D025\]](#D025).

* #6026: The maximum supported Node.js version (10.x) is now specified within the docs and package.json

* #6028: Codeblocks are deprecated, and will now generate a deprecation warning. They will be removed in a future version of the product. See deprecation [\[D028\]](#D028).

* #6038: Previously, `operationId` fields of generated Model APIs using Connectors with aliases prefixed with "appc." would contain the Connector alias with this prefix removed. Now, `operationId` fields will contain the full Connector alias.

* #6053: Creating Models with the `prefix` property has been deprecated and will generate a deprecation warning on use. See deprecation [\[D024\]](#D024).

* #6072: [@axway/api-builder-react-engine](https://www.npmjs.com/package/@axway/api-builder-react-engine) has been deprecated and is no longer supported. See deprecation [\[D029\]](#D029).

* #6079: Model.define is deprecated, and will now generate a deprecation warning. It will be removed in a future version of the product. See deprecation [\[D016\]](#D016).

* #6082: `APIBuilder.logger.stripColors` is deprecated, and will now generate a deprecation warning. It will be removed in a future version of the product. See deprecation [\[D033\]](#D033).

* #6082: `Logger.createDefaultLogger` is deprecated, and will now generate a deprecation warning. It will be removed in a future version of the product. See deprecation [\[D034\]](#D034).

* #6082: `Logger.createRestifyLogger` is deprecated, and will now generate a deprecation warning. It will be removed in a future version of the product. See deprecation [\[D035\]](#D035).

* #6084: `APIBuilder.get` is deprecated, and will now generate a deprecation warning. It will be removed in a future version of the product. See deprecation [\[D030\]](#D030).

* #6085: `APIBuilder.pluralize` is deprecated, and will now generate a deprecation warning. It will be removed in a future version of the product. See deprecation [\[D031\]](#D031).

* #6085: `APIBuilder.singlularize` is deprecated, and will now generate a deprecation warning. It will be removed in a future version of the product. See deprecation [\[D032\]](#D032).

* #6086: Using the `optional` property on Model fields and API parameters has been deprecated and will generate a deprecation warning on use. See deprecation [\[D021\]](#D021).

* #6097: Previously, when plugin authentication was configured and the mechanism did not define a `matchURL` method, the server would incorrectly require authentication for public paths. Now, public paths are accessible when using plugin authentication.

## Deprecations

These are the deprecations introduced in this release. Click [here](/docs/deprecations/) for a list of all deprecations.

* **\[[D016](/docs/deprecations/#D016)\] Model.define**: `Model.define` is deprecated and will be removed in a future version of the product. Use `Model.extend` or `APIBuilder.createModel` instead.

* **\[[D017](/docs/deprecations/#D017)\] Model instance reduce and APIBuilder.Model.reduce**: Reducing a Model instance (i.e. `Model.prototype.reduce`) and `APIBuilder.Model.reduce` are deprecated and will be removed in a future version of the product. For more information on how to be prepared for the change, refer to [Removal of the Model instance reduce and APIBuilder.Model.reduce functions](/docs/deprecations/removal_of_the_model_instance_reduce_and_apibuilder.model.reduce_functions/).

* **\[[D018](/docs/deprecations/#D018)\] APIBuilder.removeModel**: `APIBuilder.removeModel` is deprecated and will be removed in a future version of the product.

* **\[[D019](/docs/deprecations/#D019)\] APIBuilder.removeConnector**: `APIBuilder.removeConnector` is deprecated and will be removed in a future version of the product.

* **\[[D020](/docs/deprecations/#D020)\] APIBuilder.removeBlock**: `APIBuilder.removeBlock` is deprecated and will be removed in a future version of the product.

* **\[[D021](/docs/deprecations/#D021)\] APIBuilder.removeAPI**: `APIBuilder.removeAPI` is deprecated and will be removed in a future version of the product.

* **\[[D022](/docs/deprecations/#D022)\] APIBuilder.removeAPIByFilename**: `APIBuilder.removeAPIByFilename` is deprecated and will be removed in a future version of the product.

* **\[[D023](/docs/deprecations/#D023)\] APIBuilder.removeRoute**: `APIBuilder.removeRoute` is deprecated and will be removed in a future version of the product.

* **\[[D024](/docs/deprecations/#D024)\] Model prefix**: Creating a Model with the `prefix` property is deprecated and will be removed in a future version of the product. See [Removal of Model prefix](/docs/deprecations/removal_of_model_prefix/).

* **\[[D025](/docs/deprecations/#D025)\] Model.prototype.extend**: Extending a model instance (i.e. `Model.prototype.extend`) is deprecated and will be removed in a future version of the product. Use `Model.extend` instead.

* **\[[D026](/docs/deprecations/#D026)\] APIBuilder.app.locals**: A`PIBuilder.app.locals` properties `appc_external_url`, `appc_external_apidoc_path_legacy`, `appc_external_apidoc_path`, or `appc_external_apidoc_url` are deprecated and will be removed in a future version of the product.

* **\[[D027](/docs/deprecations/#D027)\] APIBuilder.debug**: A`PIBuilder.debug` is deprecated and will be removed in a future version of the product.

* **\[[D028](/docs/deprecations/#D028)\] Codeblocks**: [Codeblocks](/docs/developer_guide/flows/flow-nodes/codeblock_flow-node/) are deprecated and will be removed in a future version of the product. For more information on how to be prepared for the change, refer to [Removal of Codeblocks](/docs/deprecations/removal_of_codeblocks/).

* **\[[D029](/docs/deprecations/#D029)\] @axway/api-builder-react-engine**: [@axway/api-builder-react-engine](https://www.npmjs.com/package/@axway/api-builder-react-engine) is deprecated and will not receive any updates. If you are currently using Web Routes, consider switching to another modern web application architecture for your front end that consumes {{% variables/apibuilder_prod_name %}} Service APIs.

* **\[[D030](/docs/deprecations/#D030)\] APIBuilder.get**: `APIBuilder.get`is deprecated and will be removed in a future version of the product.

* **\[[D031](/docs/deprecations/#D031)\] APIBuilder.pluralize**: `APIBuilder.pluralize`is deprecated and will be removed in a future version of the product. Use the pluralize module instead.

* **\[[D032](/docs/deprecations/#D032)\] APIBuilder.singularize**: `APIBuilder.singularize`is deprecated and will be removed in a future version of the product. Use the pluralize module instead.

* **\[[D033](/docs/deprecations/#D033)\] APIBuilder.logger.stripColors**: `APIBuilder.logger.stripColors`is deprecated and will be removed in a future version of the product.

* **\[[D034](/docs/deprecations/#D034)\] Model.fields\[name\].optional and API.parameters\[name\].optional**: Using the `optional` property on Model fields and API parameters is deprecated and will be ignored in a future version of the product. Use the `required` property instead.

* **\[[D035](/docs/deprecations/#D035)\] Logger.createDefaultLogger**: The static function `Logger.createDefaultLogger`is deprecated and will be removed in a future version of the product.

* **\[[D036](/docs/deprecations/#D036)\] Logger.createRestifyLogger**: The static function `Logger.createRestifyLogger`is deprecated and will be removed in a future version of the product.

## Updated modules

* [@axway/amplify-api-builder-cli@1.1.5](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.1.5)

* [@axway/api-builder-runtime@4.16.19](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.16.19)

* [@axway/api-builder-admin@1.10.40](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.10.40)

* [@axway/api-builder@4.11.3](https://www.npmjs.com/package/@axway/api-builder/v/4.11.3)

## Updated plugins

* [@axway/api-builder-plugin-dc-mssql@1.0.13](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/1.0.13)

* [@axway/api-builder-plugin-dc-oracle@2.3.11](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/2.3.11)

* [@axway/api-builder-plugin-fn-base64@2.0.14](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/2.0.14)

* [@axway/api-builder-plugin-fn-dot@2.0.15](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/2.0.15)

* [@axway/api-builder-plugin-fn-javascript@1.1.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/1.1.3)

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
