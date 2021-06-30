---
title: Distinct method
linkTitle: Distinct method
description: ADD A DESCRIPTION
weight: 50
date: 2021-06-22
---

The document describes the `distinct` method, parameters, and output.

## Method

* `distinct` - Finds unique values using the provided field.

## Parameters

The `distinct` method parameters are:

| Parameter | Type | Default | Description | Configuration selection |
| --- | --- | --- | --- | --- |
| field | string | \- | The field must be distinct. | Selector, String |
| limit | integer | 10 | The number of records to fetch. | Selector, Number |
| order | object | \- | A dictionary of key-value pairs describing the field(s) for sorting. The field name is the key and the value is set to either -1 for ascending order or 1 for descending order. | Selector, Object |
| skip | integer | \- | The number of records to skip. | Selector, Number |
| where | string | \- | The JSON-encoded object specifying field constraints. The field name is the key and the value is the constraint statement or value. | Selector, String |

The `limit`, `order`, `sel`, `skip`, `unsel`, and `where` parameters can be enabled or disabled.

### Where parameter

The `distinct` method `where` parameter operators are:

| Name | Description | Syntax |
| --- | --- | --- |
| $eq | Find distinct records that are equal to a specified value. The `$eq` operator matches records where the value of a `field` equals the specified value. The `$eq` expression is equivalent to `{ field: <value> }`. | `{ < field >: { $eq : < value > } }` |
| $ne | Find distinct records that are not equal to a specified value. The `$ne` operator selects the records where the value of the `field` is not equal to the specified `value`. This includes records that do not contain the `field`. | `{field: {$ne: value} }` |
| $gt | Find distinct records that are greater than a specified value. The `$gt` operator selects those records where the value of the `field` is greater than the specified `value`. | `{field: {$gt: value} }` |
| $lt | Find distinct records that are less than a specified value. The `$lt` operator selects the records where the value of the `field` is less than the specified `value`. | `{field: {$lt: value} }` |
| $gte | Find distinct records that are greater than or equal to a specified value. The `$gte` operator selects the records where the value of the `field` is greater than or equal to a specified `value`. | `{field: {$gte: value} }` |
| $lte | Find distinct records that are less than or equal to a specified value. The `$lte` operator selects the records where the value of the `field` is less than or equal to the specified `value`. | `{ field: { $lte: value} }` |
| $in | Find distinct records that match any of the values specified in an array. The `$in` operator selects the records where the value of a `field` equals any value in the specified array. | `{ field : { $in : [ < value1 > , < value2 > , ... < valueN > ] } }` |
| $nin | Find distinct records that do not match any of the values specified in an array. The `$nin` operator selects the records where the `field` value is not in the specified array or the `field` does not exist. | `{ field: { $nin: [ <value1>, <value2> ... <valueN> ]} }` |

## Output

The `distinct` method output is:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| next | array | Successfully found all unique values of the field. | $.distinct |
