---
title: Enable a secure HTTPS listener
linkTitle: Enable a secure HTTPS listener
weight: 90
date: 2021-03-02
---

This document describes how to enable secure HTTPS listener for an {{% variables/apibuilder_prod_name %}} service.

## Introduction

The generation of {{% variables/apibuilder_prod_name %}} services is a simple process with the help of the {{% variables/apibuilder_prod_name %}} CLI tool.

Some users may want to run their APP using the Secure Sockets Layer (SSL), so this document describes how to make the necessary configuration changes. Additionally, this document provides the technical requirements and an example of how to scaffold and run an {{% variables/apibuilder_prod_name %}} service and configure SSL.

## Prerequisites

Before setting up a service and configuring SSL, refer to:

* [Getting Started with {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/) - Provides detailed instructions for installing {{% variables/apibuilder_prod_name %}} and creating an {{% variables/apibuilder_prod_name %}} service.

* [{{% variables/apibuilder_prod_name %}} Project](/docs/developer_guide/project/) - Provides detailed information about {{% variables/apibuilder_prod_name %}} projects and services.

* Install the {{% variables/apibuilder_prod_name %}} CLI - Refer to [installing {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/#InstallAPIB) in the the [Getting Started with {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/).

* [OpenSSL](https://www.openssl.org/) - Provides detailed information about OpenSSL.

## Documentation and resources

Useful resources on how to use the product:

* [{{% variables/apibuilder_prod_name %}} Documentation](/docs/api_builder/)

* [Axway Appcelerator Youtube Channel](https://www.youtube.com/watch?v=lgPFasrGATE)

* [Appcelerator Blog](https://www.appcelerator.com/blog/)

## Configure SSL

This document provides a step-by-step tutorial on how to run an {{% variables/apibuilder_prod_name %}} service and configure SSL. These steps include:

1. Scaffold and run the {{% variables/apibuilder_prod_name %}} service.

2. Create an SSL certificate.

3. Configure SSL in the {{% variables/apibuilder_prod_name %}} service.

These steps and their required prerequisites are described in the following sections.

### Step 1: Scaffold and run {{% variables/apibuilder_prod_name %}} Service

If you already have a generated service, you can proceed to Step 2.

To scaffold and run your {{% variables/apibuilder_prod_name %}} service, execute the following commands:

```bash
amplify builder init myproject
cd myproject
npm start
```

Once your service is running, point your browser to `http://localhost:8080/console`, for access to the {{% variables/apibuilder_prod_name %}} user interface (UI) console.

For additional information on the {{% variables/apibuilder_prod_name %}} UI, refer to the [Getting Started with {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/).

Now, stop the service by using **Ctrl + C** in your terminal where the service is running and go to the next step.

### Step 2: Create an SSL certificate

Create one new folder on the root level of your directory.

```
cd <api-builder-service>
mkdir <new-folder>
```

Navigate to the newly created folder and create an SSL certificate via [OpenSSL](https://www.openssl.org). Please execute the following command:

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -subj "/C=US/O=Axway/CN={{% variables/apibuilder_prod_name %}}"
```

{{% alert title="⚠️ Note" color="primary" %}}`-subj "/C=US/O=Axway/CN={{% variables/apibuilder_prod_name %}}"` is the default DN.{{% /alert %}}

Due to the generation process, you will need to set **PEM passphrase**; for example, this is a password that must be supplied by anyone wanting to use the keys.

Once your certificate is created, you will find two new files in your `<new-folder>`; for example, the `key.pem` file that will store the private key and the `cert.pem` file, which is the certificate.

In case you specified the **PEM passphrase** when generating the certificate, there is a password that must be supplied by anyone wanting to use it.

{{% alert title="⚠️ Note" color="primary" %}}Additional information is available at [Creating an HTTPs server with Node.js](https://contextneutral.com/story/creating-an-https-server-with-nodejs-and-express/?utm=medium) and [NodeJS and SSL](https://stackoverflow.com/questions/30957793/nodejs-ssl-bad-password-read).{{% /alert %}}

### Step 3: Configure SSL in the {{% variables/apibuilder_prod_name %}} service

Navigate to the `./conf/default.js` file from the root of your project. Your SSL configuration goes here. The options are the same as what is used by the Node.js [https.createServer()](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener) method. You will find the initial SSL configuration. For example:

```
// ssl: {
//   port: 8443,
//  key: fs.readFileSync(path.join('.', 'ssl','key.pem'), 'utf8'),
//  cert: fs.readFileSync(path.join('.', 'ssl','cert.pem'), 'utf8'),
//  passphrase: 'secret'
// }
```

Enable SSL by uncommenting the configuration. Once the configuration is uncommented, add a key and certificate, provide the paths to the files, and provide a password for the private key (configured as an OS environment variable). The following is the sample configuration:

```
ssl: {
  port: 8443,
  key: fs.readFileSync(path.join('.', 'ssl','key.pem'), 'utf8'),
  cert: fs.readFileSync(path.join('.', 'ssl','cert.pem'), 'utf8'),
  passphrase: process.env.API_BUILDER_SSL_PASSWORD
}
```

The code fragment above is using 'fs' and 'path' modules which must be required on top of your configuration file as follows:

```javascript
const fs = require('fs');
const path = require('path');
```

Then navigate to the root directory of `<your-project>` and run the service using the following command:

```bash
API_BUILDER_SSL_PASSWORD=<your-passphrase-key-password> npm start
```

## Disable HTTP

In cases when HTTPS listener is activated the user might want to disable the HTTP traffic.

This can be done using the **disabled** property of **http** configuration flag:

```
http: {
  port: parseInt(process.env.PORT) || 8080,
  disabled: true // false by default
}
```

{{% alert title="⚠️ Note" color="primary" %}}Additional information is available at [{{% variables/apibuilder_prod_name %}} Configuration](/docs/developer_guide/console/) for both **ssl** and **http** configuration options.{{% /alert %}}
