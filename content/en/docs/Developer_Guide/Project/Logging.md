---
title: Logging
linkTitle: Logging
description: ADD A DESCRIPTION
weight: 30
date: 2021-06-22
---

This section provides information on {{% variables/apibuilder_prod_name %}} logging components. {{% variables/apibuilder_prod_name %}} streams log messages to the console, enabling integration with third-party log aggregation tools. For additional information on integrating {{% variables/apibuilder_prod_name %}} logging with a third-party log aggregation tool, refer to [Export {{% variables/apibuilder_prod_name %}} Logs into a Data Store](/docs/how_to/export_api_builder_logs_into_a_data_store/).

## Configure logging

The logLevel can be set in the configuration. See [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/#logLevel).

## Logger methods

The following methods are available on the {{% variables/apibuilder_prod_name %}} logger in order of severity. Enabling a certain log level will print logs of severity levels before it.

* **fatal**( ...params ): Logs a message with a fatal-level severity.

* **error**( ...params ): Logs a message with an error-level severity.

* **warn**( ...params ): Logs a message with a warn-level severity.

* **info**( ...params ): Logs a message with an info-level severity.

* **debug**( ...params ): Logs a message with a debug-level severity.

* **trace**( ...params ): Logs a message with a trace-level severity.
