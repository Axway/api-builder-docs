---
title: Base64
description: TODO
date: 2021-06-22
---

# All headings should be at least 2 (plugin only checks first though) (LINTED)

You can install the **Base64** plugin from the **Plugins** page, or execute the following command:

LINTED: missing code-block language flag
```
npm install @axway/api-builder-plugin-fn-base64
```
## Lists
LINTED: An example of a bad list:
* one
* two
* three

LINTED: Another example of a bad list:
- one
- two
- three

## Tables

LINTED: incorrect indentation,
 | foo | bar |
 | --- | ----- |
 | baz | banana |

## Tabs

LINTED: tabby	tab

## Prohibited words

LINTED: Catch prohibited: Flow node
LINTED: Catch prohibited: Flow-Node
LINTED: Catch prohibited: Flow-Trigger
LINTED: Catch prohibited: flow trigger
LINTED: Catch prohibited: Node.JS
LINTED: Catch prohibited: NPM
LINTED: Catch prohibited: Our builder should complain if it is not "API Builder".

# Contractions
LINTED: I can't imagine API Builder wouldn't handle OAS3. I don't care what you think, but it's something that'll take some time and we could've done it earlier, but we couldn't find the time. It shouldn't bother you.

## Duplicate (fixme)
Duplicate 1

## Duplicate (fixme)
`remark-lint-no-duplicate-headings` failed to match these duplicate headings.

__do not use emphasis headers (fixme)__
The plugin [remark-lint-no-emphasis-as-heading](https://www.npmjs.com/package/remark-lint-no-emphasis-as-heading) should pick this up but didn't. It picks out `strong-marker` instead. I ordered the rules to put it first, but it still does not work as expected. But, I think we want this rule, and a rule for bold headers, or just a style for headers in general.

### Punctuation
FIXME: We want to "enforce matching punctuation.
HANDLED: We want to enforce no trailing slash on [URL](https://www.npmjs.com/).
FIXME: Wonder if it will pick up on the 2-space sentences :upside_down_face:.  Another sentence.

## Headings

### Heading Title case (handled)
Text.

### Heading with ignored word API Builder (handled)
Text.

### heading all lower-case (handled)
Text.

### heading has Capital (handled)
Text.


## Heading ^ with too much whitespace before (handled^)
Text.

## Detect empty sections (handled)

## This heading is an example where it is too long and will not render nicely (handled)
Text.

# Want all headings >= 2 (fixme)
Text.


## Links
### Working links
A [link](/docs/guides/best_practices/) to another page of the documentation.

An [anchor](#lists) to an existing Heading in this file.

An [anchor](/docs/plugins/mongo#mongo) to an existent file and referencing a heading that DOES exist.

PROBLEM(no-undefined-references thinks this is a problem) The HUGO's way of doing [links]({{< ref "/docs/guides/debug_a_flow#debugging-flows" >}} "This is the link title").

PROBLEM(no-undefined-references thinks this is a problem) The HUGO's way of doing relative [links]({{< relref "../Guides/Best_Practices.md" >}}  "This is the link title")

Including an existing image - ![imageAPI](/Images/api.png).

Including a link to a file that exists - [download](/samples/central/apisecret.json).

An external [link](https://google.co.uk/) that is accessible.

An external [link](https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/environmentalization.html) - verifying url replacement works as expected.

A valid reference [google]

[google]: https://google.co.uk/

### Links that needs to be caught and flagged
LINTED: Misspelled [anchor links](#methodz).

LINTED: Non existent [anchor](#foobar).

LINTED: Link to an non-existent file should be caught - [missing files are reported](missing-example.js).

LINTED: External links that are not accessible(404, etc) should be caught [Google/foo](https://google.co.uk/foo).

LINTED: Misspelled images(i.e. name should be import_API.png, but it was added as lowercase by mistake) - ![import_API](/Images/import_api.png).

LINTED: Including an non-existent image - ![non-existent image](/Images/foo.png).

LINTED: A [link](/non-existing-file) to an non existent file.

LINTED: An [anchor](/non-existing-file#foobar) to a heading in an non existent file.

### References - good to be caught but not mandatory

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

Can include [*emphasis*].

Multiple pairs: [a][b][c].

### Avoid doing links like this

These two are valid links in pure markdown, but won't work in HUGO's context. We should avoid linking like this in general. However, these are still caught by the 'no-dead-urls' so we are ok even if something like this slipped in.

- A [link](../Guides/Best_Practices.md) using relative paths. - WORKS in pure Markdown, doesn't work in HUGO.
- An [anchor](../Guides/Best_Practices.md#codebase) using relative paths. - WORKS in pure Markdown, doesn't work in HUGO.

## There is no final newline (handled)