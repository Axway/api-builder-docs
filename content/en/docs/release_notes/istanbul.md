---
title: Istanbul release notes
linkTitle: Istanbul
date: 2018-11-23
description: 23 November 2018
Hide_readingtime: true
---

## Summary

This release includes:

* [Features](#features)
* [Fixes](#fixes)
* [Release Notes](#release-notes)
* [New Deprecations](#new-deprecations)
* [Updated Modules](#updated-modules)
* [Plugins](#updated-plugins)
* [Known Issues](#known-issues)

## Features

* [#5233:](#5233) Ensure that plugins only receive plugin-specific configuration instead of the global service configuration
* [#5242:](#5242) Support credential management and authorization in flows (pre-release feature)

## Fixes

* [#4890:](#4890) Remove invisible column in Configuration list view
* [#5121:](#5121) The server fails to restart when saving a flow over HTTPS with SSL enabled
* [#5165:](#5165) Fix error when saving flow with special symbols in the filename
* [#5234:](#5234) Support using Credentials in flow-node parameters
* [#5282:](#5282) Improve localStorage detection in authorization dialog
* [#5298:](#5298) Fix error when importing an endpoint using a swagger document with path-level parameters.
* [#5307:](#5307) Fix swagger generation for services with models which have no primary key
* [#5308:](#5308) Support proxy settings on import API
* [#5323:](#5323) Replace invalid flow documentation link
* [#5325:](#5325) Fix spelling error in description of Set Context flow-node

## Release notes

* #4890: Previously, a column with no contents was displayed in the configuration list. Now, the column has been removed.
* #5121: Previously, the sockets used by the server when SSL is enabled were not closed when the server was shut down. This cased issues in some cases where this resulted in the inability to restart the server, such as on flow update. Now, the sockets are properly closed on shutdown allowing the server to be restarted.
* #5165: Previously, in the cases of importing of APIs or saving flows, that were coming from a swagger with special symbols in the title, was failing due to our internal validations. Now, special symbols are allowed.
* #5233: Previously, when plugins were loaded, in certain edge cases the whole service config was passed to the plugin instead of the data in its own configuration section. Now, plugins will only receive their own configuration. This is enabled with a feature flag. See deprecation [#9](#dep-9).
* #5242: Added pre-release support for credential management. Oauth2 credentials will be kept evergreen if possible and these credentials can be used in flows. This feature is flagged and should not be used in production. For additional information, refer to [{{% variables/apibuilder_prod_name %}} Credentials](/docs/developer_guide/credentials/).
* #5298: Previously, when creating an endpoint by importing a swagger document an error would occur if the document had a path-level parameters definition. Now, this is correctly handled and will not cause an error.
* #5307: Previously, APIs automatically generated from data connector models incorrectly specified their response type for Query and FindAll. Now, they specify the correct response schema.
* #5308: Previously, when importing APIs from URLs in the Admin UI, the requests to retrieve the swagger URL did not use the configured proxy settings. Now, the requests will use the proxy configured in the {{% variables/apibuilder_prod_name %}} configuration file.
* #5323: Previously, the documentation link in the flow editor was invalid and redirected to a non-existent page. Now, the link redirects to the correct documentation.
* #5325: Previously, there was a spelling error in the description of the "Set Context" flow-node. Now, the description is correctly spelled.

## New deprecations

* #9: Configuration change to enable receiving only the config relevant when uploading plugins ([enableScopedConfig](/docs/deprecations/#enableScopedConfig)). For information on how to be prepared for the change and to start using the new behavior now, refer to [Change in the way config is passed to plugins](/docs/deprecations/change_in_the_way_config_is_passed_to_plugins/).

When upgrading to this release, you should consider the [complete list of deprecated features](/docs/deprecations/).

## Updated modules

* [@axway/api-builder-runtime@4.4.21](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.4.21)
* [@axway/api-builder-admin@1.4.22](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.4.22)
* [@axway/api-builder@4.4.1](https://www.npmjs.com/package/@axway/api-builder/v/4.4.1)

## Updated plugins

* [@axway/api-builder-plugin-dc-mongo@1.1.3](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mongo/v/1.1.3)
* [@axway/api-builder-plugin-dc-mysql@2.2.2](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/2.2.2)
* [@axway/api-builder-plugin-dc-mssql@1.0.2](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/1.0.2)
* [@axway/api-builder-plugin-dc-oracle@2.2.3](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/2.2.3)
* [@axway/api-builder-plugin-fn-base64@1.0.15](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/1.0.15)
* [@axway/api-builder-plugin-fn-dot@1.0.15](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/1.0.15)
* [@axway/api-builder-plugin-fn-json@1.0.15](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/1.0.15)
* [@axway/api-builder-plugin-fn-restclient@1.2.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/1.2.1)
* [@axway/api-builder-plugin-fn-swagger@1.1.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/1.1.5)
* [axway-flow-sdk@2.0.15](https://www.npmjs.com/package/axway-flow-sdk/v/2.0.15)

## Known issues

* #3825: Filtering the {{% variables/apibuilder_prod_name %}} Console administrator access using IPv6 addresses may cause ENOTFOUND errors.
* #3867: When attempting to create and save a flow for an imported Swagger endpoint that contains a path or paths defined by references the save will fail.
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
* #4280: Editing large object parameters on the API Orchestration page in the {{% variables/apibuilder_prod_name %}} Console may cause multiple, confusing flow-node configuration panel scrollbars to appear.
* #4528: Initializing new project with `api-builder init 1234` where `1234` is any number, will throw an ERR_INVALID_ARG_TYPE error rather than an "invalid npm package name".
* #4595: When using a `distinct` API backed by the Memory connector and passing a `field` which does not exist on the model, the first record is returned instead of an error.
* #4735: Invoking Upsert will fail for all data connectors when creating a composite model from an existing model and renaming one of the fields.
* #4749: A query on a `distinct` API created from the Mongo plugin (`@axway/api-builder-plugin-dc-mongo`) doesn't honor the value of the `order` parameter.
* #4750: The Upsert or FindAndModify methods are not present in the APIs generated from Mongo or MySQL connector based models.
* #4751: The FindAndModify method from APIs created using the Mongo plugin (`@axway/api-builder-plugin-dc-mongo`) responds with a 404 error rather than creating a new entry when the `upsert` parameter is `true`.
* #4752: The format of a distinct query's response depends on the type of connector.
* #4759: Calling Update or FindAndModify on a model that uses the composite connector and contains the required fields may fail and cause the server to terminate.
* #4795: The MongoDB plugin `@axway/api-builder-plugin-dc-mongo` does not correctly support primary keys that are not object identifiers. The MongoDB specification allows for primary keys of other types. As a result, trying to use the plugin will result in errors:

    ```
    { "message": "Invalid Value for Find By ID: "YOUR_STRING_PK_NAME", "success": false, "request-id": "c118f187-2090-4a68-b939-37367ac55b80" }
    ```
* #4813: If the endpoint Swagger file in the `/endpoints` folder contains special characters in its name, for example `[test].json`, the endpoint is not rendered correctly in the UI.
* #4856: Passing in an invalid column name as a parameter to certain APIs generated from data connectors will result in an exception being thrown rather than executing their callback with an error. A similar error may occur when using model flow-nodes, resulting in an error which cannot be handled by the flow.
* #4859: When endpoints are generated from a model, the endpoint descriptions do not use the correct plurals defined by the model.
* #4865: The Swagger flow-node plugin strips characters from valid object definition names which can result in schema ID collisions.
* #4865: The Swagger flow-node plugin does not handle valid object definition names with `~` or `/` in their name and can result in an invalid schema references in swagger flow-nodes.
* #4951: When endpoint or flow files with URL encoded characters in the filename are present in a project, unexpected things may occur. For example, the wrong flow or endpoint could be modified. Using files with these types of names is not recommended.
* #4961: Having the `%` symbol in various file names can cause problems in the {{% variables/apibuilder_prod_name %}} Console and with direct linking. It is therefore advisable to avoid using `%` in API, Endpoint, Flow, Model, and Configuration file names. This is a result of an issue in react-router/history. [https://github.com/ReactTraining/history/issues/505](https://github.com/ReactTraining/history/issues/505)
* #4966: {{% variables/apibuilder_prod_name %}} will generate invalid Swagger for programmatic API in `./apis` that bind to a path other than the `apiPrefix` defined in the configuration. These API must be bound to the same root path as is defined by `apiPrefix`.
