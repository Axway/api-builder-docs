---
title: Console
linkTitle: Console
weight: 10
date: 2021-10-01
---

## Introduction

The **Admin Console** allows you to create applications and allows you to manage the data in your applications.

By default, when you create a new project and run it locally, the **Admin Console** is enabled and available using the `http://localhost:8080/console` path. You should navigate to the Admin Console in your web browser to view what the {{% variables/apibuilder_prod_name %}} UI has to offer.

## Configuration

To configure access to the Admin Console, open the project's `./conf/default.js` file, and edit the `admin` key. The `admin` key is a dictionary of key-value pairs that control the access to the Admin Console, such as restricting which hosts can access the Admin Console.

The `admin` dictionary can contain the following keys:

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| allowedHosts | Array`<String>` | \- | Restrict access to the Admin Console to the specified hosts. |
| enabled | Boolean | true | Set to `true` to enable the Admin Console. |

**Example:**

```javascript
// ./conf/default.js

// Control the settings for the @axway/api-builder-admin UI console
    admin: {
        // Control whether the admin website is available
        enabled: true,
        // The hostnames or IPs from which connections to admin are allowed. Hostnames must be resolvable on the
        // server. IP ranges can also be specified. e.g. [ 'localhost', '192.168.1.0/24', '10.1.1.1' ]
        // An empty list [] will allow unrestricted access, though this is not recommended due to security
        // concerns.
        allowedHosts: [
            'localhost', '::1'
        ]
    },
```

## {{% variables/apibuilder_prod_name %}} tabs

{{% variables/apibuilder_prod_name %}} provides a list of tabs on the left-hand side that helps you get started building your applications. Click the different sections of the UI to hop between functions and features of {{% variables/apibuilder_prod_name %}}.

### Summary tab

The **Summary** tab lists basic information about your application like app name, version, description, author, license, and API key. To quickly navigate to the **Summary** tab, click on the Axway icon or click on {{% variables/apibuilder_prod_name %}}.

![Project Summary](/Images/project_summary_tab.png)

### API Doc & Test tab

An API document or specification is a file which defines the methods which are available on a service, how they are accessed, and what responses are expected. The **API Doc & Test** tab lists all specifications that your service implements.

Documents may be dynamically generated from components of your service, such as the _Dynamic_ OpenAPI 2.0 specification created by default on all services. External documents may also be imported and implemented using [API-first methodologies](/docs/guide_openapi/quick_start).

_Dynamic_ specifications take their name and description from your services `package.json`.

![API Doc & Test tab](/Images/api_doc_and_test_tab.png)

### Flows tab

A flow is a low-code way of orchestrating services and utilities. Flows can be invoked by endpoints as well as by a number of other flow-triggers such as timers and event queues. The **Flows** tab lets you create and edit flows.

![Flows tab](/Images/flows_tab.png)

### Models tab

A model is the data model, backed by a connector, and exposed as an API endpoint. A model can consist of other models or fields from other models. Once again, {{% variables/apibuilder_prod_name %}} will generate API endpoints for your models by default. Changes to models require a restart.

The **Models** tab lets you create new models. The model build process involves the following steps:

1. Name your new model, select a connector, and add a description.
1. Add fields to your new model.
1. Select the auto-generated API endpoint.

![Models tab](/Images/models_tab.png)

You may only build models when executing the project locally. The build console will not work in production even if you enable the Admin Console in production.

See the _Create a new model_ section of [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started/) for instructions on how to create a new model. For additional information on creating and editing models, refer to [Models](/docs/developer_guide/console/models/).

### Configuration tab

The **Configuration** tab displays the list of configuration files on the {{% variables/apibuilder_prod_name %}} instance. You can edit the configuration files here.

{{% alert title="Note" color="primary" %}}Edits to these files will trigger a server restart once the files have been saved.{{% /alert %}}

See [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/) for an example and settings.

![Configuration tab](/Images/configurations_tab.png)

### Credentials tab

The **Credentials** tab displays a card view listing of all the currently configured credentials. For additional information, refer to [Managing Credentials](/docs/developer_guide/credentials/managing_credentials/).

![Credentials tab](/Images/credentials_tab.png)

### Plugins tab

The **Plugins** tab shows the components to extend the core functionality of {{% variables/apibuilder_prod_name %}}, and that can be used to connect to different data sources and services or enhance the Flow editor. For additional connectors and plugin information, refer to [{{% variables/apibuilder_prod_name %}} Connectors](/docs/developer_guide/connectors/) and [{{% variables/apibuilder_prod_name %}} Plugins](/docs/developer_guide/plugins/). For additional information, refer to [flow-nodes](/docs/developer_guide/flows/flow_nodes/) and [flow-triggers](/docs/developer_guide/flows/flow_triggers/). The tab is separated into three sections:

A list of official **Axway supported plugins.**

![Plugins tab - supported plugins](/Images/plugins_tab_supported.png)

A list of **Community plugins**. These have been contributed by members of the {{% variables/apibuilder_prod_name %}} community are are not officially supported by Axway.

![Plugins tab - community plugins](/Images/plugins_tab_community.png)

And a list of **Installed plugins.**

![Plugins tab - installed plugins](/Images/plugins_tab_installed.png)

#### Install a listed plugin

Installed connectors are shown as Installed. Additionally, the version of the installed connectors is displayed.

To install additional listed connectors:

1. Click the **Install** button associated with the connector to install. Clicking the **Install** button will open the _Installation in progress_ screen.
    While the connector is being installed, an **Installing** spinner is displayed.
    Once the installation is successfully completed, the status of the screen will change to _Install complete_.
1. To cancel an in-progress installation, click **Cancel Installation.**
1. To display the install log, click **Show install log**.
1. Additionally, once the connector installation is completed, click **Edit <connector>.default.js** to edit the connector configuration.
1. Click **Close** to close the _Install complete_ screen.

Before installing community plugins, you should confirm that you agree that you are installing and using them at your own risk.

#### Create a plugin

To create a plugin, select the **Create plugin** link. You are directed to [{{% variables/apibuilder_prod_name %}} SDK](/docs/developer_guide/sdk) documentation to guide you through the process.

### Updates tab

The **Updates** tab shows updates and upgrades for installed components. You should always keep your components up to date for the latest features, bug fixes, and security updates.

On startup, _updates_ are checked using npm during development only.

_Updates_ are new compatible versions of components that will be installed when running [`npm update`](https://docs.npmjs.com/cli/v8/commands/npm-update).

_Upgrades_ are new versions of components which may introduce breaking changes, and are outside the range allowed by your service's package.json. These require extra care when consuming, and can also require modifications to your service.

_Upgrades are not currently displayed, and will be introduced in a future release._

![Updates tab](/Images/updates_tab.png)

## Information and search

Most {{% variables/apibuilder_prod_name %}} tabs include the title of the page, followed by an information icon and a search bar. The information icon, when clicked, will display a short description of its function and purpose.

To locate a particular record, enter a search term in the search bar at the top to filter the table or click Advanced to restrict the search to a specific model field.

## Navigation

To quickly navigate to the **Summary** tab, click on the Axway icon or click on {{% variables/apibuilder_prod_name %}}.
