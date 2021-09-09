---
title: Misc
description: A section that is going to be used for miscellaneous linting showcases.
weight: 30
date: 2021-09-09
---
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

## Contractions
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

## There is no final newline (handled)