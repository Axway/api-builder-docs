---
title: Dockerize an API Builder service
linkTitle: Dockerize an API Builder service
weight: 70
date: 2021-10-01
---

This document describes how to run an {{% variables/apibuilder_prod_name %}} service or application in a Docker container.

## Introduction

If you have previously created {{% variables/apibuilder_prod_name %}} services, you already know that generating an {{% variables/apibuilder_prod_name %}} service with the help of the {{% variables/apibuilder_prod_name %}} CLI tool is relatively easy. However, you may want to run your service from within a Docker container so it can be weaved and used as part of a more complex solution.

This document provides a step-by-step tutorial on how to run an {{% variables/apibuilder_prod_name %}} service within a Docker container. These steps include:

1. Scaffold and run the {{% variables/apibuilder_prod_name %}} application.
1. Prepare to run your service within a Docker container.
1. Create a Docker image for your service.
1. Run the Docker container and access your service.

These steps and their required prerequisites are described in the following sections.

## Prerequisites

You need to have the following installed:

1. Docker - The installation of Docker is via a dedicated installer for your specific operating system. For additional Docker installation information, refer to the [Docker documentation](https://docs.docker.com/install/).
1. {{% variables/apibuilder_prod_name %}} CLI - Refer to [installing {{% variables/apibuilder_prod_name %}}](/docs/getting_started/#install-the-api-builder-cli) in the the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started/).

## Dockerize an {{% variables/apibuilder_prod_name %}} Service

To Dockerize an {{% variables/apibuilder_prod_name %}} Service, complete the following steps.

### Step 1: Scaffold and run {{% variables/apibuilder_prod_name %}} Service

If you already have a generated service, you can proceed to Step 2.

To scaffold and run your {{% variables/apibuilder_prod_name %}} service, execute the following commands:

```bash
amplify builder init <SERVICE_NAME>
cd <SERVICE_NAME>
npm start
```

Once your project is running, point your browser to `http://localhost:8080/console` to access the {{% variables/apibuilder_prod_name %}} user interface (UI) console.

For additional information on the {{% variables/apibuilder_prod_name %}} UI, refer to the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started/).

Excellent! Now, you have tested that your service is running directly on your machine.

Now, stop the service by using Ctrl + C in your terminal where the service is running and go to the next step.

The following variable placeholder is used in this section:

| Variable Placeholder | Description |
| --- | --- |
| `<SERVICE_NAME>` | This is your chosen service name that the {{% variables/apibuilder_prod_name %}} CLI is using. For example: `myservice`<br /><br />It will create a folder with the chosen name and will place all the generated files in that folder. |

### Step 2: Prepare to run your service within Docker

In Step 1, we showed the traditional way of running your service locally. Now, let's see how to run your service within a container.

When running your service in a container, it is often desirable to have the configuration (or parts of it) set at runtime rather than relying on static values.

To achieve this, you can update the configuration files to read from the environment.

In Node.js, this is done with reading variables from **process.env**; for example, **process.env.<VARIABLE_NAME>**.

#### Configuration files types

The configuration files that can contain environment variables are placed in the **<SERVICE_FOLDER>/conf** folder.

All the variables in your configuration files taken from **"process.env**.<VARIABLE_NAME>**"** can be provided when running the Docker container.

The following table lists the configuration files, their location, and their example content. Note that this tutorial does not require a connector to be installed. The connector configuration is shown to inform you that you will have to provide an additional set of environment variables when dockerizing an {{% variables/apibuilder_prod_name %}} service with connectors.

| Configuration File | Location | Example |
| --- | --- | --- |
| Service Configuration | **<SERVICE_FOLDER>/conf/default.js** | <pre> module.exports = {<br /> apiKey: process.env.APIKEY<br /> port: parseInt(process.env.PORT) &#x7c;&#x7c; 8080<br />}; </pre> |
| Connector Configuration | Example with MySQL.<br /><br />The file will be named **<SERVICE_FOLDER>** **/conf/mysql.default.js** | <pre> module.exports = {<br />  connectors: {<br />    mysql: {<br />      connector: '@axway/api-builder-plugin-dc-mysql',<br />      connectionPooling: true,<br />      connectionLimit: 10,<br />      host: process.env.MYSQL_HOST &#x7c;&#x7c; 'localhost',<br />      port: 3306,<br /> <br /> <br />      # This could be set to mysql since this is already available database by default<br />      database: 'mysql',<br /> <br /> <br />      user: process.env.MYSQL_USER,<br />      password: process.env.MYSQL_PASSWORD,<br /> <br /> <br />      // Create models based on your schema that can be used in your API.<br />      generateModelsFromSchema: true,<br /> <br />      // Whether or not to generate APIs based on the methods in generated models.<br />      modelAutogen: false<br />    }<br />  }<br />}; </pre> |

Excellent! Now, you have defined which variables can be provided at runtime while starting your Docker container.

Now, let's see how to prepare your Docker image and how to run Docker container out of it.

### Step 3: Create a Docker image for your service - meet the Docker file

{{% variables/apibuilder_prod_name %}} applications come with an example Docker file. When a service is generated with the {{% variables/apibuilder_prod_name %}} CLI, the generated service has a Docker file in its root directory.

This file is just one possible Docker file that can be used for the Docker image creation. You can tailor the Docker file to your specific needs.

The sample Docker file content is:

```bash
# See the README.md for usage and configuration info

# This line defines which node.js Docker image to leverage
# Available versions are described at https://hub.docker.com/_/node/
FROM node:14-alpine

ENV NODE_ENV=production

# Sets the default working directory to /app which is where we copy the service files to.
WORKDIR /app

# TODO: for security purposes, you should update this Dockerfile to specify your own target user/group
# -S stands for '--system'
# -G stands for group
# -R changes the ownership rights of a file recursively
RUN addgroup -S axway-group && adduser -S axway-user -G axway-group && \
  chown -R axway-user:axway-group /app

# Set non-root user
USER axway-user

# Denotes to copy all files in the service to 'app' folder in the container
COPY --chown=axway-user:axway-group . /app

# Install service dependencies relevant for production builds skipping all development dependencies.
RUN npm install --production --no-optional

# check every 5s to ensure this service is healthy
HEALTHCHECK --interval=5s --start-period=45s --timeout=5s --retries=5 CMD node healthcheck.js

# Starts the service
CMD ["node", "."]
```

If you want to specify your user and password, you can use `ENV` (Environment Variables) in the APP Dockerfile. For example:

```bash
# Set specific user & password using Env Vars
ENV NONROOT_USER="<user>"

RUN adduser $NONROOT_USER && \
echo $NONROOT_USER":<password>" | chpasswd

USER $NONROOT_USER
```

If you want to target a specific processor architecture which differs from the architecture of the device you're developing on, such as building for x86_64 on an M1 Mac (arm64), then you need to specify the target platform alongside the base Docker image. The base image you are using should have a published version supporting the target architecture. For more information, see [https://github.com/docker-library/official-images#architectures-other-than-amd64](https://github.com/docker-library/official-images#architectures-other-than-amd64).

```bash
FROM --platform=linux/amd64 node:14-alpine
```

The Docker image can be created with the following command:

```bash
docker build -t <IMAGE_NAME> ./
```

Now, you can run as many containers as you want out of the created Docker image. To check for the presence of the newly created image, run the following command:

```bash
docker image ls
```

The Docker image with the `<IMAGE_NAME>` should be visible in the listed images.

The Docker images can be pushed to a Docker registry, such as Docker Hub, Google Container Registry, or a private registry; however, for this tutorial, the locally built images will be used.

See the [Docker Push](https://docs.docker.com/engine/reference/commandline/push/) documentation for information on how to push your image or repository to a Docker registry.

The following variable placeholder is used in this section:

| Variable Placeholder | Description |
| --- | --- |
| `<IMAGE_NAME>` | This is your chosen Docker image name. For example: `myservice`<br /><br />Docker uses this name to create the Docker image for the service.<br /><br />After the creation of the image, the **docker image ls** command should show an image with the created image name in the list of available images on your machine. |

### Step 4: Run the Docker Container and Access the Service

**Things to observe when running your service within a Docker container**:

1. **Set Environment Variables**: Make sure that you provide values for all the environment variables that have no default values, as well as on those where you have to change the default values. Make sure you provide values not only for service configuration; but also for all the connectors you have installed in your service.
1. **Production Deployment**: Because the image is built in production mode, the service is no longer editable. The {{% variables/apibuilder_prod_name %}} console will not be available.
1. **Run Multiple Services**: Having containerized your service, it is now possible and generally desirable, to run multiple instances of your service. This allows you to address load balancing, scalability, and the resilience of your service.

Next, we will show two approaches to run the Docker container.

Use the first approach if you do not want to map ports on your host machine and the second approach if you want to access the service as if it is running on your localhost.

#### Approach 1: Running Docker Container - Plain

Using the image created in Step 3, you can now run a Docker container.

Running Docker container will execute the CMD specified in the Docker file, and your service will be started.

```bash
docker run --name <CONTAINER_NAME> <IMAGE_NAME>
```

##### How to provide environment variables for Docker container?

If you want to run the service within a Docker container and provide runtime values for those properties that are configured to be read from the environment (see Step 2), use the following command:

```bash
# Run the container setting the port where the service will run within the container to 8081
docker run --name <CONTAINER_NAME> -e PORT=8081 <IMAGE_NAME>
```

Other useful commands:

```bash
# If you want to see that your container is running
# You should see <CONTAINER_NAME> in the list of started containers
docker container ls

# Once ran the running container could be stopped with
docker container stop <CONTAINER_NAME>

# ... and started again with
docker container start <CONTAINER_NAME>
```

##### How to access the service?

First, you need to check the IP Address that Docker is using to run your container:

```bash
docker inspect <CONTAINER_NAME> | grep '"IPAddress"' | head -n 1
```

Now, check the value of your **apikey** property in **<SERVICE_FOLDER>/conf/default.js** file.

Using the apikey, you can execute the following command:

```bash
curl -X GET -u <API_KEY>: "http://<IP_ADDRESS>:<PORT>/api/greet?username=APIBuilder"
```

The following variable placeholders are used in this section:

| Variable Placeholder | Description |
| --- | --- |
| `<IMAGE_NAME>` | This is the name of the Docker image specified by you in the previous step. |
| `<CONTAINER_NAME>` | This is your chosen Docker container name. For example: `mycontainer`<br /><br />Docker will use this name to run a container based on the Docker image specified with `<IMAGE_NAME>`. |
| `<API_KEY>` | Must be replaced with the value of the apiKey property specified in **<SERVICE_FOLDER>/conf/default.js** file. |
| `<IP_ADDRESS>` | Should be replaced with the value returned by the command: `docker inspect <CONTAINER_NAME> | grep '"IPAddress"' | head -n 1` |
| `<PORT>` | 8080 if not overridden. |

#### Approach 2: Running Docker Container - Detached Mode with Port Mapping

Using the image, you can run and access a Docker container with the following commands:

```bash
# Run the container exposing the port 8080 to your host so the app is accessible on that port
docker run --name <CONTAINER_NAME> -p 8080:8080 -d <IMAGE_NAME>

# Now access with
curl -X GET -u <API_KEY>: "http://localhost:8080/api/greet?username=APIBuilder"
```

Alternatively, to override the port, you can execute the following commands:

```bash
# Note that if you provide another port with -e option you must map that provided port value to the desired port number of the host machine
# The example below runs the service within container on 8081 and maps that port to 8082 of the host machine
docker run --name <CONTAINER_NAME> -e PORT=8081 -p 8082:8081 -d <IMAGE_NAME>

# Now access with
curl -X GET -u <API_KEY>: "http://localhost:8082/api/greet?username=APIBuilder"
```

The Docker options are:

| Docker Options | Description |
| --- | --- |
| \-d | Runs the container in the background and prints the container ID. |
| \-p | Allows you to map ports on your host machine to ports inside the container. For example: `<host_port>:<container_port>` |

The following variable placeholders are used in this section:

| Variable Placeholder | Description |
| --- | --- |
| `<IMAGE_NAME>` | This is the name of the Docker image name specified by you in the previous step. |
| `<CONTAINER_NAME>` | This is your chosen Docker container name. For example: `mycontainer`<br /><br />Docker will use this name to run a container based on the Docker image specified with `<IMAGE_NAME>`. |
| `<API_KEY>` | Must be replaced with the value of the apiKey property specified in **<SERVICE_FOLDER>/conf/default.js** file |

### Step 5: Accessing your service documentation

By default, {{% variables/apibuilder_prod_name %}} generates Swagger 2.0 documentation for your service, which is available from `http://localhost:8080/apidoc/swagger.json`. If you choose to expose your container through a proxy, handle SSL termination outside {{% variables/apibuilder_prod_name %}}, or have path mapping on your service, you will want to modify your API service documentation to reflect this.

In the project configuration, the documented Swagger host, basePath, and schemes can be customized to values that would result in your API service documentation matching the production environment. For example, if your production deployment is an SSL terminating proxy, you need to have your service documentation include its host and port. These can be configured using environment variables in the same way as prior examples have shown.

```javascript
// conf/default.js

module.exports = {
  apidoc: {
    overrides: {
      host: process.env.APIDOC_HOST,
      basePath: '/apis',
      schemes: [ 'https' ],
    }
  }
};
```
