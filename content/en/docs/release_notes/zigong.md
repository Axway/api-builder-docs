---
title: Zigong release notes
linkTitle: Zigong
description: 5 Novermber 2021
date: 2021-11-05
Hide_readingtime: true
---
## Summary

Added support for creating and editing flows in the UI with the new alpha [OAS flow-trigger](/docs/developer_guide/flows/flow_triggers/oas_flow_trigger) and added [documentation](/docs/developer_guide/flows/flow_triggers/oas_flow_trigger) with information on how to start using it and our roadmap for its development.

{{% releasenotes/upgrade %}}

<!-- ## Breaking changes -->

## Features
* #7104: Added the ability to create and edit flows with the alpha release of the [OAS flow-trigger](https://www.npmjs.com/package/@axway/api-builder-plugin-ft-oas). Now, flows can be created from the UI and invoked. :warning: Note that this module is currently WIP and should not be considered production ready.

## Fixes
* #7105: Removed body payload from `response` log at `DEBUG` level in `@axway/requester` plugin which improves performance and security.
* #7108: Removed the default decription in the Endpoints if description is not present in the loaded openAPI 3.0 api first specs.
* #7077: Fixed an issue in [arrow-orm](https://www.npmjs.com/package/arrow-orm) that, when composite Models had a [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) field was aliased (i.e. renamed), the model could not be used to create records, resulting in an error `"required field value missing"`. Now, records are created without error.
* #7078: Fixed an issue in [arrow-orm](https://www.npmjs.com/package/arrow-orm) that, when composite Models where generated from a DB that lack a primary key and then subsequently composed into a new model using [Model.reduce](https://docs.axway.com/bundle/api-builder/page/docs/developer_guide/models/index.html#reduce-a-model), it would cause startup to fail with the error, `"Unable to register flow-node: 'nodehandler://api-builder-flow-invoke/model/users'"` (where "users" is the table name), because it failed a JSON schema validation with the error, `"$.methods['update'].parameter.required[0] should be string"`. Now, the model flow-node is generated correctly and API Builder starts without error.
* #6014: Fixed an issue in [@axway/api-builder-plugin-dc-oracle](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle) that, when querying the DB with a Model with aliased field name, the results would not contain the aliased field name's property value. Now, alias fields will appear in the results.
* #7073: Fixed a security issue where HTTP headers x-frame-options, x-xss-protection, x-content-type, were not being sent with HTTP responses when requests failed authentication.

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools script -->
<!-- ## Updated modules -->

<!-- ## Updated plugins -->

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
