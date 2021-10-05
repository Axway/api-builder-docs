---
title: Change in the way config is passed to plugins
linkTitle: Change in the way config is passed to plugins
weight: 9
deprecation: D009
date: 2021-10-01
---

{{% alert title="Note" color="primary" %}}This document describes deprecation {{% deprecation/link D009 %}}{{% /alert %}}

When plugins are loaded, the global config, which is irrelevant to what the plugin needs, may be passed to the plugin's exported initialization function.

This behavior has been deprecated since {{% variables/apibuilder_prod_name %}} - Istanbul release.

Beginning with the [Istanbul](/docs/release_notes/istanbul) release, an {{% variables/apibuilder_prod_name %}} plugin will only receive its relevant config information.

This will be the default behavior for all new services.

## Why are we deprecating this feature

Plugins should only receive configuration meant for their consumption as a parameter. Providing the whole service configuration in the edge case described below was unintended. Since this change modifies the interface to plugins, we are releasing it under a flag on an opt-in basis.

## How does this impact my service

This is now the default behavior for all new services. Any existing services will continue to work as they previously did, though it is strongly recommended you enable the new behavior on existing services.

The following examples will show the previous behavior when the configuration is passed to the example plugin `api-builder-plugin-demo.`

### Previous behavior

If the `pluginConfig` key is not present in any configuration file loaded by the service, then the whole config is passed to every plugin.

```javascript
// Service configuration
{
  apiPrefix: '/foo',
  proxy: 'example.proxy.com',
  flags: {
    enableScopedConfig: false
  }
}
```

```javascript
// api-builder-plugin-demo
module.exports = (config) => {
  console.log(config) // { apiPrefix: '/foo', proxy: 'example.proxy.com', flags: { enableScopedConfig: false } }
  const flowNode = {}; // Define flow-node
  return Promise.resolve(flowNode);
};
```

If the `pluginConfig` key is present in a configuration file loaded by the service, or an additional key matching the plugin name is provided, then the limited config is passed to every plugin.

```javascript
// Service configuration
{
  apiPrefix: '/foo',
  proxy: 'example.proxy.com',
  pluginConfig: {}, // or pluginConfig: { 'api-builder-plugin-demo': {} },
  flags: {
    enableScopedConfig: false
  }
}
```

```javascript
// api-builder-plugin-demo
module.exports = (config) => {
  console.log(config) // { proxy: 'example.proxy.com' }
  const flowNode = {}; // Define flow-node
  return Promise.resolve(flowNode);
};
```

### New behavior (enableScopedConfig flag enabled)

If the `pluginConfig` key is not present in any configuration file loaded by the service, then the limited config is passed to every plugin.

```javascript
// Service configuration
{
  apiPrefix: '/foo',
  proxy: 'example.proxy.com',
  flags: {
    enableScopedConfig: true
  }
}
```

```javascript
// api-builder-plugin-demo
module.exports = (config) => {
  console.log(config) // { proxy: 'example.proxy.com' }
  const flowNode = {}; // Define flow-node
  return Promise.resolve(flowNode);
};
```

## Upgrading existing services

Updates contain important changes to improve the performance, stability, and security of your services. Installing them ensures that your software continues to run safely and efficiently.

This only affects services that rely on custom flow-node plugins, which in turn rely on a value only present in the api-builder global configuration. This functionality was undocumented and unintended. {{% variables/apibuilder_prod_name %}} plugin developers should expect configuration to be provided under the namespace, which matches the plugin name. If you are only using Axway provided plugins, this flag is safe to enable. Otherwise, check with the plugin developer.

It is strongly recommended you upgrade {{% variables/apibuilder_prod_name %}} to the latest version as well any data connectors you may have in your stack. This feature requires a minimum of:

* {{% variables/apibuilder_prod_name %}} - Istanbul

After upgrading, the `enableScopedConfig` feature will not be active until you enable it. To enable it, add the following setting to your `default.js` file.

```javascript
flags: {
    enableScopedConfig: true
}
```

More `default.js` configuration file information can be found here: [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/#flags)

Once enabled, review your service to ensure that you have no logic in your flows or APIs that depends on the deprecated behavior.
