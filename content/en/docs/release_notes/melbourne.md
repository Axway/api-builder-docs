---
title: Melbourne release notes
linkTitle: Melbourne
date: 2019-02-01
description: 1 February 2019
Hide_readingtime: true
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

* [#5436:](#5436) Support Parameter Groups in flow-nodes and Flow editor
* [#5478:](#5478) Support apikey authentication in API Doc and Test for Endpoints

## Fixes

* [#5442:](#5442) Fix CORS for API with path parameters
* [#5448:](#5448) Apply CORS to static resources
* [#5474:](#5474) Update Dockerfile with correct file permissions in template
* [#5485:](#5485) Regression in Swagger plugin validation

## Release notes

* #5436: Previously, all parameters in the flow editor were rendered in a single group. Now, related parameters can be grouped together in collapsible panels by using the [axway-flow-sdk](https://www.npmjs.com/package/axway-flow-sdk).
* #5442: Previously, CORS requests were not working correctly on APIs that are bound on paths with parameters. Now, CORS is behaving correctly for these cases.
* #5448: Previously, if CORS was enabled in the application, the static files were not served with the correct headers. Now, the appropriate headers are attached.
* #5474: Previously, when building a Docker image using the default Dockerfile, there was a failure on macOS Mojave due to insufficient rights when copying the application into the app directory, and OS would succeed to create the container, but had incorrect file permissions that would disallow write. Now, new services are created with an updated Dockerfile which allows the image to be created successfully.
* #5478: Previously, the Test API functionality for endpoints would not work correctly when the service auth strategy was changed from 'basic'. Now, it works with the 'apikey' strategy too.

## Updated modules

* [@axway/api-builder-runtime@4.6.26](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.6.26)
* [@axway/api-builder-admin@1.6.1](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.6.1)
* [@axway/api-builder@4.5.5](https://www.npmjs.com/package/@axway/api-builder/v/4.5.5)

## Updated plugins

* [@axway/api-builder-plugin-dc-mongo@1.1.5](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mongo/v/1.1.5)
* [@axway/api-builder-plugin-dc-mssql@1.0.4](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/1.0.4)
* [@axway/api-builder-plugin-dc-mysql@2.2.4](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/2.2.4)
* [@axway/api-builder-plugin-dc-oracle@2.2.5](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/2.2.5)
* [@axway/api-builder-plugin-fn-base64@1.0.17](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/1.0.17)
* [@axway/api-builder-plugin-fn-dot@1.0.17](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/1.0.17)
* [@axway/api-builder-plugin-fn-json@1.0.17](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/1.0.17)
* [@axway/api-builder-plugin-fn-restclient@2.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.0)
* [@axway/api-builder-plugin-fn-swagger@2.1.4](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.1.4)
* [axway-flow-sdk@3.0.0](https://www.npmjs.com/package/axway-flow-sdk/v/3.0.0)

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
