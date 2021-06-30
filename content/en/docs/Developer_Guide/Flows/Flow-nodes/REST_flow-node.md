---
title: REST flow-node
linkTitle: REST flow-node
description: ADD A DESCRIPTION
weight: 160
date: 2021-06-22
---

The REST flow-node methods, parameters, and output are described in the following sections. The REST flow-node is created when NPM installs the `@axway/api-builder-plugin-fn-restclient` plugin. The REST flow-node plugin is included in the default application, but it can be removed.

## Methods

The default methods for a REST flow-node are:

* `DELETE` - Use DELETE APIs to delete resources.

* `GET` - Use GET APIs to retrieve resources only and not to modify them in any way.

* `HEAD` - Use HEAD APIs to request the headers that are returned if the specified resource would be requested with a GET API.

* `OPTIONS` - Use OPTIONS APIs to determine the options and requirements associated with a resource.

* `PATCH` - Use PATCH APIs to make partial updates on a resource.

* `POST` - Use POST APIs to create new resources.

* `PUT` - Use PUT APIs primarily to update existing resources, if a resource does not exist then the API may decide whether or not to create a new resource.

## Parameters

The REST flow-node parameters are described in the following sections.

### DELETE parameters

The `DELETE` method parameters are:

| Parameter | Type | Default | Description | Configuration selection |
| --- | --- | --- | --- | --- |
| URL | string | \- | The target URL. | Selector, String |
| Headers | object | \- | The HTTP headers to set. | Selector, Object |
| **Advanced HTTP Options** |  |  |  |  |
| Follow redirect | boolean | true | Follow HTTP 3xx responses as redirects. | Selector, Boolean |
| Insecure | boolean | false | Do not require the SSL certificates to be valid. | Selector, Boolean |
| Maximum redirects | integer | 10 | The maximum number of redirects before aborting. | Selector, Number |

The `Headers`, `Follow redirect`, `Insecure`, and `Maximum redirects` parameters can be enabled or disabled.

### GET parameters

The `GET` method parameters are:

| Parameter | Type | Default | Description | Configuration selection |
| --- | --- | --- | --- | --- |
| URL | string | \- | The target URL. | Selector, String |
| Headers | object | \- | The HTTP headers to set. | Selector, Object |
| **Advanced HTTP Options** |  |  |  |  |
| Follow redirect | boolean | true | Follow HTTP 3xx responses as redirects. | Selector, Boolean |
| Insecure | boolean | false | Do not require the SSL certificates to be valid. | Selector, Boolean |
| Maximum redirects | integer | 10 | The maximum number of redirects before aborting. | Selector, Number |
| Response encoding | string | \- | The response body encoding if you expect binary use `binary` as the encoding. | Selector, String |

The `Headers`, `Follow redirect`, `Insecure`, `Maximum redirects`, and `Response encoding` parameters can be enabled or disabled`.`

### HEAD parameters

The `HEAD` method parameters are:

| Parameter | Type | Default | Description | Configuration selection |
| --- | --- | --- | --- | --- |
| URL | string | \- | The target URL. | Selector, String |
| Headers | object | \- | The HTTP headers to set. | Selector, Object |
| **Advanced HTTP Options** |  |  |  |  |
| Follow redirect | boolean | true | Follow HTTP 3xx responses as redirects. | Selector, Boolean |
| Insecure | boolean | false | Do not require the SSL certificates to be valid. | Selector, Boolean |
| Maximum redirects | integer | 10 | The maximum number of redirects before aborting. | Selector, Number |

The `Headers`, `Follow redirect`, `Insecure`, and `Maximum redirects` parameters can be enabled or disabled`.`

### OPTIONS parameters

The `OPTIONS` method parameters are:

| Parameter | Type | Default | Description | Configuration selection |
| --- | --- | --- | --- | --- |
| URL | string | \- | The target URL. | Selector, String |
| Headers | object | \- | The HTTP headers to set. | Selector, Object |
| **Advanced HTTP Options** |  |  |  |  |
| Follow redirect | boolean | true | Follow HTTP 3xx responses as redirects. | Selector, Boolean |
| Insecure | boolean | false | Do not require the SSL certificates to be valid. | Selector, Boolean |
| Maximum redirects | integer | 10 | The maximum number of redirects before aborting. | Selector, Number |

The `Headers, Follow redirect`, `Insecure`, and `Maximum redirects` parameters can be enabled or disabled`.`

### PATCH parameters

The `PATCH` method parameters are:

| Parameter | Type | Default | Description | Configuration selection |
| --- | --- | --- | --- | --- |
| Body | any | \- | The content to send. | Selector, String, Number, Boolean, Object, Array, Null |
| URL | string | \- | The target URL. | Selector, String |
| Headers | object | \- | The HTTP headers to set. | Selector, Object |
| **Advanced HTTP Options** |  |  |  |  |
| Follow redirect | boolean | true | Follow HTTP 3xx responses as redirects. | Selector, Boolean |
| Insecure | boolean | false | Do not require the SSL certificates to be valid. | Selector, Boolean |
| Maximum redirects | integer | 10 | The maximum number of redirects before aborting. | Selector, Number |
| Response encoding | string | \- | The response body encoding. If you expect binary to use `binary` as the encoding. | Selector, String |

The `Follow redirect`, `Headers`, `Insecure`, `Maximum redirects`, and `Response encoding` parameters can be enabled or disabled`.`

### POST parameters

The `POST` method parameters are:

| Parameter | Type | Default | Description | Configuration selection |
| --- | --- | --- | --- | --- |
| Body | any | \- | The content to send. | Selector, String, Number, Boolean, Object, Array, Null |
| URL | string | \- | The target URL. | Selector, String |
| Headers | object | \- | The HTTP headers to set. | Selector, Object |
| **Advanced HTTP Options** |  |  |  |  |
| Follow redirect | boolean | true | Follow HTTP 3xx responses as redirects. | Selector, Boolean |
| Insecure | boolean | false | Do not require the SSL certificates to be valid. | Selector, Boolean |
| Maximum redirects | integer | 10 | The maximum number of redirects before aborting. | Selector, Number |
| Response encoding | string | \- | The response body encoding. If you expect binary use `binary` as the encoding. | Selector, String |

The `Headers, Follow redirect`, `Insecure`, `Maximum redirects`, and `Response encoding` parameters can be enabled or disabled`.`

### PUT parameters

The `PUT` method parameters are:

| Parameter | Type | Default | Description | Configuration selection |
| --- | --- | --- | --- | --- |
| Body | any | \- | The content to send. | Selector, String, Number, Boolean, Object, Array, Null |
| URL | string | \- | The target URL. | Selector, String |
| Headers | object | \- | The HTTP headers to set. | Selector, Object |
| **Advanced HTTP Options** |  |  |  |  |
| Follow redirect | boolean | true | Follow HTTP 3xx responses as redirects. | Selector, Boolean |
| Insecure | boolean | false | Do not require the SSL certificates to be valid. | Selector, Boolean |
| Maximum redirects | integer | 10 | The maximum number of redirects before aborting. | Selector, Number |
| Response encoding | string | \- | The response body encoding. If you expect binary use `binary` as the encoding. | Selector, String |

The `Headers`, `Follow redirect`, `Insecure`, `Maximum redirects`, and `Response encoding` parameters can be enabled or disabled.

## Outputs

The REST flow-node outputs are described in the following sections.

### DELETE outputs

The `DELETE` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| 2XX | object | \- | $.response |
| 3XX | object | \- | $.response |
| 4XX | object | \- | $.response |
| 5XX | object | \- | $.response |
| Error | any | \- | $.error |

### GET outputs

The `GET` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| 2XX | object | \- | $.response |
| 3XX | object | \- | $.response |
| 4XX | object | \- | $.response |
| 5XX | object | \- | $.response |
| Error | any | \- | $.error |

### HEAD outputs

The `HEAD` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| 2XX | object | \- | $.response |
| 3XX | object | \- | $.response |
| 4XX | object | \- | $.response |
| 5XX | object | \- | $.response |
| Error | any | \- | $.error |

### OPTIONS outputs

The `OPTIONS` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| 2XX | object | \- | $.response |
| 3XX | object | \- | $.response |
| 4XX | object | \- | $.response |
| 5XX | object | \- | $.response |
| Error | any | \- | $.error |

### PATCH outputs

The `PATCH` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| 2XX | object | \- | $.response |
| 3XX | object | \- | $.response |
| 4XX | object | \- | $.response |
| 5XX | object | \- | $.response |
| Error | any | \- | $.error |

### POST outputs

The `POST` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| 2XX | object | \- | $.response |
| 3XX | object | \- | $.response |
| 4XX | object | \- | $.response |
| 5XX | object | \- | $.response |
| Error | any | \- | $.error |

### PUT outputs

The `PUT` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| 2XX | object | \- | $.response |
| 3XX | object | \- | $.response |
| 4XX | object | \- | $.response |
| 5XX | object | \- | $.response |
| Error | any | \- | $.error |

## Additional information

For how-to information on accessing Microsoft OneDrive using a REST flow-node, refer to [Access Microsoft OneDrive using a REST flow-node](/docs/how_to/authorization__access_microsoft_onedrive_using_rest_flow-node/).
