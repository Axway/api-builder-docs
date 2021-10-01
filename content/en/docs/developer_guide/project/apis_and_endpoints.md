---
title: APIs and Endpoints
linkTitle: APIs and Endpoints
weight: 20
date: 2021-10-01
---

APIs are defined as Swagger documents which can contain one or more Endpoint definitions. The API Swagger document must be formatted as JSON and contained within the `/endpoints` directory of your application.

When {{% variables/apibuilder_prod_name %}} reads these API Swagger definitions, it will create the specified routes for each Endpoint. The implementation of the business logic for each Endpoint is handled by the Flow associated with the Endpoint. This is delegated to Flows which are specified on a per-endpoint level.

APIs have the following extensions to the Swagger specification:

| Property | Description | Required | Type | Default | Example |
| --- | --- | --- | --- | --- | --- |
| `x-enabled` | If the API should be bound to the app on load. | No | object | `{ "enabled": true }` | `{ "enabled": false }` |
| `x-flow` | The id (filename without the extension) of the flow to be executed when the endpoint is hit. | Yes | string |  | `"GreetFlow"` |

## Example

This example API below is similar to the one that comes with every {{% variables/apibuilder_prod_name %}} Project. It contains an Endpoint which takes a username, invokes the flow called `“GreetFlow”`, and returns a greeting. However, since it has an x-enabled flag set, the Endpoint will be disabled, and no requests will be able to be made to it.

```
{
    "x-enabled": {
        "enabled": false
    },
    "swagger": "2.0",
    "info": {
        "description": "Greeting functions",
        "version": "1.0.0",
        "title": "Greeting API"
    },
    "paths": {
        "/greet": {
            "get": {
                "x-flow": "GreetFlow",
                "description": "",
                "operationId": "Greet",
                "parameters": [
                    {
                        "description": "The username",
                        "in": "query",
                        "name": "username",
                        "required": true,
                        "type": "string"
                    }
                ],
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "greeting",
                        "schema": {
                            "$ref": "schema:///schema/myproject/greeting"
                        }
                    },
                    "400": {
                        "description": "bad request",
                        "schema": {
                            "$ref": "schema:///schema/myproject/error"
                        }
                    }
                },
                "summary": "Greet a user",
                "tags": [
                    "helloworld"
                ]
            }
        }
    }
}
```
