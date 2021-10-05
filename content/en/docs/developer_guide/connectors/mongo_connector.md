---
title: Mongo connector
linkTitle: Mongo connector
weight: 20
date: 2021-10-01
---

The Mongo data connector is a plugin for {{% variables/apibuilder_prod_name %}} that can connect to your Mongo database instance and interrogate your schema. It will automatically provision Models into your application, and optionally, automatically generate a rich CRUD API to the underlying tables. The Models can be used programmatically, or they can be used within the flow editor to interact with your database.

## Minimum requirements

The following are the supported versions and features and the approximate memory and disk space requirements.

### Supported Versions

* MongoDB 3.6

### Memory

* Approximately 10 MB

### Disk space

* Approximately 14 MB

### Supported features

* Automatic generation of Models from Mongo collections
* Automatic generation of API for Models
* Full CRUD operations on tables via Models
* Dynamic creation of Model tables

## Installation

To install the Mongo connector, execute the following command:

```bash
npm install --no-optional @axway/api-builder-plugin-dc-mongo
```

A configuration file is generated for you and placed into the `/conf` directory of your {{% variables/apibuilder_prod_name %}} project. By default, we use a host of `localhost` and a table called `apibuilder`.

## Configuration

Once the plugin is installed, the configuration file is located in `<project>/conf/mongo.default.conf`.

| Option name | Type | Description |
| --- | --- | --- |
| connector | string | Must be: `@axway/api-builder-plugin-dc-mongo` |
| url | string | The MongoDB database URL. For additional MongoDB database URL configuration information, refer to [Connection String URI Format](https://docs.mongodb.com/manual/reference/connection-string/). |
| generateModelsFromSchema | boolean | If enabled, {{% variables/apibuilder_prod_name %}} will automatically interrogate the database and auto-generate Models from MongoDB collections. {{% variables/apibuilder_prod_name %}} determines the schema for the auto-generated models by sampling the collection. If the collection is empty, the schema cannot be determined, and the model will not be generated. This will cause issues if there are Flows or APIs, depending on the model schema. |
| modelAutogen | boolean | If enabled, {{% variables/apibuilder_prod_name %}} will automatically generate a full and rich CRUD API from the generated Models. |

## Usage

After you configure the connector, you can start up your {{% variables/apibuilder_prod_name %}} project and visit the console (normally found under `http://localhost:8080/console`). Your MongoDB collections will be listed on the **Models** tab of the console. Now, you can click on the **Gear** icon to the right of the table names to generate flow-based APIs.

You can also reference the connector in a custom model.

```javascript
var User = APIBuilder.Model.extend('user', {
    fields: {
        name: { type: String, required: false, validator: /[a-zA-Z]{3,}/ }
    },
    connector: 'mongo'
});
```

If you want to map a specific model to a specific collection name, use metadata. For example, to map the `user` model to the `users` collection set it as:

```javascript
var User = APIBuilder.Model.extend('user', {
    fields: {
        name: { type: String, required: false, validator: /[a-zA-Z]{3,}/ }
    },
    connector: 'mongo',
    metadata: {
        'mongo': {
            collection: 'users'
        }
    }
});
```

## Known issues and limitations

For a list of known issues and limitations, refer to the [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues).
