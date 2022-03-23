---
title: API Builder
linkTitle: API Builder
weight: 10
date: 2021-10-01

menu:
  main:
    weight: 20
---

## Overview

In {{% variables/apibuilder_prod_name %}}, you can create your independent services for containerization and deployment on your container platform of choice.

{{% variables/apibuilder_prod_name %}} lets you build and deploy a project that is comprised of API endpoints that can be consumed by any client application. An {{% variables/apibuilder_prod_name %}} project is a Node.js application that runs as a service and is comprised of several components. You can then develop your service within a browser through a powerful UI.

To get started, see the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started).

{{% variables/apibuilder_prod_name %}} offers:

* Low code/no code approach
* Based on standards (OpenAPI, Node.js, NPM, Javascript, JSON)
* Optimized for use in containers
* Pub-sub connectivity
* A wide range of plugins
* Easily expandable using the available [{{% variables/apibuilder_prod_name %}} SDK](/docs/developer_guide/sdk)

### Flows

[Flows](/docs/developer_guide/flows/) are at the core of {{% variables/apibuilder_prod_name %}} and are used to implement the business logic of your service, and are developed graphically in the browser.

### Plugins

{{% variables/apibuilder_prod_name %}} aims to be as light weight as possible, so while the core product contains basic capabilities, it can be extended using [plugins](/docs/developer_guide/plugins/) to support additional services and standards required by your service.

You can even create custom flow-node plugins using the [{{% variables/apibuilder_prod_name %}} SDK](/docs/developer_guide/sdk).

Plugins are installed as node modules and are easily shared with other developers in the {{% variables/apibuilder_prod_name %}} community using NPM.

### API-first development

In the API-first approach, you import an OpenAPI specification which defines the service you want to implement. This provides API Builder with the interface of your service, such as the paths, input parameters and outputs. You can then implement your service using flows.

Learn more about [API-first with OpenAPI](/docs/developer_guide/guide_openapi.html).

### Event-driven services

{{% variables/apibuilder_prod_name %}} allows you to create more than just REST APIs: Using available [flow-trigger plugins](/docs/developer_guide/flows/flow_triggers), you can build flows which are executed by events such as on a schedule, or through a subscription to pub-sub service like Apache Kafka.

### Database connectivity

[Database connector plugins](/docs/developer_guide/connectors/) provide connectivity to a range of popular data sources such as MySQL. By configuring a connector, this allows {{% variables/apibuilder_prod_name %}} to automatically create data models for accessible tables which describe the fields and their types, as well as providing read and write operations for manipulating records.

Using models, {{% variables/apibuilder_prod_name %}} can automatically expose simple and dynamic CRUD API for your database in minutes. Additionally, you can use models within flows to integrate with other development approaches and give more fine-grained control over your database interactions.
