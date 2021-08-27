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

## Links
LINTED: It would be nice to catch misspelled [anchor links](#methodz).

LINTED: Non existent anchors should be flagged. [broken anchor links](#foobar).

FIXME: Existent anchors should be fine. [working anchor link](#methods).

LINTED: Non-existent images should be caught ![import_API](/Images/import_api.png) - Name should be import_API.png, but it was added as lowercase by mistake.

LINTED: Non-existent images should be caught ![non-existent image](/Images/foo.png).

FIXME: Existing images should be fine - ![imageAPI](/Images/api.png).

LINTED: External links that are not accessible(404, etc) should be caught [Google/foo](https://google.co.uk/foo).

FIXME: External links that are accessible should be fine - [Google](https://google.co.uk/).

LINTED: Link to an non-existent file should be caught - [missing files are reported](missing-example.js).


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

## There is no final newline (handled)