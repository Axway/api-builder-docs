---
title: Fuji release notes
linkTitle: Fuji
date: 2018-09-28
description: 28 September 2018
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Fixes

* #4050: Fix rendering issue with SVG flow-node icons when using Firefox
* #5064: Improve the description of feature flag warnings in the CLI
* #5070: Allow condition node to compare empty strings
* #5079: Display a response body in Test API when the status code of the response is non-2xx
* #5093: Display a response body in Test API when the response body is "falsy"
* #5096: Fix issue where flow editor would stop responding when applying changes

## Release notes

* #4050: Previously, when using Firefox, SVG flow-node icons in the flow editor may not be rendered or could appear stretched. Now, Firefox will display these icons correctly.
* #5064: Modified verbiage of feature flag warnings in the CLI to make them more descriptive.
* #5070: Previously, {{% variables/apibuilder_prod_name %}} would not allow you to use the condition node to compare against empty strings. Now, the value of the source and value parameters can both be empty strings.
* #5079: Previously, When using Test API to try an endpoint and a non-2xx response code was returned, the body and headers of the response would not be displayed. Now, The UI correctly displays the body and headers.
* #5093: Previously, APIs executed via the Test API would not display a response when the body was a falsy value such as 0 or false. Now, the response will be displayed for this type of value.
* #5096: Previously, applying flow changes multiple times would cause the flow editor to stop responding. Now, changes to flows can be applied as many times as needed without issue.

## Updated modules

* [@axway/api-builder-runtime@4.2.32](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.2.32)
* [@axway/api-builder-admin@1.2.18](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.2.18)
* [@axway/api-builder@4.2.8](https://www.npmjs.com/package/@axway/api-builder/v/4.2.8)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@1.0.17](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/1.0.17)

{{% releasenotes/previous %}}
