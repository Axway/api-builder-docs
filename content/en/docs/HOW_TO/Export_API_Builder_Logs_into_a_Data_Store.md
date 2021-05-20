---
title: Export API Builder Logs into a Data Store
linkTitle: Export API Builder logs into a data store
description: ADD A DESCRIPTION
weight: 110
date: 2021-05-17
---

This document describes how to export Logs from an {{% variables/apibuilder_prod_name %}} application or service into a data store.

## Introduction

The generation of {{% variables/apibuilder_prod_name %}} applications is a simple process with the help of the {{% variables/apibuilder_prod_name %}} CLI tool.

Some users may want to run the application and use a Business Intelligence (BI) tool so that they can export logs into a third-party party data store (DS).

This document provides the technical requirements and an example of how to scaffold and run an {{% variables/apibuilder_prod_name %}} application or service and export its logs into Splunk.

## Prerequisites

Tools to be installed and prerequisites:

1. **{{% variables/apibuilder_prod_name %}} Command Line Interface (CLI)** \- Refer to [installing {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/#InstallAPIB) in the the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/). Once {{% variables/apibuilder_prod_name %}} CLI is installed, you can use it to create a new project and start the {{% variables/apibuilder_prod_name %}} project.

2. **Docker** - The installation of Docker depends on the specific operating system. For additional information on how to install Docker and its supported operating systems, refer to the [Docker installation documentation](https://docs.docker.com/install/).

3. **Dockerize Application** - Refer to [Dockerize {{% variables/apibuilder_prod_name %}} Application](/docs/how_to/dockerize_an_api_builder_service/) for detailed information on to dockerize an application or service. Read the documentation carefully and prepare to run your service within Docker. When running your service in a container, it is often desirable to have the configuration set at runtime and to read parameter values from the environment rather than relying on static values**.**

4. **Research BI tools** - Research BI tools and 3rd party data stores. For example, [Splunk](https://www.splunk.com/), [Elastic](https://www.elastic.co/solutions/logging), and so forth.

{{% alert title="⚠️ Note" color="primary" %}}For additional resource information, refer to the [Docker getting started tutorial](https://docs.docker.com/get-started/), [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/), and [docker-node](https://github.com/nodejs/docker-node).{{% /alert %}}

## Documentation and resources

Useful resources on how to use the product:

* [{{% variables/apibuilder_prod_name %}} Documentation](/docs/api_builder/)

* [Axway Appcelerator Youtube Channel](https://www.youtube.com/watch?v=lgPFasrGATE)

* [Appcelerator Blog](https://www.appcelerator.com/blog/)

* [Docker Documentation](https://docs.docker.com/)

* [Configure logging drivers in Docker](https://docs.docker.com/config/containers/logging/configure/)

## General description of the integration process

When you create a service using {{% variables/apibuilder_prod_name %}}, you may want to integrate the service with an existing monitoring, audit, or BI system.

While there are several different ways to integrate your service with an existing BI system, this document describes integration with Splunk. The same integration principles that apply to Splunk are also applicable to other aggregators such as Elastic, Awslogs, Gcplogs, and so forth.

## Logs export using Docker

The BI tool is a platform for operational intelligence. The software lets you collect, analyze, and act upon the untapped value of big data that your technology infrastructure, security systems, and business applications generate. It gives you insights to drive operational performance and business results. For information on the {{% variables/apibuilder_prod_name %}} logging strategy, refer to [Logging](/docs/developer_guide/project/logging/). For information on debugging and setting the logging for your application or service, refer to [Debugging](/docs/developer_guide/project/debugging/).

### Configure logging drivers

Docker includes multiple logging mechanisms to help you capture [logging](https://docs.docker.com/config/containers/logging/) information from running containers and services. These mechanisms are called logging drivers.

Each Docker daemon has a default logging driver, which each container uses unless you configure it to use a different logging driver.

In addition to using the logging drivers included with Docker, you can also implement and use [logging driver plugins](https://docs.docker.com/config/containers/logging/plugins/). Logging driver plugins are available in Docker 17.05 and higher.

If the logging driver has configurable options, you can set them in the `daemon.json` file as a JSON array with the `log-opts` key. The following example sets two configurable options in the `json-file` logging driver:

```
{
  "log-driver": "json-file",
  "log-opts": {
    "labels": "production_status",
    "env": "os,customer"
  }
}
```

To find the current default logging driver for the Docker daemon, run the **docker info** command and search for `Logging Driver`. You can use the following command on Linux, macOS, or in PowerShell on Windows:

```
$ docker info | grep 'Logging Driver'
Logging Driver: json-file
```

{{% alert title="⚠️ Note" color="primary" %}}Read the following documentation and make the configuration changes: [Configure logging drivers](https://docs.docker.com/config/containers/logging/configure/#configure-the-delivery-mode-of-log-messages-from-container-to-log-driver) and [Docker JSON File logging driver](https://docs.docker.com/config/containers/logging/json-file/).{{% /alert %}}

#### Splunk logging driver

Splunk makes it simple to collect, analyze and act upon the untapped value of the big data generated by your technology infrastructure, security systems, and business applications, and gives you the insights to drive operational performance and business results.

The `splunk` logging driver sends container logs to the [HTTP Event Collector](http://dev.splunk.com/view/event-collector/SP-CAAAE6M) in Splunk Enterprise and Splunk Cloud.

You can configure Docker logging to use the `splunk` driver by default or on a per-container basis.

The common way to use the `splunk` driver as the default logging driver is to set the `log-driver` and `log-opts` keys to appropriate values in the `daemon.json` configuration file and restart Docker. For example:

```
{
  "log-driver": "splunk",
  "log-opts": {
    "splunk-token": "",
    "splunk-url": "",
    ...
  }
}
```

The `daemon.json` file is located in the `/etc/docker/ directory`on Linux hosts or in the `C:\ProgramData\docker\config\daemon.json` directory on Windows Servers. For more information about configuring Docker using the `daemon.json` file, see [daemon.json](https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file).

To configure the `splunk` driver for a specific container, use the `--log-driver` and `log-opt` command-line flags with the `docker run` command:

```
docker run --log-driver=splunk --log-opt splunk-token=VALUE --log-opt splunk-url=VALUE ...
```

{{% alert title="⚠️ Note" color="primary" %}}For helpful information about the Splunk logging driver, refer to [Splunk logging driver](https://docs.docker.com/config/containers/logging/splunk/).{{% /alert %}}

### Run Splunk via Docker

1. Run the following command to pull the latest version of the Splunk Enterprise image:

    ```
    docker pull splunk/splunk
    ```

2. Run the Docker image:

    ```
    docker run -d -e "SPLUNK_START_ARGS=--accept-license" -e "SPLUNK_USER=root" -p "8000:8000" splunk/splunk
    ```

3. Access the Splunk instance with a browser by using the Docker machine IP address and Splunk Web port. For example: `http://localhost:8000`

    {{% alert title="⚠️ Note" color="primary" %}}For additional resources information, refer to [Docker/Splunk Enterprise](https://hub.docker.com/r/splunk/splunk/).{{% /alert %}}

#### Splunk HTTP Event Collector

The Splunk HTTP Event Collector (HEC) enables you to send data to Splunk Enterprise and Splunk Cloud. HEC lets you send data, application logs, and metrics over HTTP (or HTTPS) directly to Splunk Enterprise or Splunk Cloud from your application. HEC operates with tokens, which means you do not need to embed Splunk Enterprise or Splunk Cloud credentials in your application or supporting files.

{{% alert title="⚠️ Note" color="primary" %}}Additional information is available at: [How HTTP Event Collector works](https://docs.splunk.com/Documentation/Splunk/7.1.0/Data/AboutHEC), [Overview of Splunk logging for JavaScript and Bunyan stream for HTTP Event Collector](http://dev.splunk.com/view/splunk-logging-javascript/SP-CAAAE6U) and [Splunk-javascript-logging](https://github.com/splunk/splunk-javascript-logging).{{% /alert %}}

### Setup Splunk Server

Now, we will set up the Splunk server with basic definitions in a local environment using the Docker Splunk logging drive and the HTTP event collector.

1. Pull the Splunk image from the Docker hub as follow:

    ```
    docker pull splunk/splunk
    ```

2. Check the Splunk image as follows:

    ```
    docker images | grep splunk
    ```

3. Start the Splunk server and bind it to the service port using the following command:

    ```
    docker run -d -e "SPLUNK_START_ARGS=--accept-license" -e "SPLUNK_USER=root" -p "8000:8000" -p "8088:8088" splunk/splunk
    ```

4. Navigate to `https://localhost:8000/` in your browser and verify that the Splunk server is up.

5. Go to **Settings > Data inputs > HTTP Event Collector > Add** new.

6. Enter a name and select the **Next** button.

    ![Screen_Shot_2018-05-23_at_14.11.57](/Images/Screen_Shot_2018-05-23_at_14.11.57.png)

7. Verify that you that have successfully generated a Token.

8. Copy and save the Token.

    ![Screen_Shot_2018-05-23_at_14.12.43](/Images/Screen_Shot_2018-05-23_at_14.12.43.png)

9. Navigate to **Settings/Data inputs/** **HTTP Event Collector** and to see your Docker logs.

10. Click to **Global settings** button and **Enable** button and to find HTTP Port Number.

    ![Screen_Shot_2018-05-23_at_14.18.23](/Images/Screen_Shot_2018-05-23_at_14.18.23.png)
11. Click on the **Docker logs edit** button and leave the default settings.

    ![Screen_Shot_2018-05-23_at_23.34.44](/Images/Screen_Shot_2018-05-23_at_23.34.44.png)
12. If you navigate to the _App: Search & Reporting_ page, the following UI will be displayed.

    ![Screen_Shot_2018-05-23_at_17.27.35](/Images/Screen_Shot_2018-05-23_at_17.27.35.png)
13. Once you have the Splunk container running and have set up everything in the Splunk Web, you are ready to run the application container via Splunk. You need to set the application container to the same port that you used for binding in the previous command. For the `splunk-url`, you need to use your IP address. The `Service-Image` should be the image name that you already built in your {{% variables/apibuilder_prod_name %}} service.

    Please use the below command:

    ```
    docker run -d -p 8080:8080 --log-driver=splunk --log-opt splunk-url=http://<IP>:8088 --log-opt splunk-token=<TOKEN> --log-opt splunk-insecureskipverify=true <Service-Image>
    ```

14. Verify that you are receiving your application logs in the Splunk Web UI. If everything works correctly, you will automatically receive all your application logs in the Splunk Web UI.
    ![Screen_Shot_2018-05-23_at_17.27.48](/Images/Screen_Shot_2018-05-23_at_17.27.48.png)
    The Logs imported into Splunk will be displayed as in the following examples.

    Example one:
    ![Screen_Shot_2018-05-23_at_17.28.00](/Images/Screen_Shot_2018-05-23_at_17.28.00.png)

    Example two:
    ![Screen_Shot_2018-05-23_at_23.42.26](/Images/Screen_Shot_2018-05-23_at_23.42.26.png)
