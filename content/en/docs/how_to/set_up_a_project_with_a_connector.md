---
title: Set up a project with a connector
linkTitle: Set up a project with a connector
weight: 130
date: 2021-10-01
---

## Introduction

This document provides information on how to configure and run an {{% variables/apibuilder_prod_name %}} service within a connector.

## Prerequisites

Before setting up a project with a connector, refer to:

* [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/) - Provides detailed instructions for installing {{% variables/apibuilder_prod_name %}} and creating an {{% variables/apibuilder_prod_name %}} project.
* [{{% variables/apibuilder_prod_name %}} Project](/docs/developer_guide/project/) - Provides detailed information about {{% variables/apibuilder_prod_name %}} projects and services.

## {{% variables/apibuilder_prod_name %}} Connectors

Connectors are adapters to allow you to read and write data to and from an external data source, such as Oracle, MySQL, MSSQL, and MongoDB. They give your application the ability to utilize existing data sources to create Models for use within your {{% variables/apibuilder_prod_name %}} application, either directly as API or within flows.

{{% alert title="Note" color="primary" %}}Refer to [{{% variables/apibuilder_prod_name %}} Connectors](/docs/developer_guide/connectors/) for detailed information.{{% /alert %}}

### Available connectors

The following connectors are available for download directly from NPM:

* `@axway/api-builder-plugin-dc-mongo`
* `@axway/api-builder-plugin-dc-mysql`
* `@axway/api-builder-plugin-dc-mssql`
* `@axway/api-builder-plugin-dc-oracle`

To install a data connector, navigate to the root directory of your service and use the following command; for example, to install the MySQL data connector:

```bash
npm install --no-optional @axway/api-builder-plugin-dc-mysql
```

{{% alert title="Note" color="primary" %}}You will need to configure your connector with connection details before starting your application, or it will fail to start. For additional configuration details, refer to [MySQL Connector](/docs/developer_guide/connectors/mysql_connector/).{{% /alert %}}

### Configuring connectors

When you install a connector, it will create a configuration file located in the `<SERVICE_FOLDER>/conf` folder that has the name of your connector. For example, `mysql.default.js`. You will need to edit this file and give it the required connection details such as database host and port, user, password, and database.

The configuration files that can contain environment variables are placed in the **`<SERVICE_FOLDER>/conf`** folder.

All the variables in your configuration files taken from `process.env.<VARIABLE_NAME>` can be provided when running the Docker container.

The following table lists the configuration files, their location, and their example content. The connector configuration is shown to inform you that you will have to provide an additional set of environment variables when using an {{% variables/apibuilder_prod_name %}} service with connectors.

| Configuration File | Location | Example |
| --- | --- | --- |
| Service Configuration | `<SERVICE_FOLDER>/conf/default.js` | <pre> module.exports = {<br /> apiKey: process.env.APIKEY<br /> port: parseInt(process.env.PORT) &#x7c;&#x7c; 8080<br />}; </pre> |
| Connector Configuration | Example with MySQL.<br /><br />The file will be named `<SERVICE_FOLDER>/conf/mysql.default.js` | <pre> module.exports = {<br />  connectors: {<br />    mysql: {<br />      connector: '@axway/api-builder-plugin-dc-mysql',<br />      connectionPooling: true,<br />      connectionLimit: 10,<br />      host: process.env.MYSQL_HOST &#x7c;&#x7c; 'localhost',<br />      port: 3306,<br /> <br /> <br />    # This could be set to mysql since this is already available database  by default<br />      database: 'mysql',<br /> <br /> <br />      user: process.env.MYSQL_USER,<br />      password: process.env.MYSQL_PASSWORD,<br /> <br /> <br />      // Create models based on your schema that can be used in your API.<br />      generateModelsFromSchema: true,<br /> <br />      // Whether or not to generate APIs based on the methods in generated models.<br />      modelAutogen: false<br />    }<br />  }<br />}; </pre> |

For additional MySQL connector configuration information, refer to [MySQL Connector](/docs/developer_guide/connectors/mysql_connector/).

## Using connector models

Once you've configured your MySQL configuration files located under `<project>/conf`, you can start up your {{% variables/apibuilder_prod_name %}} project and visit the console (normally found under **`localhost:8080/console`** ). Your MySQL tables will be listed under the **Models** tab of the console.

![Screen_Shot_2018-05-30_at_18.11.37](/Images/screen_shot_2018_05_30_at_18_11_37.png)

## Using the auto-generated model API

To generate flow-based API endpoints, click on the **Gear** icon to the right of the table names. For additional information on generating API endpoints, refer to [Manage Endpoints](/docs/developer_guide/flows/manage_endpoints/).

You can also reference the connector in a custom model.

```javascript
const Account = APIBuilder.Model.extend('Account', {
  fields: {
    Name: { type: String, required: true }
  },
  connector: 'mysql'
});
```

If you want to map a specific model to a specific table, use metadata. For example, to map the `account` model to the `accounts` table set it as:

```javascript
const Account = APIBuilder.Model.extend('account', {
  fields: {
    Name: { type: String, required: false, validator: /[a-zA-Z]{3,}/ }
  },
  connector: 'mysql',
  metadata: {
    'mysql': {
      table: 'accounts'
    }
  }
});
```

## Using connector models in flows

To use the MySQL connector model in a flow, select the Flow icon for one of the generated endpoints for the MySQL connector; for example, for the Find all mysqlPersons endpoint. The API Orchestration page with all loaded connectors, flow-nodes, and so forth is displayed. For additional information on using a connector model in a flow, refer to [Manage Flows](/docs/developer_guide/flows/manage_flows/).

![Screen_Shot_2018-05-30_at_18.12.41](/Images/screen_shot_2018_05_30_at_18_12_41.png)
