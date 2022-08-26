---
title: Change in the loading of plugins when errors occur
linkTitle: Change in the loading of plugins when errors occur
weight: 6
deprecation: D006
date: 2021-10-01
---

{{% alert title="Note" color="primary" %}}This document describes deprecation {{% deprecation/link D006 %}}{{% /alert %}}

When plugins fail to load correctly, the {{% variables/apibuilder_prod_name %}} server would start, but log an error to the console, and the functionality which the plugin provided would not be available.

This behavior has been deprecated since {{% variables/apibuilder_prod_name %}} - Dublin release.

Beginning with the [Dublin](/docs/release_notes/dublin) release, the {{% variables/apibuilder_prod_name %}} server will fail to start when a plugin fails to load correctly.

This will be the default behavior in all new services.

## Why are we deprecating this feature

When errors occur while loading a plugin, these errors are not always visible to the user. This could cause confusion when a service does not behave as expected.

By causing the server to fail to start, this makes it clear to the user that something is wrong and needs to be fixed before starting the service again.

## How does this impact my service

This is now the default behavior for all new services. Any existing services will continue to work as they previously did, though it is strongly recommended you enable the new behavior on existing services.

The changed behavior may impact services that use incorrectly configured plugins.

## Upgrading existing services

Updates contain important changes to improve the performance, stability, and security of your services. Installing them ensures that your software continues to run safely and efficiently.

It is strongly recommended you upgrade {{% variables/apibuilder_prod_name %}} to the latest version as well any data connectors you may have in your stack. This feature requires a minimum of:

* {{% variables/apibuilder_prod_name %}} - Dublin

After upgrading, the `exitOnPluginFailure` feature will not be active until you enable it. To enable it, add the following setting to your `default.js` file.

```javascript
flags: {
    exitOnPluginFailure: true
}
```

For more detailed information on the configuration options, see [Project configuration](/docs/developer_guide/project/configuration/project_configuration/#flags).

Once enabled, review your service to ensure that you have no logic in your flows or APIs that depends on the deprecated behavior.
