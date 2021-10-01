---
title: Flows
linkTitle: Flows
weight: 80
date: 2021-10-01
---

## Introduction

You can manage endpoints and their associated flows using the {{% variables/apibuilder_prod_name %}} Console. You can also create and edit flows and configure their associated flow-nodes using the Flow editor.

## Flows

Flows are acyclic directed graphs of operational flow-nodes, which are composed of inputs, logic, and outputs. They are used by endpoints, which require them for their runtime functionality of taking inputs and turning them into responses when an endpoint is hit. You can use the {{% variables/apibuilder_prod_name %}} Console and the associated Flow editor to view, create, and edit flows. For additional information, refer to [Manage Flows](/docs/developer_guide/flows/manage_flows/). For how-to examples of configuring flows, refer to [Flow Examples](/docs/developer_guide/flows/manage_flows/flow_examples/).

## Flow-nodes

Flow-nodes represent an individual portion of functionality in a flow. You can use the Flow editor to add, configure, and delete flow-nodes. You can also connect and disconnect flow-nodes in a flow. For additional information, refer to [Manage flow-nodes](/docs/developer_guide/flows/manage_flow-nodes/). For information about available flow-nodes see [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).

## Endpoints

An API endpoint provides a way for a client to access your application, such as `GET <SERVER_ADDRESS>/api/users/query`, and trigger a Flow which provides orchestration between the project's Models, external services, and other flow-nodes, to return data to the client application. You can use the {{% variables/apibuilder_prod_name %}} Console to import, generate, export, and delete endpoints. For additional information, refer to [Manage Endpoints](/docs/developer_guide/flows/manage_endpoints/).

## Flow-triggers

Flow-triggers are additional ways of triggering a Flow. These allow Flows to be configured to run on a schedule, when an event occurs, or when a Solace or Kafka message is received, to name a few examples. Like Flow-nodes, Flow-triggers are installed from Plugins, and installed Flow-triggers can be added, removed and configured as part of any Flow from within the Flow editor. For additional information, refer to [Flow triggers](/docs/developer_guide/flows/flow-triggers/).

## {{% variables/apibuilder_prod_name %}} SDK

The {{% variables/apibuilder_prod_name %}} SDK ([@axway/api-builder-sdk](https://www.npmjs.com/package/@axway/api-builder-sdk)) is a standalone utility that enables the creation of custom flow-nodes for {{% variables/apibuilder_prod_name %}} flows.
