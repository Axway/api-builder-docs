---
title: Support policy
weight: 130
date: 2022-08-26
---

## {{% variables/apibuilder_prod_name %}} lifecycle

Major versions of {{% variables/apibuilder_prod_name %}} are supported for a minimum of two years. Each major version is designated by an incremental number, e.g. v4, v5, etc. Every year around July, a new major version of {{% variables/apibuilder_prod_name %}} will be introduced and it will enter into an [Active development phase](#active-development-phase), and the previous major version will leave Active development phase and enter [Maintenance phase](#maintenance-phase).

Each new major version will follow a two-week release plan where each release is named after an alphabetical collection of nouns. The v4 releases were named after cities. The v5 releases will be named after authors. Release names for subsequent releases will be decided later.

The current release schedule is as follows:

![Product release plan](/Images/lifecycle-release-plan.png)

_** Actual collection of release names are to be decided._

### Node.js requirements

As with any software, there will be important security releases for Node.js. These versions will often have fixes for web related vulnerabilities which are very important to when running an {{% variables/apibuilder_prod_name %}}  service. We strongly recommend to keep an eye on the [Node.js blog](https://nodejs.org/en/blog/vulnerability) for new security releases and stay up-to-date to keep your service secure. {{% variables/apibuilder_prod_name %}} will update the recommended Node.js version as and when new security releases become available.

Each major version of {{% variables/apibuilder_prod_name %}} will runs on a minimum supported version of Node.js.

| {{% variables/apibuilder_prod_name %}} version | Minimum | Minimum for CLI | Recommended             |
| ---------------------------------------------- | ------- | --------------- | ----------------------- |
| v4                                             | v8.9.0  | v.12.17.0       | v16.14.0 LTS or greater |

Any {{% variables/apibuilder_prod_name %}} major version that is currently supported introduce or deprecate support for specific Node.js versions as required, according to [Node.js release schedule](https://nodejs.org/en/about/releases).

## Active development phase

Major {{% variables/apibuilder_prod_name %}} versions are in _Active_ development for a maximum of 12 months. In Active development, releases happen every two weeks, and may contain any of the following:

* New features
* New components
* New feature deprecations
* Fixes
* Security updates

Whenever possible, we would encourage you to use the latest major version of {{% variables/apibuilder_prod_name %}}, and regularly upgrade your projects to the latest major version.

In this phase, features may be [deprecated](/docs/deprecations). If you see warnings in the console, you may be using a feature that is intended to be removed from the product in a future major release. You should endeavor to resolve the deprecation warnings. In most cases, it may be enough to add a [deprecation flag](/docs/deprecations#deprecation-flags) to the configuration. You can read more about when deprecated features will be removed from the product in the [Major version compatibility policy](#major-version-compatibility-policy) section below.

## Maintenance phase

After 12 months of [Active development](#active-development-phase), major versions of {{% variables/apibuilder_prod_name %}} enter the _Maintenance_ phase, where the product is actively maintained and supported, but releases happen much less regularly, and may contain any of the following:

* Fixes
* Security updates

It is policy that features and deprecations are not introduced in the Maintenance phase. Major versions of the product will remain in the _Maintenance_ phase for 12 months, after which, the Major version is no longer supported.

## Major version compatibility policy

Our intention is that every major version of the product be backwardly compatible with the previous major version, and that the upgrade experience from one major version to the next is as simple as "clicking a button". However, there are cases where previously [deprecated](/docs/deprecations) features _may_ be removed from a new major version. Deprecated features will only ever be removed from even-numbered major releases, e.g. v4, v6, v8, etc.
