---
title: APIs
linkTitle: APIs
weight: 40
date: 2021-10-01
---

## Introduction

This chapter covers the basic instructions for creating APIs. APIs can be automatically generated for all models, but there may be cases where you will want to create a custom API.

An API provides a way for a client to access your application, such as `GET <SERVER_ADDRESS>/api/users/query`, execute custom logic, and internally access the application's models and APIs, then return data to the client application.

## API endpoint definition

Place all API definition files in the project's `apis` folder. You can only declare one endpoint definition per file. An API definition file is a JavaScript file, which:

1. Loads the `@axway/api-builder-runtime` module.
1. Calls the module's `API.extend()` method, passing in an object defining the API endpoint and logic.
1. Exports the defined endpoint using the `module.exports` variable.

Set the following keys in the object passed to the `API.extend()` method to define the API endpoint:

| Name | Required | Description |
| --- | --- | --- |
| group | true | The logical name for grouping API endpoints. |
| path | true | Request path (for example `/api/user/:id`). Prefix parameters with a colon (`:`). |
| method | true | HTTP verb (`GET`, `POST`, `PUT`, or `DELETE`). |
| description | true | Description of the endpoint, which is used in the generation of the API endpoint documentation. |
| model | false | The name of the model to use for the response. An API endpoint can only specify **one** model, but models can be composed of other models and fields. The API endpoint response documentation will include the schema for this model. |
| responseIsArray | false | If true, the API endpoint response documentation will describe the result as array in the schema. If model is specified, the schema will describe an array of that particular model. |
| responses | false | A map of Custom API responses status code should be in a range of 100 to 599 or "default" (see here for [more details](#custom-responses)). This takes priority over "model" and "responseIsArray" when generating the Swagger API documentation. |
| before | false | One or more {{% variables/apibuilder_prod_name %}} Blocks to be executed before the request. Blocks are referenced by their `name` property. If you want to execute multiple blocks, you should specify them as an array of block names. If multiple blocks are specified, they are executed in the order specified. |
| after | false | One or more {{% variables/apibuilder_prod_name %}} Blocks to be executed after the request. Blocks are referenced by their `name` property. If you want to execute multiple blocks, you should specify them as an array of block names. If multiple blocks are specified, they are executed in the order specified. |
| action | true | A function that is called to execute the API endpoint’s logic. The function is passed a `request` object, response object, and `next()` method. Use this function to make programmatic calls to your model’s methods for reading and writing data, and to do other things related to the custom business logic of your API endpoint, including making calls to other flow-node modules that your API endpoint requires. You should always make sure that your `action` function calls the `next` function regardless if the result is a success or an error. |
| parameters | false | Input parameters required to execute the API endpoint. This is an object of key-value pairs, where the key is the name of the parameter, and the value is an object with the following properties:<br /><br />* `optional` (Boolean): Determines if the parameter is optional (`true`) or required (`false`).<br />* `type` (String): the type of input parameter: `path`, `query`, or `body`.<br />* `description` (String): used for generating API documentation. |

## API example

The following API definition file creates an endpoint that can be accessed by a client using `GET <HOST_ADDRESS>/api/test/:id`. Before the request is initiated by the server, the `pre_example` is executed, then the server performs the request (executes the action logic). The action logic tries to find the user model with the specified ID. After the logic executes, the `post_example` is executed.

```javascript
// apis/testapi.js

var APIBuilder = require('@axway/api-builder-runtime');

var TestAPI = APIBuilder.API.extend({
    group: 'testapi',
    path: '/api/testapi/:id',
    method: 'GET',
    description: 'this is an api that shows how to implement an API',
    model: 'testuser',
    before: 'pre_example',
    after: 'post_example',
    parameters: {
        id: { description: 'the test user id' }
    },
    action: function (req, resp, next) {
        // invoke the model find method passing the id parameter
        // stream the result back as response
        resp.stream(req.model.find, req.params.id, next);
    }
});

module.exports = TestAPI;
```

## Invoke API endpoints in {{% variables/apibuilder_prod_name %}}

Any callback in the application that is passed the `request` object can access the endpoints programmatically.

To invoke an API endpoint:

1. Retrieve an instance to {{% variables/apibuilder_prod_name %}} using the `request.server` property.
1. Retrieve the API instance using {{% variables/apibuilder_prod_name %}}'s get API (`endpoint`, `verb`) method by passing it the endpoint without the server host or address as the first parameter and the HTTP verb as the second parameter.
1. Invoke the `execute(params, callback)` method on the API instance by passing it a dictionary of parameters as the first parameter and a callback function as the second parameter. The callback function is passed an `error` and `results` object.

### Example

The Route below is invoking the `GET <SERVER_ADDRESS>/api/car` method programmatically.

```javascript
// web/routes/testroute.js

var TestRoute = APIBuilder.Router.extend({
    name: 'car',
    path: '/car',
    method: 'GET',
    description: 'get some cars',
    action: function (req, res, next) {

        req.server.getAPI('api/car', 'GET').execute({}, function(err, results) {
            if (err) {
                next(err);
            } else {
                req.log.info('got cars ' + JSON.stringify(results));
                res.render('car', results);
            }
        });
    }
});

module.exports = TestRoute;
```

## Custom responses

If the Swagger documentation that {{% variables/apibuilder_prod_name %}} generates for your API is insufficient, you can provide a custom Swagger 2.0 [Responses Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#responses-object) in your API definition which will replace the generated one.

The `responses` property is a container for the expected responses of an operation, ranging from HTTP response codes 100-599, or `default` . The HTTP response codes are mapped to their expected responses. It is not expected that the API should document all possible HTTP response codes, since they may not be known in advance. However, it is expected that the API should document a successful operation response, and any known errors. `default` can be provided to describe the response for all HTTP codes that are not covered individually by the specification. See the [example code](#responses-example) which includes responses.

**Responses Object** ([see Swagger 2.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#responses-object))

| Field Name and Pattern | Type | Description |
| --- | --- | --- |
| default | [Response Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#responseObject) | The documentation of responses other than the ones declared for specific HTTP response codes.<br /><br />It can be used to cover undeclared responses. |
| { [HTTP Status Code](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#httpCodes) } (string) | [Response Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#responseObject) | Any valid [HTTP status code](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#httpCodes) can be used as the property name (one property per HTTP status code).<br /><br />Describes the expected response for that HTTP status code.<br /><br />Note that the response for 401 (Unauthorized) has special behavior. See [Note on 401 responses](#401-note). |

**Response Object** ( [see Swagger 2.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#responseObject) )

| Field Name and Pattern | Type | Description |
| --- | --- | --- |
| description | `string` | A short description of the response. This should be provided, but {{% variables/apibuilder_prod_name %}} will provide a default value for common HTTP Status codes. |
| schema | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#schemaObject) | A definition of the response structure. It can be a primitive, an array or an object. If this field does not exist, it means no content is returned as part of the response.<br /><br />You can also include references ($ref) other schemas such as those loaded by {{% variables/apibuilder_prod_name %}} in the `./schemas` directory or by models. Check the logs when starting your service to see which schemas are registered. (For example `schema:///model/testuser`) |
| headers | [Headers Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#headersObject) | A list of headers that are sent with the response. |
| examples | [Example Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#exampleObject) | An example of the response message. |

### Responses Example

```javascript
// apis/testapi.js

const APIBuilder = require('@axway/api-builder-runtime');

const TestAPI = APIBuilder.API.extend({
    group: 'greeting',
    path: '/api/greeting/:user',
    method: 'GET',
    description: 'this is an api that greets a user',
  responses: {
    200: {
      description: 'User greeted',
      schema: {
        type: 'string',
        description: 'Greeting'
      }
    }
  },
    parameters: {
        user: { description: 'the name of the user' }
    },
    action: function (req, resp, next) {
    resp.status(200).send(`Hello, ${req.params.user}`);
    next();
    }
});

module.exports = TestAPI;
```

### Note on 401 responses

Your application's authentication is controlled by {{% variables/apibuilder_prod_name %}}, and is enabled/disabled via the [apiPrefixSecurity](/docs/developer_guide/project/configuration/project_configuration/#accesscontrol) option. When enabled, {{% variables/apibuilder_prod_name %}} overrides all 401 responses within all REST API hosted by your application.

If apiPrefixSecurity is enabled, and you also define a 401 response for your API, then you will get a warning that its definition will be overridden by {{% variables/apibuilder_prod_name %}}.

If you want to provide additional authentication in your custom API when [apiPrefixSecurity](/docs/developer_guide/project/configuration/project_configuration/#accesscontrol) is enabled, then you should not define a 401 response in the custom responses, and when sending the 401 error, it should match the schema for the UnauthorizedError below:

```json
"UnauthorizedError": {
  "type": "object",
  "required": [
    "message",
    "success",
    "id"
  ],
  "properties": {
    "success": {
      "type": "boolean"
    },
    "id": {
      "enum": [
        "com.appcelerator.api.unauthorized"
      ]
    },
    "message": {
      "type": "string"
    }
  },
  "additionalProperties": false
}
```
