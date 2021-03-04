---
title: Environmentalization
linkTitle: Environmentalization
weight: 100
date: 2021-03-02
---

## Introduction

The best practice for building a [Twelve-Factor App](https://12factor.net) is to separate or decouple the configuration from the application. Environmentalization is the simplest method to decouple the configuration from the application.

While the {{% variables/apibuilder_prod_name %}} [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/) allows developers to configure their applications with configuration files, these values are static and hard-coded into the application. However, and quite often, applications need different configurations for different environmental contexts in which they are run, or they require sensitive configuration, such as credentials, that must _never_ go into unsecured application configuration files. For example, it is often necessary to use one set of credentials locally, but use some other set of credentials when running in a different environment. To ensure that the application can run in _any_ environment, it is necessary to decouple configuration from the application.

Decoupling the configuration is the process whereby configuration is replaced with values that are sourced elsewhere (for example, from the host environment), enabling the application (or container) to be run anywhere.

In this document, we will take the simplest approach, which is to replace configuration values with host environment variables. This is sometimes referred to as "environmentalizing". For example:

```javascript
// ./conf/default.js

module.exports = {
  password: process.env.PASSWORD
};
```

When {{% variables/apibuilder_prod_name %}} starts up, it will look for the OS environment variable PASSWORD, if it's not set, the value will be `undefined`, but if it is set, the value is _always_ a string.

Setting the value of PASSWORD is going to be specific to the OS you are using (or host).

For example, on Linux PASSWORD can be set from the command line:

```
$ setenv PASSWORD=secret
```

With Docker containers, PASSWORD can be provided with [docker run](https://docs.docker.com/engine/reference/commandline/run).

```
$ docker run -e PASSWORD=secret --tag myapp:latest
```

With Amplify Runtime Services, the PASSWORD can be provided with the [appc command](/docs/how_to/deploy_an_api_builder_application_to_amplify_runtime_services/).

```
$ amplify acs config --set PASSWORD=secret myapp
```

Note that this is only one way to decouple your application from its configuration. There are other (more complex) ways, for example, such as obtaining these values from an external configuration server. This document gives you the basis upon which you can tailor your solution.

{{% variables/apibuilder_prod_name %}} provides an easy way to specify environment variables in your development environment. However, it does not address the management of configuration parameters _other_ environments, for example, production, nor does it address how those values are protected. How you address those environments is entirely up to you. For example, you may add production environment variables values to your CI system, or you may choose to create a script to set them. Whatever you choose, it should be secure and align with your CI/CD process and should meet security best-practices.

## Local environment file

Decoupling the configuration from the application makes the application very flexible. However, it also means that it is a pain when you want to run it. You will likely run the application locally quite often, so for this reason, a feature was added in the {{% variables/apibuilder_prod_name %}} [Barcelona](/docs/release_notes/standalone_-_27_september_2019/) release to load from a local ./`conf/.env` file. If this file exists, it is loaded by {{% variables/apibuilder_prod_name %}} on startup, and its values are augmented with the host OS environment variables. Values from this file are only applied if the host OS does not already have the value set.

```
// ./conf/.env (default)

PORT=8080
LOG_LEVEL=debug
```

The `config/.env` file will often contain sensitive information, so it is protected so that it can only be read by the user that created it (not supported on Windows), and will _not_ be bundled as part of Docker, and it **will never be committed to source control**. If you upgrade an existing application to the [Barcelona](/docs/release_notes/standalone_-_27_september_2019/) release, you will need to create the file manually and ensure it is protected.

{{% alert title="⚠️ Optional" color="primary" %}}Using ./`config/.env` for development is entirely optional, but it will make development much easier.{{% /alert %}}{{% alert title="❗️ Caution" color="danger" %}}./`config/.env` usually contains sensitive information like usernames and passwords.

By default, this file is never added to npm, git, or docker.

Make sure this stays the same, and file is not committed into public repositories. It should stay local.{{% /alert %}}

## Configuration value types

As discussed, configuration parameters usually have specific type requirements, such as string, number, or boolean. Environment values that are sourced from the OS are always strings. Therefore, when using them in configuration, it is important to convert them to the expected type. Also, the conversion is not straight forward. For example, [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) will return NaN if passed an undefined value. When converting values, you have the full spectrum of JavaScript at your disposal.

### Default values

Sometimes you want to default to a value when it is not specified as an environment variable. You can use the `||` operator to provide a default when the environment value is falsey.

```javascript
// ./conf/default.js

module.exports = {
  default: process.env.DEFAULT || 'hiya'
};
```

### Converting integers

Integers should get converted with [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt). Be careful with unexpected values as [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) can return `NaN`. For example, `parseInt('foo'),`and `parseInt(undefined)` both return NaN. If NUMBER is not set in the environment, its value is `undefined`.

```javascript
// ./conf/default.js

module.exports = {
  number: parseInt(process.env.NUMBER || 0, 10)
};
```

### Converting floats or decimals

Decimals should get converted with [parseFloat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat). Be careful with unexpected values as [parseFloat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) can return `NaN`. For example `parseFloat('foo'),` and `parseFloat(undefined)` both return NaN. If DECIMAL is not set in the environment, its value is `undefined`.

```javascript
// ./conf/default.js

module.exports = {
  decimal: parseInt(process.env.DECIMAL || '3.14', 10)
};
```

### Converting booleans

Converting Boolean values requires fineness as there is no direct conversion in JavaScript. It largely depends on how user-friendly you want to be, for example, arguments could be made for accepting "1", "true", "TRUE", or "0", "false", or "FALSE". You could write a parseBoolean function and use that, or be careful when you define the values in the target host environment.

```javascript
// ./conf/default.js

module.exports = {
  boolean: process.env.BOOLEAN === 'true'
};
```

### Formatting strings

Sometimes a configuration value is a composite of different environment values. For example, when you want a database URI and a separate database name. These can be formatted using the javascript [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) operator, \`\`.

```javascript
// ./conf/default.js

module.exports = {
  connect: `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME || 'default'}`
};
```

## Complex example

Below is a complex example using environment variables with multiple files. Let's assume that we have a simple {{% variables/apibuilder_prod_name %}} service with MongoDB connector installed, then the configuration related files in the **service/conf** directory will be:

```
$ ls -1a conf/
.env
mongo.default.js
default.js
greetflow.default.js
```

The main application is decoupled to the source `APIKEY`, `PORT`, and `LOG_LEVEL` from the environment in `conf/default.js`:

```javascript
// ./conf/default.js

module.exports = {
  apikey: process.env.APIKEY,
  baseurl: 'http://localhost',
  port: process.env.PORT,
  logLevel: process.env.LOG_LEVEL,
  ...
}
```

The MongoDB connector is configured to obtain the value `MONGODB_CONECTION` from the environment:

```javascript
// ./conf/mongo.default.js

module.exports = {
  connectors: {
    mongo: {
      connector: '@axway/api-builder-plugin-dc-mongo',
      url: process.env.MONGODB_CONNECTION,
      generateModelsFromSchema: false,
      modelAutogen: false
    }
  }
};
```

You also set values in your `conf/.env` file to make development easier:

```
// ./conf/.env

# Service
APIKEY=123
PORT=8080
LOG_LEVEL=debug

# Mongo DB Connector
MONGODB_CONNECTION='mongodb://localhost/apibuilder'
```

In the above example:

* The environment variables `APIKEY`, `PORT`, `LOG_LEVEL`, and `MONGODB_CONNECTION` will be available to the runtime;

* The values of those environment variables will match the values specified in the .env file (unless they are set in the host environment previously);

* The configuration parameters that point to these environment variables - `apikey`, `port`, `logLevel`, and `url` (from mongo config) - will use the values from `conf/.env`.
