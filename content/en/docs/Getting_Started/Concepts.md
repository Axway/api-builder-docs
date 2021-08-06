---
title: Concepts
description: Getting started with API Builder and its basic concepts
weight: 20
date: 2021-06-22
---

### APIs

**[{{% variables/apibuilder_prod_name %}} APIs](/docs/developer_guide/apis/)** can be automatically generated for all models, but there may be cases where you will want to create your custom API. An API provides a way for a client to access your application, such as `GET <SERVER_ADDRESS>/api/users/query`, execute custom logic, and internally access the application's models and APIs, then return data to the client application.

### API First

### Models

**[Models](/docs/developer_guide/console/models/)** provide a standardized interface for an application that allows client applications to access data. Models are either provided by a connector, reduced from an existing model, or composed of several models (composite models) using a left or an inner join operation.

### Flows

**[{{% variables/apibuilder_prod_name %}} Flows](/docs/developer_guide/flows/)** implement the business logic of your API. Flows are created using the Flow Editor, a rich graphical editor.

### Connectors

**[{{% variables/apibuilder_prod_name %}} Connectors](/docs/developer_guide/connectors/)** are adapters that allow you to read and write data to and from an external data source, such as MySQL, or in server memory. You can either add an existing connector to your application or create one to interface with your custom data source.

### Schemas

### Blocks

**[{{% variables/apibuilder_prod_name %}} Blocks](/docs/developer_guide/blocks/)** are filters that allow you to pre- or post-process data. Blocks are optional and can be used by either APIs or Models.
