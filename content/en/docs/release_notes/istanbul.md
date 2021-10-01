---
title: Istanbul release notes
linkTitle: Istanbul
date: 2018-11-23
description: 23 November 2018
Hide_readingtime: true
---
## Features

* #5233: Ensure that plugins only receive plugin-specific configuration instead of the global service configuration
* 5242:

## Fixes

* #4890: Remove invisible column in Configuration list view
* #5121: The server fails to restart when saving a flow over HTTPS with SSL enabled
* #5165: Fix error when saving flow with special symbols in the filename
* #5234: Support using Credentials in flow-node parameters
* #5282: Improve localStorage detection in authorization dialog
* #5298: Fix error when importing an endpoint using a swagger document with path-level parameters.
* #5307: Fix swagger generation for services with models which have no primary key
* #5308: Support proxy settings on import API
* #5323: Replace invalid flow documentation link
* #5325: Fix spelling error in description of Set Context flow-node

## Release notes

* #4890: Previously, a column with no contents was displayed in the configuration list. Now, the column has been removed.
* #5121: Previously, the sockets used by the server when SSL is enabled were not closed when the server was shut down. This cased issues in some cases where this resulted in the inability to restart the server, such as on flow update. Now, the sockets are properly closed on shutdown allowing the server to be restarted.
* #5165: Previously, in the cases of importing of APIs or saving flows, that were coming from a swagger with special symbols in the title, was failing due to our internal validations. Now, special symbols are allowed.
* #5233: Previously, when plugins were loaded, in certain edge cases the whole service config was passed to the plugin instead of the data in its own configuration section. Now, plugins will only receive their own configuration. This is enabled with a feature flag. See deprecation {{% deprecation/link D009 %}}.
* #5242: Added pre-release support for credential management. Oauth2 credentials will be kept evergreen if possible and these credentials can be used in flows. This feature is flagged and should not be used in production. For additional information, refer to [{{% variables/apibuilder_prod_name %}} Credentials](/docs/developer_guide/credentials/).
* #5298: Previously, when creating an endpoint by importing a swagger document an error would occur if the document had a path-level parameters definition. Now, this is correctly handled and will not cause an error.
* #5307: Previously, APIs automatically generated from data connector models incorrectly specified their response type for Query and FindAll. Now, they specify the correct response schema.
* #5308: Previously, when importing APIs from URLs in the Admin UI, the requests to retrieve the swagger URL did not use the configured proxy settings. Now, the requests will use the proxy configured in the {{% variables/apibuilder_prod_name %}} configuration file.
* #5323: Previously, the documentation link in the flow editor was invalid and redirected to a non-existent page. Now, the link redirects to the correct documentation.
* #5325: Previously, there was a spelling error in the description of the "Set Context" flow-node. Now, the description is correctly spelled.

{{% releasenotes/deprecations %}}

## Updated modules

* [@axway/api-builder-runtime@4.4.21](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.4.21)
* [@axway/api-builder-admin@1.4.22](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.4.22)
* [@axway/api-builder@4.4.1](https://www.npmjs.com/package/@axway/api-builder/v/4.4.1)

## Updated plugins

* [@axway/api-builder-plugin-dc-mongo@1.1.3](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mongo/v/1.1.3)
* [@axway/api-builder-plugin-dc-mysql@2.2.2](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mysql/v/2.2.2)
* [@axway/api-builder-plugin-dc-mssql@1.0.2](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-mssql/v/1.0.2)
* [@axway/api-builder-plugin-dc-oracle@2.2.3](https://www.npmjs.com/package/@axway/api-builder-plugin-dc-oracle/v/2.2.3)
* [@axway/api-builder-plugin-fn-base64@1.0.15](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/1.0.15)
* [@axway/api-builder-plugin-fn-dot@1.0.15](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-dot/v/1.0.15)
* [@axway/api-builder-plugin-fn-json@1.0.15](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-json/v/1.0.15)
* [@axway/api-builder-plugin-fn-restclient@1.2.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/1.2.1)
* [@axway/api-builder-plugin-fn-swagger@1.1.5](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/1.1.5)
* [axway-flow-sdk@2.0.15](https://www.npmjs.com/package/axway-flow-sdk/v/2.0.15)


{{% releasenotes/previous %}}
