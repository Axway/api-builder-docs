---
title: Removal of the Model instance reduce and APIBuilder.Model.reduce functions
linkTitle: Removal of the Model instance reduce and APIBuilder.Model.reduce functions
weight: 17
deprecation: D017
date: 2021-10-01
---

{{% alert title="Note" color="primary" %}}This document describes deprecation {{% deprecation/link D017 %}}{{% /alert %}}

Beginning with the [Cairo](/docs/release_notes/cairo) release, Reducing a Model instance (i.e. `Model.prototype.reduce`) and `APIBuilder.Model.reduce` are deprecated and will be removed in a future version of the product.

## Why we are making this change

The `Model instance reduce` and `APIBuilder.Model.reduce` functions were designed to achieve three basic features:

1. Reduce (remove) fields from a parent model
1. Rename fields of a parent model
1. Add fields to a parent model

On review of these features, it was determined that all of these features could be achieved with `Model.extend`, and because of that `Model instance reduce` and `APIBuilder.Model.reduce` are redundant. For clarity and ease of use, these functions are deprecated.

## How does this impact my service

The {{% variables/apibuilder_prod_name %}} v3.x UI only uses `Model.extend`, so unless you manually code your Models, then this change will not impact your service. However, if you manually create Models, you should check your Models in the `./models` directory to see if they use `Model.reduce`. If you are using `Model.reduce`, then this feature will be removed in the next major version of the product, and you should migrate your models to use `Model.extend` instead.

There are two ways to reduce a Model: one way is calling `APIBuilder.Model.reduce`.

```javascript
// Employee - APIBuilder.Model.reduce example

var APIBuilder = require('@axway/api-builder-runtime');
var Model = APIBuilder.Model.reduce('Friend', 'Person', {
    "fields": {
        "name": {
            "type": "string"
        }
    },
    "connector": "memory",
    "actions": [
        "create",
        "read",
        "update",
        "delete",
        "deleteAll"
    ]
});
module.exports = Model;
```

The other way is to call the reduce function on a Model instance (for example, `Person.reduce`).

```javascript
// Employee - Model.reduce example

var APIBuilder = require('@axway/api-builder-runtime');
var Model = APIBuilder.Model;
var Person = Model.getModel('Person');
var Model = Person.reduce('Friend', {
    "fields": {
        "name": {
            "type": "string"
        }
    },
    "connector": "memory",
    "actions": [
        "create",
        "read",
        "update",
        "delete",
        "deleteAll"
    ]
});
module.exports = Model;
```

If your application reduces Models in this way, then your application will be impacted by this change.

## Upgrading models using the UI

The easiest way to upgrade a reduced model is with the UI. You will have to use a different model name temporarily. In this example, the parent model is Employee, and your existing reduced model is Friend. Select the menu on **Person** -> **Compose into new**.

![image2019-10-3_15_57_7](/Images/image2019_10_3_15_57_7.png)

This opens a dialog to generate a new composite model. We will give this model a different name, **Friend2**.

![image2019-10-3_16_0_43](/Images/image2019_10_3_16_0_43.png)

You now have an opportunity to edit the model. In this screen, you can remove or rename fields that are sourced from the **Person** model. Make the changes to **Friend2** so that it has equivalent fields to the **Friend** model.

![image2019-10-3_16_2_42](/Images/image2019_10_3_16_2_42.png)

Click "**Next >**" to save and generate API for **Friend2**.

![image2019-10-3_16_6_38](/Images/image2019_10_3_16_6_38.png)

At this point, exit your application, delete the original `model/Friend.js`, and rename the new `model/Friend2.js` file to `model/Friend.js`.

Finally, open the `model/Friend.js` file, and rename "Friend2" to "Friend" in `APIBuilder.createModel`.

Restart your application.
