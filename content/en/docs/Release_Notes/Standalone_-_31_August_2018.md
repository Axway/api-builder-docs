---
title: Standalone - Dublin
linkTitle: Standalone - dublin
description: ADD A DESCRIPTION
weight: 610
date: 2021-05-17
---

## Summary

This release includes:

* [Features](#features)

* [Fixes](#fixes)

* [Release Notes](#release-notes)

* [New Deprecations](#new-deprecations)

* [Updated Modules](#updated-modules)

* [Updated Plugins](#updated-plugins)

* [Known Issues](#known-issues)

## Features

* [#4967:](#4967) Support Intercom in {{% variables/apibuilder_prod_name %}}

* [#5004:](#5004) Swagger plugin is generating many config files after editing one

* [#5008:](#5008) Support for plugin load failure terminating server

## Fixes

* [#4976:](#4976) Swagger: Generated swagger for services does not set "security"

* [#4982:](#4982) Versions of @axway/api-builder-plugin-dc-mysql prior to '2.2.0' are incompatible with {{% variables/apibuilder_prod_name %}} when the \`usePrimaryKey\` feature flag is enabled

## Release Notes

* #4967: Added Intercom to the {{% variables/apibuilder_prod_name %}} Console UI.

* #4976: Previously, the `/apidoc/swagger.json` did not set the security requirements and generated Swagger in a way that was not representative of the services security mechanisms. Now, the generated Swagger document has a security requirement that ensures the security is correct.

* #4982: Previously, the `usePrimaryKeyType` feature flag was not compatible with versions of @axway/api-builder-plugin-dc-mysql prior to 2.2.0. Now, when the feature flag is enabled {{% variables/apibuilder_prod_name %}} is compatible with these versions of the plugin.

* #5004: Previously, the config generation did not behave correctly and did not preserve the service name during the creation of the service config if the initially generated config had its service name manually changed, ending up in generating configs endlessly on system restart. Now, the generated configs by the swagger plugin preserve the service name and stops once a config for the given service is created.

* #5008: Previously, errors when loading plugins were ignored. Now, these errors will terminate the service by default. **This is enabled with a feature flag.** See deprecation [#6](#dep-6).

## New Deprecations

* #6: Configuration change to enable the service to exit on plugin failure ([exitOnPluginFailure](/docs/deprecations/#exitOnPluginFailure)). For more information on how to be prepared for the change and to start using the new behavior now, refer to [Change in the loading of plugins when errors occur](/docs/deprecations/change_in_the_loading_of_plugins_when_errors_occur/).

When upgrading to this release, you should consider the [complete list of deprecated features](/docs/deprecations/).

## Updated Modules

* [@axway/api-builder-runtime@4.2.9](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.2.9)

* [@axway/api-builder-admin@1.2.5](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.2.5)

* [@axway/api-builder@4.2.2](https://www.npmjs.com/package/@axway/api-builder/v/4.2.2)

## Updated Plugins

* [@axway/api-builder-plugin-fn-swagger@1.0.14](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/1.0.14)

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

* #4050: When rendering the flow editor, the {{% variables/apibuilder_prod_name %}} Console may fail to render the Scalable Vector Graphics (SVG) icons correctly in the Firefox browser. The render failure may result in blank icons being displayed in the tool panel and in the flow diagram. This is due to a long-standing bug in Firefox that fails to scale SVG graphics correctly. To fix, edit the SVG icon and add height and width. For example: `<svg ... height="80" width="80" />`

* #4280: Editing large object parameters on the API Orchestration page in the {{% variables/apibuilder_prod_name %}} Console may cause multiple, confusing flow-node configuration panel scrollbars to appear.

* #4716: Given a data connector that generates models from a database, and is configured to auto-generate the API for those models (`modelAutogen` is set to `true`), and there exists a table with no primary key, then the {{% variables/apibuilder_prod_name %}} will not be able to handle the following methods: **Update**, **Delete**, **Find By ID**, **Find and Modify**, and **Upsert**.

* #4736: Given a swagger with an extension, for example, on the [path item object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#pathItemObject), the Swagger flow-node plugin can fail to load the swagger file, resulting in an error:

    ```
    Error loading plugin: @axway/api-builder-plugin-fn-swagger. Cannot convert undefined or null to object
    ```

* #4752: The format of a distinct query's response depends on the type of the connector.

* #4759: Calling Update or FindAndModify on a Model that uses the composite connector and contains required fields may fail and cause the server to terminate.

* #4795: The MongoDB plugin api-builder-plugin-dc-mongo does not correctly support primary keys that are not object identifiers. The MongoDB specification allows for primary keys of other types. As a result, trying to use the plugin will result in errors:

    ```
    { "message": "Invalid Value for Find By ID: "YOUR_STRING_PK_NAME", "success": false, "request-id": "c118f187-2090-4a68-b939-37367ac55b80" }
    ```

* #4813: If the endpoint swagger file in /endpoints contains special characters in its name, for example \[test\].json, the endpoint is not rendered correctly in the UI.

* #4865: The Swagger flow-node plugin strips characters from valid object definition names which can result in schema ID collisions.

* #4865: The Swagger flow-node plugin does not handle valid object definition names with ~ or / in their name and can result in an invalid schema references in swagger flow-nodes.

* #4961: Having the '%' symbol in various file names can cause problems in the {{% variables/apibuilder_prod_name %}} Console and with direct linking. It is therefore advisable to avoid using '%' in API, Endpoint, Flow, Model, and Configuration file names. This is a result of an issue in react-router/history. https://github.com/ReactTraining/history/issues/505

* #4966: {{% variables/apibuilder_prod_name %}} will generate invalid Swagger for programmatic API in `./apis` that bind to a path other than the `apiPrefix` defined in the configuration. These API must be bound to the same root path as is defined by `apiPrefix`.
