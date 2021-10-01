---
title: Agra release notes
linkTitle: Agra
date: 2020-11-06
description: 6 November 2020
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6583: Previously, the Flows tab was listing a combination of Flow and Flow-Trigger information, which was resulting in flows being listed multiple times for each way they are triggered. Now, the Flows tab lists only a single Flow and the types of triggers that invoke it are represented as labels on that entry.

## Fixes

* #5911: Previously, the 401 responses in the generated Swagger API docs were referring to the ErrorModel definition which didn't describe the response from the server correctly. Additionally, Endpoints didn't have documentation for 401 responses handled by the API builder security. Now, the schema for 401 responses has been replaced with a new UnauthorizedError definition which describes the actual response, and 401 response definitions have been added to Endpoint responses.
* #6590: Previously, flow-trigger and channel parameters failed to validate correctly when using JSONPath selectors to $.env or $.config. Now, {{% variables/apibuilder_prod_name %}} validates their resolved values correctly.
* #6606: Previously, {{% variables/apibuilder_prod_name %}} was using a old version of swagger-tools that was using an insecure version of lodash ([CVE-2019-10744](https://nvd.nist.gov/vuln/detail/CVE-2019-10744)). Now, {{% variables/apibuilder_prod_name %}} uses a forked version of swagger-tools (@axway/swagger-tools) with upgraded dependencies, and fixes a number of security issues while also reducing the disk footprint of {{% variables/apibuilder_prod_name %}} by roughly 10MB.
* #6614: Previously, when loading flow-triggers, the trigger and channel parameters were not correctly validated. Additionally, a message "meta-schema is not available" may be printed to the console. Now, the channel and trigger parameters are validated correctly and the message has been removed.
* #6619: Intercom bubble has been removed from the UI. To raise issues, you can contact us at [support.axway.com](https://support.axway.com/).
* #6622: Previously, editing a trigger name on the flow editor could cause an error in the console and the editor to render empty. Now, editing a trigger name will wait for all triggers to finish loading before trying to render the flow editor.

## Updated modules

* [@axway/api-builder-admin@1.28.0](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.28.0)
* [@axway/api-builder-runtime@4.41.1](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.41.1)

## Updated plugins

* [@axway/api-builder-plugin-dc-mssql@2.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/2.0.0)

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues/).

{{% releasenotes/previous %}}
