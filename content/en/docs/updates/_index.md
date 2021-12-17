---
title: Updates
linkTitle: Updates
weight: 100
date: 2021-10-01
---

## Introduction

{{% variables/apibuilder_prod_name %}} is designed to primarily run your _configuration_, not code. This is important because we can better ensure backward compatibility with each update. We guarantee that your configuration will continue to work with each update. {{% variables/apibuilder_prod_name %}} "owns" the configuration, such as flows (/flows), and in rare instances, we may upgrade these between releases. However, there are files that are part of your {{% variables/apibuilder_prod_name %}} project that are either code or files owned by the application. In other words, we will _never_ touch these files in a regular update:

* package.json
* legacy API (/apis)
* code blocks (/blocks, deprecated)
* configuration (/conf)
* models (/models)
* JSON schemas (/schemas)
* Swagger files (/swagger)
* unit-test files (/test)
* Dockerfile

However, from time to time, we may change these files for new applications. For example, we may change the package.json, Dockerfile, or the unit-tests. The purpose of this document is to inform you of those changes so that you can decide whether or not you need them.

For how to keep your {{% variables/apibuilder_prod_name %}} version up-to-date see [Updating {{% variables/apibuilder_prod_name %}}](/docs/getting_started/#updating-api-builder). You should also keep a close eye on our [Release Notes](/docs/release_notes), our list of [Deprecations](/docs/deprecations), and this document.
