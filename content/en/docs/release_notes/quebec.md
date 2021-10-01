---
title: Quebec release notes
linkTitle: Quebec
date: 2019-03-29
description: 29 March 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #5440: Support flow-node change of parameter name
* #5602: Fix Model responses to include null fields

## Fixes

* #5547: Fix crash when generating Endpoints for Models with names starting with colon
* #5556: Fix an issue displaying long default values of parameters in the Flow editor
* #5577: Fix crashes on concurrent restarts

## Release notes

* #5440: Previously, when using updated Flow-nodes (or Swagger documents using the swagger plugin) with renamed or removed parameters, the Flow would be invalid and not editable or fixable without making manual edits. Now, these issues can be resolved in the Flow editor.
* #5547: Previously, generating endpoints for models with names starting with a colon ":" would emit an "Error loading endpoint" error on startup and exit. Now, generate endpoints works as expected. See deprecation {{% deprecation/link D014 %}}.
* #5556: Previously, a regression caused the default value of parameters in the Flow editor to render in an unusable format such as \[Object object\] when the value was an object or array. Now, objects and arrays will be rendered in a JSON stringified format.
* #5577: Previously, the server would crash on concurrent reloads. Now, the server will process the first reload, and ignore reloads that occur concurrently.
* #5602: Previously, null fields from models would not be returned in responses such as findAll. Now, they will be included in the response. missing or undefined fields will behave the same. Use this feature is limited by connector support for null fields. See deprecation {{% deprecation/link D013 %}}.

{{% releasenotes/deprecations %}}

## Updated modules

* [@axway/api-builder-runtime@4.11.2](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.11.2)
* [@axway/api-builder-admin@1.10.2](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.10.2)
* [@axway/api-builder@4.5.17](https://www.npmjs.com/package/@axway/api-builder/v/4.5.17)

## Updated plugins

* [@axway/api-builder-plugin-dc-oracle@2.3.3](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/2.3.3)
* [@axway/api-builder-plugin-fn-swagger@2.4.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.4.0)


{{% releasenotes/previous %}}
