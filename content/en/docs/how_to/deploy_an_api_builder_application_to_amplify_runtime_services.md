---
title: Deploy an API Builder application to Amplify Runtime services
linkTitle: Deploy an API Builder application to Amplify Runtime services
weight: 60
date: 2021-10-01
---

{{% alert title="Note" color="primary" %}}Amplify Runtime Services is deprecated and will be discontinued effective September 1, 2022.{{% /alert %}}

## Introduction

This topic describes how to create, Dockerize, and publish an {{% variables/apibuilder_prod_name %}} application to the Amplify Runtime Services cloud. Prerequisites, instructions, and references are provided to help you successfully deploy and publish your application to the Amplify Runtime Services cloud and to test your published application.

## Prerequisites

The following sections describe the prerequisites.

### Amplify platform account

You need to have an account on [https://platform.axway.com](https://platform.axway.com).

### Docker

Docker is installed by a dedicated installer for your specific operating system. For additional Docker installation information, refer to the [Docker documentation](https://docs.docker.com/install/).

### Axway CLI

Refer to the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started/) for details.

### {{% variables/apibuilder_prod_name %}} CLI

Refer to the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started/) for details.

### Amplify Cloud Services (ACS) CLI

The Amplify Cloud Services (ACS) CLI is a node module published in the [npm public repository](https://www.npmjs.com/package/acs).

To install the Amplify Cloud Services (ACS) CLI, execute the following command:

```bash
// Install ACS

axway pm install acs
```

For additional Amplify Cloud Services (ACS) CLI information, refer to the [Amplify Runtime Services Command-Line Interface Reference](https://docs.axway.com/bundle/Amplify_Runtime_Services_2_0_allOS_en/page/amplify_runtime_services_command-line_interface_reference.html).

## Log Into the {{% variables/platform_prod_name %}}

Type the following command to log into the {{% variables/platform_prod_name %}}.

```bash
// Log Into the {{% variables/platform_prod_name %}}

axway auth login
```

With the `axway auth login` command, your default browser should open up and prompt you to enter your Amplify credentials to log into the {{% variables/platform_prod_name %}}.

Once you have successfully logged in to your Amplify account, type the following command to show you the currently logged-in user and organizations to which you belong.

```bash
axway acs whoami
```

You now have the prerequisite applications installed to use Amplify Runtime Services (ARS).

## Create your application

{{% variables/apibuilder_prod_name %}} CLI usage can be found [here](https://www.npmjs.com/package/@axway/api-builder). This the setup found in the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started/). This will create a "myproject" sub-directory.

```bash
// Create an {{% variables/apibuilder_prod_name %}} project

axway builder init myproject
```

Do **not** change directory into "myproject" when creating your platform application below.

## Register your Platform application

Execute these commands in the parent directory immediately above "myproject".

```bash
// Register a Platform application

axway acs login
axway acs new myproject --force
axway acs config --set PORT=8080 myproject
axway acs config --set NODE_ENV=production myproject
axway acs server --set Large myproject
```

The commands will log you in to the {{% variables/platform_prod_name %}} using your [https://platform.axway.com](https://platform.axway.com/) username and password, and register a new project in the cloud called "myproject" (the same name as your {{% variables/apibuilder_prod_name %}} project). Then, configure your project to use PORT 8080. This is because the container is built with PORT 8080 by default. If you accidentally ran these commands in the "myproject" directory, it will create a new sub-folder "myproject/myproject" which can be deleted. It will also set the NODE_ENV environment variable to configure your project to enable production specific performance and security optimizations. See [expressjs.com](https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production)

{{% alert title="Note" color="primary" %}}You may already have an existing platform application in the cloud with the name "myproject". If you do, and you know that it is not being used and you wish to delete it, or if you want to delete this example project on ARS, you can execute: **acs remove myproject**.{{% /alert %}}{{% alert title="Note" color="primary" %}}Your {{% variables/apibuilder_prod_name %}} service may use the NODE_ENV environment variable directly, and have functionality relying on the value being something other than "development" or "production". This is not recommended from a security perspective, since a value such as "staging" will not enable production-specific features. We recommend making use of a different environment variable for your service.{{% /alert %}}

In the example above, we configure the ARS project to use a Large container size. Different sized containers will offer different levels of performance, at the cost of more or less container points. Information about other available sizes can be found [here](https://docs.axway.com/bundle/AMPLIFY_Runtime_Services_2_0_allOS_en/page/amplify_runtime_services_command-line_interface_reference.html#AMPLIFYRuntimeServicesCommandLineInterfaceReference-ServerCommandserver).

## Build a Docker image

{{% alert title="Note" color="primary" %}}By default, Docker will build an image for the same architecture as the device you are developing on. ARS runs on x86_64, so if you are developing on a device which is not using this platform (such as ARM devices like the Raspberry Pi or M1 Mac), then you need to configure the target platform in your application's Dockerfile. This is done by specifying the platform alongside the base image.

Change the following line

```bash
// ./Dockerfile

FROM node:14-alpine
```

to

```bash
// ./Dockerfile

FROM --platform=linux/amd64 node:14-alpine
```{{% /alert %}}

To build a Docker image of your project, execute the following commands.

```bash
// Build Docker image

cd ./myproject
docker build --tag demo-image ./
```

## Publish image to Platform

To publish the Docker image of your project to the Platform, execute the following command.

```bash
// Publish image

axway acs publish myproject --delete_oldest --force --image demo-image --app_version 0.1
```

{{% alert title="Note" color="primary" %}}It can take up to 10 minutes for your project to be deployed and your service to be accessible. You should [Check publish status](#check-publish-status) before trying to access your service in the cloud.{{% /alert %}}

Once the image is written, note the URL, as you will use it to test your API, for example:

```bash
// URL

App will be available at https://<guid>.cloudapp-enterprise.appcelerator.com
```

## Check publish status

Even though your image was sent to ARS, it can take up to 10 minutes to start (for example, `Status: Deploying`). You should check the `Status` of your project before trying to access your service that is running in the cloud. The service will not be available until status shows `Status: Active`.

```bash
axway acs list myproject
```

You can also check the log of your project to see if it started properly.

```bash
axway acs logcat myproject
```

## Try your application

To try your application in the cloud, you will require your API key, which can be found in "myproject/conf/default.js". On successful publication of your project, you also received a URL with a GUID prefix to access your application from the Internet. Replace the <key> and <guid> with the API key and GUID values in the following command.

```bash
curl -u "<key>:" https://<guid>.cloudapp-enterprise.appcelerator.com/api/greet?username=Bob
```
