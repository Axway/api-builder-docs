---
title: Huddersfield release notes
linkTitle: Huddersfield
date: 2020-01-17
description: 17 January 2020
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #4899: Add plugin init command to CLI and new plugin SDK
* #6139: Support loading data connectors that fail to connect
* #6152: Add support for installing Components

## Fixes

* #6142: causes exception
* #6174: Add examples link to SDK

## Release notes

* #4899: Added a new command `plugin init` to the [@axway/api-builder](https://www.npmjs.com/package/@axway/api-builder) CLI to enable plugin projects to be created via the CLI.
* #4899: Created a new SDK [@axway/api-builder-sdk](https://www.npmjs.com/package/@axway/api-builder-sdk) for writing plugins and improved the experience.
* #6139: Previously, if a connector failed to connect on startup, e.g. with missing credentials, then {{% variables/apibuilder_prod_name %}} would exit. Now, {{% variables/apibuilder_prod_name %}} will allow connectors to fail to connect on startup, provided that they are not used in a flow, or generate model API, or are used in a composite model.
* #6142: Previously, {{% variables/apibuilder_prod_name %}} was failing to restart on SIGUSR2 signal with the error "server failed to start". Now, it restarts successfully when that signal is received.
* #6152: Introduced a new feature that allows easy installation of Axway supported {{% variables/apibuilder_prod_name %}} components via the Connectors page in the UI.
* #6174: Updated the SDK documentation and examples.

## Updated modules

* [@axway/amplify-api-builder-cli@1.2.6](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.2.6)
* [@axway/api-builder-runtime@4.21.4](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.21.4)
* [@axway/api-builder-admin@1.14.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.14.0)
* [@axway/api-builder@4.14.1](https://www.npmjs.com/package/@axway/api-builder/v/4.14.1)

{{% releasenotes/previous %}}
