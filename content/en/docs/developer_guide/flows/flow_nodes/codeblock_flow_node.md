---
title: Codeblock flow-node
linkTitle: Codeblock flow-node
weight: 30
date: 2021-10-01
---

{{% alert title="Note" color="primary" %}}Beginning with the [Cairo](/docs/release_notes/cairo) release, Codeblocks are deprecated {{% deprecation/link D028 %}} and will be removed in a future version of the product.{{% /alert %}}

This document describes a Codeblock flow-node and provides information on Codeblock flow-node.

| Name | Description |
| --- | --- |
| Codeblock | A flow-node that can be used for executing user code and returns the response. This node allows custom business logic to be executed as part of the flow. |

The Codeblock flow-node configuration, metadata, functionality, methods, parameters, and outputs for the Greet Codeblock flow-node are described in the following sections. Each method in a Codeblock flow-node corresponds to a single codeblock. The Greet Codeblock flow-node is created when a new application is created, but it can be deleted.

## Instance configuration (config)

| Property | Description | Required | Type |
| --- | --- | --- | --- |
| method | The name of the Codeblock to execute. | yes | string |

The typical usage of code block flow-nodes involves setting parameters, mapping responses, and setting required configs as noted in the example below.

### Configuration example

```json
"block.0": {
 "type": "Codeblock",
 "config": {
   "method": "Greet"
 },
 "parameters": [
   {
     "name": "username",
     "value": "$.params.username"
   }
 ],
 "response": {
   "context": {
     "$": "greeting"
   },
   "routes": null
 }
}
```

## Metadata

Codeblock metadata should be included in the `/codeblocks` directory of an {{% variables/apibuilder_prod_name %}} Project. It is defined as a JSON file with the following properties:

| Property | Description | Required | Type |
| --- | --- | --- | --- |
| name | The name of the Codeblock. | yes | string |
| description | The description of the Codeblock. | yes | string |
| path | The relative path to the function to be invoked. | yes | string |
| parameter | Schema containing describing all the input parameters | yes | object |
| outputs | Map of outputs that the codeblock can invoke | yes | object |

### Metadata example

```json
// Greet.json

{
  "name": "Greet",
  "description": "Some codeblock to run with Greet flow",
  "path": "Greet.js",
  "parameter": {
    "additionalProperties": false,
    "properties": {
      "username": {
        "type": "string"
      }
    }
  },
  "outputs": {
    "next": {},
  "error": {}
  }
}
```

The functional part of a Codeblock should be a `.js` file which exports a function of the following signature:

**`invoke(apibuilder, params, cb);`**

* `apibuilder <APIBuilder>` - The {{% variables/apibuilder_prod_name %}} instance.
* `params <Object>` - Key/value pairs of parameters passed to the node instance.
* `cb <Function>` - Callback.
* `err` - Error. Passing this will cause the flow to cease processing and a 500 error to be returned from the endpoint which called it.
* `response` - The data to be returned as the node response.

{{% alert title="Note" color="primary" %}}Most of the time errors should be returned in the callback as a standard response. Using the first parameter to return errors is the same as throwing an error in the Codeblock and should rarely need to be used.{{% /alert %}}

### Functionality example

```javascript
// Greet.js

function invoke(apibuilder, params, cb) {
    const salutation = apibuilder.config.helloworld.salutation;
    if (!params.username) {
        return cb.error(null, {
            message: 'Invalid name'
        });
    }
    const body = salutation + ' ' + params.username;
    cb(null, body);
}
exports = module.exports = invoke
```

## Method

The default method for the Greet Codeblock flow-node is:

* `Greet` - The codeblock to run with the greet flow.

## Parameter

The `Greet` method parameter is:

| Parameter | Type | Configuration selection |
| --- | --- | --- |
| username | string | Selector, String |

## Outputs

The `Greet` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| next | string | The codeblock completed. | $.greeting |
| error | object | The codeblock failed to complete. | $.error |
