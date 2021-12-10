---
title: >-
  2021-08-27 update @axway/api-builder-oas-flow-node that effects openapi
  plugins
linkTitle: >-
  2021-08-27 update @axway/api-builder-oas-flow-node that effects openapi
  plugins
weight: 20
date: 2021-10-01
---

## Why are we making this change

In the [Utrecht](/docs/release_notes/utrecht/) release of {{% variables/apibuilder_prod_name %}}, we added a feature to [@axway/api-builder-oas-flow-node](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node) to support [OAuth 2.0 Client Credentials](/docs/developer_guide/credentials/configuring_credentials/oauth_2.0_credentials/). This feature will automatically generate a new type of credential to support client credentials. It is a breaking change because versions of [@axway/api-builder-runtime](https://www.npmjs.com/package/@axway/api-builder-runtime) <= 4.68.0 will not understand the new credential type and will fail to start. In this release, [@axway/api-builder-oas-flow-node](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node) had a [major](https://semver.org/) version bump to 2.0.0. It is very difficult to hit this breaking change. The only way to hit this issue is to:

1. Have an OpenAPI plugin that has a Swagger 2.0 or OpenAPI 3.0 file that supports client credentials
1. Update the OpenAPI plugin to use @axway/api-builder-oas-flow-node@^2.0.0
1. In an {{% variables/apibuilder_prod_name %}} application with @axway/api-builder-runtime <= 4.68.0, try to install the upgraded OpenAPI plugin, or delete your swagger configuration file from the ./conf directory from an existing application

## How does this impact me

Existing [{{% variables/apibuilder_prod_name %}} OpenAPI plugins](/docs/how_to/create_a_plugin_from_openapi_files/) usually depend on version 1.x of [@axway/api-builder-oas-flow-node](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node). They are unlikely to need this new feature. However, the 2.x version of [@axway/api-builder-oas-flow-node](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node) is compatible with your OpenAPI plugin and is safe to update. It is a good idea to update to keep on top of features, fixes, and security updates, you will want to update to 2.0.0.

Importantly, OpenAPI plugins that are upgraded should set a minimum [peerDependency](https://nodejs.org/es/blog/npm/peer-dependencies) for @axway/api-builder-runtime in their package.json to "^4.69.0" to indicate that this is the minimum version of support. Changing the peerDependency is a breaking change for your plugin and it means that the plugin should also receive a major bump. Otherwise, if your plugin will be incompatible with older versions of @axway/api-builder-runtime and consumers of your plugin will have no idea why their application will not start.

{{% alert title="Note" color="primary" %}}Existing OpenAPI plugins that upgrade to [@axway/api-builder-oas-flow-node](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node)@2.0.0 should receive a major bump (see above).{{% /alert %}}

## Upgrade existing services

You need to manually install the update to receive the new major version of the [@axway/api-builder-oas-flow-node](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node):

```bash
npm install @axway/api-builder-oas-flow-node@^2.0.0
```
