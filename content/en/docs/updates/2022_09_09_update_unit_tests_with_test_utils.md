---
title: Update project unit tests to use @axway/api-builder-test-utils
date: 2022-09-09
---

## Why are we making this change

In the [Villasimius](/docs/release_notes/villasimius/) release, we introduced a new `Runtime` utility in [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils) to reduce the amount of code that users have to manage in their project unit tests. When this feature is used, it allows us to provide unit test optimisations for new {{% variables/apibuilder_prod_name %}} Core features through regular updates without users having to make manual changes (such as this one) to receive them.

## How does this impact my service

To benefit from this feature, existing project's unit tests must be modified as described below. Once the modifications have been made, future updates to [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils) will be able to be seen from the **Updates** tab.

New projects have this feature enabled by default.

## Upgrade existing services

This feature requires the [Villasimius](/docs/release_notes/villasimius/) release of {{% variables/apibuilder_prod_name %}} Core, so ensure you have installed all updates before continuing. This guide also assumes you have followed the previous update outlined in [Replace the request dev-dependency in project unit tests](/docs/updates/2021_12_17_update_to_remove_request_module)

### Install @axway/api-builder-test-utils

Install [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils) (at least 1.6.0) as a dev-dependency to your project.

```bash
npm install @axway/api-builder-test-utils@1.6.0 --save-dev
```

### Import @axway/api-builder-test-utils

In all of your project's unit tests, find this code:

```js
const { startApiBuilder, stopApiBuilder } = require('./_base');
```

And replace it with:

```js
const { Runtime } = require('@axway/api-builder-test-utils');
```

### Remove the `_base.js` file

The file `/test/_base.js` is now no longer used, and can be deleted from your project.

### Remove the `before` and `after` block

In all of your project's unit test files find the `before` and `after` blocks of code.

If the `before` and `after` blocks of code are the same as the ones below, then you can remove the global variables, `apibuilder` and `client`, as well as the entire `before` and `after` blocks of code.

```js
let apibuilder;
let client;

/**
 * Start API Builder.
 */
before(async () => {
  apibuilder = await startApiBuilder();
  const apikey = apibuilder.config.apikey;
  client = got.extend({
    prefixUrl: `http://localhost:${apibuilder.port}`,
    headers: {
      apikey,
      authorization: `Basic ${Buffer.from(apikey + ':').toString('base64')}`
    },
    throwHttpErrors: false
  });
});

/**
 * Stop API Builder after the tests.
 */
after(() => stopApiBuilder(apibuilder));
```

If the `before` or `after` blocks are not the same, you will need to assess if the changes are compatible with these recommended updates, or consult the [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils) documentation.

### Update assertions

Previously, your tests may assert similar to this example:

```js
it('should assert something', () => {
  expect(example).to.equal(true);
});
```

However, that was error prone, and if the test failed, there was a chance the server would not shut down correctly. Instances of `Runtime` object now have a `test` function that is used to start and stop the runtime server and will stop the server if there are any failures. The above example can be rewritten.

```js
it('should assert something', async () => {
  const runtime = new Runtime();
  await runtime.test(async () => {
    expect(example).to.equal(true);
  });
});
```

In all of your project's unit tests, update your tests to use the new `Runtime` instance and `test` function.

### Update HTTP client

The `Runtime` instance provides a convenience HTTP client via the [request](https://www.npmjs.com/package/@axway/api-builder-test-utils#async-runtimerequesthttpoptions) method, and the `got` module is no longer needed.

Previously, HTTP client requests using `got` would look similar to this:

```js
it('should be able to hit the healthcheck API', async () => {
  const response = await client.get('apibuilderPing.json', {
    responseType: 'json'
  });
  expect(response.statusCode).to.equal(200);
  expect(response.body).to.deep.equal({ success: true });
});
```

Now, they can be updated to use `runtime.test` and `runtime.request`:

```js
it('should be able to hit the healthcheck API', async () => {
  const runtime = new Runtime();
  await runtime.test(async () => {
    const response = await runtime.request({
      method: 'GET',
      path: 'apibuilderPing.json'
    });
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.deep.equal({ success: true });
  });
});
```

See [request](https://www.npmjs.com/package/@axway/api-builder-test-utils#async-runtimerequesthttpoptions) for more information on the HTTP client options and for more examples.

#### Remove `got`

The HTTP client library `got` is no longer needed and can be removed from the `devDependencies` in `package.json`, for example:

```text
"got": "^11.8.3",
```

Also, `got` can be removed from all the test files that `require` it. This can be removed:

```js
const got = require('got');
```

## Example

Here is a before-after example of the changes made to the default test file in new projects.

### Before

```js
const { expect } = require('chai');
const got = require('got');
const { startApiBuilder, stopApiBuilder } = require('./_base');
describe('APIs', function () {
  this.timeout(30000);
  let apibuilder;
  let client;

  /**
   * Start API Builder.
   */
  before(async () => {
    apibuilder = await startApiBuilder();
    const apikey = apibuilder.config.apikey;
    client = got.extend({
      prefixUrl: `http://localhost:${apibuilder.port}`,
      headers: {
        apikey,
        authorization: `Basic ${Buffer.from(apikey + ':').toString('base64')}`
      },
      throwHttpErrors: false
    });
  });

  /**
   * Stop API Builder after the tests.
   */
  after(() => stopApiBuilder(apibuilder));

  describe('Healthcheck', () => {
    it('should be able to hit the healthcheck API', async () => {
      const response = await client.get('apibuilderPing.json', {
        responseType: 'json'
      });
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.deep.equal({ success: true });
    });
  });
});
```

### After

```js
const { expect } = require('chai');
const { Runtime } = require('@axway/api-builder-test-utils');

describe('APIs', function () {
  this.timeout(30000);

  describe('Healthcheck', () => {
    it('should be able to hit the healthcheck API', async () => {
      const runtime = new Runtime();
      await runtime.test(async () => {
        const response = await runtime.request({
          method: 'GET',
          path: 'apibuilderPing.json',
          headers: {
            accept: 'application/json'
          }
        });
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.deep.equal({ success: true });
      });
    });
  });
});
```
