---
title: Connectors
linkTitle: Connectors
weight: 60
date: 2021-10-01
---

Data connector plugins allow you to read and write data to and from an external data source, such as Oracle, MySQL, and MongoDB. They give you the power to interact with your data as part of your flow and create feature-rich microservices. For information on the plugins UI, refer to [{{% variables/apibuilder_prod_name %}} Console](/docs/developer_guide/console/#plugins-tab).

## Currently available

The following data connector plugins are currently available for download directly from npm:

## Configuring data connector plugins

When you install a data connector plugin, it will create a configuration file located the `<SERVICE_FOLDER>/conf` folder and has the name of your connector. For example, `mysql.default.js`. You will need to edit this file and give it the required connection details such as database host/port, username, password, and database.

The configuration files that can contain environment variables are placed in the **`<SERVICE_FOLDER>/conf`** folder.

All the variables in your configuration files taken from **"`process.env.<VARIABLE_NAME>`"** can be provided when running the Docker container.

The following table lists the configuration files, their location, and their example content. The connector configuration is shown to inform you that you will have to provide an additional set of environment variables when using an {{% variables/apibuilder_prod_name %}} service with connectors.

| Configuration File | Location | Example |
| --- | --- | --- |
| Service Configuration | `<SERVICE_FOLDER>/conf/default.js` | <pre> module.exports = {<br /> apiKey: process.env.APIKEY<br /> port: parseInt(process.env.PORT) &#x7c;&#x7c; 8080<br />}; </pre> |
| Connector Configuration | Example with MySQL.<br /><br />The file will be named `<SERVICE_FOLDER>/conf/mysql.default.js` | <pre> module.exports = {<br />  connectors: {<br />    mysql: {<br />      connector: '@axway/api-builder-plugin-dc-mysql',<br />      connectionPooling: true,<br />      connectionLimit: 10,<br />      host: process.env.MYSQL_HOST &#x7c;&#x7c; 'localhost',<br />      port: 3306,<br /> <br /> <br />    # This could be set to mysql since this is already available database  by default<br />      database: 'mysql',<br /> <br /> <br />      user: process.env.MYSQL_USER,<br />      password: process.env.MYSQL_PASSWORD,<br /> <br /> <br />      // Create models based on your schema that can be used in your API.<br />      generateModelsFromSchema: true,<br /> <br />      // Whether or not to generate APIs based on the methods in generated models.<br />      modelAutogen: false<br />    }<br />  }<br />}; </pre> |

## Additional information

For additional information on the connectors:
