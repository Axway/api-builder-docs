---
title: CLI
linkTitle: CLI
weight: 30
date: 2021-03-02
---

The Amplify CLI is a companion CLI for the [Axway {{% variables/platform_prod_name %}}](https://docs.axway.com/category/platform). Once installed, you can use it to install the {{% variables/apibuilder_prod_name %}} CLI. This CLI allows you to create projects (both running integrations and plugins) and, with an Amplify account, download connectors from the [Unifed Catalog](https://docs.axway.com/bundle/axway-open-docs/page/docs/catalog/index.html).

{{% alert title="⚠️ Note" color="primary" %}}For users who downloaded the {{% variables/apibuilder_prod_name %}} CLI directly via `npm`, we recommend that you [re-install the CLI using the Amplify CLI](/docs/getting_started_with_api_builder/) to take advantage of the full range of features this CLI offers. Your existing projects will continue to work as before.{{% /alert %}}

## Installing the {{% variables/apibuilder_prod_name %}} CLI

Our [Getting Started guide](https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/api_builder_getting_started_guide.html) explains how to install the Amplify CLI and then the {{% variables/apibuilder_prod_name %}} CLI. Refer to the [Amplify CLI](https://docs.axway.com/bundle/Amplify_CLI_allOS_en/page/amplify_cli_quick_start.html) documentation for additional details.

## Updating the {{% variables/apibuilder_prod_name %}} CLI

We recommend always keeping the {{% variables/apibuilder_prod_name %}} CLI up-to-date. To update the {{% variables/apibuilder_prod_name %}} CLI (and other Amplify CLI plugins) run the following command:

```
$ amplify pm update
```

Sometimes there are new versions of the Amplify CLI available as well. To update the Amplify CLI run the following command:

```bash
$ [sudo] npm i -g @axway/amplify-cli
```

## Logging into the {{% variables/platform_prod_name %}}

Some of the options below require you to log into the {{% variables/platform_prod_name %}}. You can do that with the following command:

```
$ amplify auth login --client-id apicentral
```

## Commands

### init

This command creates a new integration project. The result is a directory containing a skeleton project with sample APIs and flows that can be removed. All `npm` dependencies are installed along with the project; this can be optionally disabled with a switch. Once the project is created, you are directed to change to the created directory to launch the project. The logfile will tell you the URL you need to use in your browser to access the graphical console. Normally, this will be [http://localhost:8080/console](http://localhost:8080/console).

This is the command to create a new project named "marketing_api"

`$ amplify builder init marketing_api`

Then, install the project's dependencies and start the {{% variables/apibuilder_prod_name %}} project.

```bash
// Run project

cd myproject
npm start
```

Once your project is running, point your browser to `http://localhost:8080/console`to access the {{% variables/apibuilder_prod_name %}} user interface (UI) console.

#### \--get-catalog

If logged into the {{% variables/platform_prod_name %}} (see above), this command will present you with a catalog of APIs available to you for use in your flows. This is an interactive command that allows you to choose which APIs for which you'd like to download specifications. If you don't want to run this command when creating your project, you can always run the get-catalog command (see below) at any time in your project. Once run successfully, you will see new flow nodes representing your chosen APIs in the flow editor.

The examples below imagines a project named "marketing_api".

```
$ amplify builder init --get-catalog marketing_api
```

If you want to narrow down the list of APIs, you can filter the results on the API name.

```
$ amplify builder init --get-catalog --filter="Marketo" marketing_api
```

#### \--no-install

This command prevents the installation of dependent node_modules when the project is initialized. Using the same example project name as above.

```
$ amplify builder init --no-install marketing_api
```

Once you want to install dependencies, you can change to your project directory and run this command:

```bash
$ npm install
```

### get-catalog

This command has the same effect as the `--get-catalog` command described in the "init" section. It must be run while inside an {{% variables/apibuilder_prod_name %}} project directory. If logged into the {{% variables/platform_prod_name %}} (see above), you will be provided with a catalog of APIs available to you for use in your flows. This is an interactive command that allows you to choose which APIs for which you'd like to download specifications. Once run successfully, you will see new flow nodes representing your chosen APIs in the flow editor.

```
$ amplify builder get-catalog
```

#### \--filter

If you want to narrow down the list of APIs, you can filter the results on the API name.

```
$ amplify builder get-catalog --filter="Marketo"
```

### plugin init

You use this command when you want to create a new plugin for use in your {{% variables/apibuilder_prod_name %}} projects. There are two types of plugins:

* Standard

    * This is the _default_ type of plugin. This type of plugin results in a flow node that implements whatever functionality you choose (and can implement in JavaScript).

* OAS

    * A "Custom OpenAPI" type plugin template allows you to package and share plugins containing flow-nodes generated by dropping OpenAPI files into your plugin's `openapi` directory. This allows you to use the plugin concept to manage the life-cycle of access to this API via `npm`, and the added flexibility of being able to extend how this API is accessed from an {{% variables/apibuilder_prod_name %}} flow.

The following command will create a new plugin project:

```
$ amplify builder plugin init api-builder-plugin-legacy-connector
```

All {{% variables/apibuilder_prod_name %}} plugins must being "api-builder-plugin", if you entered instead:

`$ amplify builder plugin init legacy-connector`

Then a directory names api-builder-plugin-legacy-connector would still be created.

#### \--no-install

This command prevents the installation of dependent node_modules when the plugin is initialized. (Using the same example plugin name as above.)

```
$ amplify builder plugin init --no-install legacy-connector
```

#### \--type

This option allows you to specify the type of plugin you'd like to create (see above). The options are "standard" and "oas". If neither is specified, then "standard" is assumed. You can specify "standard" as follows:

```
$ amplify builder plugin init --type=standard
```

You can also create a custom OpenAPI plugin template. A "Custom OpenAPI" type plugin template allows you to package and share plugins containing flow-nodes generated by dropping OpenAPI files into your plugin's `openapi` directory.

To create an OpenAPI plugin template, you can use this command (using the same example plugin name as above):

```
$ amplify builder plugin init --type=oas legacy-connector
```

## {{% variables/apibuilder_prod_name %}} CLI (npm)

While we recommend to use the {{% variables/apibuilder_prod_name %}} CLI as part of the Amplify CLI, a secondary CLI is available for install on NPM which doesn't depend on the Amplify CLI. This has all the same functionality, however the commands and install mechanism are slightly different.

### Installation and update

```bash
$ [sudo] npm install -g @axway/api-builder
```

### Commands

All commands are as documented above. The only difference is that instead of `amplify builder`, the command is `api-builder`. For example to initialise a new project, the following command is used:

```
$ api-builder init marketing_api
```
