---
title: API key credentials
linkTitle: API key credentials
weight: 10
date: 2021-10-01
---

The `apiKey` credential type allows you to configure a credential with a static token that will be used as the value of the credential.

```
// API Key

...,
authorization: {
    credentials: {
        "<credential name>": {
            type: "apiKey",
            key: "<token>"
        }
    }
},
...
```

Generally, services that require an API key credential have a sign-up page and will grant you an API key once you have registered. These API keys typically do not expire and can be used in perpetuity.

For example, you have signed up for a weather service, received an API key `aaaa-bbbb-1234`, and are aliasing the API key as `My Weather`. To configure this credential for use in {{% variables/apibuilder_prod_name %}}, your config would look like this:

```javascript
// default.js

...,
authorization: {
    credentials: {
        "My Weather": {
            type: "apiKey",
            key: "aaaa-bbbb-1234"
        }
    }
},
...
```
