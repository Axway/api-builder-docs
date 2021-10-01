---
title: Models - access a Model
linkTitle: Models - access a Model
weight: 20
date: 2021-10-01
---

Any callback in the application that is passed the `request` object can access the Models programmatically. If the `actions` property in the model definition is set, some of the methods cannot be invoked. The `actions` property restricts which CRUD operations can be invoked on the models.

1. Retrieve an instance to {{% variables/apibuilder_prod_name %}} using the `request.server` property.
1. Retrieve the Model instance using {{% variables/apibuilder_prod_name %}}'s `getModel` (`name`) method by passing it the name of the model.
1. Invoke one of the following methods on the Model instance and pass it a callback function, which is passed an `error` and `results` object:

    1. `create(object, callback)`: Creates a model.
    1. `query(options, callback)`: Retrieves models specified by the query.
    1. `findAll(callback)`: Retrieves all models.
    1. `findById(id, callback)`: Retrieves the model specified by the id parameter.
    1. `update(instance, callback)`: Updates the passed model.
    1. `deleteAll(callback)`: Deletes all models.
    1. `delete(instance, callback)`: Deletes the passed model.
