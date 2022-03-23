---
title: Writing OpenAPI documents
weight: 20
date: 2022-03-01
description: This chapter describes how to write OpenAPI specifications and best practices.
---

## OpenAPI specification support

Currently, **OpenAPI** flow-trigger supports the following specifications:

* [OpenAPI 2.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md)
* [OpenAPI 3.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md)

Note that OpenAPI 3.0 is the preferred standard for {{% variables/apibuilder_prod_name %}}. All links in our documentation will be to this standard, unless there is a specific need to link to OpenAPI 2.0. If you are using OpenAPI 2.0, you should consider moving to 3.0, but if you choose to remain on 2.0, you may have to refer back to equivalent sections in 2.0.

Also note that [OpenAPI 3.1](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md) is currently not supported, but is on the roadmap.

{{% alert title="Note" color="warning" %}}
All links in our documentation will be to the preferred standard [OpenAPI 3.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md), unless otherwise noted.
{{% /alert %}}

## Unsupported features

The following features are currently unsupported by the **OpenAPI** flow-trigger. While you can document them in your OpenAPI specifications, their use may not work as expected during runtime. Unless otherwise indicated, assume that this is the case.

* OpenAPI 3 requestBody `anyOf`, `oneOf`, `allOf`, and `not` are only supported for `application/json`. All other media types are not supported.
* OpenAPI 3 parameter [content](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) is currently not supported, and `schema` is required.
* OpenAPI 3 [link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#link-object)¹.
* OpenAPI 3 [callback](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#callbackObject)¹.
* OpenAPI 3 parameter [media type encoding](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#encodingObject)¹.
* OpenAPI 3 [discriminator](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#discriminatorObject).
* OpenAPI 2 [collectionFormat](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#fixed-fields-7) for `tsv` (tab separated value).
* OpenAPI 2 [collectionFormat](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#fixed-fields-7) array of items more than one level deep (i.e. does not support array of array items).
* OpenAPI 2 [collectionFormat](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#fixed-fields-7) `pipes` and `ssv` are not supported in `cookie`, `formData`, `header`, or `path` (only supported in `query`).
* `multipart/form-data` with arrays of binary data is not supported, e.g. `curl -F file[]=a -F file[]=b`.
* OpenAPI 3 [byte format](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#data-types)¹ is supported, but it will not automatically decode the base64 data.
* OpenAPI 3 [base64 format](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#considerations-for-file-uploads) is not supported because it is not really a valid [OpenAPI format](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#data-types). The example is invalid and should be "byte".
* OpenAPI 3 cookie parameters for objects and arrays, `style="form", explode=true` [style](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#style-examples) is not supported.
* In _API Doc & Test_, APIs with `multipart/form-data` or `application/x-www-form-urlencoded` bodies will fail to render examples and execute correctly if the body schema is missing an implicit `type: object`.
* [Media-type parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#media-types) such as `;charset=utf-8` in request and response are currently ignored.
* OpenAPI [response header styles](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#headerObject).

1. Using this feature in your OpenAPI specification will not cause any runtime issues, but using it may confuse clients.

## JSON schema versions

OpenAPI 2.0 and 3.1 both effectively support a subset of JSON schema draft-04 with additional restrictions and formats. Though, [OpenAPI 2.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#data-types) supports [json-schema-draft-04](https://json-schema.org/specification-links.html#draft-4), and [OpenAPI 3.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#dataTypes) supports the [Wright JSON schema](https://json-schema.org/specification-links.html#draft-5), which is effectively draft-04 with some fixes (aka "json-schema-draft-05").

When writing JSON schema, understand that you are more/less targeting draft-04 syntax, and not any of the other [draft specifications](https://json-schema.org/specification-links.html).

## JSON schema format support

The following formats are available for JSON schema validation:

| JSON schema format | Reference | Validated |
| ------------------ | --------- | --------- |
| date | [JSON schema](https://json-schema.org/understanding-json-schema/reference/string.html#dates-and-times) | yes |
| time | [JSON schema](https://json-schema.org/understanding-json-schema/reference/string.html#dates-and-times) | yes |
| date-time | [JSON schema](https://json-schema.org/understanding-json-schema/reference/string.html#dates-and-times) | yes |
| uri | [JSON schema](https://json-schema.org/understanding-json-schema/reference/string.html#resource-identifiers) | yes |
| uri-template | [JSON schema](https://json-schema.org/understanding-json-schema/reference/string.html#uri-template) | yes |
| url | [JSON schema](https://json-schema.org/understanding-json-schema/reference/string.html#built-in-formats) | yes |
| email | [JSON schema](https://json-schema.org/understanding-json-schema/reference/string.html#email-addresses) | yes |
| hostname | [JSON schema](https://json-schema.org/understanding-json-schema/reference/string.html#hostnames) | yes |
| ipv4 | [JSON schema](https://json-schema.org/understanding-json-schema/reference/string.html#ip-addresses) | yes |
| ipv6 | [JSON schema](https://json-schema.org/understanding-json-schema/reference/string.html#ip-addresses) | yes |
| regex | [JSON schema](https://json-schema.org/understanding-json-schema/reference/string.html#index-12) | yes |
| uuid | [JSON schema](https://json-schema.org/understanding-json-schema/reference/string.html#resource-identifiers) | yes |
| json-pointer | [JSON schema](https://json-schema.org/understanding-json-schema/reference/string.html#json-pointer) | yes |
| relative-json-pointer | [JSON schema](https://json-schema.org/understanding-json-schema/reference/string.html#json-pointer) | yes |
| int32 | [OpenAPI](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#data-types) | yes |
| int64 | [OpenAPI](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#data-types) | yes |
| float | [OpenAPI](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#data-types) | no |
| double | [OpenAPI](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#data-types) | no |
| byte | [OpenAPI](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#data-types) | yes |
| binary | [OpenAPI](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#data-types) | no |
| password | [OpenAPI](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#data-types) | no |

## OpenAPI editors

At this time, {{% variables/apibuilder_prod_name %}} does not have a UI for editing OpenAPI documents. We recommend using an external tool like [Stoplight](https://stoplight.io) to create and manage your OpenAPI documents (API-first). It provides collaborative design, mocking, and revision history.

## Writing OpenAPI documents

Before writing your own OpenAPI documents, you should be aware of the [unsupported features](#unsupported-features). Also, have a look at our [OpenAPI tips](/docs/guide_openapi/openapi_tips) for ideas on how to write better OpenAPI specifications. The following sections provide technical details about how {{% variables/apibuilder_prod_name %}} will interpret your OpenAPI specification.

### API prefix

All API in {{% variables/apibuilder_prod_name %}} are bound to a configurable [`apiPrefix`](/docs/developer_guide/project/configuration/project_configuration#apiprefix) path, which defaults to `/api`. Any path under the [`apiPrefix`](/docs/developer_guide/project/configuration/project_configuration#apiprefix) is protected by the configured authentication scheme in [`accessControl.apiPrefixSecurity`](/docs/developer_guide/project/configuration/project_configuration#accesscontrol), and will require that clients provided the requisite credentials in order to invoke the API.

Paths that are defined in your OpenAPI document, that are subsequently bound to [flows](/docs/developer_guide/flows), will be appended to the [`apiPrefix`](/docs/developer_guide/project/configuration/project_configuration#apiprefix). For example, if your OpenAPI specification defines the path `/users`, it will be accessible from {{% variables/apibuilder_prod_name %}} as `/api/users`.

Sometimes, having API bound to `/api` is not desirable from a client perspective. If all your designed paths begin with a common prefix, then by changing your [`apiPrefix`](/docs/developer_guide/project/configuration/project_configuration#apiprefix) in configuration to match the common prefix, {{% variables/apibuilder_prod_name %}} will not apply the prefix twice, and the common prefix will be deduped. The following table illustrates.

| OpenAPI example path(s)    | apiPrefix | Bound API path(s)                       | Deduped |
| -------------------------- | --------- | --------------------------------------- | ------- |
| /apple                     | /api      |  /api/apple                             | no |
| /apple                     | /fruits   | /fruits/apple                           | no |
| /apple<br>/banana          | /api      | /api/apple<br>/api/banana               | no |
| /api/apple<br>/api/banana  | /fruits   | /fruits/api/apple<br>/fruits/api/banana | no |
| /api/apple<br>/api/banana  | /api      | /api/apple<br>/api/banana               | yes |

{{% alert title="Note" color="primary" %}}The OpenAPI 2.0 [`basePath`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#fixed-fields) is ignored when computing the accessible OpenAPI paths.{{% /alert %}}

It is possible for paths to clash when also using [Custom API](/docs/developer_guide/apis), so on startup watch for warning messages. You should resolve path conflicts before going to production.

### OpenAPI 2.0 basePath, host, and schemes

Any [OpenAPI 2.0 fields](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#fixed-fields) `basePath`, `host`, and `schemes` in the specification will be ignored by {{% variables/apibuilder_prod_name %}} and can be [overridden](#overriding-servers-host-schemes-or-basepath).

### Overriding servers, host, schemes, or basePath

There is a list of optional [`apidoc.overrides`](/docs/developer_guide/project/configuration/project_configuration#apidoc) that you can specify as part of your service configuration that would allow you to tweak how the API specification is generated. This allows you to tweak specific OpenAPI values that are useful when the service is not consumed directly, such as when the services is exposed through a proxy. For example, you can change the defined [OpenAPI servers](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#openapi-object), allowing the server URL(s) to be changed for different hosting environments, such as development, test, or production.

{{% alert title="Tip" color="primary" %}}
Plan on using the {{% variables/apibuilder_prod_name %}} [apidoc.overrides](/docs/developer_guide/project/configuration/project_configuration#apidoc) overrides for every hosting environment. You do not have to try to define all the environment(s) within one document.
{{% /alert %}}

### Use operationId

**OpenAPI** flow-trigger uses the [`operationId`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#fixed-fields-8) to uniquely identify operations, which are necessary when binding specific API operations to flows. While the `operationId` is optional in OpenAPI, we would recommend using it. If one is not provided, **OpenAPI** flow-trigger will generate one dynamically from the operation HTTP method and path (including path parameters), unnecessarily tightly couples the dynamically generated `operationId` to the operation. This can have an adverse affect of unbinding previously bound flows, if any of these properties change.

Using `operationId` has the following benefits:

1. Allows you to change the HTTP method or path without any impact on previously bound flows.
1. Useful as a short-hand identifier. For example, "getUserById" might be easier to communicate than "GET /organization/users/{userId}"
1. Used when writing flow files to disk, so it provides a stronger connection to the API specification. Should any issues arises with a flow, they can be more easily traced back to the OpenAPI operation.

{{% alert title="Tip" color="primary" %}}
Using OpenAPI `operationId` will make managing OpenAPI easier.
{{% /alert %}}

### Security definitions are removed

**OpenAPI** flow-trigger will remove all [security requirements](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#securityRequirementObject), and [security schemes](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#componentsSecuritySchemes) from the entire OpenAPI specification. This is because {{% variables/apibuilder_prod_name %}} has its own [configurable authentication](/docs/developer_guide/project/configuration/project_configuration#accesscontrol), and it will replace the security with its own.

{{% alert title="Tip" color="primary" %}}
You do not need to define your own OpenAPI security, {{% variables/apibuilder_prod_name %}} will do that for you.
{{% /alert %}}

### Default error codes and responses

API Builder provides can return default errors and responses to the client that are not handled by the flow. Such errors can occur when the client makes a bad request, fails authentication, exceeds upload limits, or if an unexpected error occurred. It is recommended that you include the detail of all the potential errors, so that client developers know what to expect from the API. For convenience, a full specification of all the errors are listed below for convenience to use within your OpenAPI specifications.

```yaml
components:
  schemas:
    AxwayError:
      type: object
      description: Axway error response.
      additionalProperties: true
      required:
        - success
        - message
      properties:
        id:
          description: A unique error code.
          type: string
        'request-id':
          description: A unique request identifier.
          type: string
          format: uuid
        success:
          description: A boolean indicating failure.
          type: boolean
          enum:
            - false
        code:
          description: The HTTP error code
          type: number
        message:
          description: A summary of the error
          type: string
        errors:
          description: An array of errors for additional context
          type: array
          items:
            type: string
            minLength: 1
  responses:
    BadRequest:
      description: Bad request
      content:
        application/json:
          schema:
            allOf:
            - $ref: '#/components/schemas/AxwayError'
            properties:
              code:
                type: number
                enum:
                  - 400
    Unauthorized:
      description: Unauthorized
      content:
        application/json:
          schema:
            allOf:
            - $ref: '#/components/schemas/AxwayError'
            properties:
              id:
                type: string
                enum:
                  - com.appcelerator.api.unauthorized
              code:
                type: number
                enum:
                  - 401
    NotFound:
      description: Bad request
      content:
        application/json:
          schema:
            allOf:
            - $ref: '#/components/schemas/AxwayError'
            properties:
              code:
                type: number
                enum:
                  - 404
    PayloadTooLarge:
      description: Bad request
      content:
        application/json:
          schema:
            allOf:
            - $ref: '#/components/schemas/AxwayError'
            properties:
              code:
                type: number
                enum:
                  - 413
    InternalServerError:
      description: Bad request
      content:
        application/json:
          schema:
            allOf:
            - $ref: '#/components/schemas/AxwayError'
            properties:
              code:
                type: number
                enum:
                  - 500
```
