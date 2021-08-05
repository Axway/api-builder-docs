---
title: Best practices
linkTitle: Best practices
description: ADD A DESCRIPTION
weight: 30
date: 2021-06-22
---

{{% variables/apibuilder_prod_name %}} is a low-code / no-code developer application that you use to design and build a service using secure, modular, and re-usable components. When used correctly, it can be a very powerful useful tool in your organization. Below are a list of some suggestions to help you get the most out of {{% variables/apibuilder_prod_name %}}. For further reading on generic best practices for microservice development and deployment, be sure to check out the [twelve-factor app](https://12factor.net/) methodology, which this guide has borrowed from. If you have any questions or feedback, you can use [Axway's support portal](https://support.axway.com/).

## Codebase

	* Use version control.

	* For development, {{% variables/apibuilder_prod_name %}} requires access to an npm repository (or registry.npmjs.org mirror). We do not recommend using offline archives of dependencies.

	* Keep your application small, and with single responsibility. Smaller applications are easier to develop, debug, manage and understand.

	* Keep your codebase clean and remove things that you are not using (e.g. log files, flows, API, endpoints, models, etc.).

	* We recommend that {{% variables/apibuilder_prod_name %}} is developed on a local development machine. We do not recommend an "online" shared-server approach to development where {{% variables/apibuilder_prod_name %}} is installed on a machine that many developers access.

## Dependencies

	* Understand [semantic-versioning](https://semver.org/).

	* Understand [npm dependencies and dev-dependencies](https://lexi-lambda.github.io/blog/2016/08/24/understanding-the-npm-dependency-model/) and how to use them appropriately. By default, your {{% variables/apibuilder_prod_name %}} application is configured to get the latest features and patches on npm install/update.

	* Uninstall dependencies that you are not using. These add to bloat, make your application bigger, and slower to install.

	* Use security tools such as [npm-audit](https://docs.npmjs.com/cli/v6/commands/npm-audit) to ensure your dependencies do not contain any vulnerabilities. {{% variables/apibuilder_prod_name %}} uses [npm-audit](https://docs.npmjs.com/cli/v6/commands/npm-audit), Fortify, SonarQube, and WhiteSource to ensure code quality on our code and our dependencies.

	* Use [package-lock](https://docs.npmjs.com/cli/v6/configuring-npm/package-lock-json) or [shrinkwrap](https://docs.npmjs.com/cli/v6/commands/npm-shrinkwrap) when developing to ensure the same dependency tree.

	* If using package-lock then you should use the [npm ci](https://docs.npmjs.com/cli/v6/commands/npm-ci) command instead of [npm install](https://docs.npmjs.com/cli/v6/commands/npm-install) for faster installation.

## Configuring and securing your application

	* Separate config from code. Do not hard-code configuration parameters that will need to change in different environments, such as: hosts, URLs, credentials, timeouts, etc. Instead, manage configuration separately from your code. The easiest way is to use our [Environmentalization](#) guide. It is compatible with Docker.

	* Never hard-code credentials in the application. Use our [Authentication Schemes](/docs/developer_guide/project/configuration/authentication_schemes/) to learn how to configure authentication, our [Environmentalization](#) guide to learn how to use environment parameters, and our [Credentials](/docs/developer_guide/credentials/) guide for configuring credentials.

	* Never use a template (e.g. mustache, XSLT, doT) from an untrusted source. These can compromise your service's integrity.

	* Do not disable API [acessControl](/docs/developer_guide/project/configuration/project_configuration/) [security.](/docs/developer_guide/project/configuration/project_configuration/#accesscontrol)

	* Log at **info** level in production (for more information about logging modes, see [Logging](/docs/developer_guide/project/logging/)). Do not log sensitive information in at **info** level. Note that in development mode, {{% variables/apibuilder_prod_name %}} will log at **debug** level ( ![warning](/Images/warning.png) **this includes sensitive information**) for debug/development purposes.

## Design and develop

	* Decide on an API development strategy. {{% variables/apibuilder_prod_name %}} supports API first with drag-and-drop flow nodes (the recommended approach), [model](/docs/developer_guide/models/models_-_create/) approach (connecting to a DB and generating a rich CRUD API from existing tables and views), or a custom API approach (write a pure JS API, but we would advise against this approach).

	* If using API first approach, employ [Axway's API first philosophy](https://docs.axway.com/bundle/APIManagement_tutorial_allOS_en_HTML5/page/Content/tutorial/APIfirst.htm). This ensures that you design your API to suit the customer. {{% variables/apibuilder_prod_name %}} supports [Swagger 2.0 API definitions](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md) as the front-end API to your application. These can be used to define a rich customer-facing API documentation. Once defined, you can bind [Flows](https://wiki.appcelerator.org/display/guides2/Manage+Flows) to the existing Endpoints and use our drag-and-drop flow editor to implement your API.

	* From the UI, you can find many {{% variables/apibuilder_prod_name %}} plugins on **Plugins** page. These extend the capabilities of {{% variables/apibuilder_prod_name %}}. Be sure to check the available plugins for functionality before attempting to write your own implementation.

	* If you cannot find the capabilities you need on our **Plugins** page, you have a choice: use the [JavaScript flow-node](/docs/developer_guide/flows/flow-nodes/javascript_flow-node/) if it is a relatively simple fragment or if you need to produce a template, or use the [{{% variables/apibuilder_prod_name %}} SDK](/docs/developer_guide/sdk/) to write a custom flow-node that can be reused between your {{% variables/apibuilder_prod_name %}} services.

	* We recommend that you connect to external services using Swagger 2.0 and OAS 3.0 using our [@axway/api-builder-plugin-fn-swagger](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger) flow-node.

	* When implementing your Flows, ensure all outputs are handled (e.g. **Error**).

	* We recommend that you implement your API to be as fast as possible. If API calls take too long, these can tie up resources and lead to unexpected timeouts.

	* If API calls take too long, consider an [event-driven architecture](https://en.wikipedia.org/wiki/Event-driven_architecture) using [Flow-Triggers](/docs/developer_guide/flows/flow-triggers/) and a message queue plugin, such as [Solace](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-solace) or [Kafka](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka).

	* Strive to make your application stateless as much as possible. This improves speed, scalability, and robustness.

## Custom flow-node develoment

When writing code for the [JavaScript flow-node](/docs/developer_guide/flows/flow-nodes/javascript_flow-node/), or writing a custom flow-node using our [SDK](/docs/developer_guide/sdk/), we recommend the following:

	* Learn [JavaScript](https://developer.mozilla.org/en-US/docs/Web/Tutorials) and Node.js. Note that JavaScript in web browsers has differences compared to Node.js which has a slightly different API.

	* Use [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web) (MDN) for your JavaScript reference as it is a complete/accurate resource.

	* Use the [official Node.js documentation](https://nodejs.org/en/docs/) to see the features and behavior of the particular version of Node.js that you are using. Some parameters that you provide to {{% variables/apibuilder_prod_name %}} may be configuring Node.js features.

	* Learn modern JavaScript [ES6](https://exploringjs.com/es6/) (ECMAScript 6) and higher ([there's new features every year](https://tc39.es/ecma262/)!) as this will save you time and make your code easier to maintain and super-charge your Flow development. Note that the supported features are down to the version of Node.js that you are using. Check [node.green](https://node.green) for ECMAScript feature support.

	* Do not mix tabs and spaces - this will drive people crazy. Your initial {{% variables/apibuilder_prod_name %}} project's files are all tab based. Pick one, and stick with it.

	* Use a linter to ensure code conformity and bug detection (we recommend [eslint](https://eslint.org/)).

	* We recommend [mocha](https://www.npmjs.com/package/mocha) for your unit-tests.

	* We recommend [simple-mock](https://www.npmjs.com/package/simple-mock) to mock interfaces you don't need to test (e.g. [fs](https://nodejs.org/api/fs.html)) or that you wish to force errors.

	* We recommend [nyc](https://github.com/istanbuljs/nyc) for calculating code-coverage (we strive for 100% coverage).

## Testing your application

	* Write unit-tests for all API endpoints and run them as part of your CI (in the `./tests` directory, you will find examples of how to test the example Greet endpoint). We recommend [mocha](https://www.npmjs.com/package/mocha).

	* Learn how to [debug a flow](/docs/how_to/debug_a_flow/)[.](/docs/how_to/debug_a_flow/)

	* Use [curl](https://www.npmjs.com/package/curl) or [postman](https://www.postman.com/) for bespoke API requests.

	## Production

	* [Secured with TLS](/docs/security_guide/) or SSL termination (depending on deployment architecture).

	* Use [docker](https://docs.docker.com/get-started/) to [containerize your application](/docs/how_to/dockerize_an_api_builder_service/)[.](/docs/how_to/dockerize_an_api_builder_service/)

	* Use security tools to scan your containers to ensure they do not have open ports or security vulnerabilities.

	* Use npm install with the `--production` flag.

	* Use [kubernetes](https://kubernetes.io/) for [scaling](https://kubernetes.io/blog/2016/07/autoscaling-in-kubernetes/), and [auto-healing](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-lifetime).

	* We recommend you use docker and not run as a stand-alone service (e.g. as opposed to running on a VM) so that it can be managed and scaled efficiently.

	* We recommend that you use [API Central](https://www.axway.com/en/platform/central) if you need to expose your service to the Internet.

	* Set [NODE_ENV=production](https://expressjs.com/en/advanced/best-practice-performance.html) in the environment for security and performance.

## Managing your service

	* The health of your service can be monitored via the health-check API `/apibuilderPing.json`

	* The health of your Docker container is monitored via [HEALTHCHECK](https://docs.docker.com/engine/reference/builder/#healthcheck) and uses `./healthcheck.js` to periodically ping the health-check API `/apibuilderPing.json`

	* If flow-triggers become unhealthy (e.g. such as an inability to contact Kafka or Solace), your service will shut down as part of best-practices for fault-tolerant microservice architecture so that it can [self-heal and auto-restart](https://blog.risingstack.com/designing-microservices-architecture-for-failure/#selfhealing). If you are not using Docker/Kubernetes in production, then you will need to employ a process manager (e.g. [pm2](https://pm2.keymetrics.io/)).

## Maintaining your service

	* Use the latest, fully-patched version of node that we support (see our [Getting Started Guide](/docs/getting_started_with_api_builder/) and [{{% variables/apibuilder_prod_name %}} Node.js support policy](/docs/node.js_support_policy/) for version restrictions).

	* Keep your dependencies up to date with their latest patches.

	* Every two weeks, Axway {{% variables/apibuilder_prod_name %}} releases new features, patches, and security fixes. You should keep an eye on our [Release Notes](/docs/release_notes/) and list of [Deprecations](/docs/deprecations/). Keep abreast of the updates to ensure your application will be compatible with any change(s) that may be introduced. Occasionally, you may want to incorporate these security updates and fixes into your application.
