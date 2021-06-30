---
title: Update method
linkTitle: Update method
description: ADD A DESCRIPTION
weight: 100
date: 2021-06-22
---

The document describes the `update` method, parameters, and outputs.

## Method

* `update` - Updates a model instance.

## Parameters

The `update` method parameters are:

| Parameter | Type | Description | Configuration selection |
| --- | --- | --- | --- |
| data | object | Dependent on configured model fields. | Selector, Object |
| id | string | \- | Selector, String |

## Outputs

The `update` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| next | object | Successfully updated the model instance. | $.updated |
| notfound | any | No model instance found. | \- |
