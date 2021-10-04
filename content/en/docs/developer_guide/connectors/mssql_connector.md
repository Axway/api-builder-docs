---
title: MSSQL connector
linkTitle: MSSQL connector
weight: 30
date: 2021-10-01
---

The Microsoft SQL Server data connector is a plugin for {{% variables/apibuilder_prod_name %}} that can connect to your MSSQL instance and interrogate your schema that will automatically provision Models into your project, and optionally, automatically generate a rich CRUD API to the underlying tables. The Models can be used programmatically or can be used within the flow editor to interact with your database.

## Minimum requirements

The following are the supported versions and features and the approximate memory and disk space requirements.

### Supported Versions

* SQL Server 2008 or later

### Memory

* Approximately 8 MB

### Disk space

* Approximately 15 MB

### Supported features

* Automatic generation of Models from SQL tables
* Automatic generation of API for Models
* Full CRUD operations on tables via Models

## Installation

To install the MSSQL connector, execute the following command:

```bash
npm install --no-optional @axway/api-builder-plugin-dc-mssql
```

A configuration file is generated for you and placed into the **`/conf`** directory of your {{% variables/apibuilder_prod_name %}} project. By default, we use a host of `localhost`, and expect user and password to come from the OS host environment.

## Configuration

Once the plugin is installed, the configuration file is located in `<project>/conf/mssql.default.js`.

| Option name | Type | Description |
| --- | --- | --- |
| connector | string | Must be: `@axway/api-builder-plugin-dc-mssql` |
| user | string | The user with which to connect to the database. |
| password | string | The user's password with which to connect to the database. |
| host | string | The database host. |
| port | number | The database post. |
| database | string | The database instance name. |
| connectionTimeout | number | Connection timeout in MS |
| requestTimeout | number | Request timeout in MS |
| generateModelsFromSchema | boolean | If enabled, {{% variables/apibuilder_prod_name %}} will automatically interrogate the database and auto-generate Models from SQL tables. |
| modelAutogen | boolean | If enabled, {{% variables/apibuilder_prod_name %}} will automatically generate a full and rich CRUD API from the generated Models. |
| options | object | MSSQL Connection options |
| options.encrypt | boolean | Encrypt the database connection. Required when connecting to Azure. Defaults to true. |
| options.trustServerCertificate | boolean | When options.encrypt is true, this will explicitly trust the SQL Server certificate even if it is untrusted (e.g. self-signed, invalid SNI, etc). Do not set to true in production. |

## Usage

After you configure the connector, you can start up your {{% variables/apibuilder_prod_name %}} project and visit the console (normally found under`http://localhost:8080/console`). Your database tables will be listed on the **Models** tab of the console. Now, you can click on the **Gear** icon to the right of the table names and generate flow-based APIs.

You can also reference the connector in a custom model.

```javascript
const Account = APIBuilder.Model.extend('Account', {
  fields: {
    Name: { type: String, required: true }
  },
  connector: 'mssql'
});
```

If you want to map a specific model to a specific table, use metadata. For example, to map the `account` model to the `accounts` table set it as:

```javascript
const Account = APIBuilder.Model.extend('account', {
  fields: {
    Name: { type: String, required: false, validator: /[a-zA-Z]{3,}/ }
  },
  connector: 'mssql',
  metadata: {
    'mssql': {
      table: 'accounts'
    }
  }
});
```

## Known issues and limitations

* Does not support range queries

For a list of known issues and limitations, refer to the [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues).
