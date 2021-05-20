---
title: Models - Definition
linkTitle: Models - definition
description: ADD A DESCRIPTION
weight: 40
date: 2021-05-17
---

Place all Model files in the `models` folder. You can only declare one model per file. A Model file is a JavaScript file, which:

1. Loads the `@axway/api-builder-runtime` module.

2. Calls the module's `createModel` (`name`, `schema`) method (or another Model method), passing in the name of the model as the first parameter and an object defining the model schema as the second parameter.

3. Exports the defined endpoint using the `module.exports` variable.

Set the following keys in the object passed to the `createModel()` method to define the model:

| Name | Required | Description |
| --- | --- | --- |
| fields | true | An object that represents the model’s schema defined as key-value pairs. The key is the name of the field, and the value is the `fields` object. See the next table for details. |
| connector | true | Connector to which the model is bound (`string`). Each model can only have **one** connector. Connectors are responsible for reading and writing data from/to their data sources. |

## Field definition

The `fields` property (mentioned above) supports several sub-properties as well. The table below outlines these properties.

| Name | Required | Description |
| --- | --- | --- |
| type | true | The field primitive type plus others (for example, `string`, `number`, `boolean`, `object`, `array`, and `date`). Type can be any valid JavaScript primitive type. Type can be specified as a string (for example, `string`) or by the type class (for example, `String`). |
| required | false | Specifies whether the field is required. The default value is `false`. |
| validator | false | A function or regular expression that validates the value of the field. The function is passed the data to validate and should return either `null` or `undefined` if the validation succeeds. Any other return value means the validation failed, and the return value will be used in the exception message. If a regular expression is used, it should evaluate to either true or false. |
| name | false | Used if the model field name is different than the field name in the connector’s model or the underlying data source for the field name. For example, if my model field is `first_name` and the column in a MySQL database is `fname`, the value of the `name` property should be `fname`. |
| default | false | The default value for the field. |
| description | false | The description of the field (used for API documentation). |
| readonly | false | Either `true` or `false`. If `true`, the field will be read-only and any attempt to write the field value will fail. |
| maxlength | false | The max length of the field (specified as an integer) |
| get | false | A function used to set the value of a property that will be sent to the client. This property is useful if you want to define a custom field where the value is derived. |
| set | false | A function used to set the value of a property that will be sent to the connector. |
| custom | false | This property should be specified and set to `true` if you are defining a custom field. A custom field is one that does not exist in the underlying data source for the connector you specified. |
| model | false | The model name of the field property. This is either the logical name of a custom model or a connector model name in the form **connector/model_name** (for example, **appc.mysql/employee**). |

## Model schema example

The example below creates the `car` model with the specified schema.

```javascript
var APIBuilder = require('@axway/api-builder-runtime');

var car = APIBuilder.createModel('car', {
    fields: {
        make:{type:String, description:'the make of a car '},
        model:{type:String, description:'the model of the car', required:true},
        year: {type:Number, description:'year the car was made', required:true},
        bluebook: {type:Number, description:'kelly bluebook value of the car', required:true},
        mileage: {type:Number, description:'current mileage of the car', required:true}
    },
    connector: 'memory'
});

module.exports = car;
```
