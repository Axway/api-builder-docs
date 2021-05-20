---
title: findByID method
linkTitle: FindByID method
description: ADD A DESCRIPTION
weight: 80
date: 2021-05-17
---

The document describes the `findByID` method, parameter, and outputs.

## Method

* `findByID` - Finds model instance by ID.

## Parameter

The `findByID` method parameter is:

| Parameter | Type | Default | Description | JSONPath | Configuration selections |
| --- | --- | --- | --- | --- | --- |
| id | any | `-` | \- | $.params.id | Selector, String |

## Outputs

The `findByID` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| next | object | Successfully found a model instance by ID. | $.foundByID |
| notfound | any | No model instance found. | \- |
