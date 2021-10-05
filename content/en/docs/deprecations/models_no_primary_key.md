---
title: Removal of unsupported APIs on Models that do not have a primary key
linkTitle: Removal of unsupported APIs on Models that do not have a primary key
weight: 4
deprecation: D004
date: 2021-10-01
---

{{% alert title="Note" color="primary" %}}This document describes deprecation {{% deprecation/link D004 %}}{{% /alert %}}

Models based on the tables that do not have a primary key:

* Return an invalid location header in the Create API response calls.
* Generate APIs that have methods that rely on there being a primary key.
* Generate flow-nodes that have methods that rely on there being a primary key.

These have been deprecated since the {{% variables/apibuilder_prod_name %}} - Canberra release.

Beginning with the [Canberra](/docs/release_notes/canberra) release, for models that do not have a primary key:

* The `delete`, `findAndModify`, `findByID`, `upsert`, and `update` APIs and endpoints will not be generated.
* The model flow-node will not have `delete`, `findAndModify`, `findByID`, `upsert`, or `update` methods.
* The Create API will no longer return a location header.

This will be the default behavior in all new services.

## Why are we deprecating this feature

The APIs generated for models that do not have primary keys are non-functional, and any attempt to use them will result in errors. Also, the location header returned for the Create API was `/api/<model>/undefined` which is incorrect, and any reliance on its value would likely result in errors.

## How does this impact my service

This is now the default behavior for all new services. Any existing services will continue to work as they previously did, though it is strongly recommended you enable the new behavior on existing services.

The changed behavior only impacts services that use the MySQL or Oracle data connectors and are connecting to databases that have tables that do not have primary keys. The following areas are impacted:

* Flows - Any flow using a model flow-node that does not have a primary key and is attempting to use one of the removed methods will now be invalid.
* API - The auto-generated CRUD API for a model that does not have a primary key will no longer include the `delete`, `findAndModify`, `findByID`, `upsert, and update` APIs. Previously, any call to these APIs would have resulted in a response with the HTTP status code 500 (Server Error). Now, the response will be an HTTP status code 404 (Not Found).
* Endpoints - Orchestrated APIs created using the "Generate endpoints" feature for models that do not have a primary key will contain invalid endpoints for `delete`, `findAndModify`, `findByID`, `upsert`, and `update`.

## Upgrading existing services

Updates contain important changes to improve the performance, stability, and security of your services. Installing them ensures that your software continues to run safely and efficiently.

It is strongly recommended you upgrade {{% variables/apibuilder_prod_name %}} to the latest version as well any data connectors you may have in your stack. This feature requires a minimum of:

* {{% variables/apibuilder_prod_name %}} - Canberra
* MySQL data connector (`@axway/api-builder-plugin-dc-mysql`) version 2.2.0
* Oracle data connector (`@axway/api-builder-plugin-dc-oracle`) version 2.2.0

Upgrading to the latest does not automatically enable the new behavior on pre-existing services. To enable the behavior there, add the following setting to your `default.js` file.

```javascript
flags: {
    enableModelsWithNoPrimaryKey: true
}
```

More `default.js` configuration file information can be found here: [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/#flags)

Once enabled, start {{% variables/apibuilder_prod_name %}} to check for invalid flows and endpoints. If there are any flows or endpoints that are now invalid because of the removed methods, {{% variables/apibuilder_prod_name %}} will fail to start with error messages. For example, an Oracle model called NOPK would generate an error like:

```json
1534267446154 Invalid flow oraclenopk-delete: {
  "valid": false,
  "errors": [
    {
      "type": "invalidMethod",
      "code": "INVALID_VALUE",
      "detail": {
        "node": "model.delete",
        "method": "delete"
      }
    }
  ]
}
```

The simplest solution, if there has been no customization to the orchestrated flows, is to delete the endpoint and flows from the command line and then regenerate them using the "Generate endpoints" option on the **Models** tab. In this example, those files would be:

* `/flows/oraclenopk-*.json`
* `/endpoints/oraclenopk.json`

If that is not an option, then the specifically deprecated methods can be removed. Remove the invalid flows from the `/flows` folder of your project. For this example, they would be:

* `/flows/oraclenopk-delete.json`
* `/flows/oraclenopk-findAndModify.json`
* `/flows/oraclenopk-findByID.json`
* `/flows/oraclenopk-update.json`
* `/flows/oraclenopk-upsert.json`

Then open the endpoint file (for this example, `/endpoints/oraclenopk.json`) in a Swagger editor such as [https://stoplight.io/](https://stoplight.io/) or a text editor. Remove the following methods:

* `/<modelname>/findaAndModify`
* `/<modelname>/upsert`
* `/<modelname>/{id}`

Edit the response for the Create API, POST `/<modelname>`, and delete responses in the location header.

For `/<modelname>/` query and GET `/<modelname>` change the referenced schema and remove the `-full` suffix. For example, change:

```json
"200": {
  "description": "The query succeeded, and the results are available.",
  "schema": {
    "type": "array",
    "items": {
      "$ref": "schema:///model/oracle/NOPK-full"
    }
  }
}
```

Remove the `-full` suffix in the referenced schema.

```json
"200": {
  "description": "The query succeeded, and the results are available.",
  "schema": {
    "type": "array",
    "items": {
      "$ref": "schema:///model/oracle/NOPK"
    }
  }
}
```

Once complete, your service should start; however, it is recommended that you re-test your service and clients before deploying to production.
