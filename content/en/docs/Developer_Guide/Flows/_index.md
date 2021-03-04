---
title: Flows
linkTitle: Flows
weight: 80
date: 2021-03-02
no_list: true
---

## Introduction

You can manage endpoints and their associated flows using the {{% variables/apibuilder_prod_name %}} Console. You can also create and edit flows and configure their associated flow-nodes using the API Orchestration user interface.

## Manage endpoints

An API endpoint provides a way for a client to access your application, such as `GET <SERVER_ADDRESS>/api/users/query`, and access the application's models and custom code blocks to return data to the client application. You can use the {{% variables/apibuilder_prod_name %}} Console to import, generate, export, and delete endpoints. For additional information, refer to [Manage Endpoints](/docs/developer_guide/flows/manage_endpoints/).

## Manage flows

Flows are acyclic directed graphs of operational flow-nodes, which are composed of inputs, logic, and outputs. They are used by endpoints, which require them for their runtime functionality of taking inputs and turning them into responses when an endpoint is hit. You can **use** the {{% variables/apibuilder_prod_name %}} Console and the associated API Orchestration user interface to view, create, and edit flows. For additional information, refer to [Manage Flows](/docs/developer_guide/flows/manage_flows/). For how-to examples of configuring flows, refer to [Flow Examples](/docs/developer_guide/flows/manage_flows/flow_examples/).

## Manage flow-nodes

Flow-nodes represent an individual portion of functionality in a flow. You can use the API Orchestration user interface to add, configure, and delete flow-nodes. You can also connect and disconnect flow-nodes in a flow. For additional information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/).

## Flow-nodes

Flows can be viewed and edited on the API Orchestration user interface. Additionally, you can manage flow-node configuration and connections on the API Orchestration user interface. For flow-node configuration reference information, refer to [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).

## {{% variables/apibuilder_prod_name %}} SDK

The {{% variables/apibuilder_prod_name %}} SDK ([@axway/api-builder-sdk](https://www.npmjs.com/package/@axway/api-builder-sdk)) is a standalone utility that enables the creation of custom flow-nodes for {{% variables/apibuilder_prod_name %}} flows.
