---
title: Create a plugin from openapi files
linkTitle: Create a plugin from openapi files
weight: 40
date: 2021-10-01
---

## Introduction

In this tutorial, you will learn how to bundle [OpenAPI specifications](https://www.openapis.org) (aka Swagger, and OAS), into plugins so that they may be used as dependencies in {{% variables/apibuilder_prod_name %}} applications to orchestrate data between existing services via flow-nodes.

### Prerequisites

* **{{% variables/apibuilder_prod_name %}} CLI**: All commands on this page require installation of the {{% variables/apibuilder_prod_name %}} CLI as described in the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/) .
* **{{% variables/apibuilder_prod_name %}} project**: An {{% variables/apibuilder_prod_name %}} project is required to install and test your new flow-node.

You can use an existing project, or initialize a new one with the following instructions:

```
// Create a new {{% variables/apibuilder_prod_name %}} project

axway builder init example-project
cd example-project
```

## Creating a new {{% variables/apibuilder_prod_name %}} plugin to bundle OpenAPI specifications

Creating an new plugin to bundle OpenAPI specification files is similar to [Creating a standard flow-node plugin](/docs/how_to/create_a_custom_flow-node/), but the difference is you use a `--type=oas` argument.

```
// Create a new OAS flow-node plugin

axway builder plugin init --type=oas petstore
cd api-builder-plugin-petstore
```

The CLI will create your plugin in a new directory called \`./api-builder-plugin-petstore\` and will install the dependencies for you. The new plugin has the following contents:

```
// File contents of the OAS plugin

├── package.json
├── openapi/
├── README.md
└─┬ test/
  └── test.js
```

| File Name | Description |
| --- | --- |
| package.json | This is your module package description file. You should modify it to suit your module. The file is used by NPM. See [here](https://docs.npmjs.com/files/package.json) for more details. |
| openapi/ | This directory is initially empty. You need to place one or more OpenAPI specification files and optionally, a related icon file in this directory. |
| test/test.js | A mocha test suite. You should ensure all of your actions are adequately tested. |
| [README.md](http://README.md) | A [README.md](http://README.md) file that you should update with details about your plugin before publishing. It should contain details about how to install it, and the functionality it provides. |

### Install your OpenAPI file(s)

After initializing your new plugin, you need to populate it with one or more OpenAPI specification files, by copying them into the `./openapi` directory.

```
cd api-builder-plugin-petstore
cp ~/Downloads/petstore.yaml ./openapi
```

### Install optional icon file(s)

You can also optionally install an icon to use when the flow-node is displayed in the Flow editor. The icon file must have the same root name as your OAS specification file (e.g. "petstore.json" and "petstore.svg"), and can be any one of the supported image formats: bmp, jpeg, png, gif, tiff, or svg. For best results, use svg and keep the icon small and symmetrical (e.g. 50 x 50 pixels).

### Testing your plugin

After adding your OpenAPI specification files, run "npm test" to ensure that they are valid. If they are not valid, then you cannot use the specification as-is in {{% variables/apibuilder_prod_name %}} without first correcting the issue(s). You should notify the owners of the specification so that they can correct the issue.

```bash
npm test
```

If all tests pass, then the plugin is ready to be used in {{% variables/apibuilder_prod_name %}} or [published](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry).

## Using your new plugin in {{% variables/apibuilder_prod_name %}}

Once you have your plugin working and the unit-tests pass, then you can install plugin into an existing {{% variables/apibuilder_prod_name %}} project. If using the parent directory, as suggested at the start of this tutorial, then go to your project directory and install the plugin:

```bash
// Install your plugin and start {{% variables/apibuilder_prod_name %}}

cd ..
npm install ./api-builder-plugin-petstore
npm start
```

You will find your new OAS plugin as a flow-node available in the [Flow editor](/docs/developer_guide/flows/).

Note that this process creates an npm link to your plugin in your `package.json` file. You may or may not want this, depending on how you want to publish your plugin. To make your plugin re-usable, please refer to the [@axway/api-builder-sdk](https://www.npmjs.com/package/@axway/api-builder-sdk) README section on [Using the plugin](https://www.npmjs.com/package/@axway/api-builder-sdk#user-content-using-the-plugin).

For more information, see [https://www.npmjs.com/package/@axway/api-builder-oas-flow-node](https://www.npmjs.com/package/@axway/api-builder-oas-flow-node)
