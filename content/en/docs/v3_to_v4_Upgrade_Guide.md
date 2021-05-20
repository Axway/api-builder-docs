---
title: v3 to v4 Upgrade Guide
linkTitle: V3 to v4 upgrade guide
description: ADD A DESCRIPTION
weight: 110
date: 2021-05-17
---

{{% alert title="❗️ {{% variables/apibuilder_prod_name %}} 3.x is deprecated" color="danger" %}}Support for {{% variables/apibuilder_prod_name %}} 3.x ceased on 30 April 2020. Use the [v3 to v4 upgrade guide](https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/api_builder_v3_to_v4_upgrade_guide.html) to migrate all your applications to [{{% variables/apibuilder_prod_name %}} 4.x](https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/api_builder_getting_started_guide.html).

Contact [support@axway.com](mailto:support@axway.com) if you require migration assistance.{{% /alert %}}

{{% variables/apibuilder_prod_name %}} 4.0.0 introduced a large number of breaking changes. They are listed in detail alongside all the other changes and fixes in the [{{% variables/apibuilder_prod_name %}} Tools 4.0.0 Release Note](/docs/release_notes/tools_4.0.0_release_note/).

This guide covers the steps required for most users to migrate their projects from {{% variables/apibuilder_prod_name %}} v3 to {{% variables/apibuilder_prod_name %}} v4.

## Prerequisites

Refer to the Prerequisites in the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/#PreReq).

### Upgrade script

Once you have a local, backed-up copy of your project, you should run the upgrade script. The upgrade script does a **partial upgrade** in situ, upgrading several dependencies in package.json as well as modifying several files due to module renaming. Execute the following command within your v3 project directory:

```
// Run {{% variables/apibuilder_prod_name %}} upgrade script

$ npx @axway/api-builder-upgrade
```

Once the upgrade script completes, you should progress through each section in this document, and apply any necessary changes to your project.

When you have completed any steps necessary below, run the following command to build your upgraded project:

```bash
$ npm upgrade
```

Then launch your project as normal by running:

```bash
$ npm start
```

## Admin UI

{{% alert title="⚠️ Note" color="primary" %}}This upgrade is handled by the @axway/api-builder-upgrade script.{{% /alert %}}

In v3, the admin UI was always installed as part of {{% variables/apibuilder_prod_name %}}. While it was disabled in production, it added a lot of unnecessary bulk to deployments. In v4, the admin UI is now a separate component, and if installed, {{% variables/apibuilder_prod_name %}} will load it. Upgraded projects should have "@axway/api-builder-admin": "^1.0.0" as a devDependency.

To run the upgrade manually:

```bash
// Install admin dev dependency

$ npm install --save-dev @axway/api-builder-admin@^1.0.0
```

## Runtime

{{% alert title="⚠️ Note" color="primary" %}}This upgrade is handled by the @axway/api-builder-upgrade script.{{% /alert %}}

In v3, the {{% variables/apibuilder_prod_name %}} runtime was named "arrow", and it was a dev-dependency by default, but may have been added as a dependency in some cases.

```
// package.json (v3)

"devDependencies": {
  "arrow": "^*"
}
```

In v4, the "arrow" dev-dependency should be removed, and replaced a new {{% variables/apibuilder_prod_name %}} runtime dependency, "@axway/api-builder-runtime".

```
// package.json (v4)

"dependencies": {
  "@axway/api-builder-runtime": "^4.0.0"
}
```

In v3, all of your local \*.js files (for example, APIs, blocks, models, and routes) require the "arrow" module.

```javascript
// models/testuser.js (v3)

var Arrow = require("arrow");
var User = Arrow.Model.extend('testuser', {
  fields: {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String }
  },
  connector: 'appc.arrowdb'
});
module.exports = User;
```

In v4, all of your local \*.js should be modified to replace the `require("arrow")` with `require("` `@axway/api-builder-runtime")`.

```javascript
// models/testuser.js (v4)

var Arrow = require('@axway/api-builder-runtime');
var User = Arrow.Model.extend('testuser', {
  fields: {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String }
  },
  connector: 'appc.arrowdb'
});
module.exports = User;
```

## Nodehandlers

{{% alert title="⚠️ Note" color="primary" %}}This upgrade is handled by the @axway/api-builder-upgrade script.{{% /alert %}}

In v3, there were several Flow Nodehandler dependencies that extended the Flow, and they were installed as dependencies by default. In v4, Nodehandlers are now known as Flow-Nodes.

```
// package.json (v3)

"dependencies": {
    "nodehandler-base64": "^1.1.0",
    "nodehandler-dot": "^1.1.0",
    "nodehandler-json": "^1.1.0"
},
```

In v4, there are three nodehandlers that were renamed and repackaged as Flow-Node plugins (bas64, doT, and json), and need to be renamed.

| v3 | v4 |
| --- | --- |
| nodehandler-dot | @axway/api-builder-plugin-fn-dot |
| nodehandler-base64 | @axway/api-builder-plugin-fn-base64 |
| nodehandler-json | @axway/api-builder-plugin-fn-json |

These should be added as plugins as npm dependencies.

```
// package.json (v4)

"dependencies": {
    "@axway/api-builder-plugin-fn-base64": "^2.0.0",
    "@axway/api-builder-plugin-fn-dot": "^2.0.0",
    "@axway/api-builder-plugin-fn-json": "^2.0.0"
},
```

In v3 flows have references to Nodehandlers.

```
// flows/GreetFlow.json (v3)

"doT.1": {
    "type": "nodehandler://nodehandler-dot/doT",
    "name": "Format Greeting",
    "method": "formatStr",
    ...
}
```

The v4 flows should have references to plugins.

```
// flows/GreetFlow.json (v4)

"doT.1": {
    "type": "nodehandler://@axway/api-builder-plugin-fn-dot/doT",
    "name": "Format Greeting",
    "method": "formatStr",
    ...
}
```

{{% alert title="⚠️ Note" color="primary" %}}If you wrote your own nodehandlers in v3, they will not work in v4. If you have custom nodehandlers that you wish to upgrade, contact [support@axway.com.](mailto:support@axway.com.){{% /alert %}}{{% alert title="❗️ Security issue" color="danger" %}}Note that doT has an npm security advisory against it (#798[). Under normal use, the security issue does not apply. However, the module is no longer actively maintained. If you do not use the GreetFlow and do not use doT, then both can be removed. Remove the "nodehandler-dot" from package.json, and remove the example Flow and API endpoint files.](https://www.npmjs.com/advisories/798)

```
// Remove Greet flow example

$ rm flows/GreetFlow.json
$ rm endpoints/Greet.json
$ rm conf/greetflow.default.js
```

The [@axway/api-builder-plugin-fn-dot](/docs/developer_guide/flows/flow-nodes/dot_flow-node/) plugin is no longer bundled with new {{% variables/apibuilder_prod_name %}} projects. We suggest using `@axway/api-builder-plugin-fn-javascript` instead of the `formatObject` method, or `@axway/api-builder-plugin-fn-mustache` instead of `formatString`.{{% /alert %}}

## Model Node Handler distinct method

Previously, the distinct method on flow-nodes for connectors had parameters for `sel` and `unsel` that were ignored. Now, these parameters are removed from the model Flow Node.

## Model query pagination parameters 'page' and 'per_page'

Previously, the Model's query method supported pagination parameters `page` and `per_page` as well as `skip` and `limit`. It was very unclear how to do pagination. Supplying both sets of parameters would yield unexpected ranges. To simplify the Model query method and associated API methods, `page` and `per_page` were removed.

## Model.findAll

In v3, the programmatic API for Model.findAll was incorrect, returning a collection as the first element of an array.

```
// api.js (v3)

collection = myModel.FindAll()[0]
```

In v4, this was fixed to return a collection correctly.

```
// api.js (v4)

collection = myModel.FindAll()
```

## Connectors

| Connector Name | Comment |
| --- | --- |
| appc.arrowdb | Renamed to [@axway/api-builder-plugin-dc-mbs](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mbs). Note that this module has been redesigned and released as a new data connector plugin to the [Mobile Backend Services](https://www.axway.com/en/products/app-development). This new module provides full support for custom objects. However, it does not support the MBS built-in objects (for example, acl, places, and so forth). |
| appc.composite | Renamed to composite. This is now built into v4 and is no longer installed separately. |
| appc.mongo | Renamed to [@axway/api-builder-plugin-dc-mongo](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mongo). |
| appc.mysql | Renamed to [@axway/api-builder-plugin-dc-mysql](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-my). |
| appc.mssql | Renamed to [@axway/api-builder-plugin-dc-mssql](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssq). |
| appc.oracle | Renamed to [@axway/api-builder-plugin-dc-oracle](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle). |
| memory | No change. |

{{% alert title="❗️ Other appc connectors" color="danger" %}}All other appc.\* connectors are not supported in v4. If you need a connector upgraded, please contact [support@axway.com.](mailto:support@axway.com.){{% /alert %}}

In v4, the connector dependencies are managed by npm, and no longer managed by appc. You can remove the "dependencies" from appc.json.

```json
// appc.json

{
  "type": "api",
  "group": "arrow",
  "dependencies": {
    "connector/appc.arrowdb": "*",
    "connector/appc.composite": "*"
  },
  "cloud": {
    ...
  }
}
```

## Configuration

The following sections describe the configuration changes from v3 to v4.

### admin

Several admin configuration options have been removed, and a number have been deprecated. The following are no longer required and can be safely removed from your configuration: `enableAdminInProduction, validEmails, validOrgs, prefix`.

```
// conf/default.js (v3)

admin: {
    // control whether the admin website is available
    enabled: true,
    // the prefix for the API documentation
    apiDocPrefix: '/apidoc',
    // if you set disableAPIDoc, in production your swagger API docs will not show up
    disableAPIDoc: false,
    // The hostnames or IPs from which connections to admin are allowed. Hostnames must be resolvable on the
    // server. IP ranges can also be specified. e.g. [ 'localhost', '192.168.1.0/24', '10.1.1.1' ]
    // An empty list [] will allow unrestricted access, though this is not recommended due to security concerns.
    allowedHosts: [
        'localhost', '::1'
    ],
    // set the email addresses you want to be able to log in to the admin website
    validEmails: [ 'support@axway.com' ],
    // set the organization ids you want to be able to log in to the admin website
    validOrgs: [ 1234 ]
},
```

```
// conf/default.js (v4)

admin: {
    // Control whether the admin website is available
    enabled: true,
    // The hostnames or IPs from which connections to admin are allowed. Hostnames must be resolvable on the
    // server. IP ranges can also be specified. e.g. [ 'localhost', '192.168.1.0/24', '10.1.1.1' ]
    // An empty list [] will allow unrestricted access, though this is not recommended due to security concerns.
    allowedHosts: [
        'localhost', '::1'
    ]
},
```

### apikey_\*

{{% variables/apibuilder_prod_name %}} no longer contains configuration per-environment. **You should save-off the values for `apikey_development`, `apikey_production`, and `apikey_preproduction`** .

```
// conf/default.js (v3)

apikey_production: 'this-is-my-production-key',
    // development key, this is the key that will be required when you are testing non-production (such as locally)
    apikey_development: 'this-is-my-development-key',
    // preproduction key, this is the key that will be required when you are testing non-production (such as locally)
    apikey_preproduction: 'this-is-my-preproduction-key',
```

In v4, {{% variables/apibuilder_prod_name %}} has one [apikey configuration option](/docs/developer_guide/project/configuration/project_configuration/#apikey). Changing values, such as apikey so that they are different in different host environments, requires additional work. See the [Environmentalization Guide](/docs/how_to/environmentalization/) for more information.

In short, change apikey to be loaded from the environment.

```
// conf/default.js (v3)

apikey: process.env.API_KEY,
```

Add the value of the `apikey_development` key to a protected `conf/.env`:

```
// conf/.env (v4)

API_KEY=this-is-my-development-key
```

You will need to provide the correct API_KEY credential for the specific runtime environment.

### baseurl

The baseurl no longer supports port. Previously, it was possible to specify baseurl as`'http://localhost:8080'`. Now, baseurl is for the scheme and hostname only, and must not contain the port. The baseurl configuration option is optional, and [port](#port) is now a separate [configuration option](/docs/developer_guide/project/configuration/project_configuration/#ssl).

### logging

In v3, {{% variables/apibuilder_prod_name %}} would write files to a logging directory. The project's application and transaction logs would be written to `./logs` by default.

```
// conf/default.js (v3)

// logging configuration
logLevel: 'trace',
logging: {
    // location of the logs if enabled
    logdir: './logs',
    // turn on transaction logs
    transactionLogEnabled: true,
    // turn on adi logging of transaction logs
    adiLogging: false
},
```

In v4, {{% variables/apibuilder_prod_name %}} no longer writes log files to a directory. All logs are emitted on the console stdout stream. This makes it easier for services to integrate with platform logging aggregators. The logging configuration can be deleted. Also, the default logLevel was changed to "debug".

```
// conf/default.js (v4)

// logging configuration
logLevel: 'debug',
```

You can delete the `./logs` directory.

```
// Delete unused ./logs

$ rm -rf ./logs
```

### port

This is a new v4 option. However, it is critical if the service is to be successfully published to Amplify Runtime Services (ARS).

```
// conf/default.js (v4)

http: {
    port: process.env.PORT
},
```

Also, you may also want to add this environment variable to a local environment `.env` file in the `conf` directory.

```
// conf/.env

PORT=8080
```

Note that you should always provide the PORT when deploying/running your service on a target environment, for example when using Docker, or when publishing to ARS.

For more information, please read the [Environmentalization](/docs/how_to/environmentalization/) guide.

### serialization

Previously, there was a `serialization.exposePrimaryKeyAsId` configuration option that was intended to force the primary key of a model always to be called `id`. Now, this configuration option has been removed, and the model primary key field will always be exposed using its actual column name. The configuration option `serialization` can be safely deleted.

```
// conf/default.js (v3)

serialization: {
    // Here for backwards compatibility with older arrow apps. When you set this to
    // true, a model's primary key will always be exposed under 'id' instead of it's
    // actual name
    exposePrimaryKeyAsId: false
}
```

## Environment

In v3, the product supported any number of environments, such as "development" and "production".

```
// Install admin dev dependency

$ ls -1 conf/
appc.arrowdb.development.js
appc.arrowdb.production.js
default.js
greetflow.default.js
```

While this was convenient, it is also potentially insecure as secure keys were stored in files by default, and it's also contrary to [12factor.net](https://12factor.net) app best practices. {{% variables/apibuilder_prod_name %}} v4 is designed to be a microservice container that can run anywhere, not just [Runtime Services](https://www.axway.com/en/platform/runtime-services). In v4, {{% variables/apibuilder_prod_name %}} will only load ".\*default.js" configuration files.

Generally speaking, you can follow the **appc.arrowdb** example below to environmentalize other configuration parameters.

### appc.arrowdb

If your {{% variables/apibuilder_prod_name %}} v3 project uses ArrowDB, it will have two configuration files for "development" and "production". To ensure your project upgrades correctly, you should environmentalize them.

```javascript
// appc.arrowdb.development.js (v3)

/**
 * Generated ArrowDB configuration for development
 */
module.exports = {
  "connectors": {
    "appc.arrowdb": {
      "enabled": true,
      "connector": "appc.arrowdb",
      "environment": "development",
      "key": "MyArrowDBDevInstanceKey",
      "baseurl": "https://api.cloud.appcelerator.com",
      "username": "appc_app_user_dev",
      "password": "dev-password",
      generateModelsFromSchema: true,
      modelAutogen:true
    }
  }
};
```

```javascript
// appc.arrowdb.production.js (v3)

/**
 * Generated ArrowDB configuration for production
 */
module.exports = {
  "connectors": {
    "appc.arrowdb": {
      "enabled": true,
      "connector": "appc.arrowdb",
      "environment": "development",
      "key": "MyArrowDBProdInstanceKey",
      "baseurl": "https://api.cloud.appcelerator.com",
      "username": "appc_app_user",
      "password": "prod-password"
    }
  }
};
```

Below is an example of how to upgrade ArrowDB configuration to v4 and at the same time, provide environment variables. Note that in v4, "ArrowDB" was renamed to "MBS" or "Mobile Backend Services".

```javascript
// mbs.default.js (v4)

module.exports = {
  connectors: {
    'appc.arrowdb': {
      enabled: true,
      connector: '@axway/api-builder-plugin-dc-mbs',
      baseurl: 'https://api.cloud.appcelerator.com',
      key: process.env.MBS_KEY,
      username: process.env.MBS_USERNAME,
      password: process.env.MBS_PASSWORD
    }
  }
};
```

Then, add the environment variables to your `conf/.env` file for running your service in development. This file should be secured, and only be read/writable by you, nor should it be checked into source control.

```
// conf/.env

MBS_KEY=MyArrowDBDevInstanceKey
MBS_USERNAME=appc_app_user_dev
MBS_PASSWORD=dev-password
```

Note that this does not address your _other_ environments, such as "production". Your project will have production keys for ArrowDB, but how you address those environments is entirely up to you, but you should address every environment that is necessary for your project. Generally speaking, they should be applied to the target environment. So, you may add production environment values to your CI system, or you may choose to create a script to set them. Whatever you choose, it should be secure and align with your CI/CD process.

For more information, please read the [Environmentalization](/docs/how_to/environmentalization/) guide.

### ARROW_\* environment variables

Previously, it was possible to specify environment variables from the operating system environment and apply them to the {{% variables/apibuilder_prod_name %}} runtime (for example, `ARROW_PORT`). Now, it is no longer possible to automatically use `ARROW_*` environment properties. Instead, the configurable environment properties need to be explicitly included in the {{% variables/apibuilder_prod_name %}}'s configuration files (for example, `conf/default.js`), and reference the environment variable by name (for example, `process.env.APP_PORT`). See the [Environmentalization Guide](/docs/how_to/environmentalization/) for details.

## Running your project

{{% alert title="⚠️ Note" color="primary" %}}This upgrade is handled by the @axway/api-builder-upgrade script.{{% /alert %}}

In v3, {{% variables/apibuilder_prod_name %}} was installed and available globally as part of the Appcelerator CLI. You would run your project using the **appc run** command.

```bash
// Run {{% variables/apibuilder_prod_name %}} (v3)

$ appc run
```

However, in v4, the runtime is now an explicit npm dependency (in other words, @axway/api-builder-runtime). Your project is "standalone," and it **is no longer necessary to install or log in to the Appc CLI** to run your project. In v4, you only use Node.js to run your project, so you should add a start script to your package.json.

```
// package.json (v4)

"scripts": {
  "start": "node ."
}
```

If you applied the necessary upgrades listed above, and your project has all the necessary configuration and environment necessary to run, then your project should start.

```bash
// Run {{% variables/apibuilder_prod_name %}} (v4)

$ npm start
```

## Deprecation warnings

When you start your upgraded project, you may encounter several [deprecation warnings](/docs/deprecations/). {{% variables/apibuilder_prod_name %}} releases every two weeks (see our past [Release Notes](/docs/release_notes/)), and each release follows an alphabetical naming convention using cities. For example, the [Akita](/docs/release_notes/standalone_-_30_august_2019/) release.

We regularly add feature improvements, fixes, and occasionally identify and fix features that do not work as designed, or are orthogonal to the intended direction of the product. Where these would introduce a breaking change, we create a deprecation flag that is disabled by default, meaning that it will have no impact on your project. However, it should not be ignored. We intend to disable these features in the next major release of the product. To stay abreast of the latest updates, and ensure that your project will upgrade easily to the next major release, you should follow the [{{% variables/apibuilder_prod_name %}} Deprecations](/docs/deprecations/) guide to upgrade your project.

{{% alert title="⚠️ Note" color="primary" %}}To ensure that you stay abreast of important updates and to make it easier to upgrade, you should pay attention to the deprecation warnings and address them as soon as possible.{{% /alert %}}

## Deploying to Amplify Runtime Services (ARS)

Once the major changes from this document are applied, and the necessary unit-tests are run to ensure your project continues to work as expected, then you can follow this guide to [Deploy an {{% variables/apibuilder_prod_name %}} application to Amplify Runtime Services](/docs/how_to/deploy_an_api_builder_application_to_amplify_runtime_services/).
