---
title: Deprecations
linkTitle: Deprecations
weight: 110
no_list: true
date: 2021-06-22
---

{{% variables/apibuilder_prod_name %}} regularly adds feature improvements, fixes, and occasionally identify and fix features that do not work as designed, or are orthogonal to the intended direction of the product. When these are identified, we mark them as deprecated and add them to this document. We intend to remove all the deprecated features in the next major release of the product.

{{% alert title="⚠️ Note" color="primary" %}}To ensure that you stay abreast of important updates and to make it easier to upgrade, you should pay attention to the deprecation warnings and address them as soon as possible.{{% /alert %}}

Direct or indirect use of deprecated features may result in a warning when the service starts. This should not affect the functionality of your service, but the flags should be an indication that, if ignored, your service may fall behind any future breaking changes and may increase the effort to upgrade to future major releases.

## Deprecation flags

Where fixing a bug or introducing a feature would introduce a breaking change, we create a deprecation flag that is disabled by default, meaning that it will have no impact on your project. However, it should not be ignored. These flags are provided to allow you to manually review the change and be aware of a functional change that may also require code or config to be modified.

When addressing deprecation warnings with corresponding flags, you should compare the following set of flags with those located in your `./conf/default.js`. The full set of flags is below for convenience. In upgraded applications, the flags are disabled by default. However, newly created applications will have these flags enabled. For each deprecation warning, you should find the corresponding feature flag below, read the document, and understand how it applies to your application. To ensure that your application continues to operate as expected, it is essential that you have unit-tests for all your interfaces. Enabling a flag, without understanding or testing the impact can have adverse effects.

{{% flags/config %}}

## List of Deprecated features

The following sections list the deprecated features.

{{% deprecation/list %}}
