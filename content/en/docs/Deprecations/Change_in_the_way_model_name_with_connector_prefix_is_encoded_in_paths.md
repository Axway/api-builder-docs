---
title: Change in the way model name with connector prefix is encoded in paths
linkTitle: Change in the way model name with connector prefix is encoded in paths
description: ADD A DESCRIPTION
weight: 110
date: 2021-05-17
---

{{% alert title="Note" color="primary" %}}This document describes deprecation \[[D015](/docs/deprecations/#D015)\]{{% /alert %}}

## Change in the way model name with connector prefix is encoded in paths

URL encoding a slash between the connector and model name has been deprecated since the {{% variables/apibuilder_prod_name %}} - [Barcelona](/docs/release_notes/standalone_-_27_september_2019/) release.

Beginning in the [Barcelona](/docs/release_notes/standalone_-_27_september_2019/) release, the slash separating the connector and model name will not be URL encoded.

### Why we are making this change

Models that originate from connectors generate an API that is unnecessarily encoding a slash. So, for example, the [Oracle connector](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle) might generate "`oracle/user`". If auto-generate API is enabled for the connector, it will generate an API that looks like this: "`/api/oracle%2Fuser/query`". URL encoding the slash that separates the connector name and the model name is unnecessary and ugly.

### How does this impact my service

Model names which are prefixed with their connector name (for example, "`oracle/user`") will no longer have the slash encoded as %2F in auto-generated API paths. In a future release, these APIs will have a literal slash instead of `%2F`.

Any client that was previously accessing the Model auto-generated API using the percent-encoded slash (for example, "`/api/oracle%2Fuser/query`") should now use a literal slash (for example, "`/api/oracle/user/query`").

### Upgrading the existing configuration

Updates contain important changes to improve the performance, stability, and security of your services. Installing them ensures that your software continues to run safely and efficiently.

It is strongly recommended you upgrade {{% variables/apibuilder_prod_name %}} to the latest version as well any data connectors you may have in your stack. This feature requires a minimum of:

* [{{% variables/apibuilder_prod_name %}} - Barcelona](/docs/release_notes/standalone_-_27_september_2019/)

Enable the flag to encoded model name with connector slash:

This flag only applies when _**enableModelNameEncoding**_ is enabled. Refer to [Change in the way model name is encoded in URI](/docs/deprecations/change_in_the_way_model_name_is_encoded_in_uri/).

```
flags: {
    enableModelNameEncodingWithConnectorSlash : true
}
```

After upgrading your configuration, you may also need to upgrade your clients to use the new API.
