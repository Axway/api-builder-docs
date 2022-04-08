---
title: Change in the way plugins document API Builder compatibility
linkTitle: Change in the way plugins document API Builder compatibility
weight: 52
deprecation: D052
date: 2022-04-08
---

{{% alert title="Note" color="primary" %}}This document describes deprecation {{% deprecation/link D052 %}}{{% /alert %}}

Using a peer dependency on @axway/api-builder-runtime in plugins has been deprecated since {{% variables/apibuilder_prod_name %}} [Kabul](/docs/release_notes/kabul) release. Installed plugins which have a peer dependency on @axway/api-builder-runtime will warn on startup.

Plugins should now use `engines.apibuilder` to document compatibility.

## What are peer dependencies?
Peer dependencies are a feature of npm, usually used for plugin packages, to document a particular version of a "host" package that it is compatible with. They are defined in `package.json` along with `dependencies` and `devDependencies`.

```json
"peerDependencies": {
  "@axway/api-builder-runtime": "^4.5.0"
}
```

## Why are we making this change

If you are using npm version 1, 2, 7 and higher then peer dependencies are [automatically installed](https://nodejs.org/en/blog/npm/peer-dependencies/#using-peer-dependencies), and installing plugins that still contain `peerDependencies` on `@axway/api-builder-runtime` can have unexpected results. It can cause installation to fail, or it can install an unintended version of {{% variables/apibuilder_prod_name %}}.

To avoid this, we introduced a new way of documenting compatibility with {{% variables/apibuilder_prod_name %}} - `engines.apibuilder`, and updated all our plugins.

## How does this impact my service

This issue impacts your service when you want to update the Node.js and npm versions in your environment. (The latest release of Node.js 16 is shipped with npm version 8).

Existing services can continue to use the old `peerDependencies` behavior by using the `--legacy-peer-dependencies` flag to `npm install` with unmaintained versions of plugins, however fully upgrading your service is strongly recommended.

## Upgrading your service
Most services will not be impacted as plugins will be updated at the same time as {{% variables/apibuilder_prod_name %}}, but if you are using a previous version of a supported plugin, you should manually upgrade to use the latest version of that plugin.

## Upgrading plugins that you own
If you have created a plugin, then you should update it as follows, and publish a new version to stay fully compatible with the latest versions of npm:

Check your plugin's package.json for a `peerDependencies` section. It may look like the following:

```json
{
  "name": "api-builder-plugin-example",
  "version": "1.0.0",
  "engines": {
    "node": ">=8.9"
  },
  "peerDependencies": {
    "@axway/api-builder-runtime": ">=4.5.0"
  }
}
```

Take note of the current peerDependency range for @axway/api-builder-runtime. In this example it is "^4.5.0".

Now add an "apibuilder" key under "engines" as follows. If "engines" is not defined in your package.json then you should create it. The value should be equivalent to the peer dependency range above. In this case we are using the `>=` syntax to specify ranges greater than or equal to `4.5.0`, although any valid semver expression can be used. Additionally, remove the peerDependency on @axway/api-builder-runtime. If there are no peerDependencies remaining, you may delete the section entirely.

```json
{
  "name": "api-builder-plugin-example",
  "version": "1.0.0",
  "engines": {
    "node": ">=8.9",
    "apibuilder": ">=4.5.0"
  }
}
```

You can now release a new version of your plugin. Be sure to test it first.
