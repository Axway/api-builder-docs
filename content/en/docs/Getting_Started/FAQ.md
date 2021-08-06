---
title: FAQ
linkTitle: FAQ
description: ADD A DESCRIPTION
weight: 90
date: 2021-06-22
---

This document provides references to answer several {{% variables/apibuilder_prod_name %}} frequently asked questions (FAQs).

## How do I obtain support?

Visit the Axway [Support](https://support.axway.com/) site to view the knowledge-base, product articles, and browse existing cases. You can also pose questions on the Axway [Community](https://community.axway.com) site to get answers from support agents, but also other {{% variables/apibuilder_prod_name %}} users.

For issues that require an analysis of your project, we will need a copy of the project you are working on (_without_ the node_modules directory) and any logging that you have captured when the problem occurred.

## Which versions of npm and Node.js should I use?

You should have npm (recommended minimum v6.13), and Node.js (recommended minimum v12.16 LTS) installed.

{{% variables/apibuilder_prod_name %}} v4 maintains compatibility with a minimum of Node.js v8.9, however, using a version older than v12.16 is not recommended. See the [Node.js support policy](/docs/node.js_support_policy/) for more information.

## I get errors during npm install saying I need python installed!

This can happen when installing {{% variables/apibuilder_prod_name %}} and plugins using npm and is a warning which can be safely ignored. To bypass the warning, you can run npm install with the following flag:

```bash
npm install --no-optional
```

## How do I setup {{% variables/apibuilder_prod_name %}} CLI?

Refer to the _Getting started_ section of [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/) for more information.

## How do I create and run an {{% variables/apibuilder_prod_name %}} project?

Refer to the _Getting started_ section of [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/) for more information.

## How do I configure access to the {{% variables/apibuilder_prod_name %}} Admin console?

Refer to the _Configuration_ section of [{{% variables/apibuilder_prod_name %}} Console](/docs/developer_guide/console/) for more information.

## How do I create a model using the {{% variables/apibuilder_prod_name %}} Admin console?

Refer to the _Create a new model_ section of [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/) and the _{{% variables/apibuilder_prod_name %}} tabs_ section of [{{% variables/apibuilder_prod_name %}} Console](/docs/developer_guide/console/) for more information.

## How do I create API endpoints?

Refer to [{{% variables/apibuilder_prod_name %}} APIs](/docs/developer_guide/apis/) for more information.

## How do I configure {{% variables/apibuilder_prod_name %}}?

Refer to [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/) for more information.

## How do I create {{% variables/apibuilder_prod_name %}} connectors?

Refer to [{{% variables/apibuilder_prod_name %}} Connectors](/docs/developer_guide/connectors/) for more information.

## How do I make a Docker container?

Refer to [Dockerize an {{% variables/apibuilder_prod_name %}} Service](/docs/how_to/dockerize_an_api_builder_service/) for more information.
