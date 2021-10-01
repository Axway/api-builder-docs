---
title: Wrecsam release notes
linkTitle: Wrecsam
date: 2021-09-24
description: 24 September 2021
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}
## Features

* #7065: Added new config options to disable content-md5 and etag headers for additional performance. The option to disable the server header was also moved alongside these new options. See deprecation {{% deprecation/link D051 %}}.

## Fixes

* #7008: Previously, the @axway/api-builder-project-utils `api-builder-copy-file` script was not working as expected on Windows. Additionally, the behavior was inconsistent when not providing a trailing slash in the destination. Now, the documentation clarifies that only POSIX style paths should be used, compatibility problems with Windows have been resolved, and destinations without a trailing slash are always treated as files.
* #7008: All data connector plugins have a minor issue resolved where their config file may not be copied correctly on the first install.
* #7022: Previously, the default `subscriptionUsageTracking.reportInterval` was every 5 minutes (300s). Now, the default report interval has been increased to 1 hour.
* #7066: Previously, large flow payloads or input/output values could cause performance issues, even if logging is INFO or disabled. This is especially true for binary values. Now, large flow payloads or input/output values do not significantly degrade performance when values are not logged.

{{% releasenotes/deprecations %}}

## Updated modules

* [@axway/amplify-api-builder-cli@1.18.3](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.18.3)
* [@axway/api-builder@4.26.12](https://www.npmjs.com/package/@axway/api-builder/v/4.26.12)
* [@axway/api-builder-admin@1.45.2](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.45.2)
* [@axway/api-builder-project-utils@2.0.0](https://www.npmjs.com/package/@axway/api-builder-project-utils/v/2.0.0)
* [@axway/api-builder-runtime@4.70.2](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.70.2)
* [@axway/api-builder-sdk@1.1.14](https://www.npmjs.com/package/@axway/api-builder-sdk/v/1.1.14)
* [@axway/api-builder-test-utils@1.5.0](https://www.npmjs.com/package/@axway/api-builder-test-utils/v/1.5.0)

## Updated plugins

* [@axway/api-builder-plugin-dc-mbs@1.0.7](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mbs/v/1.0.7)
* [@axway/api-builder-plugin-dc-mongo@1.1.16](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mongo/v/1.1.16)
* [@axway/api-builder-plugin-dc-mssql@3.0.4](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/3.0.4)
* [@axway/api-builder-plugin-dc-mysql@2.2.19](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/2.2.19)
* [@axway/api-builder-plugin-dc-oracle@3.2.1](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/3.2.1)
* [@axway/api-builder-plugin-fn-swagger@3.0.2](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/3.0.2)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues).

{{% releasenotes/previous %}}
