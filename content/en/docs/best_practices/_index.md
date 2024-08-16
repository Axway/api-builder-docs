---
title: Best practices
linkTitle: Best practices
weight: 30
date: 2021-10-01
---

{{% variables/apibuilder_prod_name %}} is a low-code / no-code developer application that you use to design and build a service using secure, modular, and reusable components. When used correctly, it can be a very powerful useful tool in your organization. Below are a list of some suggestions to help you get the most out of {{% variables/apibuilder_prod_name %}}. For further reading on generic best practices for microservice development and deployment, be sure to check out the [twelve-factor app](https://12factor.net/) methodology, which this guide has borrowed from. If you have any questions or feedback, you can use [Axway's support portal](https://support.axway.com/).

## Codebase

* Use version control.
* For development, {{% variables/apibuilder_prod_name %}} requires access to an npm repository (or registry.npmjs.org mirror). We do not recommend using offline archives of dependencies.
* Keep your application small, and with single responsibility. Smaller applications are easier to develop, debug, manage and understand.
* Keep your codebase clean and remove things that you are not using (e.g. log files, flows, API, endpoints, models, etc.).
* We recommend that {{% variables/apibuilder_prod_name %}} is developed on a local development machine. We do not recommend an "online" shared server approach to development where {{% variables/apibuilder_prod_name %}} is installed on a machine that many developers access.

## Dependencies

* Understand [semantic versioning](https://semver.org/).
* Understand [npm dependencies and dev dependencies](https://lexi-lambda.github.io/blog/2016/08/24/understanding-the-npm-dependency-model/) and how to use them appropriately. By default, your {{% variables/apibuilder_prod_name %}} application is configured to get the latest features and patches on npm install/update.
* Uninstall dependencies that you are not using. These add to bloat, make your application bigger, and slower to install.
* All Axway software is developed under a Secure Software Development Lifecycle; therefore, the agents undergo regular security analysis. See [Axway’s Security Statement](https://www.axway.com/en/customers/axway-security-statement) for an overview of the Axway security framework and security tools.
* Use [package-lock](https://docs.npmjs.com/cli/v6/configuring-npm/package-lock-json) or [shrinkwrap](https://docs.npmjs.com/cli/v6/commands/npm-shrinkwrap) when developing to ensure the same dependency tree. This will be created by default in up-to-date versions of npm.
* If using package-lock then you should use the [npm ci](https://docs.npmjs.com/cli/v6/commands/npm-ci) command instead of [npm install](https://docs.npmjs.com/cli/v6/commands/npm-install) in Docker or for faster installation.

## Decide your architecture

Before you develop an {{% variables/apibuilder_prod_name %}} service, you should consider your architecture. You can refer to our [Performance Metrics Guide](/docs/performance_metrics/) for some idea about capacity planning, but {{% variables/apibuilder_prod_name %}} is fast, and will most likely be inhibited by other backend systems, such as your legacy API services or databases. You need to understand the performance of your backend systems and calculate how many requests you expect your {{% variables/apibuilder_prod_name %}} service to handle. You must ensure that your backend systems are also scalable to handle the target workload.

For this reason, you need to decide which architecture is best suited for your constraints. For example, if you develop a REST API that communicates to backend systems and it returns in less than 2 seconds, then a [RESTful architecture](https://restfulapi.net/rest-architectural-constraints/) may be suitable. However, if your backend takes a long time (e.g. 10 seconds) to respond, that is a serious bottleneck. If your constraints are such that you cannot scale the backend system, then an [Asynchronous architecture](https://aws.amazon.com/blogs/architecture/managing-asynchronous-workflows-with-a-rest-api/) may be more suitable.

{{% variables/apibuilder_prod_name %}} supports several architectures:

* [RESTful architecture](https://restfulapi.net/rest-architectural-constraints/)
* [Asynchronous REST API](https://aws.amazon.com/blogs/architecture/managing-asynchronous-workflows-with-a-rest-api/)
* [Event-driven architecture](https://en.wikipedia.org/wiki/Event-driven_architecture) using [flow-triggers](/docs/developer_guide/flows/flow_triggers) and a message queue plugin, such as [Solace](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-solace) or [Kafka](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka).

## Configuring and securing your application

* Separate config from code. Do not hard-code configuration parameters that will need to change in different environments, such as: hosts, URLs, credentials, timeouts, etc. Instead, manage configuration separately from your code. The easiest way is to use our [Environmentalization](https://docs.axway.com/bundle/api-builder-security-guide/page/environmentalization.html) guide. It is compatible with Docker.
* Never hard-code credentials in the application. Use our [Authentication Schemes](/docs/developer_guide/project/configuration/authentication_schemes/) to learn how to configure authentication, our [Environmentalization](https://docs.axway.com/bundle/api-builder-security-guide/page/environmentalization.html) guide to learn how to use environment parameters, and our [Credentials](/docs/developer_guide/credentials/) guide for configuring credentials.
* Never use a template (e.g. mustache, XSLT, doT) from an untrusted source. These can compromise your service's integrity.
* Do not disable API [acessControl](/docs/developer_guide/project/configuration/project_configuration/) [security.](/docs/developer_guide/project/configuration/project_configuration/#accesscontrol)
* Log at **info** level in production (for more information about logging modes, see [Logging](/docs/developer_guide/project/logging/)). Do not log sensitive information at **info** level. Note that by default in development mode, {{% variables/apibuilder_prod_name %}} will log at **debug** level ( ![warning](/Images/warning.png) **this includes sensitive information**) for debug/development purposes. This is controlled via /conf/.env.

## Design and develop

Each time you [create a new {{% variables/apibuilder_prod_name %}} project](/docs/getting_started/), and run "npm install", you will pull the latest of our software, and the modules on which we depend. This ensures that you have all the latest features and security updates before you design your {{% variables/apibuilder_prod_name %}} service. Your service should be a microservice, and kept as small as possible (see [Microservice Design Ideals](https://www.infoq.com/articles/microservices-design-ideals/)). During development, you will design your flows, and undoubtedly add [flow-node](/docs/developer_guide/flows/flow_nodes) plugins, or [flow-trigger](/docs/developer_guide/flows/flow_triggers) plugins.

During development, you should follow our [Best Practices Guide](/docs/best_practices/), and [Security Guide](https://docs.axway.com/bundle/api-builder-security-guide/page/api_builder_security_guide.html). It is important to develop a robust set of unit-tests (see ./tests for examples of how to write [mocha](https://mochajs.org/) tests) to ensure that your application is also compatible with the systems on which it depends, and those systems that also depend on it. This is key to the start of a healthy lifecycle as it enables you to confidently accept important updates and fixes.

At this stage, you will probably want to choose to lock down your dependencies (see [package-lock](https://docs.npmjs.com/cli/v7/configuring-npm/package-lock-json) and [shrinkwrap](https://docs.npmjs.com/cli/v7/configuring-npm/npm-shrinkwrap-json)). In short, package-lock describes the exact dependency tree that was generated, and subsequent installs are able to generate identical trees. You are unlikely to publish your project to an npm repository, and your project will most likely exist in a git repository and bundled for production (e.g. using [Docker](/docs/how_to/dockerize_an_api_builder_service/)), so for those reasons, a package-lock would be adequate. You can check this file into git, and keep it up to date.

When developing your {{% variables/apibuilder_prod_name %}} service, you should also build out a Continuous Integration (CI) to build and test your service. In CI, you should use "[npm ci](https://docs.npmjs.com/cli/v7/commands/npm-ci)" instead of "npm install" as it will use the package-lock, and will be significantly faster.

During development, follow these general principles:

* Decide on an API development strategy. {{% variables/apibuilder_prod_name %}} supports API first with drag-and-drop flow-nodes (the recommended approach), [model](/docs/developer_guide/models/create/) approach (connecting to a DB and generating a rich CRUD API from existing tables and views), or a custom API approach (write a pure JS API, but we would advise against this approach).
* If using API first approach, employ [Axway's API first philosophy](https://docs.axway.com/bundle/APIManagement_tutorial_allOS_en_HTML5/page/Content/tutorial/APIfirst.htm). This ensures that you design your API to suit the customer. {{% variables/apibuilder_prod_name %}} supports [Swagger 2.0 API definitions](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md) as the front-end API to your application. These can be used to define a rich customer-facing API documentation. Once defined, you can bind [Flows](https://wiki.appcelerator.org/display/guides2/Manage+Flows) to the existing Endpoints and use our drag-and-drop flow editor to implement your API.
* From the UI, you can find many {{% variables/apibuilder_prod_name %}} plugins on **Plugins** page. These extend the capabilities of {{% variables/apibuilder_prod_name %}}. Be sure to check the available plugins for functionality before attempting to write your own implementation.
* If you cannot find the capabilities you need on our **Plugins** page, you have a choice: use the [JavaScript flow-node](/docs/developer_guide/flows/flow_nodes/javascript_flow_node/) if it is a relatively simple fragment or if you need to produce a template, or use the [{{% variables/apibuilder_prod_name %}} SDK](/docs/developer_guide/sdk/) to write a custom flow-node that can be reused between your {{% variables/apibuilder_prod_name %}} services.
* We recommend that you connect to external services using Swagger 2.0 and OpenAPI 3.0 using our [@axway/api-builder-plugin-fn-swagger](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger) flow-node.
* When implementing your Flows, ensure all outputs are handled (e.g. **Error**).
* We recommend that you implement your API to be as fast as possible. If API calls take too long, these can tie up resources and lead to unexpected timeouts.
* Strive to make your application stateless as much as possible. This improves speed, scalability, and robustness.

## Custom flow-node development

When writing code for the [JavaScript flow-node](/docs/developer_guide/flows/flow_nodes/javascript_flow_node/), or writing a custom flow-node using our [SDK](/docs/developer_guide/sdk/), we recommend the following:

* Learn [JavaScript](https://developer.mozilla.org/en-US/docs/Web/Tutorials) and Node.js. Note that JavaScript in web browsers has differences compared to Node.js which has a slightly different API.
* Use [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web) (MDN) for your JavaScript reference as it is a complete/accurate resource.
* Use the [official Node.js documentation](https://nodejs.org/en/docs/) to see the features and behavior of the particular version of Node.js that you are using. Some parameters that you provide to {{% variables/apibuilder_prod_name %}} may be configuring Node.js features.
* Learn modern JavaScript [ES6](https://exploringjs.com/es6/) (ECMAScript 6) and higher ([there's new features every year](https://tc39.es/ecma262/)!) as this will save you time and make your code easier to maintain and super-charge your Flow development. Note that the supported features are down to the version of Node.js that you are using. Check [node.green](https://node.green) for ECMAScript feature support.
* Do not mix tabs and spaces - this will drive people crazy. Your initial {{% variables/apibuilder_prod_name %}} project's files are all tab based. Pick one, and stick with it.
* Use a linter to ensure code conformity and bug detection (we recommend [eslint](https://eslint.org/)).
* We recommend [mocha](https://www.npmjs.com/package/mocha) for your unit-tests.
* We recommend [simple-mock](https://www.npmjs.com/package/simple-mock) to mock interfaces you do not need to test (e.g. [fs](https://nodejs.org/api/fs.html)) or that you wish to force errors.
* We recommend [nyc](https://github.com/istanbuljs/nyc) for calculating code coverage (we strive for 100% coverage).

## Testing your application

* Write unit-tests for all API endpoints and run them as part of your CI (in the `./tests` directory, you will find examples of how to test the example Greet endpoint). We recommend [mocha](https://www.npmjs.com/package/mocha).
* Learn how to [debug a flow](/docs/how_to/debug_a_flow/)[.](/docs/how_to/debug_a_flow/)
* Use [curl](https://www.npmjs.com/package/curl) or [postman](https://www.postman.com/) for bespoke API requests (if you want, you can use [postman for regression testing](/docs/how_to/use_postman_tests_as_api_builder_regression_tests/)).

## Tuning performance

* Log at ERROR or INFO level only.
* If you are not serving static files and you have a ./web directory, you can delete it to gain extra performance.
* Disable [Content-MD5 and ETag](/docs/developer_guide/project/configuration/project_configuration/#http) headers if your clients are not using them.
* Use a memory model to cache responses from frequent and identical backend calls for things that will not change frequently (e.g. to query a list of Countries).
* JSON encoding is expensive, so do not wrap large XML, Base64 or binary Buffer in JSON responses unless you have to.

## Production

* Log at ERROR or INFO level only.
* [Secured with TLS](https://docs.axway.com/bundle/api-builder-security-guide/page/enabling_tls_ssl.html) or SSL termination (depending on deployment architecture).
* Use [Docker](https://docs.docker.com/get-started/) to [containerize your application](/docs/how_to/dockerize_an_api_builder_service/)[.](/docs/how_to/dockerize_an_api_builder_service/)
* Use security tools to scan your containers to ensure they do not have open ports or security vulnerabilities.
* Use npm install with the `--production` flag.
* Use [kubernetes](https://kubernetes.io/) for [scaling](https://kubernetes.io/blog/2016/07/autoscaling-in-kubernetes/), and [auto-healing](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-lifetime).
* We recommend you use Docker and not run as a stand-alone service (e.g. as opposed to running on a VM) so that it can be managed and scaled efficiently.
* We recommend that you use [API Central](https://www.axway.com/en/platform/central) if you need to expose your service to the Internet.
* Set [NODE_ENV=production](https://expressjs.com/en/advanced/best-practice-performance.html) in the environment for security and performance.

## Managing your service
* The health of your Docker container is monitored via [HEALTHCHECK](https://docs.docker.com/engine/reference/builder/#healthcheck) and uses `./healthcheck.js` to periodically ping the health check API `/apibuilderPing.json`
* If flow-triggers become unhealthy (e.g. such as an inability to contact Kafka or Solace), your service will shut down as part of best practices for fault-tolerant microservice architecture so that it can [self-heal and auto-restart](https://blog.risingstack.com/designing-microservices-architecture-for-failure/#selfhealing). If you are not using Docker/Kubernetes in production, then you will need to employ a process manager (e.g. [pm2](https://pm2.keymetrics.io/)).

## Maintaining your service

{{% variables/apibuilder_prod_name %}} is an [Express](https://expressjs.com/) application that provides a pluggable, drag-and-drop user interface with which to design complex flows. It is built with the help of many open source [npm](https://www.npmjs.com/) modules. But that software is not free. Axway invests in open source, and we do that by supporting the software that supports us. While we do not own many of the [npm](https://www.npmjs.com/) modules on which we depend, we regularly submit defects, help debug issues, and submit merge requests to these modules. In that way, [npm](https://www.npmjs.com/) is a healthy community where we support each other to make things better. Researchers regularly pour over these modules and sometimes find security issues. Before making them public, the owners of the modules have an opportunity to make a patch. When the patch is released, a public Common Vulnerabilities and Exposures (CVE) notice is created with the effected module(s) and version(s). We find and remediate these CVE regularly.

Every two weeks, {{% variables/apibuilder_prod_name %}} releases new features, patches, and sometimes security fixes. In addition, because it is using other dependencies from [npm](https://www.npmjs.com/), they too many have features, patches and security fixes. Before release, our software is rigorously regression tested, as well as undergo regular security analysis. See [Axway’s Security Statement](https://www.axway.com/en/customers/axway-security-statement) for an overview of the Axway security framework and security tools.

For these reasons, to maintain a healthy service, it is important to update your services regularly.

* Use the latest, fully patched version of node that we support (see our [Getting Started Guide](/docs/getting_started) and [{{% variables/apibuilder_prod_name %}} Node.js support policy](/docs/nodejs_support_policy) for version restrictions).
* Keep your dependencies up to date with their latest patches.
* Every two weeks, Axway {{% variables/apibuilder_prod_name %}} releases new features, patches, and security fixes. You should keep an eye on our [Release Notes](/docs/release_notes), our list of [Deprecations](/docs/deprecations), and our [Updates](/docs/updates). Keep abreast of the updates to ensure your application will be compatible with any change(s) that may be introduced. Occasionally, you may want to incorporate these security updates and fixes into your application.

## Accessing your service
* The health of your service can be monitored via the health check API `/apibuilderPing.json`
* Links to all the API documentation for your service can be found at `/apidocs`. 

### API Discoverability
With API-first development, {{% variables/apibuilder_prod_name %}} services can implement and expose multiple independent API documents on different URLs. These URLs are not always predictable. Starting with the [Nantes](/docs/release_notes/nantes) release, {{% variables/apibuilder_prod_name %}} services expose an API on the [apidoc prefix](/docs/developer_guide/project/configuration/project_configuration#apidoc) (`/apidoc`) for discovering all API documents and their URLs.

This is an example of the API discoverability response format:

```jsonc
{
  // API discoverability response format version
  "version": "1.0",
  // Specification types
  "types": {
    // Array of individual OpenAPI documents
    "openapi": [
      {
        // document id
        "id": "dynamic",
        // document version [optional]
        "version": "1.0.0",
        // document name
        "name": "project",
        // document description
        "description": "An {{% variables/apibuilder_prod_name %}} service",
        // document links.
        "links": [
          {
            // the URL of the document
            "url": "http://localhost:8080/apidoc/swagger.json",
            // the mime-type of the document [optional]
            "mimeType": "application/json",
            // the version of the specification used by this document (i.e. OpenAPI 2.0) [optional]
            "specificationVersion": "2.0"
          },
          {
            "url": "http://localhost:8080/apidoc/swagger.yaml",
            "mimeType": "text/yaml",
            "specificationVersion": "2.0"
          }
        ]
      }
    ]
  }
}

```
