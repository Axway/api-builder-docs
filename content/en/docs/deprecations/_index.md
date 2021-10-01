---
title: Deprecations
linkTitle: Deprecations
weight: 110
date: 2021-10-01
---

{{% variables/apibuilder_prod_name %}} regularly adds feature improvements, fixes, and occasionally identify and fix features that do not work as designed, or are orthogonal to the intended direction of the product. When these are identified, we mark them as deprecated and add them to this document. We intend to remove all the deprecated features in the next major release of the product.

{{% alert title="Note" color="primary" %}}To ensure that you stay abreast of important updates and to make it easier to upgrade, you should pay attention to the deprecation warnings and address them as soon as possible.{{% /alert %}}

Direct or indirect use of deprecated features may result in a warning when the service starts. This should not affect the functionality of your service, but the flags should be an indication that, if ignored, your service may fall behind any future breaking changes and may increase the effort to upgrade to future major releases.

## Deprecation flags

Where fixing a bug or introducing a feature would introduce a breaking change, we create a deprecation flag that is disabled by default, meaning that it will have no impact on your project. However, it should not be ignored. These flags are provided to allow you to manually review the change and be aware of a functional change that may also require code or config to be modified.

When addressing deprecation warnings with corresponding flags, you should compare the following set of flags with those located in your `./conf/default.js`. The full set of flags is below for convenience. In upgraded applications, the flags are disabled by default. However, newly created applications will have these flags enabled. For each deprecation warning, you should find the corresponding feature flag below, read the document, and understand how it applies to your application. To ensure that your application continues to operate as expected, it is essential that you have unit-tests for all your interfaces. Enabling a flag, without understanding or testing the impact can have adverse effects.

```javascript
// ./conf/default.js

module.exports = {
  flags: {
    // Flags to enable features that are not ready for production or
    // whose use may require manual upgrade steps in legacy services.
    // Enable support for aliases in comparison operators on composite models.
    // Breaking change for old versions as previously queries $lt, $gt, $lte, $gte, $in, $nin,
    // $eq would not have translated aliased fields.
    enableAliasesInCompositeOperators: false,
    // Enable support for the $like comparison operator in the Memory connector.
    enableMemoryConnectorLike: false,
    // Enable support for Models that have no primary key.
    // Breaking change for old versions as previously the Create API returned a location
    // header. Also the model advertised unsupported methods.
    enableModelsWithNoPrimaryKey: false,
    // Generate APIs and Flows that user primary key type rather than always assuming string.
    // Breaking change for old versions as the generated APIs will change when enabled.
    usePrimaryKeyType: false,
    // Enabling this flag will cause the service to exit when there is a problem loading a plugin
    exitOnPluginFailure: false,
    // Enabling this flag ensures that a plugin only receives the config relevant to that plugin.
    enableScopedConfig: false,
    // Enable support for null fields coming from Models
    enableNullModelFields: false,
    // Enable support for model names being percent-encoded as per RFC-3986 in auto-generated
    // API. Breaking change for old versions as previously names like "foo/bar" will now be
    // encoded as "foo%2Fbar"
    enableModelNameEncoding: false,
    // Enable support for model names being percent-encoded as per RFC-3986 in {{% variables/apibuilder_prod_name %}}'s
    // Swagger. Breaking change for old versions as previously names like "foo/bar" will now
    // be encoded as "foo%2Fbar"
    enableModelNameEncodingInSwagger: false,
    // Enable support for model names being encoded whilst preserving the connector's slash.
    // This flag only applies when enableModelNameEncodingInSwagger is enabled.
    // Breaking change for old versions as previously model names that start with a connector
    // name, e.g. "oracle/foó" will now be encoded as "oracle/fo%C3%B3".
    enableModelNameEncodingWithConnectorSlash: false,
    // Enable support for overriding endpoint content-type using the flow's
    // HTTP response headers.
    enableOverrideEndpointContentType: false,
    // Enable support for model flow-nodes having Error outputs.
    enableModelErrorOutputs: false,
    // Enabling this flag will cause the service to exit when there is an error
    // validating the service Swagger or any loaded JSON schema.
    exitOnSwaggerSchemaValidationError: false,
    // Enabling this flag will emit the log level in each log message.
    enableLoggingOfLevel: true,
    // Enabling this flag will ignore HTTP payload body on methods GET,
    // and HEAD.
    enableStrictBodyPayloads: true
  }
};
```

## List of Deprecated features

The following sections list the deprecated features.

### \[D001\] /apidoc/docs.json

Beginning with the [4.0.0](/docs/release_notes/tools_4.0.0_release_note/) release, Swagger API docs are available on `/apidoc/swagger.json` and are mirrored on `/apidoc/docs.json`.
Using the `/apidoc/docs.json` endpoint to access Swagger API documentation is deprecated and `/apidoc/swagger.json` should be used instead.

### \[D002\] apiDocPrefix

Beginning with the [Boston](/docs/release_notes/standalone_-_3_august_2018/) release, Usage of `admin.apiDocPrefix` in the project configuration has been deprecated. Use `apidoc.prefix` instead. If both values are provided, `apidoc.prefix` will be preferred. See [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/#D002).

### \[D003\] disableAPIDoc

Beginning with the [Boston](/docs/release_notes/standalone_-_3_august_2018/) release, Usage of `admin.disableAPIDoc` in the project configuration has been deprecated. Use `apidoc.disabled` instead. If both values are provided, `apidoc.disabled` will be preferred. See [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/#D003).

### \[D004\] enableModelsWithNoPrimaryKey

Beginning with the [Canberra](/docs/release_notes/standalone_-_17_august_2018/) release, For Models that do not have a primary key:

* The `delete`, `findAndModify`, `findByID`, `upsert`, and `update` APIs and endpoints will not be generated.
* The Model flow-node will not have `delete`, `findAndModify`, `findByID`, `upsert`, or `update` methods.
* The Create API will no longer return a location header.

This will be the default behavior in all new services. For more information on how to be prepared for the change, and to start using the new behavior now, refer to [Removal of unsupported APIs on Models that do not have a primary key](/docs/deprecations/removal_of_unsupported_apis_on_models_that_do_not_have_a_primary_key/).

### \[D005\] usePrimaryKeyType

Beginning with the [Canberra](/docs/release_notes/standalone_-_17_august_2018/) release, Model IDs are based on the database's primary key type instead of being hard-coded as a string.

This will be the default behavior in all new services. For more information on how to be prepared for the change, and to start using the new behavior now, refer to [Removal of strings as default Model IDs](/docs/deprecations/removal_of_strings_as_default_model_ids/).

### \[D006\] exitOnPluginFailure

Beginning with the [Dublin](/docs/release_notes/standalone_-_31_august_2018/) release, Errors when loading {{% variables/apibuilder_prod_name %}} plugins will cause the service to terminate.

This will be the default behavior in all new services. For more information on how to be prepared for the change, and to start using the new behavior now, refer to [Change in the loading of plugins when errors occur](/docs/deprecations/change_in_the_loading_of_plugins_when_errors_occur/).

### \[D007\] enableAliasesInCompositeOperators

Beginning with the [Eden](/docs/release_notes/standalone_-_14_september_2018/) release, Queries on Composite Models will support comparison operators (`$eq`, `$ne`, `$in`, `$nin`, `$lt`, `$lte`, `$gt`, `$gte`, `$like`) on aliased fields.

This will be the default behavior in all new services. For more information on how to be prepared for the change, and to start using the new behavior now, refer to [Change in the handling of comparison operators on Composite models](/docs/deprecations/change_in_the_handling_of_comparison_operators_on_composite_models/).

### \[D008\] enableMemoryConnectorLike

Beginning with the [Eden](/docs/release_notes/standalone_-_14_september_2018/) release, Queries on Models using the Memory connector that also use the `$like` comparison operator will search using the query parameter instead of just returning an empty array.

This will be the default behavior in all new services. For more information on how to be prepared for the change, and to start using the new behavior now, refer to [Change in the handling of Memory model queries using $like comparison operator](https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/change_in_the_handling_of_memory_model_queries_using_$like_comparison_operator.html).

### \[D009\] enableScopedConfig

Beginning with the [Istanbul](/docs/release_notes/standalone_-_23_november_2018/) release, When loading an {{% variables/apibuilder_prod_name %}} plugin, you will only receive the config relevant to the uploaded plugin.

This will be the default behavior in all new services. For more information on how to be prepared for the change, and to start using the new behavior now, refer to [Change in the way config is passed to plugins](/docs/deprecations/change_in_the_way_config_is_passed_to_plugins/).

### \[D010\] perURLAuthentication

Beginning with the [Lisbon](/docs/release_notes/standalone_-_18_january_2019/) release, Authentication has changed to make all paths secure, and public paths must be explicitly declared.

This will be the default behavior in all new services. For more information on how to be prepared for the change, and to start using the new behavior now, refer to [Change in the way of handling authentication and authentication plugins](/docs/deprecations/change_in_the_way_of_handling_authentication_and_authentication_plugins/).

### \[D011\] {{% variables/apibuilder_prod_name %}} Web

Beginning with the [Lisbon](/docs/release_notes/standalone_-_18_january_2019/) release, [{{% variables/apibuilder_prod_name %}} Web](/docs/developer_guide/web/) is deprecated and will be removed in a future major version. If you are currently using Web Routes, consider switching to another modern web application architecture for your front end that consumes {{% variables/apibuilder_prod_name %}} Service APIs.

### \[D012\] enableModelNameEncoding

Beginning with the [Osaka](/docs/release_notes/standalone_-_1_march_2019/) release, Model names are URI encoded as per [RFC-3986](https://www.ietf.org/rfc/rfc3986.txt), and the APIs that are auto-generated for Models will bind to their URI equivalent.

This will be the default behavior in all new services. For more information on how to be prepared for the change, and to start using the new behavior now, refer to [Change in the way model name is encoded in URI](/docs/deprecations/change_in_the_way_model_name_is_encoded_in_uri/).

### \[D013\] enableNullModelFields

Beginning with the [Quebec](/docs/release_notes/standalone_-_29_march_2019/) release, Queries on Models, which have fields with `null` values, can now return that field in the response rather than hiding the field. Support for this behavior is dependent on the connector being used.

This will be the default behavior in all new services. For more information on how to be prepared for the change, and to start using the new behavior now, refer to [Change in the way null fields are returned in Models](/docs/deprecations/change_in_the_way_null_fields_are_returned_in_models/).

### \[D014\] enableModelNameEncodingInSwagger

Beginning with the [Quebec](/docs/release_notes/standalone_-_29_march_2019/) release, Model names are URI encoded as per [RFC-3986](https://www.ietf.org/rfc/rfc3986.txt), and the APIs that are created from Generate endpoints for Models will bind to their URI equivalent.

This will be the default behavior in all new services. For more information on how to be prepared for the change, and to start using the new behavior now, refer to [Change in the way model name is encoded in Swagger](/docs/deprecations/change_in_the_way_model_name_is_encoded_in_swagger/).

### \[D015\] enableModelNameEncodingWithConnectorSlash

Beginning with the [Barcelona](/docs/release_notes/standalone_-_29_march_2019/) release, Model names which are prefixed with their connector name (in other words, oracle/user) will no longer have the slash encoded as %2F in auto-generated API paths.

This flag depends on [\[D012\]](#D012).

This will be the default behavior in all new services. For more information on how to be prepared for the change, and to start using the new behavior now, refer to [Change in the way model name with connector prefix is encoded in paths](/docs/deprecations/change_in_the_way_model_name_with_connector_prefix_is_encoded_in_paths/).

### \[D016\] Model.define

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, `Model.define` is deprecated and will be removed in a future version of the product. Use `Model.extend` or `APIBuilder.createModel` instead.

### \[D017\] Model instance reduce and APIBuilder.Model.reduce

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, Reducing a Model instance (i.e. `Model.prototype.reduce`) and `APIBuilder.Model.reduce` are deprecated and will be removed in a future version of the product. For more information on how to be prepared for the change, refer to [Removal of the Model instance reduce and APIBuilder.Model.reduce functions](/docs/deprecations/removal_of_the_model_instance_reduce_and_apibuilder.model.reduce_functions/).

### \[D018\] APIBuilder.removeModel

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, `APIBuilder.removeModel` is deprecated and will be removed in a future version of the product.

### \[D019\] APIBuilder.removeConnector

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, `APIBuilder.removeConnector` is deprecated and will be removed in a future version of the product.

### \[D020\] APIBuilder.removeBlock

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, `APIBuilder.removeBlock` is deprecated and will be removed in a future version of the product.

### \[D021\] APIBuilder.removeAPI

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, `APIBuilder.removeAPI` is deprecated and will be removed in a future version of the product.

### \[D022\] APIBuilder.removeAPIByFilename

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, `APIBuilder.removeAPIByFilename` is deprecated and will be removed in a future version of the product.

### \[D023\] APIBuilder.removeRoute

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, `APIBuilder.removeRoute` is deprecated and will be removed in a future version of the product.

### \[D024\] Model prefix

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, Creating a Model with the `prefix` property is deprecated and will be removed in a future version of the product. See [Removal of Model prefix](/docs/deprecations/removal_of_model_prefix/).

### \[D025\] Model.prototype.extend

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, Extending a model instance (i.e. `Model.prototype.extend`) is deprecated and will be removed in a future version of the product. Use `Model.extend` instead.

### \[D026\] APIBuilder.app.locals

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, A`PIBuilder.app.locals` properties `appc_external_url`, `appc_external_apidoc_path_legacy`, `appc_external_apidoc_path`, or `appc_external_apidoc_url` are deprecated and will be removed in a future version of the product.

### \[D027\] APIBuilder.debug

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, A`PIBuilder.debug` is deprecated and will be removed in a future version of the product.

### \[D028\] Codeblocks

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, [Codeblocks](/docs/developer_guide/flows/flow-nodes/codeblock_flow-node/) are deprecated and will be removed in a future version of the product. For more information on how to be prepared for the change, refer to [Removal of Codeblocks](/docs/deprecations/removal_of_codeblocks/).

### \[D029\] @axway/api-builder-react-engine

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, [@axway/api-builder-react-engine](https://www.npmjs.com/package/@axway/api-builder-react-engine) is deprecated and will not receive any updates. If you are currently using Web Routes, consider switching to another modern web application architecture for your front end that consumes {{% variables/apibuilder_prod_name %}} Service APIs.

### \[D030\] APIBuilder.get

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, `APIBuilder.get`is deprecated and will be removed in a future version of the product.

### \[D031\] APIBuilder.pluralize

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, `APIBuilder.pluralize`is deprecated and will be removed in a future version of the product. Use the pluralize module instead.

### \[D032\] APIBuilder.singularize

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, `APIBuilder.singularize`is deprecated and will be removed in a future version of the product. Use the pluralize module instead.

### \[D033\] APIBuilder.logger.stripColors

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, `APIBuilder.logger.stripColors`is deprecated and will be removed in a future version of the product.

### \[D034\] Model.fields\[name\].optional and API.parameters\[name\].optional

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, Using the `optional` property on Model fields and API parameters is deprecated and will be ignored in a future version of the product. Use the `required` property instead.

### \[D035\] Logger.createDefaultLogger

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, The static function `Logger.createDefaultLogger`is deprecated and will be removed in a future version of the product.

### \[D036\] Logger.createRestifyLogger

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, The static function `Logger.createRestifyLogger`is deprecated and will be removed in a future version of the product.

### \[D037\] Sort

Beginning with the [Ennis](/docs/release_notes/standalone_-_22_november_2019/) release, Creating an API or Route with the `sort` property is deprecated in favor of a more robust internal sort mechanism.

### \[D038\] Port

Beginning with the [Florence](/docs/release_notes/standalone_-_6_december_2019/) release, Usage of port in the project configuration has been deprecated. Use http.port instead. See [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/#http).

### \[D039\] Unmaintained Node.js versions

Beginning with the [Jackson](/docs/release_notes/standalone_-_28_february_2020/) release, We introduced a [Node.js support policy](/docs/nodejs_support_policy/) in which end-of-life Node.js versions are automatically deprecated by {{% variables/apibuilder_prod_name %}}. See [https://nodejs.org/en/about/releases](https://nodejs.org/en/about/releases) for the versions which are actively maintained. While the versions we deem as deprecated are not recommended, API compatibility will be maintained until an explicit breaking change removes it. Only use Active LTS or Maintenance LTS Node.js versions in production.

### \[D040\] Node.js v10

Beginning with the [Jackson](/docs/release_notes/standalone_-_28_february_2020/) release, Node.js v10 has been deprecated. Only use Active LTS or Maintenance LTS Node.js versions in production. See {{% variables/apibuilder_prod_name %}}'s [Node.js support policy](/docs/nodejs_support_policy/). While the versions we deem as deprecated are not recommended, API compatibility will be maintained until an explicit breaking change removes it. Only use Active LTS or Maintenance LTS Node.js versions in production.

### \[D041\] logger.logRequest and logger.logResponse

Beginning with the [Jackson](/docs/release_notes/standalone_-_28_february_2020/) release, The `logRequest` and `logResponse` functions on the {{% variables/apibuilder_prod_name %}} logger are deprecated and will be removed in a future version of the product.

### \[D042\] enableOverrideEndpointContentType

Beginning with the [Tokyo](/docs/release_notes/-_31_july_2020/) release, API Endpoints will no longer return the Content-Type "application/json" in all cases, the Content-Type will either be explicitly set the Content-Type from within a Flow, or set according to the type of response body.

This will be the default behavior in all new services. For more information on how to be prepared for the change, and to start using the new behavior now, refer to [Change in the way Endpoints return Content-Type](/docs/deprecations/change_in_the_way_endpoints_return_content-type/).

### \[D043\] enableModelErrorOutputs

Beginning with the [Ufa](/docs/release_notes/-_31_july_2020/) release, Model flow-nodes will gain an additional output, Error. This will be the default behavior when flows are generated from models in all new services. For more information on how to be prepared for the change, and to start using the new behavior now, refer to [Change in the outputs of Model flow-nodes](/docs/deprecations/change_in_the_outputs_of_model_flow-nodes/).

### \[D044\] API.response

Beginning with the [Zagreb](/docs/release_notes/-_23_october_2020/) release, The `response` property on the [custom API](/docs/developer_guide/apis/) is deprecated in favor of the `model` property. The `model` property serves the same purpose in that the named model is used to describe the response schema in the generated API Swagger documentation.

### \[D045\] exitOnSwaggerSchemaValidationError

Beginning with the [Bruges](/docs/release_notes/-_20_november_2020/) release, Validation errors when loading JSON schemas will cause the service to terminate. Additionally, The service's Swagger API docs are now validated and will cause the service to terminate if found to be invalid.

This will be the default behavior in all new services. For more information on how to be prepared for the change, and to start using the new behavior now, refer to [Addition of Swagger and JSON schema validation on start](/docs/deprecations/addition_of_swagger_and_json_schema_validation_on_start/).

### \[D046\] config.bodyParser

Beginning with the [Faro](/docs/release_notes/-_29_january_2021/) release, The `bodyParser`config option is deprecated and will be removed in a future version of the product.

### \[D047\] config.busboy

Beginning with the [Faro](/docs/release_notes/-_29_january_2021/) release, The `busboy` config option is deprecated and will be removed in a future version of the product. Use `config.limits` to configure limits for multipart/form-data requests and return 413 to clients when a limit it hit.

### \[D048\] undefinedMultipartPartSize

Beginning with the [Faro](/docs/release_notes/-_29_january_2021/) release, The new `config.limits` config option should be configured with a value. Leaving it unset is deprecated behavior and the default behavior will change in a future version of the product to be equivalent to setting infinity (no limit).

### \[D049\] enableLoggingOfLevel

Beginning with the [Giza](/docs/release_notes/-_12_february_2021/) release,The logger will now include the log level (e.g. "INFO") in each log message. This will be the default behavior in all new services. For more information on how to be prepared for the change, and to start using the new behavior now, refer to [Change in log message format for levels](/docs/deprecations/change_in_log_message_format_for_levels/).

### \[D050\] enableStrictBodyPayloads

Beginning with the [Roberttown](/docs/release_notes/-_16_july_2021/) release, HTTP methods GET and HEAD will ignore payload body. Enabling this flag is recommended for security purposes. This will be the default behavior in all new services. For more information on how to be prepared for the change, refer to [Change in the way body is handled for HTTP methods GET and HEAD](/docs/deprecations/change_in_the_way_body_is_handled_for_http_methods_get_and_head/).

### \[D051\] disableServerBanner

Beginning with the [Wrecsam](/docs/release_notes/-_24_september_2021/) release, The `disableServerBanner` config option has been deprecated in favor of [`http.headers.server`](/docs/developer_guide/project/configuration/project_configuration/#http).
