---
title: >-
  2021-12-17 Replace the request dev-dependency in project unit tests
weight: 40
date: 2021-12-17
---

2021-12-10 Replace the request dev-dependency in project unit tests

## Why are we making this change

In the [Caracas](/docs/release_notes/caracas) release of {{% variables/apibuilder_prod_name %}}, we released a new major version of the [{{% variables/apibuilder_prod_name %}} CLI](/docs/developer_guide/cli). This version removes the dependency on [`request`](https://www.npmjs.com/package/request) in new projects. While `request` is still fully functional, the library has been deprecated and has a [CVE](https://nvd.nist.gov/vuln/detail/CVE-2021-3918) reported against one of it dependencies. Note that `request` itself does not make use of the vulnerable code, but security scans will still emit warnings.

We made a breaking change to the CLI, upgrading it to the latest version of the [{{% variables/company_name.md }} CLI](https://docs.axway.com/bundle/axwaycli-open-docs/page/docs/index.html), v3.1.0, and requires the minimum Node.js (>= 12.17). In the new version of the CLI, new projects are now created which have a dependency of [`got`](https://www.npmjs.com/package/got) instead of `request`. This dependency is used for making HTTP requests to {{% variables/apibuilder_prod_name %}} to test APIs in unit tests.

## How does this impact my service

This update is optional. While there is no direct vulnerability to any production code, security scans on your project may report a CVE against `request`, as well as a warning that the module has been deprecated and has not been updated in over 2 years. While we can modify the implementation and dependencies of API Builder, we cannot change the direct dependencies of your project such as this during an upgrade, and updates such as this are the developer's responsibility to update and modify as required.

While we chose `got` as a replacement for `request` in new projects, `got` is not a hard requirement. You can choose to write your tests in the way which works best for you, using any available library. The following section describes how to modify your project to use it.

## Upgrade existing services

### If your application does not use "npm test"

If you do no use the unit test framework included in your project (`npm test`), then you can safely clear the security warnings from your project by removing the dependency on `request` from your project by running the following command from your project directory:

```bash
npm uninstall request
```

### If your application has "npm test" but have not update it yet

If you have not written any unit tests or changed any of the existing test, but would like to make use of `npm test`, then we recommend installing the latest version of the CLI and creating a new project, then copy the new `/test` directory from the new project into your existing project (`existing-project`), replacing the existing directory. Finally, then uninstall `request` and install `got` version 11.x (which the new tests use).

```bash
axway builder init new-project --no-install
cp -R new-project/test existing-project/test
cd existing-project
npm uninstall request
npm install got@11
```

{{%/* alert title="Note" */%}}
Note: This version of `got` requires at least Node.js 10.19. If you're developing your project on an older version of Node.js we strongly recommend upgrading to at least {{% variables/recommended_node %}}.
{{%/* /alert */%}}

### If your application uses "npm test"

If you are making use of the the unit test framework, then you will want to follow the following guidelines as your own changes to the test framework can be very different. You should read the `got` [documentation](https://github.com/sindresorhus/got/blob/HEAD/documentation/1-promise.md) to learn the full capabilities and API of the library.

Copy `_base.js` from a new project into your existing project (`existing-project`). It contains improvements to how the unit test framework is started / stopped.

```bash
axway builder init new-project --no-install
cp -R new-project/test/_base.js existing-project/test/_base.js
```

We would suggest that you get familiar with the changes to the `new-project` test framework before trying to apply changes in the following sections to your `existing-project`.

#### Use got instead

We've delete `requestAsync`, so if your test file has the following, replace it with `got`:
```js
const { startApiBuilder, stopApiBuilder, requestAsync } = require('./_base');
```

Change it to:
```js
const got = require('got');
const { startApiBuilder, stopApiBuilder } = require('./_base');
```

Then, somewhere in your test, for example, in the `before` script, you need to configure `got` with your URL and apiPrefix security credentials, for example:

```js
  client = got.extend({
    prefixUrl: 'http://localhost:8080',
    username: apikey,
    password: '',
    headers: { apikey },
    throwHttpErrors: false
  });
```

Later, in your test code, you can make use of the `client`, so if you see the old `requestAsync`:

```js
return requestAsync({
  method: 'GET',
  uri: `http://localhost:${server.apibuilder.port}/api/testapi/${user.getPrimaryKey()}`,
  auth: auth,
  json: true
});
```

You can replace it with the `got` client:

```js
const response = await client.get(`api/testapi/${user.getPrimaryKey()}`, {
  responseType: 'json'
});
```

Be aware that your unit tests need to use `async`:

```js
it('[API-0002] should be able to hit testapi via http', async () => {
```

#### Server startup

The server startup with `startApiBuilder` has changed.  It will `await` server startup, and _then_ return a server instance of `APIBuilder`.  So, if your test file has the following:
```js
  before(() => {
    server = startApiBuilder();
    // etc...
  }
```

Change it to:
```js
  before(async () => {
    server = await startApiBuilder();
    // stuff...
  }
```

There is no longer a `server.started` promise, so you no longer need this:

```js
  return server.started.then(
    () => new Promise((resolve, reject) => {
      server.apibuilder.getModel('testuser').create(
        // etc...
      );
    });
  );
```

You can change to this:

```js
  return new Promise((resolve, reject) => {
    server.getModel('testuser').create(
      // etc...
    );
  });
```

In the last example, you may have noticed that there is also no longer a `server.apibuilder` property, it is just `server`, so if you see this:

```js
server.apibuilder.getModel('testuser')
```

You need to change to this:

```js
server.getModel('testuser')
```
