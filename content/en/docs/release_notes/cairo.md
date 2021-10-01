---
title: Cairo release notes
linkTitle: Cairo
date: 2019-10-11
description: 11 October 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}
## Fixes

* #1835: Deprecate the APIBuilder.remove\* methods
* #4926: Deprecate APIBuilder.debug
* #4927: Deprecate APIBuilder.app.locals
* #5246: Adjust custom inspect functions to work with newer Node versions
* #6019: Deprecate Model.reduce
* #6020: Deprecate Model.prototype.extend (extend a model instance)
* #6026: Document maximum supported Node.js version (10.x)
* #6028: Deprecate Codeblocks
* #6038: Always use full Connector name in Swagger operationIDs
* #6053: Deprecate Model "prefix"
* #6072: Deprecate @axway/api-builder-react-engine
* #6079: Deprecate Model.define
* #6082: Document deprecated Logger functions
* #6084: Deprecate APIBuilder.get
* #6085: Deprecate APIBuilder.pluralize and singularize
* #6086: Deprecate Model.fields\[name\].optional and API.parameters\[name\].optional
* #6097: Enabling plugin authentication denies access to /console

## Release notes

* #1835: APIBuilder.removeModel, APIBuilder.removeConnector, APIBuilder.removeBlock, APIBuilder.removeAPI, APIBuilder.removeAPIByFilename, APIBuilder.removeRoute functions are deprecated, and will now generate a deprecation warning. They will be removed in a future version of the product. See deprecations {{% deprecation/link D018 %}}, {{% deprecation/link D019 %}}, {{% deprecation/link D020 %}}, {{% deprecation/link D021 %}}, {{% deprecation/link D022 %}} and {{% deprecation/link D023 %}}.
* #4926: APIBuilder.debug is deprecated, and will now generate a deprecation warning. It will be removed in a future version of the product. See deprecation {{% deprecation/link D027 %}}.
* #4927: APIBuilder.app.locals is deprecated, and will now accessing appc_external_url, appc_external_apidoc_path_legacy, appc_external_apidoc_path, or appc_external_apidoc_url will generate a deprecation warning. They will be removed in a future version of the product. See deprecation {{% deprecation/link D026 %}}.
* #5246: Previously, using `util.inspect` to inspect {{% variables/apibuilder_prod_name %}} components such as the {{% variables/apibuilder_prod_name %}} app, models, or connectors, would emit the deprecation message "`[DEP0079] DeprecationWarning: Custom inspection function on Objects via .inspect() is deprecated`" with Node.js >10.0.0 and returns a different string with Node.js >11.0.0. Now, the deprecation warning is no longer emitted.
* #6019: Model instance `reduce` and `APIBuilder.Model.reduce` functions are deprecated, and will now generate a deprecation warning. They will be removed in a future version of the product. See deprecation {{% deprecation/link D017 %}}.
* #6020: Extending a model instance (Model.prototype.extend) is deprecated and will now generate a deprecation warning. It will be removed in a future version of the product. Instead, use Model.extend. See deprecation {{% deprecation/link D025 %}}.
* #6026: The maximum supported Node.js version (10.x) is now specified within the docs and package.json
* #6028: Codeblocks are deprecated, and will now generate a deprecation warning. They will be removed in a future version of the product. See deprecation {{% deprecation/link D028 %}}.
* #6038: Previously, `operationId` fields of generated Model APIs using Connectors with aliases prefixed with "appc." would contain the Connector alias with this prefix removed. Now, `operationId` fields will contain the full Connector alias.
* #6053: Creating Models with the `prefix` property has been deprecated and will generate a deprecation warning on use. See deprecation {{% deprecation/link D024 %}}.
* #6072: [@axway/api-builder-react-engine](https://www.npmjs.com/package/@axway/api-builder-react-engine) has been deprecated and is no longer supported. See deprecation {{% deprecation/link D029 %}}.
* #6079: Model.define is deprecated, and will now generate a deprecation warning. It will be removed in a future version of the product. See deprecation {{% deprecation/link D016 %}}.
* #6082: `APIBuilder.logger.stripColors` is deprecated, and will now generate a deprecation warning. It will be removed in a future version of the product. See deprecation {{% deprecation/link D033 %}}.
* #6082: `Logger.createDefaultLogger` is deprecated, and will now generate a deprecation warning. It will be removed in a future version of the product. See deprecation {{% deprecation/link D034 %}}.
* #6082: `Logger.createRestifyLogger` is deprecated, and will now generate a deprecation warning. It will be removed in a future version of the product. See deprecation {{% deprecation/link D035 %}}.
* #6084: `APIBuilder.get` is deprecated, and will now generate a deprecation warning. It will be removed in a future version of the product. See deprecation {{% deprecation/link D030 %}}.
* #6085: `APIBuilder.pluralize` is deprecated, and will now generate a deprecation warning. It will be removed in a future version of the product. See deprecation {{% deprecation/link D031 %}}.
* #6085: `APIBuilder.singlularize` is deprecated, and will now generate a deprecation warning. It will be removed in a future version of the product. See deprecation {{% deprecation/link D032 %}}.
* #6086: Using the `optional` property on Model fields and API parameters has been deprecated and will generate a deprecation warning on use. See deprecation {{% deprecation/link D021 %}}.
* #6097: Previously, when plugin authentication was configured and the mechanism did not define a `matchURL` method, the server would incorrectly require authentication for public paths. Now, public paths are accessible when using plugin authentication.

{{% releasenotes/deprecations %}}

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


{{% releasenotes/previous %}}
