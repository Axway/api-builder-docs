---
title: Delete method
linkTitle: Delete method
description: ADD A DESCRIPTION
weight: 40
date: 2021-06-22
---

The document describes the `delete` method, parameter, and outputs.

## Method

* `delete` - Deletes the model object.

## Parameter

The `delete` method parameter is:

| Parameter | Type | Configuration selection |
| --- | --- | --- |
| id | any | Selector, String |

## Outputs

The `delete` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| next | object | Successfully deleted a record. | $.delete |
| notfound | any | No model instance found. | \- |
