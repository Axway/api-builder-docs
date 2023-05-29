---
title: Enable JSON service logs
linkTitle: Enable JSON service logs
weight: 110
date: 2023-05-29
---

This document describes how to configure your {{% variables/apibuilder_prod_name %}} service to output its system logs as JSON for easier processing in external tools.

## Introduction

By default the logs in {{% variables/apibuilder_prod_name %}} services have the the following structure:

```javascript
// Example log message

1612369334411 INFO  Using 'basic' security for APIs prefixed with path /api
```

The {{% variables/apibuilder_prod_name %}} logs are very simple and have their different parts color coded to help with readability while developing. However, more often than not the user might want to use external tools for managing and processing the application logs once the application goes in production. Beginning with the [Fleming](/docs/release_notes/fleming) release you can enable json logging in your service, which would output the logs in JSON so they can be easily parsed by the external tools.

## Prerequisites

This feature have been added with the [Fleming](/docs/release_notes/fleming) release. All newly scaffolded applications, after this release, would have a new configuration option [enableLoggingAsJSON](/docs/developer_guide/project/configuration/project_configuration/#enableloggingasjson) as part of their default configuration. The feature is disabled by default.

The rest of the available configuration settings can be found in [Project configuration](/docs/developer_guide/project/configuration/project_configuration).

## Structure
The outputted logs in the the terminal console window have the following structure:

| Property | Type | Description |
| --- | --- | --- |
| timestamp | String | The time at which the message was originally outputted at. |
| logLevel | String | The log level. Possible values are: [ "TRACE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL" ].|
| scope | String | The scope usually contains any additional identification that the service provide to help track what outputted the log - i.e the plugin name, the request id when applicable, etc. In the normal logging mode these are part of the message itself.|
| message | String | The log message. |
| service | Object | Contains service information such as the `name` and the `version` of your service. |

### Example
```javascript
{
	"timestamp": 1685358261538,
	"logLevel": "INFO",
	"scope": "[timer: timer-1] [request-id: b7eadd5e-e059-49ed-985b-8e0eaf43537c]",
	"message": "The timer have triggered the flow.",
	"service": {
		"name": "my-service",
		"version": "1.0.0"
	}
}
```

## Configuring your service logging level
It is important to enable an appropriate level of logging in your service. By default all applications are configured to output 'info' and higher level logs(warn, error, fatal). You can change this setting by editing your configuration file `conf/default.js` and change the [logLevel](/docs/developer_guide/project/configuration/project_configuration/#loglevel) value or by setting the environment variable LOG_LEVEL.

If you encounter a problem with API Builder, you should inspect the logs. If necessary, decrease the logging level to “trace” to gather more information.