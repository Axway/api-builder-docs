---
title: Update @axway/api-builder-plugin-fn-swagger
date: 2021-08-27
---

## Why are we making this change

In the [Utrecht](/docs/release_notes/utrecht/) release of {{% variables/apibuilder_prod_name %}}, we added a feature to [@axway/api-builder-plugin-fn-swagger](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger) to support [OAuth 2.0 Client Credentials](/docs/developer_guide/credentials/configuring_credentials/oauth_2.0_credentials/). This feature will automatically generate a new type of credential to support client credentials. It is a breaking change because versions of [@axway/api-builder-runtime](https://www.npmjs.com/package/@axway/api-builder-runtime) <= 4.68.0 will not understand the new credential type and will fail to start. In this release, [@axway/api-builder-plugin-fn-swagger](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger) had a [major](https://semver.org) version bump to 3.0.0. It is very difficult to hit this breaking change. The only way to hit this issue is to:

1. Have a Swagger 2.0 or OpenAPI 3.0 file in ./swagger directory that supports client credentials
1. Manually delete your swagger configuration file from the ./conf directory
1. Manually update to @axway/api-builder-plugin-fn-swagger@^3.0.0
1. Neglect to update @axway/api-builder-runtime or pin it to a version <= 4.68.0

## How does this impact my service

Existing {{% variables/apibuilder_prod_name %}} services usually depend on version 2.x of [@axway/api-builder-plugin-fn-swagger](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger). They are unlikely to need this new feature. However, the 3.x version of [@axway/api-builder-plugin-fn-swagger](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger) is compatible with your existing service and is safe to update. It is a good idea to update to keep on top of features, fixes, and security updates, you will want to update to 3.0.0 of this plugin.

## Upgrade existing services

You need to update the runtime to a minimum version to support the plugin, and to install the new major version of the swagger plugin:

```bash
npm install @axway/api-builder-runtime@^4.69.0
npm install @axway/api-builder-plugin-fn-swagger@^3.0.0
```
