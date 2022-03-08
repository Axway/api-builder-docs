---
title: OpenAPI tips
weight: 40
date: 2022-03-01
description: This document provides recommendations that help you write clear and compliant OpenAPI specifications. All examples in this document are OpenAPI 3.0.
---

## Model your API around resources

A "RESTful" API is one that is stateless and utilizes an expected pattern of Create, Retrieve, Update, and Delete operations on resources (CRUD operations). A good REST API would have a predicatable, uniform interface. If you are familiar with this, you can skip to the [example REST API](#example-rest-api) which utilizes the best practices noted from this document.

### Resources

Typically, entities would have a plural root, e.g. `/users`, under which all methods would relate. Resources are nouns, and the actions taken on the resurces are verbs (for example, to "retrieve" a resource). Below is a typical pattern for REST API for managing a resource collection for a "User" resource:

| HTTP method | HTTP path (plural) | Success code    | Response body | REST API |
| ------------| ------------------ | --------------- | ------------- | --------- |
| POST        | `/users`           | 201 Created     | ¹             | Create user |
| GET         | `/users`           | 200 OK          | \[ Users \]   | Retrieve users |
| GET         | `/users/{id}`      | 200 OK          | User          | Retrieve user by ID |
| PUT         | `/users/{id}`      | 204 No Content  |               | Update user by ID  |
| DELETE      | `/users/{id}`      | 204 No Content  |               | Delete user by |

1. `POST` operations to create a resource would typically return a `Location` header that is the URL for the newly created resource, but no response body.

In OpenAPI, resource values are described by [JSON schema](https://json-schema.org/). You may want to read our [JSON schema tips](#json-schema-tips) before designing resources and writing your OpenAPI specification.

### Paging and filtering

A good API should allow querying, paging, and filtering to reducing the amount of data returned as much as possible. For example, return only specific field(s) instead of entire entities. Expect that the developer needs to build a fast, scaleable application under many different OS and mobile environments where bandwidth might be very limited.

## Version your API

A good API should have a version strictly managed. We recommend using [Semantic versioning](https://semver.org/) ("semver"), following a _major.minor.patch_ convention. In OpenAPI 3.0, you can add a major version to your server paths, for example:

```yaml
servers:
  - url: https://api.banana.io/v1
    description: Banana API v1
```

In {{% variables/apibuilder_prod_name %}}, you can manage the `servers` using [apidoc.overrides](/docs/guide_openapi/configuration/#overrides).

## Use examples

OpenAPI [examples](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#exampleObject) can greatly assist the developer in using your API because JSON schema is hard to read. They are understood by the UI and assist in being able to try your API with little effort.

## Reusable components

JSON schema can take a lot of time to get right and to document correctly. You really want to limit the number of changes required to make changes/updates.  [JSON schema references](https://json-schema.org/understanding-json-schema/structuring.html#ref) are a powerful tool and can greatly reduce the size of your OpenAPI document. Smaller documents will be easier to manage, validate faster, and download faster.

It is generally a good idea to use [OpenAPI components](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#componentsObject), and then refer to these components using JSON schema references (`$ref`).

{{% alert title="Tip" color="primary" %}}
Reusable [OpenAPI components](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#componentsObject) will save time and make the document easier to adapt.
{{% /alert %}}

## JSON Schema tips

The following sections provide some guidance and recommendations when writing JSON schema.

### additionalProperties

One aspect of JSON schema that is easily overlooked are [`additionalProperties`](http://json-schema.org/understanding-json-schema/reference/object.html#additional-properties). Take this schema for example:

```yaml
User:
  type: object
  required:
   - name
  properties:
    name:
      type: string
```

It looks good, and would require the "name" property, and would pass JSON schema validation with this input: `{"name":"bob"}`, but it would also pass validation with this input `{"name":"bob", "age": 12}`. That is because JSON schema allows additional properties by default. It is better to restrict the inputs to _exactly_ what you expect from the user, or it could cause problems (e.g. security or compatibility).

It is recommended you disable `additionalProperties`, for example:

```yaml
User:
  type: object
  required:
   - name
  additionalProperties: false
  properties:
    name:
      type: string
```

{{% alert title="Tip" color="primary" %}}
The more constrained you make your schema, the less bugs you will have later, so use [`additionalProperties: false`](http://json-schema.org/understanding-json-schema/reference/object.html#additional-properties) whenever possible.
{{% /alert %}}

### Composition with allOf

Composing schemas from sub-schemas seems logical, but can be tricky. We are not necessarily recommending that you use schema composition, but if you wan to, you should read [extending closed schemas](http://json-schema.org/understanding-json-schema/reference/object.html#extending-closed-schemas). It is debatable if this kind of composition and extra level of complexity is worth it, but it can help reduce the size of the schema.

## Example REST API

The [Bookstore API](/samples/openapi/bookstore.yaml) is an example REST API in OpenAPI 3.0, utilizing some of the best-practices mentioned in this document.
