---
title: Models - Access a Model
linkTitle: Models - access a Model
description: ADD A DESCRIPTION
weight: 20
date: 2021-05-17
---

Any callback in the application that is passed the `request` object can access the Models programmatically. If the `actions` property in the model definition is set, some of the methods cannot be invoked. The `actions` property restricts which CRUD operations can be invoked on the models.

1. Retrieve an instance to {{% variables/apibuilder_prod_name %}} using the `request.server` property.

2. Retrieve the Model instance using {{% variables/apibuilder_prod_name %}}'s `getModel` (`name`) method by passing it the name of the model.

3. Invoke one of the following methods on the Model instance and pass it a callback function, which is passed an `error` and `results` object:

    1. `create(object, callback)`: Creates a model.

    2. `query(options, callback)`: Retrieves models specified by the query.

    3. `findAll(callback)`: Retrieves all models.

    4. `findById(id, callback)`: Retrieves the model specified by the id parameter.

    5. `update(instance, callback)`: Updates the passed model.

    6. `deleteAll(callback)`: Deletes all models.

    7. `delete(instance, callback)`: Deletes the passed model.
