---
title: Standalone - Fuji
linkTitle: Standalone - fuji
description: ADD A DESCRIPTION
weight: 590
date: 2021-05-17
---

## Summary

This release includes:

* [Fixes](#fixes)

* [Release Notes](#release-notes)

* [Updated Modules](#updated-modules)

* [Updated Plugins](#updated-plugins)

* [Known Issues](#known-issues)

## Fixes

* [#4050:](#4050) Fix rendering issue with SVG flow-node icons when using Firefox

* [#5064:](#5064) Improve the description of feature flag warnings in the CLI

* [#5070:](#5070) Allow condition node to compare empty strings

* [#5079:](#5079) Display a response body in Test API when the status code of the response is non-2xx

* [#5093:](#5093) Display a response body in Test API when the response body is "falsy"

* [#5096:](#5096) Fix issue where flow editor would stop responding when applying changes

## Release Notes

* #4050: Previously, when using Firefox, SVG flow-node icons in the flow editor may not be rendered or could appear stretched. Now, Firefox will display these icons correctly.

* #5064: Modified verbiage of feature flag warnings in the CLI to make them more descriptive.

* #5070: Previously, {{% variables/apibuilder_prod_name %}} would not allow you to use the condition node to compare against empty strings. Now, the value of the source and value parameters can both be empty strings.

* #5079: Previously, When using Test API to try an endpoint and a non-2xx response code was returned, the body and headers of the response would not be displayed. Now, The UI correctly displays the body and headers.

* #5093: Previously, APIs executed via the Test API would not display a response when the body was a falsy value such as 0 or false. Now, the response will be displayed for this type of value.

* #5096: Previously, applying flow changes multiple times would cause the flow editor to stop responding. Now, changes to flows can be applied as many times as needed without issue.

## Updated Modules

* [@axway/api-builder-runtime@4.2.32](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.2.32)

* [@axway/api-builder-admin@1.2.18](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.2.18)

* [@axway/api-builder@4.2.8](https://www.npmjs.com/package/@axway/api-builder/v/4.2.8)

## Updated Plugins

* [@axway/api-builder-plugin-fn-swagger@1.0.17](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/1.0.17)

## Known Issues

* #3825: Filtering the {{% variables/apibuilder_prod_name %}} Console administrator access using IPv6 addresses may cause ENOTFOUND errors.

* #3867: When attempting to create and save a flow for an imported Swagger endpoint that contains a path or paths defined by references the save will fail.

* #3960: {{% variables/apibuilder_prod_name %}} has issues with recognizing a required `consumes` value if anything is appended to it, for example `multipart/form-data; charset=utf-8`.

* #3979: Attempting to delete an endpoint in the UI that was created as a result of dereferencing a JSON $ref will yield a 404. {{% variables/apibuilder_prod_name %}} will fail to locate the method since it only exists when the whole Swagger document is dereferenced. An example of a Swagger document using $ref:

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

* #4280: Editing large object parameters on the API Orchestration page in the {{% variables/apibuilder_prod_name %}} Console may cause multiple, confusing flow-node configuration panel scrollbars to appear.

* #4528: Initializing new project with `api-builder init 1234` will throw an ERR_INVALID_ARG_TYPE error rather than "invalid npm package name".

* #4595: When using a `distinct` API backed by the Memory connector and passing a `field` which does not exist on the model, the first record is returned instead of an error.

* #4735: Invoking Upsert will fail for all data connectors when creating a composite model from an existing model and renaming one of the fields.

* #4736: Given a swagger with an extension, for example, on the [path item object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#pathItemObject), the Swagger flow-node plugin can fail to load the swagger file, resulting in an error:

    ```
    Error loading plugin: @axway/api-builder-plugin-fn-swagger. Cannot convert undefined or null to object
    ```

* #4749: A query on a `distinct` API created from the Mongo plugin (`@axway/api-builder-plugin-dc-mongo`) doesn't honor the value of the `order` parameter.

* #4750: Methods Upsert or FindAndModify are not present in APIs generated from a mongo/mysql connector based model.

* #4751: The FindAndModify method from APIs created using the Mongo plugin (`@axway/api-builder-plugin-dc-mongo`) responds with a 404 rather than creating a new entry when the `upsert` parameter is `true`.

* #4752: The format of a distinct query's response depends on the type of the connector.

* #4759: Calling Update or FindAndModify on a Model that uses the composite connector and contains required fields may fail and cause the server to terminate.

* #4795: The MongoDB plugin @axway/api-builder-plugin-dc-mongo does not correctly support primary keys that are not object identifiers. The MongoDB specification allows for primary keys of other types. As a result, trying to use the plugin will result in errors:

    ```
    { "message": "Invalid Value for Find By ID: "YOUR_STRING_PK_NAME", "success": false, "request-id": "c118f187-2090-4a68-b939-37367ac55b80" }
    ```

* #4813: If the endpoint swagger file in /endpoints contains special characters in its name, for example \[test\].json, the endpoint is not rendered correctly in the UI.

* #4818: In `*API Doc and Test*` the endpoint count of an API may be greater than it should be if an endpoint file defines common parameters which are misinterpreted as additional paths.

* #4856: Passing in an invalid column name as a parameter to certain APIs generated from data connectors will result in an exception being thrown rather than executing their callback with an error. A similar error may occur when using model flow-nodes, resulting in an error which cannot be handled by the flow.

* #4859: When endpoints are generated from a model, the endpoint descriptions do not use the correct plurals defined by the model.

* #4865: The Swagger flow-node plugin strips characters from valid object definition names which can result in schema ID collisions.

* #4865: The Swagger flow-node plugin does not handle valid object definition names with ~ or / in their name and can result in an invalid schema references in swagger flow-nodes.

* #4951: When endpoint or flow files with URL encoded characters in the filename are present in a project, unexpected things may occur. For example, the wrong flow or endpoint could be modified. Using files with these types of names is not recommended.

* #4961: Having the '%' symbol in various file names can cause problems in the {{% variables/apibuilder_prod_name %}} Console and with direct linking. It is therefore advisable to avoid using '%' in API, Endpoint, Flow, Model, and Configuration file names. This is a result of an issue in react-router/history. https://github.com/ReactTraining/history/issues/505

* #4966: {{% variables/apibuilder_prod_name %}} will generate invalid Swagger for programmatic API in `./apis` that bind to a path other than the `apiPrefix` defined in the configuration. These API must be bound to the same root path as is defined by `apiPrefix`.
