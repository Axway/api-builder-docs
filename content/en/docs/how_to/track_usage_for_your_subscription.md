---
title: Track usage for your subscription
linkTitle: Track usage for your subscription
weight: 140
date: 2021-10-01
---

## Overview

Each {{% variables/apibuilder_prod_name %}} integration that you create can report its own transaction usage to the platform without the need for an agent. Transactions are reported against Environments in your Organization, and you can review these transactions along with those from [other Amplify products](https://docs.axway.com/bundle/subusage_11_en/page/amplify_subscription_usage_and_reporting.html). For more information, see [Subscription Usage Tracking](https://docs.axway.com/bundle/subusage_11_en/page/about_subscription_usage_tracking.html).

### What is counted as a transaction?

If your service receives inbound events which trigger business logic, then this is counted as a transaction. This includes the following:

* HTTP requests to [endpoints](/docs/developer_guide/flows/manage_endpoints/), [APIs](/docs/developer_guide/apis/), and [web routes](/docs/developer_guide/web/).
* Flow-triggers invoking a [flow](/docs/developer_guide/flows/) from an inbound event such as a [Kafka](/docs/developer_guide/flows/flow_triggers/kafka_consumer_flow_trigger/) or [Solace](/docs/developer_guide/flows/flow_triggers/solace_consumer_flow_trigger/) message, or on a [Cron](/docs/developer_guide/flows/flow_triggers/cron_flow_trigger/) or [Timer](/docs/developer_guide/flows/flow_triggers/timer_flow_trigger/) interval.

A number of events will specifically not count as a transaction:

* Accessing API Swagger documentation or [health-check](/docs/best_practices/#managing-your-service).
* Bad requests due to invalid authentication or to non-existent endpoints before business logic can be executed.
* Outbound calls from a flow.
* A flow calling another flow.
* CORS preflight requests.

{{% alert title="Note" color="primary" %}}Ensure you are using the latest versions of each {{% variables/apibuilder_prod_name %}} plugin in order for transactions to be correctly counted (or not counted).{{% /alert %}}

## Prerequisites

### Platform account

You need to have an account on [https://platform.axway.com](https://platform.axway.com).

### Network requirements

Each {{% variables/apibuilder_prod_name %}} service will track its own transaction usage, and will communicate with the platform at a configurable interval to transmit the transaction counts. Only aggregated counts are transmitted as a JSON payload (no transaction details are sent). You will need to ensure that your {{% variables/apibuilder_prod_name %}} services can reach [https://gatekeeper.platform.axway.com](https://gatekeeper.platform.axway.com/) on port 443. If you have the option of using a proxy for outbound connectivity, you can [configure that proxy in {{% variables/apibuilder_prod_name %}}](/docs/developer_guide/project/configuration/project_configuration/#proxy) to avoid configuring network access for each {{% variables/apibuilder_prod_name %}} service.

### Organization GUID

{{% variables/apibuilder_prod_name %}} will need the **Organization GUID** of the organization for which you have an Amplify subscription. It is found on the **Organization** page in the platform. To obtain this, log on to the [platform](https://platform.axway.com/) and then navigate to **Organization** from the landing page.

![image2021-8-12_12_58_3](/Images/image2021_8_12_12_58_3.png)

You can also navigate to **Organization** from your user menu.

![image2021-8-12_13_0_55](/Images/image2021_8_12_13_0_55.png)

You can use the clipboard to copy the **Organization GUID**.

![image2021-8-12_13_24_59](/Images/image2021_8_12_13_24_59.png)

{{% alert title="Note" color="primary" %}}Note that if you do not see the **Organization GUID** (this is not the same as the **Organization ID**), then it means that you do not have the correct entitlements for tracking {{% variables/apibuilder_prod_name %}} usage for Customer Managed environments, and that you will need to contact [Axway support](https://support.axway.com/).{{% /alert %}}

### Environment ID

Usage reporting on the platform is arranged by deployment **Environments**, which can also be found on the platform **Organization** management screen. Environments refer to where you deploy your {{% variables/apibuilder_prod_name %}} services, which may be describe cloud or on-premise network segments, or describe separate development, test, and production environments. An environment is either marked as production or not, and each has a unique **Environment ID**. Your organization administrator can manage your environments and obtain IDs in your Organization page under **Environments**. You will need the **Environment ID** that corresponds to the deployment environment for the {{% variables/apibuilder_prod_name %}} service you wish to provision.

{{% alert title="Note" color="primary" %}}It is possible to report transactions to both non-production and production environments, only production environments will count towards your organization's billable quota.{{% /alert %}}{{% alert title="Note" color="primary" %}}If you are deploying your {{% variables/apibuilder_prod_name %}} services behind an [API Gateway](https://docs.axway.com/category/apim) cluster, then you should use one environment for the API Gateway cluster, and a different one for the collection of {{% variables/apibuilder_prod_name %}} services.{{% /alert %}}

![image2021-8-13_11_51_59](/Images/image2021_8_13_11_51_59.png)

If you have an existing production **Environment** that you wish to use for reporting transaction usage, you can copy the **Environment ID** from this screen. Otherwise, you will need to create a new production **Environment** by clicking the add Environment button.

![image2021-8-12_13_32_32](/Images/image2021_8_12_13_32_32.png)

Then fill out the form to create a production environment with "Customer Managed" governance and click **Save**:

![image2021-8-13_11_49_23](/Images/image2021_8_13_11_49_23.png)

Note that it is possible to create non-production environments and track usage against them, but they do not count towards your organization's monthly quota.

## Configuration

Since your {{% variables/apibuilder_prod_name %}} service can be deployed in more than one environment (in particular, when it is moved between development, test, and production environments), you should configure your project to obtain usage tracking information from the environment in which it is running.

Usage tracking configuration is placed in the _conf_ directory. In your project, create the file `/conf/subscriptionUsageTracking.default.js` with the following content:

```javascript
// /conf/subscriptionUsageTracking.default.js

module.exports = {
  subscriptionUsageTracking: {
    enabled: process.env.AXWAY_USAGE_TRACKING_ENABLED !== 'false',
    environment: process.env.AXWAY_PLATFORM_ENVIRONMENT,
    org: process.env.AXWAY_PLATFORM_ORG
  }
};
```

{{% alert title="Note" color="primary" %}}It is important that you do not unintentionally enable usage tracking when in development or test, otherwise these activities may count against your organization's billable quota.{{% /alert %}}

To ensure that your local development or test environments do not accidentally report transaction usage, add the following line to your `/conf/.env`:

```bash
// /conf/.env

AXWAY_USAGE_TRACKING_ENABLED=false
AXWAY_PLATFORM_ENVIRONMENT=
AXWAY_PLATFORM_ORG=
```

This file is local only, and not deployed with your service when the _production_ flag is used when [building a container](/docs/how_to/dockerize_an_api_builder_service/), and ensures that usage tracking is disabled (see [Local environment file (conf/.env)](https://docs.axway.com/bundle/api-builder-security-guide/page/environmentalization.html#Environmentalization-Localenvironmentfile_conf__env_) for more information).

When you want to track transaction usage, in your target environment, you need to set `AXWAY_PLATFORM_ENVIRONMENT` to the **Environment ID**, the `AXWAY_PLATFORM_ORG` to the **Organization GUID**, and `AXWAY_USAGE_TRACKING_ENABLED` to true.

### subscriptionUsageTracking

This configuration is used to configure {{% variables/apibuilder_prod_name %}}. Certain keys are only applicable when using specific reporters. These are identified in the final column.

| Key | Type | Description | Required | Default | Applicable reporters |
| --- | --- | --- | --- | --- | --- |
| enabled | boolean | Enables subscription usage tracking if true. | false | false | all reporters |
| environment | string | The **Environment ID** for the {{% variables/platform_prod_name %}} environment to use when reporting usage (see [above](#environment-id)). | true |  | platform only |
| org | string | The {{% variables/platform_prod_name %}} **Organization GUID** to report usage with (see [above](#organization-guid)). | true |  | platform only |
| reportInterval | number | The interval in seconds at which all transactions so far will be reported (minimum 60). | false | 3600 | all reporters |
| platformURL | string | The URL to the {{% variables/platform_prod_name %}} to report to, if it differs from production. | false |  | platform only |
| reporters | string\[\] | The list of reporters which will be used by the service. | false | \["platform"\] | all reporters |
| timeout | number | The maximum time in milliseconds before requests to the platform should timeout. | false | 10000 | platform only |

In order for you to ensure that you are billed correctly, you should ensure that the environment that your service is configured with is correct. Environments in the platform can be production or non-production, and the environment you use should reflect your own production or non-production deployment.

We recommend using an environment variable such as `AXWAY_PLATFORM_ENVIRONMENT` (defined in the template above) to specify the **Environment ID**, and not to hard code it in your service. When deploying to production, specify a production **Environment ID**, and when deploying to a non-production environment such as staging, specify a non-production **Environment ID**.

### Usage reporters

{{% variables/apibuilder_prod_name %}} comes with two reporters which can be used together or interchangeably (see [subscriptionUsageTracking](#subscriptionusagetracking) configuration above). The "platform" reporter is the primary used for subscription usage tracking. It will automatically send usage reports to the {{% variables/platform_prod_name %}}, and be counted against your quota depending on the configured environment. The "console" reporter is used to print transactions to the terminal and can be used for offline transaction usage reporting (e.g. using a log aggregator such as Splunk to calculate the transaction counts), but can also be useful for testing.

## How to verify you have set everything up correctly

When configured correctly to report transaction usage to the {{% variables/platform_prod_name %}}, on start up, you should see the following in the log at INFO level:

```bash
[Subscription usage tracking: 32c9bc26-1833-46f1-b059-4ab1e469fb57] Reporting transactions every 3600s
```

After your service processes inbound requests, and after the configured interval (defaults to 5 minutes), your service should emit the following in the log at INFO level:

```bash
1628517801046 INFO  [platform-reporter: a52af8ae-f75e-49dc-831f-e1236c5007bc] Reported 1 transactions to Axway
```

### Verify usage in non-production environments

To verify that your environment is tracking usage (you must have an Organization Administrator role to view this), in the {{% variables/platform_prod_name %}} homepage, select **Organization**, then **Usage**.

![image2021-8-13_11_56_34](/Images/image2021_8_13_11_56_34.png)

![image2021-8-13_12_6_1](/Images/image2021_8_13_12_6_1.png)

Notice that in this example, 6 transactions were tracked against the "Staging" environment, but they were not counted against this organization's monthly quota. This is because only transactions in production environments will count towards the organization's monthly quota.

{{% alert title="Note" color="primary" %}}Depending on your subscription, your quota may be tokens or transactions. The screen above will look slightly different when your quota is transactions.{{% /alert %}}

### Verify usage in production environments

Everything from the previous section stays the same, except this time you are using a production environment.

![image2021-8-13_12_15_24](/Images/image2021_8_13_12_15_24.png)

Notice that in this example, 23 transactions were tracked against the "Production" environment which resulted in a total of 8 tokens being counted against this organization's monthly **{{% variables/apibuilder_prod_name %}} Transactions** quota.
