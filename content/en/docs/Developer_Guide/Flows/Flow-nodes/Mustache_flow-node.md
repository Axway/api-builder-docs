---
title: Mustache flow-node
linkTitle: Mustache flow-node
description: ADD A DESCRIPTION
weight: 150
date: 2021-05-17
---

The following sections describe Mustache flow-node methods, parameters, and outputs.

The Mustache flow-node plugin is currently not included in the default application, but it can be installed manually with:

```bash
npm install --no-optional @axway/api-builder-plugin-fn-mustache
```

## Method

The Mustache flow-node has a single method called `Format string`. It composes a string by evaluating a template using Mustache. For additional information, refer to the [Mustache template language](http://mustache.github.io/mustache.5.html).

### Parameters

The `Format string` method parameters are:

| Parameter | Type | Description | Configuration selection |
| --- | --- | --- | --- |
| data | any | The value to assign to the "data" variable in the template. | Any |
| template | string | The Mustache template. For example: `Hi {{data.user}}` | Selector, String |

The `data` parameter refers to content which is provided to the template when it is evaluated at runtime. It is the selector or value that you want to pass to the Mustache template engine to provide dynamic values to the resulting string.

#### Providing dynamic data using a JSONPath Selector

In {{% variables/apibuilder_prod_name %}} flows, the `$` is a [JSON path](http://jsonpath.com/) selector that selects data from the whole runtime context. You can also modify the selector to choose and pass specific data elements. For example, you can use `$.params.username` to refer to the username parameter in the flow. At design time, it is useful to have an understanding of the data that you are querying and an understanding of what the JSON path selector will return.

The `template` parameter refers to the Mustache template, which is a string that contains a mixture of static and dynamic content. Both the `template` and `data` parameters are fed into the template engine at runtime. The `data` parameter is referred to as `"data"` within the template. Dynamic content is evaluated inside double curly brackets `{{}}`. In this example, `"My name is {{data.username}}"`, the string `"My name is"` is static content and `"{{data.username}}"`is calculated dynamically based on the data parameter passed into the template at runtime.

### Outputs

The `Format string` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | string | The formatted string. | $.value |
| Error | object | The error object thrown when evaluating an invalid template. | $.error |

## Examples

In this section, some examples are shown. The examples show what the Output would be for specific values for `data` and `template` parameters.

### Example 1: Property "data" set to "$"

| data | template | Output |
| --- | --- | --- |
| `{ params: { "username": "Joe" } }` | `My name is {{data.params.username}}` | `My name is Joe` |

### Example 2: Property "data" set to "$.param"

| data | template | Output |
| --- | --- | --- |
| `{ "username": "Joe" }` | `My name is {{data.username}}` | `My name is Joe` |

### Example 3: Property "data" set to a custom object

| data | template | Output |
| --- | --- | --- |
| `{ "firstname": "John", "lastname": "Doe" }` | `My name is {{data.firstname}} {{data.lastname}}` | `My name is John Doe` |

### Example 4: Greet example

This is the Greet example that comes with the newly scaffolded service.

The `data` property is set to "`$"` which has access to the **config** and **params** properties.

| data | template | Output |
| --- | --- | --- |
| `{`  <br />`"config": {`  <br />`"helloworld": {`  <br />`"salutation": "Howdy"`  <br />`}},`  <br />`"params":{ "username": "John" }`  <br />`}` | `{{data.config.helloworld.salutation}}, {{data.params.username}}!` | `Howdy, John!` |

### Example 5: Data with array property

| data | template | Output |
| --- | --- | --- |
| `{"usernames": ["John", "Jay"]}` | `Hello {{data.usernames}}!` | `Hello John, Jay!` |

### Example 6: Sections

| data | template | Output |
| --- | --- | --- |
| `{ "firstname": "John", "lastname": "Doe" }` | `{#data}Hi {{firstname}} {{lastname}}{/data}` | `Hi John Doe` |

### Example 7: Array of objects

By wrapping a template in a section (`{{#variable}}inner{{/variable}}`), where `variable` is an array, the inner template content will be repeated once for each item in the array.

| data | template | Output |
| --- | --- | --- |
| `[{ "item": "Oranges", "price": 10 }, { "item": "Apples": "price": 5 }]}` | `My Items:{{#data}}{{item}}: £{{price}}{{/data}}` | My Items:  <br />`Oranges: £10`  <br />`Apples: £5` |
