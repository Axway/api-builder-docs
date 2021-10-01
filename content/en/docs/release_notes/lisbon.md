---
title: Lisbon release notes
linkTitle: Lisbon
date: 2019-01-18
description: 18 January 2019
Hide_readingtime: true
---

## Summary

This release includes:

* [Breaking Changes](#breaking-changes)
* [Features](#features)
* [Fixes](#fixes)
* [Release Notes](#release-notes)
* [New Deprecations](#new-deprecations)
* [Updated Modules](#updated-modules)
* [Plugins](#updated-plugins)
* [Known Issues](#known-issues)

## Breaking changes

* [#5264:](#5264) The configured authentication strategy is now always applied to paths under the configured apiPrefix. This was introduced as a security fix will break services relying on custom plugins with matchURL functions that intend to bypass auth on certain APIs. See deprecation [10](#10).

## Features

* [#5125:](#5125) Add "Home" link functionality to Axway logo and {{% variables/apibuilder_prod_name %}} text in the header
* [#5180:](#5180) Support the user in managing OAuth2 credentials for devops
* [#5264:](#5264) Provide clearer and more explicit HTTP authentication

## Fixes

* [#5337:](#5337) Limit graph scaling in flow editor
* [#5404:](#5404) RegEx DoS attack on markdown rendering engine
* [#5412:](#5412) OAuth 2.0 toast is not showing
* [#5419:](#5419) Deprecate web routes
* [#5441:](#5441) Create model with name containing invalid character will kill the server

## Release notes

* #5125: Previously, the the Axway logo and the {{% variables/apibuilder_prod_name %}} text in the header were not interactable. Now, they act as hyperlinks and take you to the Summary page.
* #5180: Previously, the credential cards did not provide user access to refresh and obtain tokens. Now, you can refresh and obtain tokens from the credential cards.
* #5264: Previously, requests to non-existing resources on `apiPrefix` did not have authentication. Now, all requests to `apiPrefix` must pass authentication. Added `config.accessControl` settings to clarify authentication and ensure that HTTP authentication is applied to all paths bound on `apiPrefix` and that any path not on `apiPrefix`, be required to be explicitly public. This change [deprecates the use of matchURL](/docs/deprecations/change_in_the_way_of_handling_authentication_and_authentication_plugins/#Whywearemakingthischange) in authentication plugins and deprecates the configuration settings for `APIKeyAuthPlugin` and `APIKeyAuthType`. For additional information, refer to [Change in the way of handling authentication and authentication plugins](/docs/deprecations/change_in_the_way_of_handling_authentication_and_authentication_plugins/). See deprecation [10](#10).
* #5337: Previously, it was possible to lose the flow in the flow editor while zooming in or out. Now, there is a limit to how far you can zoom.
* #5404: Previously, {{% variables/apibuilder_prod_name %}} used `appc-marked` for its markdown engine. Now, it is using `marked`.
* #5412: Previously, the toast notification was shown very fast and was not visible to the user. Now, the notification is clearly visible.
* #5419: Previously, {{% variables/apibuilder_prod_name %}} registered all built-in rendering engines on startup by default. Now, {{% variables/apibuilder_prod_name %}} Web feature (routes in `web/routes` folder) has been deprecated so those rendering engines are not registered by default but only if the `web/routes` folder exists. See deprecation [11](#11).
* #5441: Previously, creating a model having a name with a single quote would succeed to create the model, but would cause the application to fail to restart. Now, single quotes are escaped.

## New deprecations

* #10: Authentication has changed to make all paths secure, and public paths must be explicitly declared. For information on how to be prepared for the change and to start using the new behavior now, refer to [Change in the way of handling authentication and authentication plugins](/docs/deprecations/change_in_the_way_of_handling_authentication_and_authentication_plugins/).
* #11: [{{% variables/apibuilder_prod_name %}} Web](/docs/developer_guide/web/) is deprecated and will be removed in a future major version. If you are currently using Web Routes, consider switching to another modern web application architecture for your front end that consumes {{% variables/apibuilder_prod_name %}} Service APIs.

## Updated modules

* [@axway/api-builder-runtime@4.6.12](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.6.12)
* [@axway/api-builder-admin@1.5.14](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.5.14)
* [@axway/api-builder@4.5.1](https://www.npmjs.com/package/@axway/api-builder/v/4.5.1)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@2.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.1.1)

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
* #5448: CORS is not applied to static public web resources.
