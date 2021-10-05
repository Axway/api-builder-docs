---
title: Upsert method
linkTitle: Upsert method
weight: 110
date: 2021-10-01
---

The document describes the `upsert` method, parameters, and outputs.

## Method

* `upsert` - Creates a model record if not found, or updates the model record if found.

## Parameter

The `upsert` method parameter is:

| Parameter | Type | Configuration selections |
| --- | --- | --- |
| data | object | Selector, Object |

## Outputs

The `upsert` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| update | object | Successfully updated the model. | $.model |
| insert | object | Successfully inserted the model. | $.model |
