---
title: '- Faro'
linkTitle: '- Faro'
weight: 20
date: 2021-03-02
---

## Summary

This release includes:

* [Upgrade](#upgrade)

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

## Features

* #6601: Added a new configuration option `limits.multipartPartSize`. This allows {{% variables/apibuilder_prod_name %}} to be configured to return 413 (Payload too large) when individual parts of multipart/form-data requests exceed the configured limit. It's recommended to configure this. In new services, the default maximum size is configured to 10MB. See deprecation [\[D048\]](#D048).

* #6643: Added parameter `retries` to the Connection parameters in Kafka flow-trigger. This controls the number of times that the Kafka client retries when attempting to establish a connection to the configured Kafka server.

* #6658: Flow-triggers can now be created from within the Flow editor by dragging and dropping installed ones from the flow-nodes panel on the left.

* #6699: breaking change: Support XSLT 2.0 and 3.0 in XSLT plugin.

## Fixes

* #6707: Added missing `chalk` dependency to `arrow-admin-ui`.

## Deprecations

These are the deprecations introduced in this release. Click [here](/docs/deprecations/) for a list of all deprecations.

* **\[[D046](/docs/deprecations/#D046)\] config.bodyParser**: The `bodyParser`config option is deprecated and will be removed in a future version of the product.

* **\[[D047](/docs/deprecations/#D047)\] config.busboy**: The `busboy`config option is deprecated and will be removed in a future version of the product. Use `config.limits` to configure limits for multipart/form-data requests and return 413 to clients when a limit is hit.

* **\[[D048](/docs/deprecations/#D048)\] undefinedMultipartPartSize**: The new `config.limits` config option should be configured with a value. Leaving it unset is deprecated behavior and the default behavior will change in a future version of the product to be equivalent to setting Infinity (no limit).

## Updated modules

* [@axway/amplify-api-builder-cli@1.13.0](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.13.0)

* [@axway/api-builder@4.22.0](https://www.npmjs.com/package/@axway/api-builder/v/4.22.0)

* [@axway/api-builder-admin@1.36.1](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.36.1)

* [@axway/api-builder-runtime@4.52.0](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.52.0)

* [@axway/api-builder-project-utils@1.0.1](https://www.npmjs.com/package/@axway/api-builder-project-utils/v/1.0.1)

## Updated plugins

* [@axway/api-builder-plugin-fn-xslt@2.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-xslt)

* [@axway/api-builder-plugin-ft-kafka@0.4.0](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka/v/0.4.0)

## Known Issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues/).
