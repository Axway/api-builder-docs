---
title: Managing OpenAPI documents
weight: 30
date: 2022-03-01
description: This document contains details about OpenAPI specification support, and the management of the OpenAPI document lifecycle, from importing, upgrading revisions, to deleting them.
---

## OpenAPI specification support

Currently, **OpenAPI** flow-trigger supports the following specifications:

* [OpenAPI 2.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md)
* [OpenAPI 3.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md)

If you do not already have an OpenAPI specification to manage, you can read our guide on [how to write OpenAPI documents](/docs/guide_openapi/writing_apidocs).

## Importing OpenAPI documents

Currently, only one **OpenAPI** document is supported for **OpenAPI** flow-trigger. Once loaded, you can [update](#updating-openapi-documents) or [delete](#deleting-openapi-documents) it as required.

Note that [OpenAPI 2.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md) and [OpenAPI 3.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md) are supported, but that OpenAPI 3.0 is the preferred standard for {{% variables/apibuilder_prod_name %}}. Please see [OpenAPI specification support](/docs/guide_openapi/writing_apidocs#openapi-specification-support) for further details on the OpenAPI standards and their supported features.

![OpenAPI import](/Images/openapi_quickstart_import.gif)

## Binding OpenAPI operations

The [Quick start](/docs/guide_openapi/quick_start) shows how to bind OpenAPI operations flows. When operations are bound, [updating the OpenAPI document](#updating-openapi-documents) subsequently can affect bound operations.

## Updating OpenAPI documents

Before updating your OpenAPI document, you should first be aware of how {{% variables/apibuilder_prod_name %}} uses it, and what impact your changes might have. The main differentiator between "safe" and "unsafe" changes are whether or not an [OpenAPI operation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject) is not bound to a flow or not, or if the item being changed is related to a bound [OpenAPI operation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject).

The details in the following sections are only relevant if operations are bound to flows. If operations are not bound to flows, you can update them without any affect.

### Changing a bound operationId

Changing the name of a bound operation's `operationId` is the same as deleting it and adding a new one with a new name. It is impossible to distinguish. When this happens, the old operation and flow will become unbound. To fix, edit the flow, and change the **OpenAPI** flow-trigger **Method** to use the new `operationId`.

### Removing a bound operation

This is an unsafe update. If you remove an [OpenAPI operation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject) that is bound to a flow, the flow will become "unbound", and the console window and UI will show an error that this happened. If you have no need of the flow, it is [safe to delete](/docs/developer_guide/flows/manage_flows#delete-flows).

### Changing method, path, or path parameter of a bound operation

If your operation does not use an [`operationId`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operation-object), then changing the method, path, or path parameters of a bound operation is the same as [removing a bound operation](#removing-a-bound-operation). This is discussed in the [writing OpenAPI documents](/docs/guide_openapi/writing_apidocs#use-operationid) on how to manage your API more effectively. However, if your operation does use an [`operationId`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operation-object), then it is shielded against this.

### Changes that may break a flow

In addition to directly manipulating the method, path, or path parameters of an [Operation object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject), the following changes may break your flow and require additional changes in the flow editor.

* Removing parameters
* Renaming parameters (this is effectively removing them)
* Changing parameter names (even capitalization)
* Changing the request
* Changing the response content-type or schema
* Removing responses

## Deleting OpenAPI documents

Deleting your OpenAPI documents is one of these actions that should be taken with caution. It is an irreversible action that will have a big impact on your service as you are effectively removing a chunk from it. It is important to note that deleting an OpenAPI document will delete all associated flows too. Any non related flows will be preserved.

TODO: Insert gif here showcasing:
* Pre-req: Have the bookstore that was imported earlier on already in the app.
* Start by clicking API Doc & Test.
* Select the Bookstore API.
* Click Delete.
* Confirm.
* Show the restart and the redirect back to API Doc & Test.
