---
title: Change in the way endpoints is controlled when no spec plugin is installed
linkTitle: Change in the way endpoints is controlled when no spec plugin is installed
weight: 55
deprecation: D053
date: 2022-04-22
---

{{% alert title="Note" color="primary" %}}This document describes deprecation {{% deprecation/link D0530 %}}{{% /alert %}}

Usage of endpoints has been deprecated since {{% variables/apibuilder_prod_name %}} [London](/docs/release_notes/london) release.

Beginning in the [London](/docs/release_notes/london) release, usage of endpoints can be enabled/disabled if no spec plugins are installed.

## Why are we making this change

Prior to [London](/docs/release_notes/london) release, it was not possible to enable/disable the usage of Endpoints if no spec plugins are installed.

## How does this impact my service

Most applications should not be effected by this as new {{% variables/apibuilder_prod_name %}} project will have this flag disabled by default with spec plugin installed.

## Upgrading existing configuration

Updates contain important changes to improve the performance, stability, and security of your services. Installing them ensures that your software continues to run safely and efficiently.

It is strongly recommended you upgrade {{% variables/apibuilder_prod_name %}} to the latest version as well any data connectors you may have in your stack. This feature requires a minimum of:

* [{{% variables/apibuilder_prod_name %}} - London](/docs/release_notes/london)

Enable the flag to disable the usage of endpoints:

```javascript
// Disable Endpoints
flags: {
    disableEndpoints: true
}
```

More `default.js` configuration file information can be found here: [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/#flags)

Once enabled, review your service to ensure that you have no logic in your flows or APIs that depends on the deprecated behavior.
