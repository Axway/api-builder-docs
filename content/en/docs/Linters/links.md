---
title: Links
description: A section that is going to be used for link linting showcases.
weight: 10
date: 2021-09-09
---
## Working links
A [link](/docs/guides/best_practices/) to another page of the documentation.

An [anchor](#working-links) to an existing Heading in this file.

An [anchor](/docs/plugins/mongo#mongo) to an existent file and referencing a heading that DOES exist.

ISSUE(no-undefined-references thinks this is a problem) The HUGO's way of doing [links]({{< ref "/docs/guides/debug_a_flow#debugging-flows" >}} "This is the link title").

ISSUE(no-undefined-references thinks this is a problem) The HUGO's way of doing relative [links]({{< relref "../Guides/Best_Practices.md" >}}  "This is the link title")

Including an existing image - ![imageAPI](/Images/api.png).

Including a link to a file that exists - [download](/samples/central/apisecret.json).

An external [link](https://google.co.uk/) that is accessible.

An external [link](https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/environmentalization.html) - verifying url replacement works as expected.

A valid reference [google][]

{{/* Even though the reference above is valid, the definition is expected to be at the bottom of the file, so we should receive a warning about this */}}
[google]: https://google.co.uk/

## Links that needs to be caught and flagged
LINTED: Misspelled [anchor links](#methodz).

LINTED: Non existent [anchor](#foobar).

LINTED: Link to an non-existent file should be caught - [missing files are reported](missing-example.js).

LINTED: External links that are not accessible(404, etc) should be caught [Google/foo](https://google.co.uk/foo).

LINTED: Misspelled images(i.e. name should be import_API.png, but it was added as lowercase by mistake) - ![import_API](/Images/import_api.png).

LINTED: Including an non-existent image - ![non-existent image](/Images/foo.png).

LINTED: A [link](/non-existing-file) to an non existent file.

LINTED: An [anchor](/non-existing-file#foobar) to a heading in an non existent file.

## References - good to be caught but not mandatory

FIXME: An [anchor](/docs/plugins/mongo#foobar) to an existing file, but referencing a heading that DOES NOT exist.

This a list of problematic references(i.e. a reference that is not defined, etc, etc) that can be caught by `lint-no-undefined-references` plugin. See https://www.markdownguide.org/basic-syntax/#reference-style-links for more info on references. All of the references underneath are being LINTED.

[bar]

[baz][]

[text][qux]

Spread [over
lines][]

> in [a
> block quote][]

[asd][a

Can include [_emphasis_].

Multiple pairs: [a][b][c].

## Avoid doing links like this

These two are valid links in pure markdown, but will not work in HUGO's context. We should avoid linking like this in general. However, these are still caught by the 'no-dead-urls' so we are ok even if something like this slipped in.

*   A [link](../Guides/Best_Practices.md) using relative paths. WORKS in pure Markdown, does not work in HUGO.
*   An [anchor](../Guides/Best_Practices.md#codebase) using relative paths. WORKS in pure Markdown, does not work in HUGO.
