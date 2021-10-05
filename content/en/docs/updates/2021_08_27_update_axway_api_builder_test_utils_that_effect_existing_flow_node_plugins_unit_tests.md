---
title: >-
  2021-08-27 update  @axway/api-builder-test-utils that effect existing
  flow-node plugins' unit-tests
linkTitle: >-
  2021-08-27 update  @axway/api-builder-test-utils that effect existing
  flow-node plugins' unit-tests
weight: 30
date: 2021-10-01
---

2021-08-27 Update @axway/api-builder-test-utils that effect existing flow-node plugins' unit-tests

## Why are we making this change

In the [Timbuktu](/docs/release_notes/timbuktu/) release of {{% variables/apibuilder_prod_name %}}, we identified a regression in [@axway/api-builder-plugin-fn-mustache](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-mustache)@1.0.6 that changed the JSON schema of the **Data** parameter from _any_ to _string_. The regression was fixed in the [Utrecht](/docs/release_notes/utrecht/) release of {{% variables/apibuilder_prod_name %}}. However, as part of the remediation of this, we identified that it was easy to write invalid unit-tests for flow-node plugins. While the plugin had a unit-test that checked that mustache could handle any **Data** input, it did not also validate those inputs against the JSON schema for the **Data** parameter. If it had input validation, then this would have been caught.

For this reason, we introduced a feature to [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils) 1.4.0 that adds a new [option](https://www.npmjs.com/package/@axway/api-builder-test-utils#user-content-pluginsetoptionsoptions) to validate inputs while developing unit-tests. We also ensured that every Axway supported plugin validates its inputs as designed.

## How does this impact my service

If you have [custom flow-nodes](/docs/how_to/create_a_custom_flow_node/), then you will want this update. Recall that when you generate a flow-node plugin for the first time, it generates a "hello" example that accepts a string input **Name**, and when invoked, returns the message, "Hello _Name_". The JSON schema for the **Name** is as follows:

```yaml
parameters:
  name:
    name: Name
    description: The name of the person to greet.
    required: true
    initialType: string
    schema:
      type: string
```

It is possible to accidentally write a unit-test that appears to work, but is actually invalid during runtime. Notice the JSON schema for **Name** is "type: string". It is possible to write a valid unit-test that sets the name to a number 1234, instead of a string, and the unit-test will pass:

```javascript
it('should succeed with valid argument', async () => {
  const { value, output } = await flowNode.hello({ name: 1234 });
  expect(value).to.equal('Hello 1234');
  expect(output).to.equal('next');
});
```

The issue is that, the way this flow-node is written, a number is _not_ a valid input. It may indicate that a number should be accepted as a valid input, but the point is that it is not, and your existing unit-tests may have this issue.

## Upgrade existing services

To ensure that your flow-node inputs and outputs are valid with respect to your JSON schema definition, you should enable the new validateInputs and the existing validateOutputs [options](https://www.npmjs.com/package/@axway/api-builder-test-utils#user-content-pluginsetoptionsoptions) in your unit-tests, for example:

```javascript
// test.js

beforeEach(async () => {
  plugin = await MockRuntime.loadPlugin(getPlugin);
  plugin.setOptions({
    validateInputs: true,
    validateOutputs: true
  });
  flowNode = plugin.getFlowNode('greeting');
});
```

If all of your unit-test pass, then your flow-node is valid with respect to its JSON schema. However, if any fail, you need to investigate. It may be accidental, in which case, you need to fix your unit-test, or it may be intentional as {{% variables/apibuilder_prod_name %}} does not validate flow-node inputs at runtime for performance reasons. For this reason, you need to develop your flow-node to handle invalid inputs (e.g. when **Name** is not a string or undefined), and you need to write unit tests that intentionally check that invalid inputs are handled, e.g. that the name is a string:

```javascript
// action.js

async function hello(params, options) {
  const { name } = params;
  const { logger } = options;
  if (!name) {
    throw new Error('Missing required parameter: name');
  }
  if (typeof name !== 'string') {
    throw new Error('Parameter "name" is not a string');
  }
  return `Hello ${name}`;
}
```

In this case, you want to write a unit-test for that, and _intentionally_ pass in an invalid name, but because input validation is enabled in the test-utils, it will not actually hit your code. To intentionally pass invalid inputs, you must disable the `validateInputs` option:

```javascript
it('should error when name parameter is not a string', async () => {
  // Invoke #hello with a non-number and check error.
  plugin.setOptions({ validateInputs: false });
  const { value, output } = await flowNode.hello({ name: 1234  });
  expect(value).to.be.instanceOf(Error)
    .and.to.have.property('message', 'Parameter "name" is not a string');
  expect(output).to.equal('error');
});
```
