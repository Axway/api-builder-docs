---
title: MySQL connector
linkTitle: MySQL connector
description: ADD A DESCRIPTION
weight: 40
date: 2021-06-22
---

The MySQL data connector is a plugin for {{% variables/apibuilder_prod_name %}} that can connect to your MySQL database instance and interrogate your schema. It will automatically provision Models into your application, and optionally, automatically generate a rich CRUD API to the underlying tables. The Models can be used programmatically, or they can be used within the flow editor to interact with your database.

## Minimum requirements

The following are the supported versions and features and the approximate memory and disk space requirements.

### Supported Versions

* MySQL 5.7

### Memory

* Approximately 7 MB

### Disk space

* Approximately 10 MB

### Supported features

* Automatic generation of Models from SQL tables

* Automatic generation of API for Models

* Full CRUD operations on tables via Models

* Connection pooling

## Installation

To install the MySQL connector, execute the following command:

```bash
npm install --no-optional @axway/api-builder-plugin-dc-mysql
```

A configuration file is generated for you and placed into the **`/conf`** directory of your {{% variables/apibuilder_prod_name %}} project. By default, we use a host of `localhost`, and expect user and password to come from the OS host environment.

## Configuration

Once the plugin is installed, the configuration file is located in `<project>/conf/mysql.default.js`.

| Option name | Type | Description |
| --- | --- | --- |
| connector | string | Must be: `@axway/api-builder-plugin-dc-mysql` |
| connectionPooling | boolean | Enables connection pooling for better performance and scalability. |
| connectionLimit | number | The number of simultaneous connections when `connectionPooling` is enabled. |
| host | string | The database host. |
| port | number | The database port. |
| database | string | The database instance name. |
| user | string | The user with which to connect to the database. |
| password | string | The user's password with which to connect to the database. |
| generateModelsFromSchema | boolean | If enabled, {{% variables/apibuilder_prod_name %}} will automatically interrogate the database and auto-generate Models from SQL tables. |
| modelAutogen | boolean | If enabled, {{% variables/apibuilder_prod_name %}} will automatically generate a full and rich CRUD API from the generated Models. |

{{% alert title="❗️ Caution" color="danger" %}}The `mysql` library used by this connector depends on the MySQL server setting `NO_BACKSLASH_ESCAPES` to mitigate against SQL injection attacks. The setting must be disabled (which is the default setting for MySQL servers).{{% /alert %}}

## Usage

After you configure the connector, you can start up your {{% variables/apibuilder_prod_name %}} project and visit the console (normally found under `http://localhost:8080/console`). Your database tables will be listed on the **Models** tab of the console. Now, you can click on the **Gear** icon to the right of the table names and generate flow-based APIs.

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

## Known issues and limitations

The following are the MySQL connector known issues and limitations:

* Only supports SQL tables.

For a list of additional known issues and limitations, refer to the [{{% variables/apibuilder_prod_name %}} Release Notes](/docs/release_notes/).
