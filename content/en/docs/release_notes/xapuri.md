---
title: Xapuri release notes
linkTitle: Xapuri
date: 2019-07-19
description: 19 July 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #5891: Add editor for 'javascript' format flow-node parameters

## Fixes

* #5922: Fix incorrect examples when testing Endpoints

## Release notes

* #5891: The UI now renders a specialized javascript editor with syntax highlighting for Flow-Node parameters which are defined with `"format": "javascript"` and `"type": "string"` in their schema.
* #5891: Flow-nodes now support defining wrapper text for `multiline` and `javascript` format parameters. The wrapper text is displayed in the parameter editor but will not be part of the value when saved in the flow. This is useful for when context or comments are needed. For more information, refer to [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).
* #5922: Previously, the example body that was shown when testing Endpoints could be incorrect and include schema snippets such as `$ref` or `anyOf`. Now, the example will better represent the expected body and will not include these schema snippets.

## Updated modules

* [@axway/api-builder-runtime@4.11.44](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.11.44)
* [@axway/api-builder-admin@1.10.18](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.10.18)

## Updated plugins

* [@axway/api-builder-plugin-fn-base64@2.0.10](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/2.0.10)
* [@axway/api-builder-plugin-fn-dot@2.0.10](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/2.0.10)
* [@axway/api-builder-plugin-fn-json@2.0.10](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/2.0.10)
* [@axway/api-builder-plugin-fn-javascript@1.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-javascript/v/1.0.0)
* [@axway/api-builder-plugin-fn-restclient@2.0.13](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/2.0.13)
* [axway-flow-sdk@3.2.0](https://www.npmjs.com/package/axway-flow-sdk/v/3.2.0)

{{% releasenotes/previous %}}
