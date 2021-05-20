---
title: Configuring Credentials
linkTitle: Configuring credentials
description: ADD A DESCRIPTION
weight: 10
date: 2021-05-17
---

{{% variables/apibuilder_prod_name %}} credentials are defined in the [configuration](/docs/developer_guide/project/configuration/project_configuration/) under the `authorization` key. Credentials are uniquely identified by its `credential name`, and its `type`. The `credential name` is how the credential will be referenced from the flows that use the credential. Each type of credential also requires additional type-specific configuration information. {{% variables/apibuilder_prod_name %}} supports three credential types, [API Key](/docs/developer_guide/credentials/configuring_credentials/api_key_credentials/), [HTTP Basic](/docs/developer_guide/credentials/configuring_credentials/http_basic_credentials/), and [OAuth 2.0](/docs/developer_guide/credentials/configuring_credentials/oauth_2.0_credentials/) with the respective types `apiKey`, `basic`, and `oauth2`.

```javascript
// default.js

authorization: {
    credentials: {
        "<credential name>": {
            type: "<type>",
            ...
        }
    }
}
```

For additional credential management information, refer to [{{% variables/apibuilder_prod_name %}} credential management](https://devblog.axway.com/apis/new-release-api-builder-standalone-with-credential-management/). For how-to information on accessing Gmail using a Swagger flow-node, refer to [Access Gmail using a Swagger flow-node](/docs/how_to/authorization__access_gmail_using_swagger_flow-node/). For how-to information on accessing Microsoft OneDrive using a REST flow-node, refer to [Access Microsoft OneDrive using a REST flow-node](/docs/how_to/authorization__access_microsoft_onedrive_using_rest_flow-node/).
