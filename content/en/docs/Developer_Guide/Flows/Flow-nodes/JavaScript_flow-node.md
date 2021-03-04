---
title: JavaScript flow-node
linkTitle: JavaScript flow-node
weight: 90
date: 2021-03-02
---

## Overview

The Javascript plugin, `@axway/api-builder-plugin-fn-javascript`, allows the user to execute JavaScript code inside a Flow.

To install the Javascript plugin, execute the following command:

```bash
npm install --no-optional @axway/api-builder-plugin-fn-javascript
```

For additional getting started information, refer to the [Getting Started with {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/).

## Methods

The following sections provide details of the JavaScript flow-note Execute method.

### Execute

Allows the execution of JavaScript code and returns the result of the execution as the Flow Node's output.

#### Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| code | string | A JavaScript function body. Supports \`await\` and returning promises. | Selector, String | Yes |
| data | any | The value to apply as the \`data\` argument to the JavaScript code. For objects and arrays, \`data\` is passed by reference. | Any | No |
| Unsafe mode | boolean | USE WITH CAUTION. When enabled, JavaScript is not executed in a sandboxed environment and all globals are available. | Selector, Boolean | No |

##### Parameter: code

The `code` parameter is where you define the JavaScript you would like to execute. The code should be provided as a String. The `data` parameter is fed into the code snippet as an argument.

It is important to note that the specified JavaScript code is executed in a sandboxed environment. Meaning that the specified code snippet is isolated from the rest of the server when executed.

##### Parameter: data

The `data` parameter refers to content which is passed to the JavaScript code. The content is passed as an argument in the code as "data". The parameter can be any data type. For example, you could use `$` Selector to access the entire context, or limit it to a specific subset (e.g. to access parameters as parameters - `$.params`).

{{% alert title="❗️ Caution" color="danger" %}}It is not recommended to provide the code as a Selector. It is a security risk to execute code obtained from unknown sources.{{% /alert %}}

##### Advanced Parameter: Unsafe mode

By default, the code is executed in a sandboxed environment with its own context so it is very difficult to modify the state of the {{% variables/apibuilder_prod_name %}} service. Most JavaScript can still be used here (including promises and await) with the exception of many global functions such as setTimeout, the Function constructor and require. Enabling _Unsafe mode_ allows accessing the previously unavailable globals. However, be aware that it also provides access to the same context as the rest of the {{% variables/apibuilder_prod_name %}} service, meaning that potentially bad things can be achieved. Only enable _Unsafe mode_ if you know what you're doing.

#### Outputs

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | any | The data returned by the code snippet. If returning a promise, this will be the data that the promise resolves with. | `$.result` |
| Error | any | This output is triggered if the code snippet throws an error or returns a promise which rejects. The output value an object with the error message, or the rejected value. | `$.error` |

## How to use the JavaScript plugin

After the installation of the JavaScript plugin and editing a Flow, you will find the JavaScript flow-node in the Core section:

![Screen_Shot_2019-07-04_at_15.22.46](/Images/Screen_Shot_2019-07-04_at_15.22.46.png)

You can drag and drop the JavaScript flow-node into the Flow Graph to expand its details:

![image2019-7-19_11_9_27](/Images/image2019-7-19_11_9_27.png)

### Example 1 - Greet Flow

Here is how you could use the JavaScript flow-node to achieve the same functionality as our Greet Flow example:

First, you would need to determine the data you would like to pass to your function. For the Greet Flow you will need both the `$.config`, as the salutation is stored there, and the user's name, which comes from `$.params`.

So let's pass the entire context with the `$` selector and use JavaScript code to format the message as we have seen in the Greet Flow.

![image2019-7-5_9_40_52](/Images/image2019-7-5_9_40_52.png)

We could use a simple template literal to construct the message:

![image2019-7-19_11_11_6](/Images/image2019-7-19_11_11_6.png)

Let's hook everything up as we have seen before to the success node and bad request node.

![Screen_Shot_2019-07-04_at_15.20.26](/Images/Screen_Shot_2019-07-04_at_15.20.26.png)

Make sure the outputs of the JavaScript flow-node are correctly used within the HTTP flow-nodes. As described above, the default outputs are `$.result` and `$.error`:

| ![Screen_Shot_2019-07-04_at_15.21.17](/Images/Screen_Shot_2019-07-04_at_15.21.17.png) | ![image2019-7-5_9_41_40](/Images/image2019-7-5_9_41_40.png) |
| --- | --- |

You could invoke your newly created flow through the debugger:
![debugger](/Images/debugger.png)

Which would return the already familiar salutation:

![Screen_Shot_2019-07-03_at_18.24.39](/Images/Screen_Shot_2019-07-03_at_18.24.39.png)

### Example 2 - Format Object

| Input | Code | Output |
| --- | --- | --- |
| data = {  <br />   "firstName": "Bruce",  <br />   "lastName": "Wayne",  <br />   "heroName": "Batman"  <br />}; | // Maps a hero name to the Universe the character belongs to  <br />const heroNamesToUniverseMapper = {  <br /> 'Batman': 'DC',  <br /> 'Flash': 'DC',  <br /> 'Spiderman': 'Marvel',  <br /> 'Iron Man': 'Marvel'  <br />};  <br />   <br />return {  <br />  heroName: data.heroName,  <br />  secretName: data.firstName + ' ' + data.lastName,   <br />  universe: heroNamesToUniverseMapper\[data.heroName\] || 'N/A'  <br />}; | {   <br /> "heroName": "Batman",   <br /> "secretName": "Bruce Wayne",   <br /> "universe": "DC"   <br />} |

### Example 3 - String Concatenation

| Input | Code | Output |
| --- | --- | --- |
| data = {  <br />   "firstName": "Bruce",  <br />   "lastName": "Wayne"  <br />}; | return data.firstName + ' ' + data.lastName; | "Bruce Wayne" |
| data = {  <br />   "firstName": "Bruce",  <br />   "lastName": "Wayne"  <br />}; | return \`${data.firstName} ${data.lastName}\`; | "Bruce Wayne" |

### Example 4 - Processing Data

| Input | Code | Output |
| --- | --- | --- |
| data = \["1","2","3","4","5"\]; | let result = 0;  <br />  <br />data.forEach(function(element) {  <br />  const number = parseInt(element);  <br />  if(number % 2 == 0){  <br />	result += number;  <br />  }  <br />});  <br />  <br />return result; | 6 |
| data = \["1","2","3","4","5"\]; | return data.map(item => parseInt(item))  <br />  .filter(number => number % 2 == 0)  <br />  .reduce((sum, number) => sum + number); | 6 |

### Example 5 - Object Manipulation - Combining two objects

| Input | Code | Output |
| --- | --- | --- |
| data = {  <br />  "birthYear": 1989,  <br />  "name": "Peter Parker"  <br />}; | const companyDetails = {  <br />   company: 'Axway',  <br />   companyAddress: 'Phoenix, US'  <br />};  <br />  <br />return Object.assign(data, companyDetails); | {  <br />  "birthYear": 1989,  <br />  "name": "Peter Parker",  <br />  "company": "Axway",  <br />  "companyAddress": "Phoenix, US"  <br />} |

### Example 6 - Object Manipulation - Merging with spread

| Input | Code | Output |
| --- | --- | --- |
| data = {  <br />  "birthYear": 1989,  <br />  "name": "Peter Parker"  <br />}; | return {  <br />  ...data,  <br />  <br />company: 'Axway',  <br />  companyAddress: 'Phoenix, US'  <br />}; | {  "birthYear": 1989,  <br />  "name": "Peter Parker",  <br />  "company": "Axway",  <br />  "companyAddress": "Phoenix, US"  <br />} |
