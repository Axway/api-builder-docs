---
title: Change in the way null fields are returned in Models
linkTitle: Change in the way null fields are returned in Models
weight: 130
date: 2021-10-01
---

{{% alert title="Note" color="primary" %}}This document describes deprecation \[[D013](/docs/deprecations/#D013)\]{{% /alert %}}

## Change in the way null fields are returned in Models

When retrieving data from Models, fields with null or undefined values would be missing from the response.

This behavior has been deprecated since {{% variables/apibuilder_prod_name %}} - [Quebec](/docs/release_notes/standalone_-_29_march_2019/) release.

Beginning with the [Phoenix](/docs/release_notes/standalone_-_15_march_2019/) release, data retrieved from models will have null fields in the response. Undefined fields will still not be returned. This behavior is part of the {{% variables/apibuilder_prod_name %}} runtime but also relies on the connector differentiating null values from undefined.

This will be the default behavior for all new services.

### Why are we deprecating this feature

In the majority of cases, null is a valid data type in databases and should be represented in {{% variables/apibuilder_prod_name %}} rather than ignored. With SQL databases, users will expect consistent fields between records. For non-SQL databases like MongoDB, fields may not be present or included records, and this should be differentiated from existing fields that have null values.

### How does this impact my service

This is now the default behavior for all new services. Any existing services will continue to work as they previously did, though it is strongly recommended you enable the new behavior on existing services.

The following examples will show the previous behavior when requesting data from a table where a field can be null`.`

| ID | FIRST_NAME | MIDDLE_NAME | LAST_NAME |
| --- | --- | --- | --- |
| 0 | "Joe" | NULL | "Bloggs" |
| 1 | "Michael" | "Daniel" | "Higgins" |
| 2 | "Batman" |  |  |

#### Previous behavior

```
// Response

[
  {
    "ID": 0,
    "FIRST_NAME": "Joe",
    "LAST_NAME": "Bloggs"
  },
  {

    "ID": 1,
    "FIRST_NAME": "Michael",
    "MIDDLE_NAME": "Daniel",
    "LAST_NAME": "Higgins"
  },
  {
    "ID": 2,
    "FIRST_NAME": "Batman"
  },
]
```

#### New behavior (enableNullModelFields flag enabled)

```
// Response

[
  {
    "ID": 0,
    "FIRST_NAME": "Joe",
    "MIDDLE_NAME": null,
    "LAST_NAME": "Bloggs"
  },
  {

    "ID": 1,
    "FIRST_NAME": "Michael",
    "MIDDLE_NAME": "Daniel",
    "LAST_NAME": "Higgins"
  },
  {
    "ID": 2,
    "FIRST_NAME": "Batman"
  },
]
```

### Additional changes

This change alters the way that composite Models with multiple joins behave in certain situations. Given the following two tables, and a composite join on both FIRST_NAME and MIDDLE_NAME, the requesting the data would previously result in an unexpected response. The examples show the result of a findAll request, which returns all fields which contain matching FIRST_NAME and MIDDLE_NAME fields. As you can see, MIDDLE_NAME was previously ignored when the value was null, resulting in a second match with "Joe James Bloggs".

| ID | FIRST_NAME | MIDDLE_NAME | LAST_NAME |  | ID | FIRST_NAME | MIDDLE_NAME | LAST_NAME |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | "Joe" | NULL | "Bloggs" |  | 0 | "Joe" | NULL | "Bloggs" |
| 1 | "Michael" | "Daniel" | "Higgins" |  | 1 | "Joe" | "James" | "Bloggs" |

#### Previous behavior

```
// Response

[
  {
    "FIRST_NAME": "Joe",
    "LAST_NAME": "Bloggs"
  },
  {
    "FIRST_NAME": "Joe",
    "LAST_NAME": "Bloggs"
  }
]
```

#### New behavior (enableNullModelFields flag enabled)

```
// Response

[
  {
    "FIRST_NAME": "Joe",
    "MIDDLE_NAME": null,
    "LAST_NAME": "Bloggs"
  }
]
```

#### Upgrading existing services

Updates contain important changes to improve the performance, stability, and security of your services. Installing them ensures that your software continues to run safely and efficiently.

This only affects services that rely on Models that have nullable fields.

It is strongly recommended you upgrade {{% variables/apibuilder_prod_name %}} to the latest version as well any data connectors you may have in your stack. This feature requires a minimum of:

* {{% variables/apibuilder_prod_name %}} - Quebec

After upgrading, the enableNullModelFields feature will not be active until you enable it. To enable it, add the following setting to your `default.js` file.

```
flags: {
    enableNullModelFields: true
}
```

More `default.js` configuration file information can be found here: [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/#flags)

Once enabled, review your service to ensure that you have no logic in your flows or APIs that depends on the deprecated behavior.
