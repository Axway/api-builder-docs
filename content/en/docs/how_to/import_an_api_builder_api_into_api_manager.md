---
title: Import an API Builder API into API Manager
linkTitle: Import an API Builder API into API Manager
weight: 120
date: 2021-10-01
---

This document describes how to import an {{% variables/apibuilder_prod_name %}} API into API Manager.

## Introduction

API Manager provides a web-based interface that enables an API owner (either in a technical business role or IT operational role) to easily register back-end REST APIs, apply policies, and to virtualize them on the API Gateway. In this document, we will explore how {{% variables/apibuilder_prod_name %}} services can be managed by API Manager.

## Prerequisites

This document assumes that you are familiar with API Manager and have it deployed and running in your infrastructure. For more information on API Manager, refer to the [API Manager Guide](https://docs.axway.com/bundle/APIManager_753_APIMgmtGuide_allOS_en_HTML5/page/Content/APIManagementGuideTopics/index.htm) or sign up for an [API Management Trial](https://www.axway.com/en/api-management-trial).

This document also assumes that you have {{% variables/apibuilder_prod_name %}} installed and that you have created and deployed a service. For this document, we will use the vanilla starter application, which will be referred to as the _{{% variables/apibuilder_prod_name %}} Greet_ service. Refer to the [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/#InitializeProject) for the command to create the _{{% variables/apibuilder_prod_name %}} Greet_ service.

For configuration purposes:

* API Manager is deployed on _apimgmt.gateway.192.168.99.100.nip.io_
* _{{% variables/apibuilder_prod_name %}} Greet_ service is deployed on _greet.apibuilder.192.168.99.100.nip.io_

To configuration the API Manager outbound authentication, you need to know the API key of the _{{% variables/apibuilder_prod_name %}} Greet_ service.

## Registering with API Manager

If you know API Manager and how to virtualize backend services, integrating {{% variables/apibuilder_prod_name %}} will be a familiar process. The steps are:

1. Login
1. Import the backend API
1. Virtualize the frontend API

### Login

Open API Manager and log in. In this case, the URL is _https://apimgmt.rdpp-4522.192.168.99.100.nip.io/home._

![login](/Images/login.png)

### Import the backend API

1. The first step is to import the Swagger service definition for the backend Greet service into API Manager. In the _API_ section, click **Backend API**.

    ![add_backend_api](/Images/add_backend_api.png)
1. Click **New API.**
1. Select **Import Swagger API**.

    ![import_from_swagger](/Images/import_from_swagger.png)
1. API Manager requires the URL of the Swagger definition of the _{{% variables/apibuilder_prod_name %}} Greet_ service. Since the service is deployed and running, we will select a _Swagger definition URL_. {{% variables/apibuilder_prod_name %}} exposes the Swagger definition for the service under _greet.apibuilder.192.168.99.100.nip.io_.

    {{% alert title="Note" color="primary" %}}In this example, the _Greet_ service is being hosted in a Kubernetes cluster with Ingress rules. This is why in the image, the URL is using HTTPS and not specifying the port.{{% /alert %}}
1. Name the backend API _Greet_ and associate it with an organization in your API Manager setup. Once imported, _Greet_ will be listed in the _Backend API_ section.

    ![add_backend_api_complete](/Images/add_backend_api_complete.png)

### Virtualize and configure the backend API

To allow API Manager to manage the backend API, you need to virtualize it. Virtualizing the API creates a frontend API proxy for your service.

1. Navigate to the **Frontend API** tab.

    ![add_frontend_api](/Images/add_frontend_api.png)
1. Click **New API**.
1. Select **New API from backend API**.
1. Select **Greet 1.0.0** in the dialog (this is the name of the backend service that we imported earlier).

    ![create_new_API_dialog](/Images/create_new_api_dialog.png)
1. For demonstration purposes, we will leave the frontend API unsecured (_Pass-through)._ On the **Inbound** tab, select **Pass Through** from the _Inbound Security_ drop-down menu.

    {{% alert title="Note" color="primary" %}}This is purely for demonstration purposes; API Manager has many authentication mechanisms built-in and is extensible using policies. See [Virtualize REST APIs in API Manager](https://docs.axway.com/bundle/APIManager_753_APIMgmtGuide_allOS_en_HTML5/page/Content/APIManagementGuideTopics/api_mgmt_virtualize_web.htm) for more information.{{% /alert %}}

    ![passthrough](/Images/passthrough.png)

    By default, {{% variables/apibuilder_prod_name %}} services are secured using an API key. The default mechanism for passing this key is to use HTTP Basic authentication, where the key is the username, and the password is blank. If you are using a different authentication mechanism for your {{% variables/apibuilder_prod_name %}} service, then this step might differ.
1. On the **Outbound** tab, for _Outbound authentication profile_, select **HTTP Basic.**
1. Add the _Greet_ service API Key as the username.

    {{% alert title="Note" color="primary" %}}The API key is set in the `conf/default.js` file in your {{% variables/apibuilder_prod_name %}} application and is also displayed on the console when the service starts.{{% /alert %}}

    ![backend_auth_dialog](/Images/backend_auth_dialog.png)
1. Save the frontend API. The _Greet_ API should now be listed as a _Frontend API._

    ![add_frontend_api_complete](/Images/add_frontend_api_complete.png)

## API Catalog

The _Greet_ API will now be listed in the API Catalog.

![apicatalog](/Images/apicatalog.png)

If you view the catalog entry for _Greet_, you can view the documentation and try out the APIs.

![apicatalog_greet](/Images/apicatalog_greet.png)

### Testing the APIs

At this stage, you should be able to test your API using tools like _cURL_ or _Postman_. However, for convenience, API Manager has built-in support for testing your APIs. This can be accessed via the catalog or in the _Frontend API_. Before using it, some extra configuration is required; the API Manager UI runs on port 8075, whereas the APIs managed by API Manager are hosted on port 8065. Browser security will treat this as a cross-origin request, so to test the APIs from the browser UI, we need to enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

1. In the _Frontend API_ section, open the _Greet_ API and open its CORS section.
1. Add a new CORS configuration.

    ![cors](/Images/cors.png)

{{% alert title="Note" color="primary" %}}For convenience, we are granting access to all domains. Using \* in production should only be done after assessing the security implications.{{% /alert %}}

To test the API, click the **Try It** button. In this case, we're testing _GET /api/greet_. This is a simple API that takes a username and responds with a greeting string.

![apicatalog_test](/Images/apicatalog_test.png)

![apicatalog_test_success](/Images/apicatalog_test_success.png)

## Further Integration

Now that your services are being managed by API Manager, you can leverage the entire arsenal of available features that it provides. These include:

* Built-in support for common authentication mechanisms such as OAuth, HTTP Basic, API Key, Two-way SSL, and more.
* Integration with third-party Identity Management (IM) infrastructures for authentication and authorization.
* Add governance to traffic using policies; for example, to ensure sensitive information isn't being leaked in the response. See [Configure API Manager settings in Policy Studio](https://docs.axway.com/bundle/APIManager_753_APIMgmtGuide_allOS_en_HTML5/page/Content/APIManagementGuideTopics/api_mgmt_config_ps.htm#Configur) for further information.
* Apply quotas on APIs. See [Administer APIs in API Manager](https://docs.axway.com/bundle/APIManager_753_APIMgmtGuide_allOS_en_HTML5/page/Content/APIManagementGuideTopics/api_mgmt_admin.htm) for more information.
