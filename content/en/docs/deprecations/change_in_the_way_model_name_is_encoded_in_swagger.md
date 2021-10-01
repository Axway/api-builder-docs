---
title: Change in the way model name is encoded in Swagger
linkTitle: Change in the way model name is encoded in Swagger
weight: 14
deprecation: D014
date: 2021-10-01
---

{{% alert title="Note" color="primary" %}}This document describes deprecation {{% deprecation/link D014 %}}{{% /alert %}}

Using model names as-is (without modification) when bound to ExpressJS API has been deprecated since the {{% variables/apibuilder_prod_name %}} - [Quebec](/docs/release_notes/quebec) release.

Beginning in the [Quebec](/docs/release_notes/quebec) release, model names will be percent-encoded according to [RFC-3986](https://tools.ietf.org/html/rfc3986) for endpoints generated from Models, and for the Swagger that your application exposes (for example, on `http://localhost:8080/apidoc/swagger.json`).

## Why we are making this change

Currently, model names are used to generate Swagger paths and schema without any encoding. According to [RFC-3986](https://tools.ietf.org/html/rfc3986), characters not in `A-Z a-z 0-9 - _ . ~`, should be percent-encoded when included in a URI. So, for example, currently, a model named "employee's" will produce an API path; for example `/api/endpoints/employee's/:id`, which is not strictly correct. Many NodeJS libraries will automatically encode requests to `/api/endpoints/employee's`, as `/api/endpoints/employee%27s`, which can make calling the API difficult from NodeJS applications ({{% variables/apibuilder_prod_name %}} will return 404 because it is not listening on `/api/endpoints/employee%27s`). However, some HTTP clients, such as cURL, are less strict and permit non-RFC-3986 URI. To make {{% variables/apibuilder_prod_name %}} standards compliant and consistent with respect to model names, when {{% variables/apibuilder_prod_name %}} needs to encode model names into Swagger, they will be encoded as per RFC-3986.

## How does this impact my service

Generating new endpoints from a model will use the new [RFC-3986](https://tools.ietf.org/html/rfc3986) encoding. However, there is a potential problem with existing endpoints that have been generated for models using (Models -> Generate endpoints) can emit "Undefined schemas" errors on startup:

```
// Startup Schema Error

Error loading endpoint at /home/user/app/endpoints/employees.json; Undefined schemas:
schema:///model/employee's, schema:///model/employee's-full, schema:///model/employee's,
schema:///model/employee's-full, schema:///model/employee's, schema:///model/employee's-full,
schema:///model/employee's-full
```

Notice that the model "employee's" has an apostrophe and will encode as "employee%27s" using the RFC-3986 encoding. The reason for the error is that the model is registered as a schema under "schema:///model/employee%27s", but the endpoint file has a hard-coded schema references of "schema:///model/employee's".

Most manually created model names are _probably_ safe (in other words, it has only characters in `A-Z a-z 0-9 - _ . ~`). You can test your model names with the `encodeURIComponentRFC3986` function below:

```javascript
// Encode URI Component RFC-3986

/**
 * Encodes a URI component using a more strict RFC3986 encoding.
 *
 * @param {string} str - The string to encode.
 * @return {string} The RFC3986 encoded component.
 */
function encodeURIComponentRFC3986(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return `%${c.charCodeAt(0).toString(16)}`;
  });
}
```

If the function produces a _different_ name, then your endpoints will be affected and will require a manual upgrade. For example:

```
// Example RFC-3986

console.log(encodeURIComponentRFC3986("employee's")); // "employee%27s"
```

## Upgrading the existing configuration

Updates contain important changes to improve the performance, stability, and security of your services. Installing them ensures that your software continues to run safely and efficiently.

It is strongly recommended you upgrade {{% variables/apibuilder_prod_name %}} to the latest version as well any data connectors you may have in your stack. This feature requires a minimum of:

* [{{% variables/apibuilder_prod_name %}} - Quebec](/docs/release_notes/quebec)

Enable the flag to encode model names in Swagger:

```
// Enable model name URI encoding

flags: {
    enableModelNameEncodingInSwagger: true
}
```

Then start your application. If it starts, then no further upgrade is required. However, if your application emits an "Undefined schemas" error (above), you need to edit the affected endpoint file(s) to use the new RFC-3986 encoding for your model name. For example, if your model name was "employee's", then all references to "schema:///model/employee's" would need to be replaced with "schema:///model/employee%27s". For example:

```
// Enable model name URI encoding

"200": {
    "description": "The find all succeeded, and the results are available.",
    "schema": {
      "type": "array",
      "items": {
        "$ref": "schema:///model/employee's-full"
      }
    }
  },
```

Replace all references of "schema:///model/employee's" with "schema:///model/employee%27s":

```
// Enable model name URI encoding

"200": {
    "description": "The find all succeeded, and the results are available.",
    "schema": {
      "type": "array",
      "items": {
        "$ref": "schema:///model/employee%27s-full"
      }
    }
  },
```

Note that you are _only_ replacing the schema references. The word "employee's" is used in other places in the file, and not just schema, so a search and replace should ensure that you search for the URI that includes "schema:///model/".

You must search and replace files in endpoints and flows, for example, if your model is "employee's", then edit these files:

* ./endpoints/employees.json
* ./flows/employees-create.json
* ./flows/employees-findAndModify.json
* ./flows/employees-update.json
* ./flows/employees-upsert.json

Once all endpoints have been updated, the upgrade is complete, and you can restart the server.
