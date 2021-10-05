---
title: Change in the handling of comparison operators on composite models
linkTitle: Change in the handling of comparison operators on composite models
weight: 7
deprecation: D007
date: 2021-10-01
---

{{% alert title="Note" color="primary" %}}This document describes deprecation {{% deprecation/link D007 %}}{{% /alert %}}

Composite models that use alias field names only have explicit support for the `$like` operator. Use of other operators, such as `$in`, `$nin`, and so forth, with aliased fields, will behave the same as querying on a non-existent field.

This behavior has been deprecated since {{% variables/apibuilder_prod_name %}} - Eden release.

Beginning with the [Eden](/docs/release_notes/eden) release, queries on aliased fields in composite models will support the comparison operators `$eq`, `$ne`, `$in`, `$nin`, `$lt`, `$lte`, `$gt`, `$gte`, and `$like`.

This will be the default behavior in all new services.

## Why are we deprecating this feature

Previously, querying an aliased field could result in an unexpected result. For example, if a composite model has an aliased field `fname`, the expectation is that a query such as `{"fname": { "$nin": ["Tom" ] }` will return all the models except those with a `fname` of `Tom.` However, the actual result is all rows, including those whose `fname` is `Tom`. This is due to the aliased field being treated as a non-existent field.

Now, the aliased field is correctly mapped, and in the example scenario, only those rows whose `fname` is not `Tom` will be returned.

## How does this impact my service

This is now the default behavior for all new services. Any existing services will continue to work as they previously did, though it is strongly recommended you enable the new behavior on existing services.

The changed behavior may impact services that with queries on composite models that have aliased field names.

## Upgrading existing services

Updates contain important changes to improve the performance, stability, and security of your services. Installing them ensures that your software continues to run safely and efficiently.

It is strongly recommended you upgrade {{% variables/apibuilder_prod_name %}} to the latest version as well any data connectors you may have in your stack. This feature requires a minimum of:

* {{% variables/apibuilder_prod_name %}} - Eden

After upgrading, the `enableAliasesInCompositeOperators` feature will not be active until you enable it. To enable it, add the following setting to your `default.js` file.

```javascript
flags: {
    enableAliasesInCompositeOperators: true
}
```

More `default.js` configuration file information can be found here: [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/#flags)

Once enabled, review your service to ensure that you have no logic in your flows or APIs that depends on the deprecated behavior.
