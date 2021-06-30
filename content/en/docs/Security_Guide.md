---
title: Security guide
linkTitle: Security guide
description: ADD A DESCRIPTION
weight: 50
date: 2021-06-22
---

The following document contains important information for managing and maintaining the security of your {{% variables/apibuilder_prod_name %}} service.

## API security

All of the API hosted by {{% variables/apibuilder_prod_name %}} are bound to the `/api` prefix by default. This prefix can be controlled by the [apiPrefix](/docs/developer_guide/project/configuration/project_configuration/#apiprefix) configuration option. **All** HTTP requests to **any** API that is bound to the apiPrefix are required to provide credentials (controlled via the [accessControl](/docs/developer_guide/project/configuration/project_configuration/#accesscontrol) configuration option), no exceptions. If you wish certain API (that are not bound to apiPrefix), to be accessed without credentials, you need to add them to the list of public API within [accessControl](/docs/developer_guide/project/configuration/project_configuration/#accesscontrol)[.](/docs/developer_guide/project/configuration/project_configuration/#accesscontrol)

## Enabling TLS/SSL

Some users may want to run their APP using [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS/SSL). Note that it is not always necessary to run TLS. For example, if your service will run in an environment where TLS is terminated at a gateway, then you would not need to enable TLS. However, if running in an environment where it can be directly accessed by clients that need TLS, then TLS should be enabled. This section requires [OpenSSL](https://www.openssl.org/) and some familiarity with it.

{{% alert title="⚠️ Note" color="primary" %}}Additional information is available at [Creating an HTTPs server with Node.js](https://contextneutral.com/story/creating-an-https-server-with-nodejs-and-express/?utm=medium) and [NodeJS and SSL](https://stackoverflow.com/questions/30957793/nodejs-ssl-bad-password-read).{{% /alert %}}

### Generate an TLS/SSL certificate

Create one new folder on the root level of your directory.

```
$ cd my-service
$ mkdir ssl
```

Navigate to the newly created folder and create an SSL certificate via [OpenSSL](https://www.openssl.org/). Please execute the following command:

```
$ openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -subj "/C=US/O=Axway/CN={{% variables/apibuilder_prod_name %}}"
Generating a RSA private key
........................++++
...........................................................++++
writing new private key to 'ssl/key.pem'
Enter PEM pass phrase:
Verifying - Enter PEM pass phrase:
-----
```

When prompted to "Enter a PEM pass phrase", choose a passphrase and retain it as you will need it later. The passphrase will be used to protect the private key.

{{% alert title="⚠️ Note" color="primary" %}}Note that "/C=US/O=Axway/CN={{% variables/apibuilder_prod_name %}}" is the Subject Distinguished Name. You can change it to whatever you require.{{% /alert %}}

### Configure TLS/SSL in the {{% variables/apibuilder_prod_name %}} service

Edit the `./conf/default.js` file from the root of your project (the TLS/SSL configuration is configured here). At the top of the file, add these require modules:

```javascript
const fs = require('fs');
const path = require('path');
```

Further below in the same file, find the "ssl" configuration. The options are the same as what is used by the Node.js [https.createServer()](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener) method. You will find the initial TLS/SSL configuration. For example:

```
// ssl: {
//   port: 8443,
//  key: fs.readFileSync(path.join('.', 'ssl','key.pem'), 'utf8'),
//  cert: fs.readFileSync(path.join('.', 'ssl','cert.pem'), 'utf8'),
//  passphrase: 'secret'
// }
```

Uncomment the configuration add change the `key` and `cert` properties (if you chose a different path). Provide a `passphrase` for the private key (configured as an OS environment variable). The following is the sample configuration:

```
ssl: {
  port: 8443,
  key: fs.readFileSync(path.join('.', 'ssl','key.pem'), 'utf8'),
  cert: fs.readFileSync(path.join('.', 'ssl','cert.pem'), 'utf8'),
  passphrase: process.env.API_BUILDER_SSL_PASSWORD
}
```

For example, to run by setting the OS environment variable if your passphrase is "secret":

```bash
// Starting with TLS enabled

$ API_BUILDER_SSL_PASSWORD=secret npm start
```

On startup, {{% variables/apibuilder_prod_name %}} will automatically bind TLS to port 8443 (i.e. [https://localhost:8443/console](https://localhost:8443/console)). You can change that in the `ssl` configuration previously mentioned.

### Security considerations

* You should keep your TLS/SSL password secure, and _**never**_ commit it to source-control.

* You should not use use weak encryption or insecure digests when generating your production keys.

* When enabling TLS/SSL, you may also want to also [disable HTTP](#Securityguidance-DisableHTTP).

### Environmental considerations

You should use different TLS/SSL certificates per environment, so you may need a way to manage a number of certificates and keys. You can use environment variables in the `./conf/default.js` file to help you achieve that. In addition, you can use the `./conf/.env` file to set the environment variables for your local environment as this file is never checked into source control.

### Swagger considerations

As previously mentioned, your service may be protected by an edge gateway with TLS/SSL termination. In that case, for all intents and purposes, the client will only be aware of the gateway as the {{% variables/apibuilder_prod_name %}} service. In that case, when the client requests the Swagger API document (`/apidoc`), the scheme, or host may be incorrect. You can override these values in the [apidoc overrides](/docs/developer_guide/project/configuration/project_configuration/#apidoc) in the `./conf/default.js` file as appropriate:

```
overrides: {
  // schemes: [ 'https' ],
  // host: 'localhost:8080',
  // basePath: '/'
}
```

### Disabling HTTP

In cases when TLS/SSL listener is enabled, you may want to disable all HTTP traffic. This can be done using the **disabled** property of **http** configuration flag:

```
http: {
  port: parseInt(process.env.PORT) || 8080,
  disabled: true // false by default
}
```

## Adding additional CA certificates

As of Node.js 7.3.0 (and LTS versions 6.10.0 and 4.8.0), it is possible to add well-known extra certificates to Node.js with a `NODE_EXTRA_CA_CERTS`environment variable. It can be useful in the cloud environment or other deployment environments to add trusted certificates as a matter of policy (as opposed to explicit coding), or on personal machines, for example, adding CAs for proxy servers. To set the additional CA certificates, use the following environmental parameter:

```
NODE_EXTRA_CA_CERTS=file
```

When set, [well known "root" CAs](https://github.com/nodejs/node/blob/master/src/node_root_certs.h) will be extended with the extra certificates in a file. The file should consist of one or more trusted certificates in PEM format. A "process.emitWarning()" message will be emitted (once) if the file is missing or malformed, but any errors are otherwise ignored. Also note that when the node.js CA options are used (i.e. [\--use-bundled-ca](https://nodejs.org/api/cli.html#cli_use_bundled_ca_use_openssl_ca), [\--use-openssl-ca](https://nodejs.org/api/cli.html#cli_use_bundled_ca_use_openssl_ca)), the NODE_EXTRA_CA_CERTS are not used.

For example:

**File structure example:**

```
// extra-ca-certs.pem

-----BEGIN CERTIFICATE-----
{your certificate}
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
{your certificate}
-----END CERTIFICATE-----
```

You can then set NODE_EXTRA_CA_CERTS to the environment:

```
$ export NODE_EXTRA_CA_CERTS=./extra-ca-certs.pem
```

Or via docker:

```
$ docker run --name <CONTAINER_NAME> -e NODE_EXTRA_CA_CERTS=./extra-ca-certs.pem -p 8081:8081 -d <IMAGE_NAME>
```

## Development vs. production environments

npm applications have a set of modules listed in `package.json` for the [dependencies](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies), [devDependencies](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#devdependencies), and [peerDependencies](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#peerdependencies). As a developer or a dev-ops engineer, the manner in which you install can impact the security of your application. If your application is run in development modes, e.g. "npm install", then the devDependencies will be installed. It is important to only install the modules that you require for development (e.g. such as linters, and test frameworks) as devDependencies. Otherwise, it can lead to unnecessary bloat.

If you run "npm install", npm will install all dependencies, devDependencies, and peerDependencies (as of npm v7), and your application will be in development mode.

If you run "npm install --production", npm will only install dependencies.

Furthermore, special attention must be given to the [NODE_ENV environment variable](https://docs.npmjs.com/cli/v7/using-npm/config#production), which has a special meaning for npm and [Express](https://expressjs.com/en/advanced/best-practice-performance.html), and should not be used for any other purpose other than what it was intended. NODE_ENV has different effects, depending on when it is used. For example, when running "npm install --production", the NODE_ENV environment variable is automatically set to "production". When set, "npm install" will:

* Only install packages in `dependencies`

* `devDependencies` and `peerDependencies` are not installed

When NODE_ENV is set to "production" at runtime, this effects the Express.JS middleware, which yields better security and performance:

* View templates are cached

* CSS files are cached

* Stack traces are not returned to the client on API failure

However, It is to be noted that as of {{% variables/apibuilder_prod_name %}} Ibiza, these behaviours are automatically enabled for performance and security regardless of the value of NODE_ENV.

Note that any dependent modules may also check NODE_ENV=production for other production-specific optimisations.

In short, you should set NODE_ENV=production for production, and do nothing with it otherwise.

## Environmentalization

The best practice for building a [Twelve-Factor App](https://12factor.net/) is to separate or decouple the configuration from the application. Environmentalization is the simplest method to decouple the configuration from the application.

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

### Local environment file (conf/.env)

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

### Configuration value types

As discussed, configuration parameters usually have specific type requirements, such as string, number, or boolean. Environment values that are sourced from the OS are always strings. Therefore, when using them in configuration, it is important to convert them to the expected type. Also, the conversion is not straight forward. For example, [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) will return NaN if passed an undefined value. When converting values, you have the full spectrum of JavaScript at your disposal.

#### Default values

Sometimes you want to default to a value when it is not specified as an environment variable. You can use the `||` operator to provide a default when the environment value is falsey.

```javascript
// ./conf/default.js

module.exports = {
  default: process.env.DEFAULT || 'hiya'
};
```

#### Converting integers

Integers should get converted with [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt). Be careful with unexpected values as [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) can return `NaN`. For example, `parseInt('foo'),`and `parseInt(undefined)` both return NaN. If NUMBER is not set in the environment, its value is `undefined`.

```javascript
// ./conf/default.js

module.exports = {
  number: parseInt(process.env.NUMBER || 0, 10)
};
```

#### Converting floats or decimals

Decimals should get converted with [parseFloat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat). Be careful with unexpected values as [parseFloat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) can return `NaN`. For example `parseFloat('foo'),` and `parseFloat(undefined)` both return NaN. If DECIMAL is not set in the environment, its value is `undefined`.

```javascript
// ./conf/default.js

module.exports = {
  decimal: parseInt(process.env.DECIMAL || '3.14', 10)
};
```

#### Converting booleans

Converting Boolean values requires fineness as there is no direct conversion in JavaScript. It largely depends on how user-friendly you want to be, for example, arguments could be made for accepting "1", "true", "TRUE", or "0", "false", or "FALSE". You could write a parseBoolean function and use that, or be careful when you define the values in the target host environment.

```javascript
// ./conf/default.js

module.exports = {
  boolean: process.env.BOOLEAN === 'true'
};
```

#### Formatting strings

Sometimes a configuration value is a composite of different environment values. For example, when you want a database URI and a separate database name. These can be formatted using the javascript [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) operator, \`\`.

```javascript
// ./conf/default.js

module.exports = {
  connect: `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME || 'default'}`
};
```

### Complex example

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
