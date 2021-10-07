*   Misspelled [anchor](#methodz) in the this file.
*   Missing [anchor](#foobar) in this file.
*   An [anchor](/docs/getting_started/getting-started#missing) to an existing file without ending slash that is referencing a heading that DOES NOT exists.
*   An [anchor](/docs/getting_started/getting-started/#missing) to an existing file with ending slash that is referencing a heading that DOES NOT exist.
*   An [anchor](/docs/getting_started/getting-started#Minimum-Requirements) with upper cases.
*   Missing duplicated [anchor](/docs/getting_started/getting-started#models-3) with upper cases.
*   Broken anchor that is comprised with hash only e.g. [anchor](#).
*   Broken anchor that is comprised with hash only e.g. [anchor](/docs/getting_started/getting-started#).

## Valid Anchors
Those should not be caught.

### Duplicated Anchors
*   A duplicated [anchor](/docs/getting_started/getting-started#foo).
*   A duplicated [anchor](/docs/getting_started/getting-started#foo-bar-1).
*   A duplicated [anchor](/docs/getting_started/getting-started#foo-bar-2).
*   A duplicated [anchor](/docs/getting_started/getting-started#foo-bar-3).
*   A duplicated [anchor](/docs/getting_started/getting-started#foo-bar-4).
*   A duplicated [anchor](/docs/getting_started/getting-started#models) with upper cases.
*   A duplicated [anchor](/docs/getting_started/getting-started#models-1) with upper cases.
*   A duplicated [anchor](/docs/getting_started/getting-started#models-1-1) with upper cases.
*   A duplicated [anchor](/docs/getting_started/getting-started#models-1-2) with upper cases.
*   A duplicated [anchor](/docs/getting_started/getting-started#models-2-1) with upper cases.
*   Valid anchor should not be caught [anchor](/docs/guides#models).
*   Valid local anchor should not be caught [anchor](#models).

### Speacial Cases
*   Ignore links like [support@axway.com](mailto:support@axway.com)
*   Valid local anchor with hugo variable should not be caught [anchor](#hello).
*   Valid local anchor with hugo variable should not be caught [anchor](#hello-api-builder).
*   Valid local anchor with hugo variable should not be caught [anchor](#api-builder-api-builder).
*   Import the `onedrive.json` Swagger document. Refer to [Create the onedrive.json Swagger document](#create-the-onedrive-json-swagger-document).
*   A duplicated [anchor](/docs/getting_started/getting-started#foo-bar-baz).


## Models

Description about models ...

## {{% variables/hello %}}

Parametrised heading with single variable

## {{% variables/hello %}} {{% variables/apibuilder_prod_name %}}

Parametrised heading with multiple variables

## {{% variables/apibuilder_prod_name %}} {{% variables/apibuilder_prod_name %}}

Parametrised heading with the same variable twice in it

## Create the onedrive.json Swagger document

Heading with dot
