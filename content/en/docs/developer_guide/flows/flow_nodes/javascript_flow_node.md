---
title: JavaScript flow-node
linkTitle: JavaScript flow-node
weight: 120
date: 2021-10-01
---

## Overview

The JavaScript plugin, `@axway/api-builder-plugin-fn-javascript`, allows the user to execute JavaScript code inside a Flow.

To install the JavaScript plugin, execute the following command:

```bash
npm install --no-optional @axway/api-builder-plugin-fn-javascript
```

For additional getting started information, refer to the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started/).

## Methods

The following sections provide details of the JavaScript flow-node Execute method.

### Execute

Allows the execution of JavaScript code and returns the result of the execution as the flow-node's output.

#### Flow-node's parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| Code | string | A JavaScript function body. Supports \`await\` and returning promises. | Selector, String | Yes |
| Data | any | The value to apply as the \`data\` argument to the JavaScript code. For objects and arrays, \`data\` is passed by reference. | Any | No |

##### Parameter: Code

{{% alert title="Caution" color="danger" %}}It is not recommended to provide the code as a Selector. It is a security risk to execute code obtained from unknown sources.{{% /alert %}}

The **`Code`** parameter is where you define the JavaScript you would like to execute. The **Code** should be provided as a String. The **Data** parameter is fed into the code snippet as the first argument, `data`. The second argument of the code, `logger,` is the {{% variables/apibuilder_prod_name %}} [logger](/docs/developer_guide/project/logging/).

##### Parameter: Data

The **Data** parameter refers to content which is passed to the JavaScript code. The content is passed as an argument in the code as `data`. The parameter can be any data type. For example, you could use `$` Selector to access the entire context, or limit it to a specific subset (e.g. to access parameters as parameters - `$.params`).

#### Outputs

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | any | The data returned by the code snippet. If returning a promise, this will be the data that the promise resolves with. | `$.result` |
| Error | any | This output is triggered if the code snippet throws an error or returns a promise which rejects. The output value an object with the error message, or the rejected value. | `$.error` |

## How to use the JavaScript plugin

After the installation of the JavaScript plugin and editing a Flow, you will find the JavaScript flow-node in the Core section:

![image2021-6-30_11_11_5](/Images/image2021_6_30_11_11_5.png)

You can drag and drop the JavaScript flow-node into the Flow Graph to expand its details:

![image2021-6-30_11_10_13](/Images/image2021_6_30_11_10_13.png)

### Example 1 - Greet Flow

Here is how you could use the JavaScript flow-node to achieve the same functionality as our Greet Flow example:

First, you would need to determine the data you would like to pass to your function. For the Greet Flow you will need both the `$.config`, as the salutation is stored there, and the user's name, which comes from `$.params`.

So let's pass the entire context with the `$` selector and use JavaScript code to format the message as we have seen in the Greet Flow.

![image2019-7-5_9_40_52](/Images/image2019_7_5_9_40_52.png)

We could use a simple template literal to construct the message:

![image2021-5-18_12_14_56](/Images/image2021_5_18_12_14_56.png)

Let's hook everything up as we have seen before to the success node and bad request node.

![Screen_Shot_2019-07-04_at_15.20.26](/Images/screen_shot_2019_07_04_at_15_20_26.png)

Make sure the outputs of the JavaScript flow-node are correctly used within the HTTP flow-nodes. As described above, the default outputs are `$.result` and `$.error`:

| ![Screen_Shot_2019-07-04_at_15.21.17](/Images/screen_shot_2019_07_04_at_15_21_17.png) | ![image2019-7-5_9_41_40](/Images/image2019_7_5_9_41_40.png) |
| --- | --- |

You could invoke your newly created flow through the debugger:
![debugger](/Images/debugger.png)

Which would return the already familiar salutation:

![Screen_Shot_2019-07-03_at_18.24.39](/Images/screen_shot_2019_07_03_at_18_24_39.png)

### Example 2 - Logging

The JavaScript flow-node can also make use of the {{% variables/apibuilder_prod_name %}} logger. You can see the logger as the second argument to the `Code` function. As with anything that uses the {{% variables/apibuilder_prod_name %}} logger, only logs at or above the configured LOG_LEVEL of the service will be output to the terminal. See [Logging](/docs/developer_guide/project/logging/) for more details.

Here is how you can add extra debugging to your flow:

This example flow-node calculates the product of the provided array of numbers.

![image2021-5-18_12_36_22](/Images/image2021_5_18_12_36_22.png)

```log
1621337798796 DEBUG [request-id: 9abdf0c2-efb0-4d85-b6cb-3746ea0133f1] Waiting: Calculate product (javascript.1)
1621337798796 DEBUG [request-id: 9abdf0c2-efb0-4d85-b6cb-3746ea0133f1] Invoking: Calculate product (javascript.1), method: Execute
1621337798798 DEBUG [request-id: 9abdf0c2-efb0-4d85-b6cb-3746ea0133f1]   Calculate product (javascript.1) route: []
1621337798798 DEBUG [request-id: 9abdf0c2-efb0-4d85-b6cb-3746ea0133f1]   Calculate product (javascript.1) writing 120780 to ctx as: $.response
```

Unfortunately, when debugging, we do not see which numbers are being calculated and only the result. We will add a debug log to show what's going on!

![image2021-5-18_12_38_33](/Images/image2021_5_18_12_38_33.png)

```log
1621337924647 DEBUG [request-id: 29011c0a-317c-456a-ac63-0dfa9f8a7f07] Waiting: Calculate product (javascript.1)
1621337924647 DEBUG [request-id: 29011c0a-317c-456a-ac63-0dfa9f8a7f07] Invoking: Calculate product (javascript.1), method: Execute
1621337924648 DEBUG [request-id: 29011c0a-317c-456a-ac63-0dfa9f8a7f07]   Calculate product (javascript.1) Calculating: 1 * 5 * 99 * 244
1621337924648 DEBUG [request-id: 29011c0a-317c-456a-ac63-0dfa9f8a7f07]   Calculate product (javascript.1) route: []
1621337924648 DEBUG [request-id: 29011c0a-317c-456a-ac63-0dfa9f8a7f07]   Calculate product (javascript.1) writing 120780 to ctx as: $.response
```

### Example 3 - Format Object

| Input | Code | Output |
| --- | --- | --- |
| data = {  <br />   "firstName": "Bruce",  <br />   "lastName": "Wayne",  <br />   "heroName": "Batman"  <br />}; | // Maps a hero name to the Universe the character belongs to  <br />const heroNamesToUniverseMapper = {  <br /> 'Batman': 'DC',  <br /> 'Flash': 'DC',  <br /> 'Spiderman': 'Marvel',  <br /> 'Iron Man': 'Marvel'  <br />};  <br />   <br />return {  <br />  heroName: data.heroName,  <br />  secretName: data.firstName + ' ' + data.lastName,   <br />  universe: heroNamesToUniverseMapper\[data.heroName\] || 'N/A'  <br />}; | {   <br /> "heroName": "Batman",   <br /> "secretName": "Bruce Wayne",   <br /> "universe": "DC"   <br />} |

### Example 4 - String Concatenation

| Input | Code | Output |
| --- | --- | --- |
| data = {  <br />   "firstName": "Bruce",  <br />   "lastName": "Wayne"  <br />}; | return data.firstName + ' ' + data.lastName; | "Bruce Wayne" |
| data = {  <br />   "firstName": "Bruce",  <br />   "lastName": "Wayne"  <br />}; | return \`${data.firstName} ${data.lastName}\`; | "Bruce Wayne" |

### Example 5 - Processing Data

| Input | Code | Output |
| --- | --- | --- |
| data = \["1","2","3","4","5"\]; | let result = 0;  <br />  <br />data.forEach(function(element) {  <br />  const number = parseInt(element);  <br />  if(number % 2 == 0){  <br />  result += number;  <br />  }  <br />});  <br />  <br />return result; | 6 |
| data = \["1","2","3","4","5"\]; | return data.map(item => parseInt(item))  <br />  .filter(number => number % 2 == 0)  <br />  .reduce((sum, number) => sum + number); | 6 |

### Example 6 - Object Manipulation - Combining two objects

| Input | Code | Output |
| --- | --- | --- |
| data = {  <br />  "birthYear": 1989,  <br />  "name": "Peter Parker"  <br />}; | const companyDetails = {  <br />   company: 'Axway',  <br />   companyAddress: 'Phoenix, US'  <br />};  <br />  <br />return Object.assign(data, companyDetails); | {  <br />  "birthYear": 1989,  <br />  "name": "Peter Parker",  <br />  "company": "Axway",  <br />  "companyAddress": "Phoenix, US"  <br />} |

### Example 7 - Object Manipulation - Merging with spread

| Input | Code | Output |
| --- | --- | --- |
| data = {  <br />  "birthYear": 1989,  <br />  "name": "Peter Parker"  <br />}; | return {  <br />  ...data,  <br />  <br />company: 'Axway',  <br />  companyAddress: 'Phoenix, US'  <br />}; | {  "birthYear": 1989,  <br />  "name": "Peter Parker",  <br />  "company": "Axway",  <br />  "companyAddress": "Phoenix, US"  <br />} |
