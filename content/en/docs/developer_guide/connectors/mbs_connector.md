---
title: MBS connector
linkTitle: MBS connector
weight: 10
date: 2021-10-01
---

{{% alert title="Note" color="primary" %}}Mobile Backend Services is deprecated and will be discontinued effective September 1, 2022.{{% /alert %}}

The Axway Mobile Backend Services (MBS) connector is a plugin for {{% variables/apibuilder_prod_name %}} that can connect to an MBS instance on the Axway platform that you can use to store your Model data. The Models can be used programmatically or can be used within the flow editor to interact with your MBS instance.

## Minimum requirements

The following are the supported versions and features and the approximate memory and disk space requirements.

### Supported Versions

* The latest version of [https://platform.axway.com](https://platform.axway.com)

### Memory

* Approximately 2 MB

### Disk space

* Approximately 8 MB

### Supported features

* Persistent storage in Axway's MBS
* Full CRUD operations on custom objects via Models

## Installation

To install the MBS connector, execute the following command:

```bash
npm install --no-optional @axway/api-builder-plugin-dc-mbs
```

A configuration file is generated for you and placed into the **`/conf`** directory of your {{% variables/apibuilder_prod_name %}} project.

## Configuration

Once the plugin is installed, the configuration file is located in `<project>/conf/mbs.default.js`.

| Option name | Type | Description | Required |
| --- | --- | --- | --- |
| connector | string | Must be set to **`@axway/api-builder-plugin-dc-mbs`** | Yes |
| username | string | The user with which to connect to MBS. | Yes |
| password | string | The user's password with which to connect to MBS. | Yes |
| key | string | The MBS instance App Key. | Yes |
| baseurl | string | The location where MBS is hosted. Defaults to {{% variables/platform_prod_name %}} Production. | No |
| pingInterval | number | The time in ms to ping MBS to keep the current session alive. Defaults to once a day. Set to -1 to disable. | No |

## Provisioning an MBS database in the {{% variables/platform_prod_name %}}

1. Follow [this guide](https://docs.axway.com/bundle/platform-management/page/docs/dashboard_guide/managing_applications/managing_mobile_backend_services_datasources/getting_started_with_mobile_backend_services_datasources/index.html) to provision an MBS database and get a username, password, and app key.
1. From within an {{% variables/apibuilder_prod_name %}} 4.x project, install the connector:

    ```bash
    npm install --no-optional @axway/api-builder-plugin-dc-mbs
    ```

    After the successful installation of the connector, a `mbs.default.js` configuration file will be automatically created in your project's `/conf` directory.

After the successful installation of the connector, a configuration file 'mbs.default.js' will be automatically created in your project's conf directory.We recommend providing the app key, username, and password as environment variables. \`MBS_KEY\` , \`MBS_USER\` , and \`MBS_PASSWORD\` are the default environment variables used to configure this connector. See [Environmentalization](/docs/how_to/environmentalization/) for more information.
After configuring the connector, you can start the service as normal.

## Usage

After you configure the connector, you can start up your {{% variables/apibuilder_prod_name %}} project and visit the console (normally found under`http://localhost:8080/console`). Your MBS custom object collections will be listed on the **Models** tab of the console. However, initially, you will not have any Models from MBS.

### Create a Model for MBS

Go to the **Models** tab and click the **\+ Model** button:

![image2019-8-19_17_27_8](/Images/image2019_8_19_17_27_8.png)

In the **New Model** dialog, change the **Connector** to "mbs". This indicates that data for this model will be persisted in MBS.

![image2019-8-19_17_28_33](/Images/image2019_8_19_17_28_33.png)

Refer to the documentation for more information about creating [Models](/docs/developer_guide/console/models/).

## Known issues and limitations

For a list of known issues and limitations, refer to the [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues).
