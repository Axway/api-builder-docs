---
title: Change in the outputs of Model flow-nodes
linkTitle: Change in the outputs of Model flow-nodes
description: ADD A DESCRIPTION
weight: 60
date: 2021-05-17
---

## Change in the outputs of Model flow-nodes

Model flow-nodes that encounter errors from a database will result in the flow being aborted.

This behavior has been deprecated since the {{% variables/apibuilder_prod_name %}} - [Ufa release](/docs/release_notes/-_14_august_2020/).

Beginning with the [Ufa release](/docs/release_notes/-_14_august_2020/), flows that utilize model flow-nodes will no longer abort when an unexpected error is encountered from the database. Instead, model flow-nodes will have a new Error output, allowing the developer to handle the error.

### Why are we deprecating this feature

It is a significant limitation to flow developers if they cannot handle errors from the database.

### How does this impact my service

This is now the default behavior for all new services. Any existing services will continue to work as they previously did, though it is strongly recommended you enable behavior on existing services. This only affects services using Models that have model generated API that utilize model flow-nodes.

#### Previous behavior

Previously, model flow-nodes had no Error outputs, and unexpected errors from the database (e.g. a disconnect or timeout) would cause the flow to abort prematurely, e.g.:

![image2020-8-11_15_8_33](/Images/image2020-8-11_15_8_33.png)

Flow developers had no way to handle these types of issues.

#### New behavior

Now, model flow-nodes have an Error output that will trigger when the flow-node encounters unexpected errors from the database, e.g.:

![image2020-8-11_15_12_3](/Images/image2020-8-11_15_12_3.png)

### Upgrading existing services

Updates contain important changes to improve the performance, stability, and security of your services. Installing them ensures that your software continues to run safely and efficiently.

It is strongly recommended you upgrade {{% variables/apibuilder_prod_name %}} to the latest version as well any data connectors you may have in your stack. This feature requires a minimum of:

* {{% variables/apibuilder_prod_name %}} - [Ufa](/docs/release_notes/-_14_august_2020/)

After upgrading, the `enableModelErrorOutputs` feature will not be active until you enable it. To enable it, add the following to your `default.js` file.

```
// Enable error outputs

flags: {
    enableModelErrorOutputs: true
}
```

More `default.js` configuration file information can be found here: [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/).

#### Upgrade existing flows

Before running your service, you should upgrade your existing flows. If you do not, you will encounter the following error:

```
// Example error of model flow-node missing an Error output

Invalid Flow testuser-count: {
  "valid": false,
  "errors": [
    {
      "type": "invalidNodeOutput",
      "code": "MISSING_KEY",
      "detail": {
        "output": "error",
        "node": "model.count"
      }
    }
  ]
}
```

To upgrade your flows, you need to edit flows that utilize the model flow-node. You can search all the files in `./flows` and if any match "[nodehandler://api-builder-flow-invoke](#!/guide/nodehandler://api-builder-flow-invoke)", then they require an upgrade. For each flow-node that it utilized in the file, you need to manually add an "Error" output

```
// Upgrade flow with Error output

"error": {
  "context": "$.error",
  "routes": [
    "response.error"
  ],
  "metaName": "Error"
}
```

to the "outputs" section for all the flow-nodes of type [nodehandler://api-builder-flow-invoke/model/](#!/guide/nodehandler://api-builder-flow-invoke/model/)\*

![image2020-8-11_15_30_5](/Images/image2020-8-11_15_30_5.png)

#### Handle the new Error outputs

The last step is to run your service and edit all flows that use these model flow-nodes in the Flow Editor and route the newly added Error output.

![image2020-8-11_15_12_3](/Images/image2020-8-11_15_12_3.png)
