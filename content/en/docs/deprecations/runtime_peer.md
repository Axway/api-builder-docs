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
Peer dependencies are a feature of npm used in {{% variables/apibuilder_prod_name %}} plugins to determine the versions of {{% variables/apibuilder_prod_name %}} that they are compatible with. They are defined in `package.json` along with `dependencies` and `devDependencies`.

```json
"peerDependencies": {
  "@axway/api-builder-runtime": "^4.5.0"
}
```

## Why are we making this change

In supported versions of npm before v7, `peerDependencies` were not installed. If a peer dependency was not installed or did not match the version range, npm would warn when running `npm install`.
In npm v7 and higher, peer dependencies are [automatically installed](https://github.blog/2021-02-02-npm-7-is-now-generally-available/), alongside some other behavioral differences. 

These differences can cause issues when multiple plugins that do not match the current {{% variables/apibuilder_prod_name %}} version are installed.

To avoid this, we introduced a new way of documenting compatibility with {{% variables/apibuilder_prod_name %}} - `engines.apibuilder`.

## How does this impact my service

If you are using {{% variables/apibuilder_prod_name %}} 4.60.0 and install a plugin with a mismatching {{% variables/apibuilder_prod_name %}} peer dependency, for example ">=4.3.0", then this could have one of two outcomes dependending on how {{% variables/apibuilder_prod_name %}} is installed:
1. The install will output lots of warnings, but effectively complete, however your {{% variables/apibuilder_prod_name %}} version is now unexpectedly 4.3.0.
1. The install fails due to mismatching version requirements.

Existing services can keep working for now by using the `--legacy-peer-dependencies` flag to `npm install`, however fully upgrading your service is strongly recommended.

## Upgrading your service
Most services will not be impacted as plugins will be updated at the same time as {{% variables/apibuilder_prod_name %}}, but if you are using a previous major version of a supported plugin, you should manually upgrade to use the latest compatible major version of that plugin.

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

Now add an "apibuilder" key under "engines" as follows. If "engines" is not defined in your package.json then you should create it. The value should be equivalent to the peer dependency range above. In this case we are using the `>=` syntax to specify ranges greater than or equal to `4.5.0`, although any valid semver expression can be used.

```json
{
  "name": "api-builder-plugin-example",
  "version": "1.0.0",
  "engines": {
    "node": ">=8.9",
    "apibuilder": ">=4.5.0"
  },
  "peerDependencies": {
    "@axway/api-builder-runtime": "^4.5.0"
  }
}
```

Finally, remove the peerDependency on @axway/api-builder-runtime. If there are no peerDependencies remaining, you may delete the section entirely.

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
