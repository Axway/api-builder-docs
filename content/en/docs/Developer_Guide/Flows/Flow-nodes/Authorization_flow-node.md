---
title: Authorization flow-node
linkTitle: Authorization flow-node
description: ADD A DESCRIPTION
weight: 10
date: 2021-05-17
---

The Authorization flow-node can be used to retrieve the value of a known credential by name for use within the flow, for example, to authorize other services.

The Authorization flow-node methods, parameters, and outputs are described in the following sections.

## Method

The method for an Authorization flow-node is:

* `Get Credential` - Retrieves a credential based on a given name.

## Parameters

The Authorization flow-node parameter is described in the following section.

### Get Credential parameters

The `Get Credential` method parameter is:

| Parameter | Type | Description | Configuration selection |
| --- | --- | --- | --- |
| name | string | The name of the configured credential to find and return | Selector, String |

## Outputs

The Authorization flow-node outputs are described in the following section.

### Get Credential outputs

The `Get Credential` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | any | \- | `$.credential` |
| Error | string | Error retrieving the credential with the specified name. | `$.error` |
