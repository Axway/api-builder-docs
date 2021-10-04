---
title: Lisbon release notes
linkTitle: Lisbon
date: 2019-01-18
description: 18 January 2019
Hide_readingtime: true
---
## Breaking changes

* 5264:.
## Features

* #5125: Add "Home" link functionality to Axway logo and {{% variables/apibuilder_prod_name %}} text in the header
* #5180: Support the user in managing OAuth2 credentials for devops
* #5264: Provide clearer and more explicit HTTP authentication

## Fixes

* #5337: Limit graph scaling in flow editor
* #5404: RegEx DoS attack on markdown rendering engine
* #5412: OAuth 2.0 toast is not showing
* #5419: Deprecate web routes
* #5441: Create model with name containing invalid character will kill the server

## Release notes

* #5125: Previously, the the Axway logo and the {{% variables/apibuilder_prod_name %}} text in the header were not interactable. Now, they act as hyperlinks and take you to the Summary page.
* #5180: Previously, the credential cards did not provide user access to refresh and obtain tokens. Now, you can refresh and obtain tokens from the credential cards.
* #5264: Previously, requests to non-existing resources on `apiPrefix` did not have authentication. Now, all requests to `apiPrefix` must pass authentication. Added `config.accessControl` settings to clarify authentication and ensure that HTTP authentication is applied to all paths bound on `apiPrefix` and that any path not on `apiPrefix`, be required to be explicitly public. This change [deprecates the use of matchURL](/docs/deprecations/change_in_the_way_of_handling_authentication_and_authentication_plugins/#Whywearemakingthischange) in authentication plugins and deprecates the configuration settings for `APIKeyAuthPlugin` and `APIKeyAuthType`. For additional information, refer to [Change in the way of handling authentication and authentication plugins](/docs/deprecations/change_in_the_way_of_handling_authentication_and_authentication_plugins/). See deprecation {{% deprecation/link D010 %}}.
* #5337: Previously, it was possible to lose the flow in the flow editor while zooming in or out. Now, there is a limit to how far you can zoom.
* #5404: Previously, {{% variables/apibuilder_prod_name %}} used `appc-marked` for its markdown engine. Now, it is using `marked`.
* #5412: Previously, the toast notification was shown very fast and was not visible to the user. Now, the notification is clearly visible.
* #5419: Previously, {{% variables/apibuilder_prod_name %}} registered all built-in rendering engines on startup by default. Now, {{% variables/apibuilder_prod_name %}} Web feature (routes in `web/routes` folder) has been deprecated so those rendering engines are not registered by default but only if the `web/routes` folder exists. See deprecation {{% deprecation/link D011 %}}.
* #5441: Previously, creating a model having a name with a single quote would succeed to create the model, but would cause the application to fail to restart. Now, single quotes are escaped.

{{% releasenotes/deprecations %}}

## Updated modules

* [@axway/api-builder-runtime@4.6.12](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.6.12)
* [@axway/api-builder-admin@1.5.14](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.5.14)
* [@axway/api-builder@4.5.1](https://www.npmjs.com/package/@axway/api-builder/v/4.5.1)

## Updated plugins

* [@axway/api-builder-plugin-fn-swagger@2.1.1](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/2.1.1)

{{% releasenotes/previous %}}
