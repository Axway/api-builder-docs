---
title: Base64
description: TODO
date: 2021-06-22
---

# ISSUE: All headings should be at least 2 (plugin only checks first though)

You can install the **Base64** plugin from the **Plugins** page, or execute the following command:

ISSUE: missing code-block language flag
```
npm install @axway/api-builder-plugin-fn-base64
```

## Methods
ISSUE: An example of a bad list:
* one
* two
* three

ISSUE: Another example of a bad list:
- one
- two
- three

ISSUE: incorrect indentation,
 | foo | bar |
 | --- | ----- |
 | baz | banana |

NON-ISSUE: It'd be nice to catch broken [anchor links](#methodz).

ISSUE: tabby	tab

ISSUE: Catch prohibited: Flow node
ISSUE: Catch prohibited: Flow-Node
ISSUE: Catch prohibited: Flow-Trigger
ISSUE: Catch prohibited: flow trigger
ISSUE: Catch prohibited: Node.JS
ISSUE: Catch prohibited: NPM
ISSUE: Catch prohibited: Our builder should complain if it is not "API Builder".

# ISSUE: Contractions
I can't imagine API Builder wouldn't handle OAS3. I don't care what you think, but it's something that'll take some time and we could've done it earlier, but we couldn't find the time. It shouldn't bother you.

## NON-ISSUE: Duplicate
Duplicate 1

## NON-ISSUE: Duplicate
`remark-lint-no-duplicate-headings` failed to match these duplicate headings.

__NON-ISSUE: do not use emphasis headers__
The plugin [remark-lint-no-emphasis-as-heading](https://www.npmjs.com/package/remark-lint-no-emphasis-as-heading) should pick this up but didn't. It picks out `strong-marker` instead. I ordered the rules to put it first, but it still does not work as expected. But, I think we want this rule, and a rule for bold headers, or just a style for headers in general.

### NON-ISSUE: Header Title case
NON-ISSUE: We want to enforce "Header title case" for headers.
NON-ISSUE: We want to "enforce matching punctuation.
ISSUE: We want to enforce no trailing slash on [URL](https://www.npmjs.com/).
NON-ISSUE: Wonder if it will pick up on the 2-space sentences :upside_down_face:.  Another sentence.

### NON-ISSUE: Header lower-case


## ISSUE^: Heading with too much whitespace before

## ISSUE: Would be nice to detect empty headings

## ISSUE: This heading is an example where it is too long and will not render nicely

# NON-ISSUE: Want all headings >= 2

## ISSUE: there is no final newline