---
title: >-
  2021-12-10 Replace the request dev-dependency in project unit tests
weight: 40
date: 2021-12-10
---

2021-12-10 Replace the request dev-dependency in project unit tests

## Why are we making this change

In the [Caracas](/docs/release_notes/caracas) release of {{% variables/apibuilder_prod_name %}}, we released a new major version of the [{{% variables/apibuilder_prod_name %}} CLI](/docs/developer_guide/cli). This version removes the dependency on [`request`](https://www.npmjs.com/package/request) in new projects. While `request` is still fully functional, the library has been deprecated and has a [CVE](https://nvd.nist.gov/vuln/detail/CVE-2021-3918) reported against one of it dependencies. Note that `request` itself does not make use of the vulnerable code, but security scans will still emit warnings.

In the new version of the CLI, new projects are now created which have a dependency of [`got`](https://www.npmjs.com/package/got) instead of `request`. This dependency is used for making HTTP requests to {{% variables/apibuilder_prod_name %}} to test APIs in unit tests.

## How does this impact my service

While there is no direct vulnerability to any production code, security scans on your project may report a CVE against `request`, as well as a warning that the module has been deprecated and has not been updated in over 2 years. While we can modify the implementation and dependencies of API Builder, we cannot change the direct dependencies of your project such as this during an upgrade, and updates such as this are the developer's responsibility to update and modify as required.
While there is no direct vulnerability to any production code, security scans on your project may report a CVE against `request`, as well as a warning that the module has been deprecated and has not been updated in over 2 years. While we can modify the implementation and dependencies of API Builder, we cannot change the direct dependencies of your project such as this during an upgrade, and updates such as this are the developer's responsibility to update and modify as required.

While we chose `got` as a replacement for `request` in new projects, and the following section describes how to modify your project to use it, `got` is not a hard requirement. You can choose to write your tests in the way which works best for you, using any available library.

## Upgrade existing services

If you do no use the unit test framework included in your project (`npm test`) then you can safely clear the security warnings from your project by removing the dependency on `request` from your project by running the following command from your project directory:

```bash
npm uninstall request
```

If you have not written any unit tests yet but would like to, we recommend installing the latest version of the CLI and creating a new project, then copying the `/test` directory from the new project into your existing project, replacing the existing directory. Finally, run the following commands to replace the dependency on`request` with `got` version 11 (which the new tests use).

```bash
npm uninstall request
npm install got@11
```

Note: This version of `got` requires at least Node.js 10.19. If you're developing your project on an older version of Node.js we strongly recommend upgrading to at least {{% variables/recommended_node %}}.

If you are making use of the the unit test framework then you will want to follow the following guidelines. Note that you should read the `got` documentation to learn the full capabilities and API of the library.
