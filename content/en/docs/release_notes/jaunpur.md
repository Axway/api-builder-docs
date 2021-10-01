---
title: Jaunpur release notes
linkTitle: Jaunpur
date: 2021-03-26
description: 26 March 2021
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}

## Features

* #6775: References to the Amplify CLI in the {{% variables/apibuilder_prod_name %}} CLI and documentation have been replaced with with the Axway CLI.

## Fixes

* #6774: Previously, when deleting all flow-triggers from the flow and saving the flow, the last flow-trigger would never be deleted. Now, flow-triggers are deleted as expected.
* #6780: Previously, when restarting {{% variables/apibuilder_prod_name %}}, the Kafka flow-trigger [@axway/api-builder-plugin-ft-kafka](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-kafka) would occasionally cause an error, `UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'warn' of undefined`. Now, Kafka can be restarted without error.
* #6791: Previously, it was possible to create invalid models via the API that had invalid field types and subsequently cause the server to crash with the error: `Swagger schema validation failed`. Now, model field types are restricted to: array, boolean, date, number, object, and string.

## Known issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues).

{{% releasenotes/previous %}}
