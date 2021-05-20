---
title: count method
linkTitle: Count method
description: ADD A DESCRIPTION
weight: 10
date: 2021-05-17
---

This document describes the `count` method, parameter, and output information.

## Method

* `count` - Gets a count of records.

## Parameter

The `count` method parameter is:

| Parameter | Type | Default | Description | Configuration selection |
| --- | --- | --- | --- | --- |
| where | string | \- | The JSON-encoded object specifying field constraints. The field name is the key and the value is the constraint statement or value. | Selector, String |

The `where` parameter can be enabled or disabled.

### Where parameter

The `count` method `where` parameter operators are:

| Name | Description | Syntax |
| --- | --- | --- |
| $eq | Count records that are equal to a specified value. The `$eq` operator matches records where the value of a `field` equals the specified value. The `$eq` expression is equivalent to `{ field: <value> }`. | `{< field >: { $eq :< value > } }` |
| $ne | Count records that are not equal to a specified value. The `$ne` operator selects the records where the value of the `field` is not equal to the specified `value`. This includes records that do not contain the `field`. | `{field: {$ne: value} }` |
| $gt | Count records that are greater than a specified value. The `$gt` operator selects those records where the value of the `field` is greater than the specified `value`. | `{field: {$gt: value} }` |
| $lt | Count records that are less than a specified value. The `$lt` operator selects the records where the value of the `field` is less than the specified `value`. | `{field: {$lt: value} }` |
| $gte | Count records that are greater than or equal to a specified value. The `$gte` operator selects the records where the value of the `field` is greater than or equal to a specified `value`. | `{field: {$gte: value} }` |
| $lte | Count records that are less than or equal to a specified value. The `$lte` operator selects the records where the value of the `field` is less than or equal to the specified `value`. | `{ field: { $lte: value} }` |
| $in | Count records that match any of the values specified in an array. The `$in` operator selects the records where the value of a `field` equals any value in the specified array. | `{ field : { $in : [ < value1 > ,< value2 > , ...< valueN > ] } }` |
| $nin | Count records that do not match any of the values specified in an array. The `$nin` operator selects the records where the `field` value is not in the specified array or the `field` does not exist. | `{ field: { $nin: [ <value1>, <value2> ... <valueN> ]} }` |

## Output

The `count` method output is:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| next | number | Successfully counted records. | $.count |
