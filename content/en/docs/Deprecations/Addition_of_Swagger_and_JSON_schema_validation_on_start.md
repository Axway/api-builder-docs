---
title: Addition of Swagger and JSON schema validation on start
linkTitle: Addition of Swagger and json schema validation on start
description: ADD A DESCRIPTION
weight: 10
date: 2021-05-17
---

{{% alert title="Note" color="primary" %}}This document describes deprecation \[[D045](/docs/deprecations/#D045)\]{{% /alert %}}

Beginning with the [Bruges](#!/guide//pages/createpage.action?spaceKey=AB4&title=API+Builder+Standalone+-+20+November+2020&linkCreation=true&fromPageId=62560539) release, JSON schemas loaded by {{% variables/apibuilder_prod_name %}} will now be fully validated when the service starts. Additionally, the Swagger 2.0 documentation available from `/apidoc/swagger.json` will also be validated when the service starts to ensure that it conforms to the Swagger specification and can be safely consumed by other tools.

This will be the default behavior in all new services.

## Why are we deprecating this behavior

Previously, JSON schemas loaded by {{% variables/apibuilder_prod_name %}} would be partially validated, but could pass this validation if they had references to other schemas which had not been registered yet. Additionally, The Swagger 2.0 API documentation was not guaranteed to be valid for a number of reasons, such as when using JSON schemas which were not compatible with Swagger 2.0, or providing invalid responses definitions in custom APIs. This would either cause requests to `/apidoc/swagger.json` to fail, or expose invalid Swagger from a service without the user's knowledge.

Now, the loaded JSON schemas and the service Swagger will be fully validated on start and will terminate the service if they are invalid, prompting the user to fix them.

## How does this impact my service

This is now the default behavior for all new services. Validation will also take place on existing services, but the service will only emit warnings and will not terminate on start.

The changed behavior may impact services that use JSON schemas with refs, APIs with custom responses documentation, and services which reference JSON schemas which are incompatible with Swagger 2.0.

## Upgrading existing services

Updates contain important changes to improve the performance, stability, and security of your services. Installing them ensures that your software continues to run safely and efficiently.

It is strongly recommended you upgrade {{% variables/apibuilder_prod_name %}} to the latest version as well any data connectors you may have in your stack. This feature requires a minimum of:

* {{% variables/apibuilder_prod_name %}} - Bruges

After upgrading, the `exitOnSwaggerSchemaValidationError` feature will not be active until you enable it. To enable it, add the following setting to your `default.js` file.

```
flags: {
    exitOnSwaggerSchemaValidationError: true
}
```

More `default.js` configuration file information can be found here: [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/#flags)

Once enabled, review your startup log to ensure that the service has no invalid JSON schemas or invalid Swagger. If the application starts without error, then the upgrade is successful.
