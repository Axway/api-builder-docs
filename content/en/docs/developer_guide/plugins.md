---
title: Plugins
linkTitle: Plugins
weight: 100
date: 2021-10-01
---

{{% variables/apibuilder_prod_name %}} 4.0.0 introduces the concept of plugins. Plugins are regular node modules that are included in your {{% variables/apibuilder_prod_name %}} project's `package.json` file.

{{% variables/apibuilder_prod_name %}} detects plugins by searching for installed modules with the `api-builder-plugin-` prefix. Scoped packages with this prefix will also be detected. These plugins can contain a mixture of different component types.

* flow-nodes
* schemas
* data connectors

Plugins which are released by Axway can be categorized by an additional prefix based on the components and functionality that they provide:

* **flow-nodes**: `api-builder-plugin-fn-`
* **data connectors**: `api-builder-plugin-dc-`

For information on the Connectors UI, refer to [{{% variables/apibuilder_prod_name %}} Console](/docs/developer_guide/console/#Connectors).

## Configuration

Most plugins are configured using the `pluginConfig` key inside your application config. A lot of plugins will generate a config file upon install which may look like this:

```javascript
module.exports = {
  pluginConfig: {
   "api-builder-plugin-myplugin": {
      // configuration goes here
    }
  }
}
```

When {{% variables/apibuilder_prod_name %}} loads plugins, the configuration specific to each plugin (identified by name) will be provided on load. Plugins may or may not require configuration, but common settings may include authentication tokens/keys and other user-specific content.

Other plugins, such as `api-builder-plugin-dc-`, may use a slightly different or legacy method of configuration. Check the readme of individual plugins for specific details.

## Creating your own plugins

We provide a method to create shareable plugins that contain flow-nodes for orchestration within the flow editor. For this, you can use the [{{% variables/apibuilder_prod_name %}} SDK](/docs/developer_guide/sdk/).

## Local plugins

There may be cases where you want to use a plugin in your project, which is not available publicly on NPM - Possibly received in the form of a .tar.gz or developed locally.

NPM allows for local dependencies using the "file:" protocol, and as of NPM 5 will link file dependencies to preserve disk space.

1. Extract and copy your plugin into any folder in your project, for example `/plugins`.
    The folder that the plugin lives in must match its package name. In this case, the plugin is called `api-builder-plugin-myplugin`.
1. Navigate to the root directory of your application and run the following command to install the plugin as a local dependency.

    ```bash
    npm install --no-optional plugins/api-builder-plugin-myplugin
    ```

    Now, whenever you run an NPM install, the local plugin and its dependencies will be installed alongside the rest of your app's dependencies and will be available in your project.
