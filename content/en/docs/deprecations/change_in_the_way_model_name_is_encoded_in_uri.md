---
title: Change in the way model name is encoded in URI
linkTitle: Change in the way model name is encoded in URI
weight: 110
date: 2021-10-01
---

{{% alert title="Note" color="primary" %}}This document describes deprecation \[[D012](/docs/deprecations/#D012)\]{{% /alert %}}

## Change in the way model name is encoded in URI

Using model names as-is (without modification) when bound to ExpressJS API has been deprecated since the {{% variables/apibuilder_prod_name %}} - [Osaka](/docs/release_notes/standalone_-_1_march_2019/) release.

Beginning in the [Osaka](/docs/release_notes/standalone_-_1_march_2019/) release, model names will be percent-encoded according to [RFC-3986](https://tools.ietf.org/html/rfc3986) for auto-generated Model API.

### Why we are making this change

Currently, model names are bound to auto-generated Model API paths for ExpressJS without any encoding. According to [RFC-3986](https://tools.ietf.org/html/rfc3986), characters not in `A-Z a-z 0-9 - _ . ~`, should be percent-encoded when included in a URI. So, for example, currently a model named "employee's" will be bound to an ExpressJS API as `/api/employee's`. Many NodeJS libraries will automatically encode requests to `/api/employee's`, as `/api/employee%27s`, which can make calling the API difficult from NodeJS applications ({{% variables/apibuilder_prod_name %}} will return 404 because it is not listening on `/api/employee%27s`). However, some HTTP clients, such as cURL, are less strict and permit non-RFC-3986 URI. To make {{% variables/apibuilder_prod_name %}} standards compliant and consistent with respect to model names, when {{% variables/apibuilder_prod_name %}} needs to encode model names into a URI, they will be encoded as per RFC-3986.

### How does this impact my service

Models that have auto-generated API can potentially have a different API, and clients that would previously succeed in calling affected API will fail. This is especially true for models that are generated from the [database connectors](/docs/developer_guide/connectors/). For example, "oracle/employee" will be bound to API `/api/oracle%2Femployee`. Most manually created model names are _probably_ generally safe. You can test your model names with the `encodeURIComponentRFC3986` function below:

```javascript
// Encode URI Component RFC-3986

/**
 * Encodes a URI component using a more strict RFC3986 encoding.
 *
 * @param {string} str - The string to encode.
 * @return {string} The RFC3986 encoded component.
 */
function encodeURIComponentRFC3986(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return `%${c.charCodeAt(0).toString(16)}`;
  });
}
```

If the function produces a different name, then your model API will be affected. For example:

```
// Example RFC-3986

console.log(encodeURIComponentRFC3986("oracle/employee")); // "oracle%2Femployee"
```

### Upgrading the existing configuration

```
// Enable model name URI encoding

flags: {
    enableModelNameEncoding: true
}
```

After upgrading your configuration, you may also need to upgrade your clients to use the new API.
