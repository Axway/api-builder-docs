---
title: HTTP basic credentials
linkTitle: HTTP basic credentials
weight: 20
date: 2021-10-01
---

The `basic` credential type allows you to configure a credential with a username and password. The value of this credential is the Base64 encoded `username`:`password,` suitable for use in an HTTP Basic authorization header, though it does not have the "Basic" prefix embedded. Plugins, such as the Swagger plugin, that consume the credential will prefix it if necessary.

```javascript
// default.js

authorization: {
    credentials: {
        "<credential name>": {
            type: "basic",
            username: "<username>",
            password: "<password>"
        }
    }
}
```

A common use case for this credential type is connections between {{% variables/apibuilder_prod_name %}} services. At first, it may be a bit confusing, {{% variables/apibuilder_prod_name %}} has a configuration key called `apikey`, but the default authentication for an {{% variables/apibuilder_prod_name %}} service is `basic`, and the `apikey` is passed as the `username` of a basic authentication token. So, if your service is connected to another {{% variables/apibuilder_prod_name %}} service whose `apikey` is `abcd-1234,` your credential configuration would look like this:

```javascript
// default.js

authorization: {
    credentials: {
        "{{% variables/apibuilder_prod_name %}} service": {
            type: "basic",
            username: "abcd-1234",
            password: ""
        }
    }
```
