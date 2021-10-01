---
title: Oracle connector
linkTitle: Oracle connector
weight: 50
date: 2021-10-01
---

The Oracle connector is a plugin for {{% variables/apibuilder_prod_name %}} that can connect to your Oracle database instance and interrogate your schema. It will automatically provision Models into your application, and optionally, automatically generate a rich CRUD API to the underlying tables. The Models can be used programmatically, or they can be used within the flow editor to interact with your database.

## Minimum requirements

The following are the supported versions, features, and prerequisites and the approximate memory and disk space requirements.

### Supported Versions

* Oracle 12c

### Underlying Driver Version

* The underlying driver used is [node-oracledb version 4.0](https://oracle.github.io/node-oracledb) \- supporting Node.js versions 8.16, 10.16, 12, or later.

### Memory

* Approximately 25 MB

### Disk space

* Approximately 16 MB

### Supported features

* Automatic generation of Models from SQL tables
* Automatic generation of API for Models
* Full CRUD operations on tables via Models

### Prerequisites

This connector requires Oracle Instant Client installed. To install it, please follow the instructions for your environment here: [Oracle Instant Client](http://www.oracle.com/technetwork/database/features/instant-client/index-097480.html)

The connector also depends on the `node-oracledb` module. To properly install the connector, please check the prerequisites here: `node-oracledb`

## Installation

To install the Oracle connector, execute the following command:

```bash
npm install --no-optional @axway/api-builder-plugin-dc-oracle
```

A configuration file is generated for you and placed into the `/conf` directory of your {{% variables/apibuilder_prod_name %}} project. You should configure this file before starting your service.

## Configuration

Once the plugin is installed, the configuration file is located in `<project>/conf/oracle.default.js`.

| Option name | Type | Description |
| --- | --- | --- |
| connector | string | Must be: `@axway/api-builder-plugin-dc-oracle` |
| connectString | string | The database instance [connection string](https://oracle.github.io/node-oracledb/doc/api.html#connectionstrings). Supports:<br /><br />* [Easy Connect](https://oracle.github.io/node-oracledb/doc/api.html#easyconnect) (e.g. `"mydbmachine.example.com/orclpdb1"`)<br />* [Net Service Name](https://oracle.github.io/node-oracledb/doc/api.html#tnsnames) stored in a tnsnames.ora configuration file`"`<br />* [Connector Descriptor](https://oracle.github.io/node-oracledb/doc/api.html#easyconnect) (e.g. `"(DESCRIPTION=(ADDRESS=(PROTOCOL = TCP)(HOST=10.0.0.42)(PORT = 1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=oracledb12c))"`): |
| user | string | The user with which to connect to the database. |
| password | string | The user's password with which to connect to the database. |
| generateModelsFromSchema | boolean, string\[\] | If `true`, {{% variables/apibuilder_prod_name %}} will automatically interrogate the database and auto-generate Models from SQL tables. If `false`, `undefined`, or empty array, no models will be generated. If an array of strings, they are an exclusive list of table name(s) used to auto-generate models. If a simple name (e.g. "EMPLOYEES"), then the table is assumed to be owned by the configured `user`. The table can also be prefixed with a schema (which is the name of the owner, e.g. "OTHER.EMPLOYEES"). If a named table is not found, then it will generate a warning on start up. It is not currently possible to have two tables with the same name (e.g. `["EMPLOYEES", "OTHER.EMPLOYEES"]`) and will generate a start up error if detected. |
| modelAutogen | boolean | If enabled, {{% variables/apibuilder_prod_name %}} will automatically generate a full and rich CRUD API from the generated Models. |
| connectionPooling | boolean | Enables connection pooling for better performance, scalability, and resilience. See the [Connection pooling](https://oracle.github.io/node-oracledb/doc/api.html#connpooling) for more information. Default: `false` |
| poolMax | integer | The maximum number of connections to which a connection pool can grow. Default: `4` |
| poolMin | integer | The minimum number of connections a connection pool maintains, even when there is no activity to the target database. Default: `0` |
| poolPingInterval | integer | The number of seconds that a connection has been idle before it is "pinged" to check the connection is alive. Default: `60` |
| poolTimeout | integer | The number of seconds after which idle connections (unused in the pool) are terminated. Default: `60` |
| poolIncrement | integer | The number of connections that are opened whenever a connection request exceeds the number of currently open connections. Default: `1` |

## Usage

After you configure the connector, you can start up your {{% variables/apibuilder_prod_name %}} project and visit the console (normally found under `http://localhost:8080/console`). Your database tables will be listed on the **Models** tab of the console. Now, you can click on the **Gear** icon to the right of the table names and generate flow-based APIs.

## Custom models

You can also reference the connector in a custom model. If you have a table with name "Account" and primary key "ID" with multiple columns but you are interested only in "Name" column you can do the following:

```javascript
const APIBuilder = require('@axway/api-builder-runtime');
const Account = APIBuilder.Model.extend('Account', {
  fields: {
    Name: { type: String, required: true }
  },
  metadata: {
    primarykey: 'ID'
  },
  connector: 'oracle'
});
module.exports = Account;
```

Note that if your table does not have a primary key for some reason the metadata will not be needed in this case but only the columns you want to use.

### Defining metadata

If you want to map a specific model to a specific table, use `metadata`. For example, to map the `account` model to the `accounts` table set it as:

```javascript
const APIBuilder = require('@axway/api-builder-runtime');
const Account = APIBuilder.Model.extend('Account', {
  fields: {
    Name: { type: String, required: false, validator: /[a-zA-Z]{3,}/ }
  },
  connector: 'oracle',
  metadata: {
    table: 'ACCOUNTS',
    schema: 'APIBUILDER',
    primarykey: 'ID',
    primaryKeyDetails: {
      autogenerated: true,
      type: 'number',
      dataType: 'NUMBER'
    }
  }
});
module.exports = Account;
```

The metadata properties are defined as follows:

| Property name | Description |
| --- | --- |
| table | The table name. This should match the capitalization in your DB. |
| schema | The owner of the table. This should match the capitalization in your DB. |
| primarykey | The `field` that is to be used as the primary key. Use `null` if the table does not have a primary key. |
| primaryKeyDetails.autogenerated | A boolean to indicate that the primary key field is autogenerated by the DB on insert. |
| primaryKeyDetails.type | The JSON data type for the primary key. |
| primaryKeyDetails.dataType | The raw DB data type for the column (e.g. "NUMBER"). |

## Known issues and limitations

The following are the Oracle connector known issues and limitation:

* Only supports SQL tables and views.
* Only supports upper case tables and fields. Using mixed/lower case table names may work but is not guaranteed.

For a list of additional known issues and limitations, refer to the [{{% variables/apibuilder_prod_name %}} Release Notes](/docs/release_notes/).
