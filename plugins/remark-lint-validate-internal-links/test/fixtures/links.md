## Working links
This section contains working links that we are going to use throughout our documentation.
Those are valid links so linter is not generating warnings for them.

### Links to another page
*   A [link](/docs/guides/best_practices) to another page of the documentation.
*   A [link](/docs/guides/best_practices/) to another page of the documentation specified with ending slash.

### Links to anchors
*   An [anchor](#working-links) to an existing Heading in this file.
*   An [anchor](/docs/getting_started/concepts/#models) to an existent file and referencing a Heading that exist.
*   An [anchor](/docs/getting_started/getting-started#minimum-requirements) created out of multiple words.

### Links to images
*   Including an existing image - ![imageAPI](/Images/api.png).

### Links to files
*   Including a link to a json file that exists - [download apisecret.json](/samples/central/apisecret.json).
*   Including a link to a json file that exists - [download config.js](/samples/snippets/config.js).
*   Including a link to a yaml file that exists - [download apiservice.yaml](/samples/central/apiservice.yaml).

### Links to external locations
*   An external location [link](https://google.co.uk/) that is accessible.
*   An external file [link](https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/environmentalization.html) - verifying url replacement works as expected.

## "Working" links with lint errors
This section contains working links that are not going to be used in our docs. We discourage the usage of such links and, fortunatelly, they are reported by the linter and can be changed to the format we prefer - pure markdown non relative links.

*   **no-undefined-references** for HUGO's way of doing [links]({{< ref "/docs/guides/debug_a_flow#debugging-flows" >}} "This is the link title").
*   **no-undefined-references** for HUGO's way of doing relative [links]({{< relref "../Guides/Best_Practices.md" >}}  "This is the link title").
*   **validate-internal-links** for a [link](../Guides/Best_Practices.md) using relative paths. WORKS in pure Markdown, does not work in HUGO. We do not want to use this style so we want linter warning for it.
*   **validate-internal-links** for an [anchor](../Guides/Best_Practices.md#codebase) using relative paths. WORKS in pure Markdown, does not work in HUGO. We do not want to use this style so we want linter warning for it.

## Working reference style links
This section contains working [reference style links][].

*   A valid [reference style link with definition at a bottom][].
*   A valid reference [reference style link with inline definition][] - even though the reference is valid, the definition is expected to be at the bottom of the file, so we get **final-definition** linter warning for line 42.

[reference style link with inline definition]: https://google.co.uk/

## Not working links
This section contains not working links due to various reasons.
Those links are wrong and are caught by the linter so they can be fixed.
Add more wrong links in the section if you need to try if linter catches them.

### Bad links to another page
*   **validate-internal-links** for a [link](/non-existing-file) to an non existent file.
*   **validate-internal-links** for a [link](/docs/guides/Best_Practices/) to another page of the documentation that contains upper cases.
*   **validate-internal-links** for a [link](/docs/getting_started/concepts.md) to an existing file specified with the file extension.

### Bad links to anchors
*   **missing-file** and **missing-heading-in-file** for an existing [anchor](docs/getting_started/concepts#models) to an existing document but the location to the document does not start with slash.
*   **missing-heading** for misspelled [anchor](#methodz) in the this file.
*   **missing-heading** for non existent [anchor](#foobar) in this file.
*   **validate-internal-links** for an [anchor](/non-existing-file#foobar) to non existent file.
*   **validate-internal-links** for an [anchor](/docs/getting_started/concepts.md#models) to an existing file with extension without ending slash that is referencing a heading that exists.
*   **validate-internal-links** for an [anchor](/docs/getting_started/concepts.md/#models) to an existing file with extension with ending slash that is referencing a heading that exist.
*   **validate-internal-links** for an [anchor](/docs/getting_started/concepts.md#missing) to an existing file with extension without ending slash that is referencing a heading that DOES NOT exists.
*   **validate-internal-links** for an [anchor](/docs/getting_started/concepts.md/#missing) to an existing file with extension with ending slash that is referencing a heading that DOES NOT exist.
*   **validate-internal-links** for an [anchor](/docs/getting_started/concepts#missing) to an existing file without ending slash that is referencing a heading that DOES NOT exists.
*   **validate-internal-links** for an [anchor](/docs/getting_started/concepts/#missing) to an existing file with ending slash that is referencing a heading that DOES NOT exist.
*   **validate-internal-links** for an [anchor](/docs/getting_started/getting-started#Minimum-Requirements) with upper cases.

### Bad links to images
*   **validate-internal-links** for using upper case instead of lower case images(i.e. the name should be api.png, but it was added as upper case by mistake) ![import_API](/Images/API.png).
*   **validate-internal-links** for linking an non-existent image ![non-existent image](/Images/foo.png).

### Bad links to files
*   **missing-file and validate-internal-links** for link to an non-existent file [missing-example.js](missing-example.js).
*   **validate-internal-links** Including a link to a json file that does not exists - [download apisecret.json](/samples/central/missing.json).
*   **validate-internal-links** Including a link to a json file that does not exists - [download config.js](/samples/snippets/missing.js).
*   **validate-internal-links** Including a link to a yaml file that does not exists - [download apiservice.yaml](/samples/central/missing.yaml).
*   **validate-internal-links** Including a link to a json file that exist but referred with wrong casing - [download apisecret.json](/samples/central/APIsecret.json).

### Bad links to external locations
*   **no-dead-urls** for external links that are not accessible(404, etc) [Google/foo](https://google.co.uk/foo).

### Bad links that are references
*   **no-undefined-references** for a missing reference [googlemissing][].

## Not working reference style links
This section contains not working [reference style links][] that are caught by the linter.

**no-undefined-references** for [bar]

**no-undefined-references** for [baz][]

**no-undefined-references** for [text][qux]

**no-undefined-references** for spread [over
lines][]

**no-undefined-references** for

> reference in [a
> block quote][]

**no-undefined-references** for [asd][a

**no-undefined-references** for reference that include [_emphasis_].

**no-undefined-references** for multiple pairs: [a][b][c].

[reference style link with definition at a bottom]: https://google.co.uk/
[reference style links]: https://www.markdownguide.org/basic-syntax/#reference-style-links
