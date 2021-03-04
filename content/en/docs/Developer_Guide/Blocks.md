---
title: Blocks
linkTitle: Blocks
weight: 50
date: 2021-03-02
---

## Introduction

This guide covers the basic instructions for creating Blocks. Blocks are functions that run before or after an API endpoint is executed. They can be used to modify the API request, to modify the API response or to execute common tasks like audit logging, caching, rate-limiting, or recording analytics. Multiple Blocks can be executed before or after an API request. Blocks are optional.

## Block definition

Place all Block files in the project's `blocks` folder. You can only declare one Block per file. A Block file is a JavaScript file, which:

1. Loads the `@axway/api-builder-runtime` module.

2. Calls the module's `Block.extend()` method, passing in an object defining the block identifier and logic to execute.

3. Exports the defined block using the `module.exports` variable.

Set the following keys in the object passed to the `Block.extend()` method to define the Block:

| Name | Required | Description |
| --- | --- | --- |
| name | true | Block name. This name should be used when specifying blocks in your API endpoint definition. Assign the name value to either the `before` or `after` property in the API definition object to use it. |
| description | true | Human useful description to display in the documentation. |
| action | true | The function containing the logic for your block. All of your runnable code goes in the `action` function. This function is passed a `request` and `response`. |

## Example

The following Block sets the `set` parameter and logs the change.

```javascript
var APIBuilder = require('@axway/api-builder-runtime');

var PreBlock = APIBuilder.Block.extend({
    name: 'pre_example',
    description: 'will set a header named "Foo"',

    action: function (req, resp) {
        // this is a synchronous block since it doesn't have a nex
        resp.set('Foo', 'Bar');
        req.log.info('Pre Example Block executed');
    }
});

module.exports = PreBlock;
```
