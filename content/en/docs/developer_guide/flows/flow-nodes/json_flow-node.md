---
title: JSON flow-node
linkTitle: JSON flow-node
weight: 130
date: 2021-10-01
---

The JSON flow-node methods, parameters, and output are described in the following sections. The JSON flow-node is created when NPM installs the `@axway/api-builder-plugin-fn-json` plugin. The JSON flow-node plugin is included in the default application, but it can be removed.

## Methods

The default methods for a JSON flow-node are:

* `Parse` - The parse method parses a JSON string, constructing the JavaScript value or object described by the string.
* `Stringify` - The stringify method converts a JavaScript value to a JSON string.

## Parameters

The JSON flow-node parameters are described in the following sections.

### Parse parameters

The `Parse` method parameter is:

| Parameter | Type | Description | Configuration selection |
| --- | --- | --- | --- |
| json | string | The JSON string to parse. | Selector, String |

### Stringify parameters

The `Stringify` method parameters are:

| Parameter | Type | Description | Configuration selection |
| --- | --- | --- | --- |
| value | any | The value to convert to a JSON string. | Selector, String, Number, Boolean, Object, Array, Null |
| space | any | A string or number object that's used to insert white space into the output JSON string for readability purposes. If this is a number, it indicates the number of space characters to use as white space; this number is capped at 10. If this is a string, its maximum length is 10; the string is used as white space. If this parameter is not provided, no white space is used. | Selector, String, Number, Boolean, Object, Array, Null |

The `space` parameter can be enabled or disabled.

## Outputs

The JSON flow-node outputs are described in the following sections.

### Parse outputs

The `Parse` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | any | \- | $.value |
| Error | any | This output is triggered if the input is not a valid JSON string. The output value is the error object. | $.error |

### Stringify output

The `Stringify` method output is:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | string | \- | $.json |
