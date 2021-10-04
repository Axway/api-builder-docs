---
title: Valencia release notes
linkTitle: Valencia
date: 2019-06-21
description: 21 June 2019
Hide_readingtime: true
---

{{% releasenotes/upgrade %}}
## Fixes

* #5620: Fix string-based model queries on dates, booleans and number fields
* #5819: Fix invalid JSON Schema and Swagger documentation generated for models that have PK of type date

## Release notes

* #5620: The Memory connector has been updated to use Version 2 of the "mingo" dependency for data storage and queries. This fixes multiple issues, including problems finding and updating objects and dates. Note that trying to use any unknown operators, such as $foo, when querying on the Memory connector will result in an error.
* #5620: Previously, there were issues when using strings to query date, number, and boolean fields on findAndModify, query, count, and distinct model methods. Queries such as '\\{ "DATE": { "$gt": "2020-10-10" } }' would fail to work causing database errors. Now, the values in queries are interpreted as the correct type when interacting with the underlying database.
* #5819: Previously, the service would fail to start when loading a Model with a Date as a Primary Key. Now, the service will start.
* #5819: Previously, when generating Swagger documentation for your service, certain parameters which are Date fields internally would be represented using type: 'string' and format: 'date' or 'date-time'. This format did not allow for the variety of date formats that work when calling the API, so certain inputs would be rejected if validated against the Swagger documentation. Now, the format has been removed, allowing any date format to be provided.

## Updated modules

* [@axway/api-builder-runtime@4.11.37](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.11.37)
* [@axway/api-builder-admin@1.10.17](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.10.17)
* [@axway/api-builder@4.5.23](https://www.npmjs.com/package/@axway/api-builder/v/4.5.23)

{{% releasenotes/previous %}}
