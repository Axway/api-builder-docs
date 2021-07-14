---
title: Overview
linkTitle: Overview
weight: 10
date: 2021-06-22
description: ADD A DESCRIPTION
---
## Overview

From {{% variables/apibuilder_prod_name %}} V4.0.0 onward, you can now create your independent services for containerization and deployment on your container platform of choice.

In this first version, you will be able to install the {{% variables/apibuilder_prod_name %}} CLI, create a new project, and run it from the command line, all without the need to create a user account or host your project on the Axway platform.

{{% variables/apibuilder_prod_name %}} lets you build and deploy a project that is comprised of API endpoints that can be consumed by any client application. An {{% variables/apibuilder_prod_name %}} project is a Node.js application that runs as a service and is comprised of several components. You can either define the components using JavaScript or JSON files placed in specific directories, which are automatically loaded when creating an {{% variables/apibuilder_prod_name %}} instance or programmatically create components after initializing an {{% variables/apibuilder_prod_name %}} instance. For information about the components, see the sections below.

To get started, see the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/).

### Connectors

**[{{% variables/apibuilder_prod_name %}} Connectors](/docs/developer_guide/connectors/)** are adapters that allow you to read and write data to and from an external data source, such as MySQL, or in server memory. You can either add an existing connector to your application or create one to interface with your custom data source.

### Models

**[Models](/docs/developer_guide/console/models/)** provide a standardized interface for an application that allows client applications to access data. Models are either provided by a connector, reduced from an existing model, or composed of several models (composite models) using a left or an inner join operation.

### APIs

**[{{% variables/apibuilder_prod_name %}} APIs](/docs/developer_guide/apis/)** can be automatically generated for all models, but there may be cases where you will want to create your custom API. An API provides a way for a client to access your application, such as `GET <SERVER_ADDRESS>/api/users/query`, execute custom logic, and internally access the application's models and APIs, then return data to the client application.

### Blocks

**[{{% variables/apibuilder_prod_name %}} Blocks](/docs/developer_guide/blocks/)** are filters that allow you to pre- or post-process data. Blocks are optional and can be used by either APIs or Models.

### Flows

**[{{% variables/apibuilder_prod_name %}} Flows](/docs/developer_guide/flows/)** implement the business logic of your API. Flows are created using the Flow Editor, a rich graphical editor.