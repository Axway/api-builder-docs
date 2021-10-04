---
title: Change in log message format for levels
linkTitle: Change in log message format for levels
weight: 49
deprecation: D049
date: 2021-10-01
---

{{% alert title="Note" color="primary" %}}This document describes deprecation {{% deprecation/link D049 %}}{{% /alert %}}

When logging is enabled, the log message format that is output includes a timestamp, followed by a message.

This behavior has been deprecated since {{% variables/apibuilder_prod_name %}} - Faro release.

Beginning with the [Giza](/docs/release_notes/giza) release, the new log format will now include a level: timestamp, log level, followed by a message. For example:

```javascript
// Example log message

1612369334411 INFO  Using 'basic' security for APIs prefixed with path /api
```

This will be the default behavior in all new services.

## Why are we deprecating this feature

Previously, it was difficult to filter logs in external applications, or understand why some messages were logged at different colors than others.

Now, the log message includes the level for each message logged. An extra space between the timestamp and message has also been removed.

## How does this impact my service

This is now the default behavior for all new services. Any existing services will continue to work as they previously did, though it is strongly recommended you enable the new behavior on existing services.

The changed behavior may impact application that process log messages from your service and rely on a specific format or fixed-position fields.

## Upgrading existing services

Updates contain important changes to improve the performance, stability, and security of your services. Installing them ensures that your software continues to run safely and efficiently.

It is strongly recommended you upgrade {{% variables/apibuilder_prod_name %}} to the latest version as well any data connectors you may have in your stack. This feature requires a minimum of:

* {{% variables/apibuilder_prod_name %}} - Giza

After upgrading, the `enableLoggingOfLevel` feature will not be active until you enable it. To enable it, add the following setting to your `default.js` file.

```json
flags: {
    enableLoggingOfLevel: true
}
```

More `default.js` configuration file information can be found here: [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/#flags)

Once enabled, ensure any applications consuming your service's logs do not depend on the deprecated behavior.
