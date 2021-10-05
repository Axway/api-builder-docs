---
title: Nancy release notes
linkTitle: Nancy
date: 2020-05-08
description: 8 May 2020
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6304: Integrate both CLIs into a common code base
* #6351: Add Redis to list of available community plugins

## Fixes

* #6352: Remove useless/confusing log messages from Model APIs
* #6355: Improve SDK interface

## Release notes

* #6304: Unified the @axway/amplify-api-builder-cli and @axway/api-builder command-line so that they are the same. The @axway/api-builder command-line now supports the "get-catalog" command, --no-banner and --no-color options. The @axway/amplify-api-builder-cli command-line for Amplify now supports plugin initialization:
    ```bash
    amplify builder plugin init
    ```
* #6351: Added Redis community flow-node to the list of plugins in Admin UI.
* #6352: Additional response logs are no longer printed when executing APIs or Model APIs.
* #6355: Updated the `@axway/api-builder` CLI to generate plugins using the latest SDK. This introduces changes to simplify how actions are written.

## Updated modules

* [@axway/amplify-api-builder-cli@1.4.1](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.4.1)
* [@axway/api-builder-sdk@0.5.0](https://www.npmjs.com/package/@axway/api-builder-sdk/v/0.5.0)
* [@axway/api-builder-runtime@4.27.16](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.27.16)
* [@axway/api-builder-admin@1.17.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.17.0)
* [@axway/api-builder@4.17.1](https://www.npmjs.com/package/@axway/api-builder/v/4.17.1)

{{% releasenotes/previous %}}
