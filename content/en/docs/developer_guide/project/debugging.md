---
title: Debugging
linkTitle: Debugging
weight: 40
date: 2021-10-01
---

## Application logging

The first step to debugging your application is to enable an appropriate level of logging. {{% variables/apibuilder_prod_name %}} logs to the terminal console window, and the logging can be controlled by editing `conf/default.js` (search for "logLevel"), or by setting an environment variable LOG_LEVEL. If you encounter a problem with {{% variables/apibuilder_prod_name %}}, you should inspect the terminal console window. If necessary, decrease the logging level to "trace" to gather more `information`.

{{% alert title="Note" color="primary" %}}For more information on logging, please [see this guide](/docs/developer_guide/project/logging/).{{% /alert %}}

The following levels are listed below from most-verbose to least-verbose. In {{% variables/apibuilder_prod_name %}}, messages are logged at specific levels according to a fixed log level. When you set logging to a specific level, messages at that level and higher will be logged.

| Log level |  |
| --- | --- |
| trace | Detailed verbose logging. |
| debug | Assists with debugging, especially Flows. |
| info | Mostly, request/response logging. |
| warn | Warning messages. |
| error | Error messages. |
| fatal | Fatal messages. |
| none | Disable logging. |

While in development, you may want to log at "debug" level to assist in [debugging flows](/docs/how_to/debug_a_flow/). However, in production, you will want much less logging, e.g. info or higher. To set your logging, edit `conf/default.js` and change the `logLevel` .

```javascript
// conf/default.js

// Log level of the application. Can be set to (in order of most-verbose to
// least): trace, debug, info, warn, error, fatal, none
logLevel: process.env.LOG_LEVEL || 'info',
```

### LOG_LEVEL environment variable

You can set the {{% variables/apibuilder_prod_name %}} log level via the LOG_LEVEL environment variable from the console, without having to edit conf/default.js.

{{% alert title="Note" color="primary" %}}For more information about using environment variables within your application and securing your application, please see [Environmentalization](/docs/how_to/environmentalization/).{{% /alert %}}

#### On bash

```bash
LOG_LEVEL=trace npm start
```

#### On Windows

```cmd
SET LOG_LEVEL=trace
npm start
```

#### On Amplify Runtime Services

{{% alert title="Note" color="primary" %}}Amplify Runtime Services is deprecated and will be discontinued effective September 1, 2022.{{% /alert %}}

If you are deploying {{% variables/apibuilder_prod_name %}} on [Amplify Runtime Services](/docs/how_to/deploy_an_api_builder_application_to_amplify_runtime_services/).

```bash
amplify acs config --set LOG_LEVEL=trace myproject
```

#### On Docker

If you are deploying {{% variables/apibuilder_prod_name %}} [using Docker](/docs/how_to/dockerize_an_api_builder_service/).

```bash
docker run -e LOG_LEVEL=trace
```

### Additional logging

If changing the logging level (see above) does not yield enough information, sometimes there are ways to enable additional module-specific logging. Some modules use an independent logging mechanism and different environment variables. Examples are given using the bash style.

#### DEBUG environment variable

Many modules use the [Node.js debug package](https://www.npmjs.com/package/debug) (see for more information), which can be controlled using the DEBUG environment variable. For example, Express.js.

```bash
$ DEBUG=express:router npm start
```

#### Module @axway/api-builder-plugin-dc-mssql

The Microsoft SQL Server plugin uses [knex](https://www.npmjs.com/package/knex).

```bash
$ DEBUG=knex:* npm start
```

#### Module @axway/api-builder-plugin-dc-mysql

The MySQL plugin uses [mysql](https://www.npmjs.com/package/mysql).

```bash
$ DEBUG=knex:* npm start
```

#### Module @axway/api-builder-plugin-dc-oracle

The Oracle plugin uses [oracledb](https://www.npmjs.com/package/oracledb) and it has their own [debugging](https://oracle.github.io/odpi/doc/user_guide/debugging.html).

```bash
$ DPI_DEBUG_LEVEL=64 npm start
```

## Using a debugger

Sometimes, debugging can yield valuable information. In particular, if you are developing [custom API](/docs/developer_guide/apis/) or writing your own [flow-nodes](/docs/how_to/create_a_custom_flow_node/) using the [{{% variables/apibuilder_prod_name %}} SDK](#), it is an invaluable tool. You can use a variety of debugging / coding environments. However, the [Chrome Debugger](https://developers.google.com/web/tools/chrome-devtools/javascript) is most straight forward as you probably already have it installed. To launch [Node.js in debug mode](https://nodejs.org/en/docs/guides/debugging-getting-started/), use the --inspect-brk flag.

```bash
node --inspect-brk .
```

This will launch a Node.js process and listen for a debugging client. In [Chrome](https://developers.google.com/web/tools/chrome-devtools/javascript), navigate to [chrome://inspect/#devices](#!/guide/chrome://inspect/).

![Screen_Shot_2020-07-06_at_1.58.56_PM](/Images/screen_shot_2020_07_06_at_1_58_56_pm.png)

{{% alert title="Note" color="primary" %}}Attaching to the debug process could differ based on development environment you use. This example uses Chrome, but there are alternatives. For example [VS Code](https://code.visualstudio.com), which we would also recommend (just turn on [auto-attach](https://code.visualstudio.com/blogs/2018/07/12/introducing-logpoints-and-auto-attach#_autoattaching-to-node-processes) feature, then put your breakpoints in the code, then run the app as explained earlier). For more information on this see [Node.js debugging in VS Code guide](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_attaching-to-nodejs).{{% /alert %}}

### Breakpoints

There are a variety of ways to set breakpoints. You can set them manually in the debugger, or by inserting the "debugger" statement into your code before running the application, e.g.

![image2020-7-15_10_20_55](/Images/image2020_7_15_10_20_55.png)
