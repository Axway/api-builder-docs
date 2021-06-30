---
title: Removal of strings as default Model IDs
linkTitle: Removal of strings as default Model IDs
description: ADD A DESCRIPTION
weight: 160
date: 2021-06-22
---

{{% alert title="Note" color="primary" %}}This document describes deprecation \[[D005](/docs/deprecations/#D005)\]{{% /alert %}}

## Primary keys will no longer default to string

Using strings as the default Model IDs in the generated APIs and flows has been deprecated since the {{% variables/apibuilder_prod_name %}} - Canberra release.

Beginning with the [Canberra](/docs/release_notes/standalone_-_17_august_2018/) release, Model IDs are based on the database's primary key type. This will be the default behavior in all new services.

### Why are we deprecating this feature

Previously, APIs that required an ID always expected the Model ID to be a string, even if it was handled internally as a numeric value. However, APIs that return IDs (for example, `findAll`) returned the ID using the correct type. Now, to be consistent, all APIs will require and return the correct ID type.

### How does this impact my application

The following areas are impacted:

* Flows

* Models

* API

### Upgrading existing applications

Updates contain important changes to improve the performance, stability, and security of your services. Installing them ensures that your software continues to run safely and efficiently.

It is strongly recommended you upgrade {{% variables/apibuilder_prod_name %}} to the latest version as well any data connectors you may have in your stack. This feature requires a minimum of:

* {{% variables/apibuilder_prod_name %}} - Canberra

* Mongo data connector (@axway/api-builder-plugin-dc-mongo) version 1.1.0

* MySQL data connector (@axway/api-builder-plugin-dc-mysql) version 2.2.0

* Oracle data connector (@axway/api-builder-plugin-dc-oracle) version 2.2.0

After upgrading, the `usePrimaryKeyType` feature will not be enabled until you enable it. To enable it, add the following setting to your `default.js` file.

```
flags: {
    usePrimaryKeyType: true
}
```

More `default.js` configuration file information can be found here: [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/#flags)

{{% alert title="⚠️ Note" color="primary" %}}Enabling the `usePrimaryKeyType` feature is a breaking change for old releases, and it is recommended that you re-test your service after enabling the feature.{{% /alert %}}
