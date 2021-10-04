---
title: Halifax release notes
linkTitle: Halifax
date: 2018-10-26
description: 26 October 2018
Hide_readingtime: true
---
## Features

* #4043: Add dropdown for string and number enum parameters in flows
* #5126: Left side menu should be expanded by default

## Fixes

* #4810: JSONSelect CVE-2011-4969
* #4818: UI Incorrectly counts parameters definition as an endpoint in APIs list

## Release notes

* #4043: Previously, flow-node input parameters of type string and number described as enums would require the values to be typed manually. Now, a dropdown selection is available to allow an easy selection of allowed inputs.
* #4810: Previously, `jsonselect@0.4.0` was used indirectly by `@axway/api-builder-runtime` and had three CVEs against it: [CVE-2011-4969](http://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2011-4969) - XSS with location.hash, [CVE-2012-6708](https://nvd.nist.gov/vuln/detail/CVE-2012-6708) - Selector interpreted as HTML, and [CVE-2015-9251](https://nvd.nist.gov/vuln/detail/CVE-2015-9251) - 3rd party CORS request may execute. Now, this module is no longer a runtime dependency.
* #4818: Previously, the total number of the endpoints in the API Docs view in the UI was counted incorrectly in the occasions where the parameters were attached to the root level of the endpoint in the swagger definition. Now, the total number is calculated correctly.
* #5126: Previously, the side navigation menu was collapsed by default and it was not remembering the user's preference. Now, the side navigation menu is expanded by default and it will remember the user's last choice and be consistent.

## Updated modules

* [@axway/api-builder-runtime@4.3.7](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.3.7)
* [@axway/api-builder-admin@1.4.1](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.4.1)

## Updated plugins

* [@axway/api-builder-plugin-fn-restclient@1.2.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-restclient/v/1.2.0)
* [@axway/api-builder-plugin-fn-swagger@1.1.3](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-swagger/v/1.1.3)

{{% releasenotes/previous %}}
