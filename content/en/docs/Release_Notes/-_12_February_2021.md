---
title: '- Giza'
linkTitle: '- Giza'
weight: 10
date: 2021-03-02
---

## Summary

This release includes:

* [Upgrade](#upgrade)

* [Breaking Changes](#breaking-changes)

* [Features](#features)

* [Fixes](#fixes)

* [Deprecations](#deprecations)

* [Updated Modules](#updated-modules)

* [Plugins](#updated-plugins)

* [Known Issues](#known-issues)

## Upgrade

Before updating, we recommend deleting package-lock.json if it exists.

To update an existing {{% variables/apibuilder_prod_name %}} application, execute the following command from within the application directory:

```bash
npm update
```

## Breaking Changes

* #6734: Updated `@axway/api-builder-plugin-fn-xslt` to use `xml` format for XML and XSLT parameters. This is a breaking change to the plugin which requires the latest version of `@axway/api-builder-admin` (Giza).

## Features

* #6559: Previously, log messages did not include the log level when output. Now, every log message in new projects will include the level. See deprecation [\[D049\]](#D049).

* #6725: Previously, in the Flow editor's parameter text editor, long lines with no whitespace were not wrapped, and could not be read by scrolling horizontally. Now horizontal scrolling has been enabled.

* #6725: Add XML syntax highlighting for XML format flow-node parameters in the Flow-editor.

* #6735: Deprecations are now sorted and moved together to be more visible to users when the {{% variables/apibuilder_prod_name %}} server is started.

## Fixes

* #6650: {{% variables/apibuilder_prod_name %}} will no longer exit on malformed multipart/form-data requests.

* #6669: Updated `dockerfile` in new {{% variables/apibuilder_prod_name %}} services to include the NODE_ENV environment variable set to `production`.

* #6687: Previously, if Flow-trigger plugins were installed and the `./triggers` directory did not exist, or had been deleted, the Flow editor would not show any available Flow-triggers. Now, the Flow Editor will show all installed Flow-triggers, irrespective of the existence of the `./triggers` directory or trigger configuration.

* #6700: Previously, when editing flow-node or flow-trigger parameters in the flow-editor and switching to another flow-node or trigger of the same type with parameters that have not been configured, then the values from the previous selection would be visible. Now, the values of the previous selection are no longer still visible.

* #6706: Previously, `@axway/api-builder-plugin-fn-xslt` did not handle errors when spawning an xslt3 process to parse xslt templates, causing a server crash with an "Uncaught Exception Error". Now, errors are handled by the flow-node.

* #6732: OpenAPI plugins will no longer error with `cannot find @axway/api-builder-runtime instance` when running tests from a sub-directory of an {{% variables/apibuilder_prod_name %}} project.

* #6732: OpenAPI plugins will now show the detail of any OAS validation errors that are found when running the unit tests, instead of just a count.

## Deprecations

These are the deprecations introduced in this release. Click [here](/docs/deprecations/) for a list of all deprecations.

* **\[[D049](/docs/deprecations/#D049)\] enableLoggingOfLevel**: The logger will now include the log level (e.g. "INFO") in each log message. See [Change in log message format for levels](/docs/deprecations/change_in_log_message_format_for_levels/).

## Updated modules

* [@axway/amplify-api-builder-cli@1.13.2](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.13.2)

* [@axway/api-builder@4.22.2](https://www.npmjs.com/package/@axway/api-builder/v/4.22.2)

* [@axway/api-builder-admin@1.37.3](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.37.3)

* [@axway/api-builder-runtime@4.54.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.54.0)

* [@axway/api-builder-sdk@1.1.0](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.1.0)

* [@axway/api-builder-test-utils@1.1.7](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.1.7)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@2.9.2](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.9.2)

* [@axway/api-builder-plugin-fn-xslt@3.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-xslt/v/3.0.0)

## Known Issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues/).
