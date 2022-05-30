---
title: Query String flow-node
linkTitle: Query String flow-node
weight: 170
date: 2021-10-01
---

The following sections describe Query String flow-node methods, parameters, and outputs.

The Query String flow-node plugin can be installed manually with:

```bash
npm install --no-optional @axway/api-builder-plugin-querystring
```

## Method

The Query String flow-node has a single method called `createquery`. It composes the query string by combining arbitrary inputs in the form of objects and arrays using the qs library. For additional information, refer to the [qs](https://github.com/ljharb/qs).

### Parameters

The `Create Query` method parameters are:

| Parameter | Type | Default | Description | Configuration selection |
| --- | --- | --- | --- | --- |
| queries | object | - | The arbitrary query inputs which can be combined to make a single query string. | Selector, Object |
| arrayFormat | brackets<br /><br />indices<br /><br />comma<br /><br />repeat | indices | For eg, the input array format is `{ a: ['b', 'c'] }` different formats for the stringified array output are:<br /><br />If "brackets", the output array format will be returned as `a[]=b&a[]=c`<br /><br /> If "indices", the output array format will be returned as `a[0]=b&a[1]=c`<br /><br />If "repeat", the output array format will be returned as `a=b&a=c`. | Selector, String |
| allowDots | boolean | If enabled the nested object queries will be stringified using dot notation | Selector, Boolean |
| delimiter | string | - | The delimiter can override the default while stringify. | Selector, String |
| disableEncode |  boolean | false | The `encode` feature can be disabled. | Selector, Boolean |
| encodeValuesOnly | boolean | false | Encoding can be disabled for keys by setting the `encodeValuesOnly` option to `true` | Selector, Boolean |
| skipNulls | boolean | false | To completely skip rendering keys with null values, enable the `skipNulls` option | Selector, Boolean |
| strictNullHandling | boolean | false | To distinguish between null values and empty strings, enable the `strictNullHandling` option. In the result string the null values have no = sign | Selector, Boolean |
| stringifyNesting | boolean | false | To stringify the nested queries. | Selector, Boolean |

### Outputs

The `Create Query` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | string | The query string. | $.querystring |
| Error | object | The error object thrown when evaluating a query string. | $.error |

## Examples

In this section, some examples are shown. The examples show what the Output would be for specific values for `queries` parameter with different options.

| queries | options | Output |
| --- | --- | --- |
| `{"a": "b", "name":["Foo","Bar"]}` | - | `a=b&name%5B0%5D=Foo&name%5B1%5D=Bar` |
| `{"a": "b", "name":["Foo","Bar"]}` | `disableEncode: true` | `a=b&name[0]=Foo&name[1]=Bar` |
| `{"a": "b", "name":["Foo","Bar"]}` | `arrayFormat: brackets` | `a=b&name[]=Foo&name[]=Bar` |
| `{"a": "b", "name":["Foo","Bar"]}` | `arrayFormat: comma` | `a=b&name=Foo,Bar` |
| `{"a": "b", "name":["Foo","Bar"]}` | `arrayFormat: repeat` | `a=b&name=Foo&name=Bar` |
| `{"a": "b", "name":["Foo","Bar"]}` | `delimiter: ;` | `a=b;name=Foo;name=Bar` |
| `{"a": "b", "name":["Foo","Bar"]}` | `delimiter: |` | `a=b;name=Foo|name=Bar` |
| `{"a": "b", "name":["Foo","Bar"]}` | `delimiter: ,` | `a=b;name=Foo,name=Bar` |
| `{"a": "b", "name":["Foo=bar","Bar=foo"]}` | `encodeValuesOnly: true` | `a=b&name=Foo%3Dbar&name=Bar%3Dfoo` |
| `{"a": "b", "name":["Foo","Bar"]}` | `disableEncode: true` | `a=b&name=Foo&name=Bar` |
| `{"a": "b", "name":[null,"Bar"]}` | `skipNulls: true` | `a=b&name=Bar` |
| `{"a": "b", "name":[null,"Bar"]}` | `strictNullHandling: true` | `a=b&name&name=Bar` |
| `{"a": { "b": { "c": "d"}}` | `allowDots: true`, `disableEncode: true` | `a.b.c=d&name&name=Bar` |

### Nested Query input

For the nested query input object like `{"a": { "b": { "c": "d"}}` will be stringified to `a[b][c]=d` as output by using bracket notation. But for some cases, the whole nested object values should be kept without transforming. By enabling `stringifyNesting` option to `true` will JSON stringify the whole nested objects.
