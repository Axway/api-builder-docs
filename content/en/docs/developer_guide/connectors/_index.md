---
title: Connectors
linkTitle: Connectors
weight: 60
date: 2021-10-01
---

Data connector plugins allow you to read and write data to and from an external data source, such as Oracle, MySQL, and MongoDB. They give you the power to interact with your data as part of your flow and create feature-rich microservices. For information on the plugins UI, refer to [{{% variables/apibuilder_prod_name %}} Console](/docs/developer_guide/console/#plugins-tab).

## Currently available

The following data connector plugins are currently available for download directly from npm:

| Connector | Plugin |
| --------- | ------ |
| [MBS Connector](/docs/developer_guide/connectors/mbs_connector) | [api-builder-plugin-dc-mbs](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mbs)|
| [Mongo Connector](/docs/developer_guide/connectors/mongo_connector) | [api-builder-plugin-dc-mongo](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mongo)|
| [MsSQL Connector](/docs/developer_guide/connectors/mssql_connector) | [api-builder-plugin-dc-mssql](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql)|
| [MySQL Connector](/docs/developer_guide/connectors/mysql_connector) | [api-builder-plugin-dc-mysql](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql)|
| [Oracle Connector](/docs/developer_guide/connectors/oracle_connector) | [api-builder-plugin-dc-oracle](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle)|


## Configuring data connector plugins

When you install a data connector plugin, it will create a configuration file located the `<SERVICE_FOLDER>/conf` folder and has the name of your connector. For example, `mysql.default.js`. You will need to edit this file and give it the required connection details such as database host/port, username, password, and database. The connector configuration contains additional set of environment variables when using an {{% variables/apibuilder_prod_name %}} service with connectors.

The configuration files that can contain environment variables are placed in the `<SERVICE_FOLDER>/conf` folder.

All the variables in your configuration files taken from `process.env.<VARIABLE_NAME>` can be provided when running the Docker container.

The following is an example configuration file for the [MySQL Connector](/docs/developer_guide/mysql_connector). It will be created when [api-builder-plugin-dc-mysql](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql) is installed. Note that "mysql" is a friendly name of this configuration instance. You can create multiple configuration instances with different names in this file.

```js
// example <SERVICE_FOLDER/conf/mysql.default.js>
 module.exports = {
  connectors: {
    mysql: {
      connector: ‘@axway/api-builder-plugin-dc-mysql’,
      connectionPooling: true,
      connectionLimit: 10,
      host: process.env.MYSQL_HOST || ‘localhost’,
      port: 3306,
      // This could be set to mysql since this is already available database
	  // by default
      database: ‘mysql’,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
       // Create models based on your schema that can be used in your API.
      generateModelsFromSchema: true,
       // Whether or not to automatically generate APIs based on the methods in
	   // generated models. Otherwise, models can be used in flows
      modelAutogen: false
    }
  }
};
```

## Additional information

For additional information on the connectors:
