---
title: Ottawa release notes
linkTitle: Ottawa
date: 2021-06-04
description: 4 June 2021
Hide_readingtime: true
---

## Summary

This release includes:

* [Upgrade](#upgrade)
* [Features](#features)
* [Fixes](#fixes)
* [Updated Modules](#updated-modules)
* [Plugins](#updated-plugins)
* [Known Issues](#known-issues)

## Upgrade

Before updating, we recommend deleting package-lock.json if it exists.

To update an existing {{% variables/apibuilder_prod_name %}} application, execute the following command from within the application directory:

```bash
npm update
```

## Features

* #6824: The [Logger plugin](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-logger) is now officially released and ready to be used in production.
* #6835: Previously, It wasn't easy to see how much time a flow-node took to execute. Now, the time (in milliseconds) is logged at debug level.

    ```
    Execute (javascript.2) finished flow-node route: [], time: 3 ms
    ```

## Fixes

* #6826: Previously, whenever flows were saved, the formatting was changed. Now, line endings and indentation are preserved. Additionally, flows are no longer modified on startup unless they have been upgraded.
* #6887: Previously, when using an API endpoint (Swagger 2.0) with parameters that were of type "string", format "date" or format "date-time", and had a "pattern" JSON schema property, HTTP requests to the API endpoint would fail with HTTP 400 error `"val.match" is not a function`. Now, the pattern is correctly matched against the string input parameter.
* #6898: Previously, the XSLT plugin would automatically indent the output and this behavior could not be controlled. Now, the resulting document is equivalent, but unformatted. Indentation should be controlled using [xsl:output](https://developer.mozilla.org/en-US/docs/Web/XSLT/Element/output).
* #6919: Fixed an issue where data created in the JavaScript flow-node would sometimes not be accessible using JSONPath selectors.

## Updated modules

* [@axway/api-builder@4.26.0](https://www.npmjs.com/package/@axway/api-builder/v/4.26.0)
* [@axway/api-builder-sdk@1.1.9](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.1.9)
* [@axway/api-builder-test-utils@1.1.16](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.1.16)

## Updated plugins

* [@axway/api-builder-plugin-fn-logger@1.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-logger/v/1.0.0)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues/).
