---
title: HTTP response flow-node
linkTitle: HTTP response flow-node
weight: 100
date: 2021-10-01
---

The HTTP Response flow-node method, parameter, and output are described in the following sections.

## Method

The method for an HTTP Response flow-node is:

* `Set HTTP Response`

## Parameter

The HTTP Response flow-node parameter is described in the following section.

### Set HTTP Response parameters

The `Set HTTP Response` method parameters are:

| Parameter | Type | Minimum | Maximum | Description | Configuration selection |
| --- | --- | --- | --- | --- | --- |
| status | integer | `100` | `599` | \- | Selector, Number |
| body | any | `-` | `-` | \- | Selector, String, Number, Boolean, Object, Array, Null |
| headers | object | `-` | `-` | \- | Selector, Object |

The `body` and `headers` parameters can be enabled or disabled.

## Output

The HTTP Response flow-node output is described in the following section.

### Set HTTP Response output

The `Set HTTP Response` method does not have any configurable outputs.
