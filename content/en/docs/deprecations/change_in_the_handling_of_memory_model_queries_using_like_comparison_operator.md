---
title: Change in the handling of memory model queries using $like comparison operator
linkTitle: Change in the handling of memory model queries using $like comparison operator
weight: 8
deprecation: D008
date: 2021-10-01
---

{{% alert title="Note" color="primary" %}}This document describes deprecation {{% deprecation/link D008 %}}{{% /alert %}}

Models using the Memory connector return an empty result set when attempting to perform a query that uses the `$like` operator. For example:

![testapi_like](/Images/testapi_like.png)

This behavior has been deprecated since the {{% variables/apibuilder_prod_name %}} - Eden release.

Beginning with the [Eden](/docs/release_notes/eden) release, queries on models that use the Memory connector will support the `$like` comparison operator.

![testapi_like_new](/Images/testapi_like_new.png)

This will be the default behavior in all new services.

## Why are we deprecating this feature

Previously, queries on Memory models that attempted to use the `$like` comparison operator would return an empty result set. This could result in logic errors in your flows or APIs and is not the expected behavior of the feature. It should return a result set that matches the query passed to it.

## How does this impact my service

This is now the default behavior for all new services. Any existing services will continue to work as they previously did, though it is strongly recommended you enable the new behavior on existing services.

The changed behavior only impacts services that query models which are using the Memory connector, and those queries are using the `$like` operator.

## Upgrading existing services

Updates contain important changes to improve the performance, stability, and security of your services. Installing them ensures that your software continues to run safely and efficiently.

It is strongly recommended you upgrade {{% variables/apibuilder_prod_name %}} to the latest version as well any data connectors you may have in your stack. This feature requires a minimum of:

* {{% variables/apibuilder_prod_name %}} - Eden

After upgrading, the `enableMemoryConnectorLike` feature will not be active until you enable it. To enable it, add the following setting to your `default.js` file.

```
flags: {
    enableMemoryConnectorLike: true
}
```

More `default.js` configuration file information can be found here: [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/#flags)
