---
title: Support policy
weight: 130
date: 2022-08-26
---

## {{% variables/apibuilder_prod_name %}} lifecycle

Major versions of {{% variables/apibuilder_prod_name %}} are supported for a minimum of two years. Each major version is designated by an incremental number, e.g. v4, v5, etc. Every year around September, a new major version of {{% variables/apibuilder_prod_name %}} will be introduced and it will enter into an [Active development phase](#active-development-phase), and the previous major version will leave Active development phase and enter [Maintenance phase](#maintenance-phase).

Each new major version will follow a two-week release plan where each release is named after an alphabetical collection of nouns. The v4 releases were named after cities. The v5 releases will be named after authors. Release names for subsequent releases will be decided later.

The current release schedule is as follows:

![Product release plan](/Images/lifecycle-release-plan.png)

### Releases

Below are all the {{% variables/apibuilder_prod_name %}} releases and their current status. Each major version of {{% variables/apibuilder_prod_name %}} will runs on a minimum supported version of Node.js.

| {{% variables/apibuilder_prod_name %}} version | Status | Release Names | Minimum Node.js                | Minimum Node.js for CLI            | Recommended Node.js                | Active Start | Maintenance Start | Support Stop |
| ---------------------------------------------- | ------ | ------------- | ------------------------------ | ---------------------------------- | ---------------------------------- | ------------ | ----------------- | ------------ |
| v4                                             | Active | Cities        | {{% variables/minimum_node %}} | {{% variables/minimum_node_cli %}} | {{% variables/recommended_node %}} | 2018-06-29   |                   |              |

As with any software, it is important to keep up all components up to date. The [Updates](/docs/developer_guide/console#updates-tab) tab in {{% variables/apibuilder_prod_name %}} can be used to keep {{% variables/apibuilder_prod_name %}} up to date.

Similarly, there will be important security releases for Node.js. These versions will often have fixes for web related vulnerabilities which are very important to when running an {{% variables/apibuilder_prod_name %}} service. We strongly recommend to keep an eye on the [Node.js blog](https://nodejs.org/en/blog/vulnerability) for new security releases and stay up-to-date to keep your service secure. {{% variables/apibuilder_prod_name %}} will update the recommended Node.js version when we add support, and as new security releases become available.

Any {{% variables/apibuilder_prod_name %}} major version that is currently supported can introduce or deprecate support for specific Node.js versions as required, according to [Node.js release schedule](https://nodejs.org/en/about/releases).

## Active development phase

Major {{% variables/apibuilder_prod_name %}} versions are in _Active_ development for at least 12 months. In Active development, releases happen every two weeks, and may contain any of the following:

* New features
* New components
* New feature deprecations
* Fixes
* Security updates

Whenever possible, we encourage you to use the latest version of {{% variables/apibuilder_prod_name %}} by regularly applying all available updates and upgrades to your projects, and to contact support if any issues arise in doing so.

In this phase, features may be [deprecated](/docs/deprecations). If you see warnings in the console, you may be using a feature that is intended to be changed or removed from the product in a future major release. You should endeavor to resolve the deprecation warnings. In most cases, it may be enough to add a [deprecation flag](/docs/deprecations#deprecation-flags) to the configuration. You can read more about when deprecated features are planned to be removed from the product in the [Major version compatibility policy](#major-version-compatibility-policy) section below.

## Maintenance phase

When a new major version of {{% variables/apibuilder_prod_name %}} is released, previous major versions enter the _Maintenance_ phase, where the product is actively maintained and supported, but releases happen much less regularly, and may contain any of the following:

* Fixes
* Security updates

It is policy that deprecations are not introduced in the Maintenance phase. Major versions of the product will remain in the _Maintenance_ phase for 12 months, after which, the Major version is no longer supported.

## Major version compatibility policy

Each major version will have a number of breaking changes from the previous version, but our intention is that it should be as easy as possible to upgrade from one major version to the next. We give users the opportunity to opt-in to breaking changes at their own leisure by [deprecating](/docs/deprecations) old behavior well in advance of a breaking change being introduced in a future major version.
