---
title: Update project unit tests to use @axway/api-builder-test-utils
date: 2022-08-26
---

## Why are we making this change

In the [Unna](/docs/release_notes/unna/) release, we introduced a new `Project` utility in [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils) to reduce the amount of code that users have to manage in their project unit tests. When this feature is used, it allows us to provide unit test optimisations for new {{% variables/apibuilder_prod_name %}} Core features through regular updates without users having to make manual changes such as this one to receive them.

## How does this impact my service

To benefit from this feature, existing project's unit tests must be modified as described below. Once the modifications have been made, future updates to [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils) will be able to be seen from the **Updates** tab.

New projects have this feature enabled by default.

## Upgrade existing services

This feature requires the [Tauranga](/docs/release_notes/unna/) release of {% variables/apibuilder_prod_name %}} Core, so ensure you have installed all updates before continuing. This guide also assumes you have followed the previous update outlined in [Replace the request dev-dependency in project unit tests](/docs/updates/2021_12_17_update_to_remove_request_module)

### Install @axway/api-builder-test-utils

Install [@axway/api-builder-test-utils](https://www.npmjs.com/package/@axway/api-builder-test-utils) (at least 1.6.0) as a dev-dependency to your project.

```bash
npm install @axway/api-builder-test-utils@1.6.0 --save-dev
```

### Import @axway/api-builder-test-utils

Within your unit tests, you will be replacing references to `_base`, `startApiBuilder` and `stopApiBuilder`.

Find and replace following line to import `@axway-api-builder-test-utils` into your unit tests:
```javascript
const { startApiBuilder, stopApiBuilder } = require('./_base');
```
New code:
```javascript
const { Runtime } = require('@axway/api-builder-test-utils');
```

### Replace startApiBuilder with Runtime
Within inside `describe`, replace `let apibuilder` with `let runtime`.
Now, replace `startApiBuilder` and `apikey`:
```javascript
apibuilder = await startApiBuilder();
const apikey = apibuilder.config.apikey;
```
New code:
```javascript
runtime = new Runtime();
const apikey = runtime.server.config.apikey;
```

If there is code referencing `apibuilder.port`, replace it with `runtime.server.port`.

### Remove stopApiBuilder

Delete the following code:

```javascript
/**
 * Stop API Builder after the tests.
 */
after(() => stopApiBuilder(apibuilder));
```

### Update assertions
The new code will encapsulate each of your tests in an individual run of API Builder, ensuring any failure will shut down the server rather than leaving it running in the background causing future tests to fail.

You should wrap existing assertions that require a running server within `runtime.test`. The following assertion is an example:

```javascript
it('should assert something', async () => {
	expect(example).to.equal(true);;
});
```

New code:
```javascript
it('should assert something', async () => {
	await runtime.test(async () => {
		expect(example).to.equal(true);
	});
});
```

Finally, `/test/_base.js` should now be no longer used, so delete the file from your project.

## Example
Here is a before-after example of the changes made to the default test file in new projects.

### Before

```javascript
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

```javascript
const { expect } = require('chai');
const got = require('got');
const { Runtime } = require('@axway/api-builder-test-utils');

describe('APIs', function () {
	this.timeout(30000);
	let runtime;
	let client;

	before(async () => {
		runtime = new Runtime();
		const apikey = runtime.server.config.apikey;
		const port = runtime.server.port;
		client = got.extend({
			prefixUrl: `http://localhost:${port}`,
			headers: {
				apikey,
				authorization: `Basic ${Buffer.from(apikey + ':').toString('base64')}`
			},
			throwHttpErrors: false
		});
	});

	describe('Healthcheck', () => {
		it('should be able to hit the healthcheck API', async () => {
			await runtime.test(async () => {
				const response = await client.get('apibuilderPing.json', {
					responseType: 'json'
				});
				expect(response.statusCode).to.equal(200);
				expect(response.body).to.deep.equal({ success: true });
			});
		});
	});
});
```
