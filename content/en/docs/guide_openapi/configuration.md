---
title: Configuration
weight: 100
date: 2022-03-01
description: This chapter describes how to configure **OpenAPI** flow-trigger to change the default behavior.
---

## API prefix

All API in {{% variables/apibuilder_prod_name %}} are bound to a configurable [`apiPrefix`](/docs/developer_guide/project/configuration/project_configuration#apiprefix) path, which defaults to `/api`. Any path under the [`apiPrefix`](/docs/developer_guide/project/configuration/project_configuration#apiprefix) is protected by the configured authentication scheme in [`accessControl.apiPrefixSecurity`](/docs/developer_guide/project/configuration/project_configuration#accesscontrol), and will require that clients provided the requisite credentials in order to invoke the API.

Paths that are defined in your OpenAPI document, that are subsequently bound to [flows](/docs/developer_guide/flows), will be appended to the [`apiPrefix`](/docs/developer_guide/project/configuration/project_configuration#apiprefix). For example, if your OpenAPI specification defines the path `/users`, it will be accessible from {{% variables/apibuilder_prod_name %}} as `/api/users`.

Sometimes, having API bound to `/api` is not desirable from a client perspective. If all your designed paths begin with a common prefix, i.e. `/service`, then by changing your [`apiPrefix`](/docs/developer_guide/project/configuration/project_configuration#apiprefix) in configuration to match this prefix, {{% variables/apibuilder_prod_name %}} will not apply the prefix twice, allowing `/service/user` to be bound as-is (the [`apiPrefix`](/docs/developer_guide/project/configuration/project_configuration#apiprefix) will be automatically deduped).

| apiPrefix | OpenAPI example path(s)    | Bound API path(s)    | Deduped |
| --------- | ------------------------- | --------------------- | ------- |
| /api      | /apple | /api/apple | no |
| /fruits   | /apple | /fruits/apple | no |
| /api      | /apple<br>/banana | /api/apple<br>/api/banana | no |
| /fruits   | /api/apple<br>/api/banana | /fruits/api/apple<br>/fruits/api/banana | no |
| /api      | /api/apple<br>/api/banana | /api/apple<br>/api/banana | yes |

{{% alert title="Note" color="primary" %}}The OpenAPI 2.0 [`basePath`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#fixed-fields) is ignored when computing the accessible OpenAPI paths.{{% /alert %}}

It is possible for paths to clash when also using [Custom API](/docs/developer_guide/apis), so on startup watch for warning messages. You should resolve path conflicts before going to production.

## Overrides

There is a list of optional [`apidoc.overrides`](/docs/developer_guide/project/configuration/project_configuration#apidoc) that you can specify as part of your service configuration that would allow you to tweak how the API specification is generated. This allows you to tweak specific OpenAPI values that are useful when the service is not consumed directly, such as when the services is exposed through a proxy.  For example, you can change the defined OpenAPI servers.
