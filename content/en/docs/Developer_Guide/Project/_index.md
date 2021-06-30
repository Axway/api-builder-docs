---
title: Project
linkTitle: Project
description: ADD A DESCRIPTION
weight: 20
date: 2021-06-22
---

## Overview

An {{% variables/apibuilder_prod_name %}} application is a standard Node.js application that runs in a runtime environment. This guide covers how to manage your project.

## Project structure

A project is made up of several components. To simplify development, {{% variables/apibuilder_prod_name %}} primarily uses a strict directory structure and naming convention to organize the application rather than configuration files.

The following is a list of directories and files that can be found in a project:

| File/Folder Name | Description |
| --- | --- |
| apis | Contains API JavaScript files used to create custom entry points for the application. For details, see [{{% variables/apibuilder_prod_name %}} APIs](/docs/developer_guide/apis/). |
| app.js | The entry point to the application if it is used as a server. You can monitor the startup and shutdown sequence. |
| blocks | Contains Block JavaScript files, used to create pre- and post-processing filters. For details, see [{{% variables/apibuilder_prod_name %}} Blocks](/docs/developer_guide/blocks/). |
| codeblocks | Contains Codeblock, JSON, and Javascript files, used for defining custom functions for use in Flows.<br /><br />{{% alert title="⚠️ Note" color="primary" %}}The project folder structure will not initially include this folder. You can create the folder and place files in the folder. The files will be loaded on project start.{{% /alert %}} |
| conf | Contains configuration files in JSON format for the project and required connectors. For details, see [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/). |
| Dockerfile | Docker configuration file. For additional information, refer to [Dockerize an {{% variables/apibuilder_prod_name %}} Service](/docs/how_to/dockerize_an_api_builder_service/). |
| endpoints | Contains Endpoint JSON files, these are OpenAPI 2.0 (Swagger) documents used to create custom entry points for the application, with execution logic defined by linked Flows. |
| flows | Contains Flow JSON files, used for defining business logic for Endpoints. |
| healthcheck.js | Contains a script that pings a running {{% variables/apibuilder_prod_name %}} service to check its health. By default, this is used in the Dockerfile. |
| models | Contains Model JavaScript files used to define the schema for your data. For details, see [Models](/docs/developer_guide/console/models/). |
| node_modules | Contains project dependencies. {{% variables/apibuilder_prod_name %}} automatically installs any project dependencies declared in the `package.json` file. |
| package.json | NPM configuration file to declare project dependencies and other build or runtime configurations. |
| package-lock.json | NPM configuration file that is generated when NPM modifies either the `node_modules` tree or the `package.json` file. It describes the exact tree that was generated so that subsequent installs can generate identical trees, regardless of intermediate dependency updates. The `npm shrinkwrap` command repurposes the `package-lock.json` file into a publishable `npm-shrinkwrap.json` file. For additional information on shrink wrapping a service, refer to `npm shrinkwrap`. To Dockerize your service, refer to [Dockerize an {{% variables/apibuilder_prod_name %}} Service](/docs/how_to/dockerize_an_api_builder_service/). |
| Readme.md | Provides useful installation and configuration information. |
| schemas | Contains the schemas used within Flows. |
| swagger | May contain Swagger files. |
| tests | Contains the tests used to test the validity of Flows. |
| web | Contains Web files, used to create endpoints that render UI. |
| web/public | Contains static assets, such as CSS, HTML, image, or JavaScript files, for your Web interface. |

## Initializer file

The `app.js` file contains code that initializes the server instance. You can hook into the lifecycle events of the server as well as make additional setup or middleware calls to the server or Express app instance.

```javascript
// app.js

var APIBuilder = require('@axway/api-builder-runtime'),
    server = new APIBuilder();
// lifecycle examples
server.on('starting', function () {
    server.logger.debug('server is starting!');
});
server.on('started', function () {
    server.logger.debug('server started!');
});
// start the server
server.start();
```

## Node.js version

To specify a Node.js version or a range of Node.js versions, in the `package.json` file, set the `engines.node` key to the Node.js version or range of versions. The default Node.js version is 8.9.

```json
// package.json

"engines": {
    "node": ">= 8.9"
},
```

## Declare dependencies

The application can import any third-party modules that are supported by standard Node.js applications. Before building a container for your application, make sure all dependencies are listed in the `dependencies` field in the application's `package.json` file.

```json
// package.json

{
    "dependencies": {
}
```
