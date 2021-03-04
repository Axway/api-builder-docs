---
title: Base64 flow-node
linkTitle: Base64 flow-node
weight: 20
date: 2021-03-02
---

The flow-node methods, parameters, and output for the Base64 flow-node are described in the following sections. The Base64 flow-node is created when NPM installs the `@axway/api-builder-plugin-fn-base64` plugin. The Base64 flow-node plugin is included in the default application, but it can be removed.

## Methods

The Base64 flow-node default methods are:

* `Encode` - Encodes data into a string using the base64 encoding scheme. If the data is a Buffer or a string, its bytes will be encoded as-is. Otherwise, the data will be first converted using JSON.stringify, and then encoded.

* `Decode` - Decodes a base64 encoded string into the provided format (see "Decode data as" parameter).

## Parameters

The Base64 flow-node parameters are described in the following sections.

### Encode parameter

This method accepts strings, Buffers and any input that is valid with JSON.stringify.

The `Encode` method parameter is:

| Parameter | Type | Description | Configuration selection |
| --- | --- | --- | --- |
| data | any | The data to encode. | Selector, String, Number, Boolean, Object, Array, Null |

### Decode parameters

The `Decode` method parameters are:

| Parameter | Type | Default | Description | Configuration selection |
| --- | --- | --- | --- | --- |
| data | string | \- | The base64 encoded string. | Selector, String |
| as | boolean<br /><br />buffer<br /><br />number<br /><br />object<br /><br />string | buffer | If "buffer", data will be returned as a Buffer.<br /><br />If "string", data will be converted to utf-8 String.<br /><br />If "number", the data will be converted to a utf-8 string<br /><br />and then parsed as base 10 integer.<br /><br />If "boolean”, the data will be converted to a utf-8 string and if<br /><br />"false", "0", or empty string, the value is false (otherwise, true).<br /><br />If "object", the value is converted to a utf-8 string and parsed<br /><br />using JSON.parse. | Selector, String |

The `"as`" parameter can be enabled or disabled.

## Outputs

The Base64 flow-node outputs are described in the following sections.

### Encode outputs

The `encode` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | string | The base64 encoded data. | $.b64data |
| Error | object | An unexpected error was encountered | $.error |

### Decode outputs

The `Decode` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | string | The decoded data. | $.decoded |
| Error | object | An unexpected error was encountered | $.error |
