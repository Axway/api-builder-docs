---
title: DoT flow-node
linkTitle: DoT flow-node
weight: 70
date: 2021-03-02
---

{{% alert title="❗️ Caution" color="danger" %}}Installing this module may report a security vulnerability with doT. This is because doT templates can be used to execute malicious JavaScript.

**Templates should never come from untrusted sources**. If you trust all the templates that you use, then you can safely ignore the vulnerability and continue to use this plugin.

This plugin is no longer bundled with new {{% variables/apibuilder_prod_name %}} projects. We suggest using `@axway/api-builder-plugin-fn-javascript` instead of the `formatObject` method, or `@axway/api-builder-plugin-fn-mustache` instead of `formatString`.{{% /alert %}}

## Compose flow-node templates

{{% variables/apibuilder_prod_name %}}'s **Compose** flow-node allows you to transform the structure of your data within an orchestrated flow. It uses **[doT](http://olado.github.io/doT/),** a powerful template engine similar to Mustache or Handlebars. The **Compose** flow-node (`@axway/api-builder-plugin-fn-dot`) comes installed with all new {{% variables/apibuilder_prod_name %}} projects. Additional information about the usage of the **[doT](http://olado.github.io/doT/)** plugin can be found in the plugin's [README](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot), and information about the **[doT](http://olado.github.io/doT/)** template language can be found [here](http://olado.github.io/doT/index.html).

The **Compose** flow-node has two methods: `Format string` and `Format object`. The `Format string` method will run the template engine and return the result as a string. The `Format object` will run the template engine and parse the result as a JSON object. Both functions require two parameters: **data** and **template**.

### Parameter: data

The **data** parameter refers to content which is provided to the template when it is evaluated at runtime. It is the selector or JSON object that you want to pass to the doT template engine for formatting. The data can be a selector or a JSON object. A JSON object can be a JSON string, null, Boolean, array, or IIRC. In {{% variables/apibuilder_prod_name %}} flows, the `$` is a [JSON path](http://jsonpath.com/) selector that selects data from the runtime context. You can pass the whole runtime context into the doT template engine or you can use the selector to choose and pass specific data elements. For example, you can use `$.params.username` to return a string or `$.username` to return an array of usernames. At design time, it is useful to have an understanding of the data that you are querying and an understanding of what the JSON path selector will return.

### Parameter: template

A **[doT](http://olado.github.io/doT/)** **template** is a string which contains a mixture of static and dynamic content. Together with the **template**, the **data** parameter is fed into the template engine at runtime. The **data** parameter is referred to as `"it"` within the template.

Dynamic content is evaluated inside double curly brackets `{{}}`. In this example, `"My name is {{=it}}"`, the string `"My name is"` is static content and `"{{=it}}"` is calculated dynamically based on the data parameter passed into the template at runtime.

The curly brackets `{{}}` can be used in many ways, based on how you want to dynamically generate the resulting object or string. The most common one is `{{= }}.` This is the "interpolation delimiter", in other words, the code inserted within the curly brackets will be stringified and included in the output data. This is a list of all the delimiters:

| Delimiter | Description |
| --- | --- |
| `{{ }}` | Evaluation |
| `{{= }}` | Interpolation |
| `{{! }}` | Interpolation with encoding |
| `{{# }}` | Compile-time evaluation/includes and partials |
| `{{## #}}` | Compile-time defines |
| `{{? }}` | Conditionals |
| `{{~ }}` | Array iteration |

### Simple examples of data, templates, JSON path, and interpolation

| Data | Template | Output |
| --- | --- | --- |
|  | `{{="Hello"}}, Joe` | `Hello, Joe` |
| `"Greetings"` | `{{=it}}, Joe` | `Greetings, Joe` |
| `{ "greeting": "Good day" }` | `{{=it.greeting}}, Joe` | `Good day, Joe` |
| `[ 1, 2, 3, 4 ]` | `{{=it.includes(5)}}` | `false` |

### Format string example

![image2018-8-24_16_47_5](/Images/image2018-8-24_16_47_5.png)

Here you can see how data and templates are used together in the flow editor for outputting a string. The "Format string" method has been selected. As with any values, **data** can be input into the doT flow-node as hard-coded object value, or as a selector. In this case, the selector `$.params` is used. The `$.params` selector refers to an object containing parameters that were included in the request. In this example, imagine that `$.params` looks like the following object when the flow is invoked:

| $.params | Template | Output |
| --- | --- | --- |
| `{ "username": "Joe" }` | `My name is {{=it.username}}` | `My name is Joe` |

With the **template** value of "`My name is {{=it.username}}`.", the flow-node will take the username property from the object passed in as data and evaluate the string as "My name is Joe Bloggs."

### Format object example

![image2018-8-24_17_8_5](/Images/image2018-8-24_17_8_5.png)

This example shows how to build a JSON object dynamically using the `Format object` method of the doT flow-node. Similar to the previous example, the interpolation delimiter `{{= }}` is used to insert dynamic data. In this template, a JSON object is formatted where the keys are static and the values are dynamically provided.

| Data | Template | Output |
| --- | --- | --- |
| `{`  <br />`"username": "Joe",`  <br />`"favoriteFoods": [ "apple", "orange" ]`  <br />`}` | `{`  <br />`"name": "{{=it.username}}",`  <br />`"likes": "{{=it.favoriteFoods}}"`  <br />`}` | `{`  <br />`"name": "Joe",`  <br />`"likes": "apple orange"`  <br />`}` |

## doT Examples

The following sections provide doT flow-node examples.

### Interpolation

| Data | Template | Output |
| --- | --- | --- |
| `"foobar"` | `"{{= it.match(/foo/).toString().toUpperCase() }}"` | `"FOO"` |

### Evaluation with HTML encoding

| Data | Template | Output |
| --- | --- | --- |
| `"You & I"` | `{{!it}} like {{% variables/apibuilder_prod_name %}}!` | You & I like {{% variables/apibuilder_prod_name %}}! |

### Compose a new JSON object

| Data | Template | Output |
| --- | --- | --- |
| `{`  <br />`"username": "Joe",`  <br />`"favoriteFoods": [ "apples", "oranges" ]`  <br />`}` | `{`  <br />`"name": "{{=it.username}}",`  <br />`"likes": {{=JSON.stringify(it.favoriteFoods)}}`  <br />`}` | `{`  <br />`"name": "Joe",`  <br />`"likes": [ "apples", "oranges" ]`  <br />`}` |

### Compile-time definitions

| Data | Template | Output |
| --- | --- | --- |
| `{`  <br />`"name":"Joe",`  <br />`"auth": true`  <br />`}` | `{{##def.snippet1:`  <br />`{{=it.name}} {{?it.auth}} - you are authorized{{?}}`  <br />`#}}` `Hello, {{#def.snippet1}}` | `Hello, Joe - you are authorized` |

### Compile-time definitions with parameters

| Data | Template | Output |
| --- | --- | --- |
| `{`  <br />`"name":"Joe",`  <br />`"auth": true`  <br />`}` | `{{##def.block1:param:`  <br />`<user {{?param.auth}}authorized{{?}}>{{=param.name}}</user>`  <br />`#}}`  <br />`{{#def.block1 :it }}` | `<user authorized>Joe</user>` |

### Array manipulation

| Data | Template | Output |
| --- | --- | --- |
| `{`  <br />`"username": "Joe",`  <br />`"favoriteFoods": [ "apples", "oranges" ]`  <br />`}` | `{`  <br />`"name": "{{=it.username}}",`  <br />`"likes": "{{=it.favoriteFoods.join(' and ')}}"`  <br />`}` | `{`  <br />`"name": "Joe",`  <br />`"likes": "apples and oranges"`  <br />`}` |

### Conditionals

| Data | Template | Output |
| --- | --- | --- |
| `{`  <br />`"username": "Joe"`  <br />`}` | `My name is {{=it.username}}{{? it.favoriteFoods }} and I like {{=it.favoriteFoods.join(' and ')}}{{?}}.` | `My name is Joe.` |
| `{`  <br />`"username": "Joe",`  <br />`"favoriteFoods": [ "apple", "orange" ]`  <br />`}` | `My name is {{=it.username}} {{? it.favoriteFoods }} and I like` `{{=it.favoriteFoods.join(' and ')}}{{?}}.` | `My name is Joe and I like apples and oranges.` |

### Conditional if/else

| Data | Template | Output |
| --- | --- | --- |
| `{`  <br />`"username": "Sam"`  <br />`}` | `{{? it.username === "Joe" }}`  <br />`Hello Joe!`  <br />`{{??}}`  <br />`I don't know you`  <br />`{{?}}` | `I don't know you` |

### Array loops

| Data | Template | Output |
| --- | --- | --- |
| `["apple", "banana", "orange"]` | `[`  <br />`{{~ it :value:i}}`  <br />`"{{=value}}-{{=i}}"`  <br />`{{? i < it.length - 1}}, {{?}}`  <br />`{{~}}`  <br />`]` | `[ "apple-0" , "banana-1" , "orange-2" ]` |

### JavaScript function with no parameter

| Data | Template | Output |
| --- | --- | --- |
| `{}` | `{{##def.myfunc = function() {`  <br />`return Date.now();`  <br />`}`  <br />`#}}` `{timestamp: {{#def.myfunc()}}}` | `{timestamp: 1535531752947}` |

### JavaScript function with a string parameter

| Data | Template | Output |
| --- | --- | --- |
| `{ name: "Joe" }` | `{{##def.myfunc = function(str) {`  <br />`return str;`  <br />`}`  <br />`#}}` `{user: "{{#def.myfunc( "\{\{=it.name\}\}" )}}"}` | `{user: "Joe"}` |

### JSON stringify

| Data | Template | Output |
| --- | --- | --- |
| `{`  <br />`"username": "Joe",`  <br />`"favoriteFoods": [ "apple", "orange" ]`  <br />`}` | `{`  <br />`"name": {{=JSON.stringify(it.username)}},`  <br />`"likes": {{=JSON.stringify(it.favoriteFoods)}}`  <br />`}` | `{`  <br />`"name": "Joe",`  <br />`"likes": "apple orange"`  <br />`}` |
