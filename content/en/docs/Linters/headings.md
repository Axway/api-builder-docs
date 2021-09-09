---
title: Headings
description: A section that is going to be used for heading linting showcases.
weight: 20
date: 2021-09-09
---
# All headings should be at least 2 (plugin only checks first though) (LINTED)
Old test, the new headings tweak should catch this, but left it in for now.

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

#### Increasing a heading should be done by one level at a time (handled)

## Headings 2
Text.

### Headings 3
Text.

#### Headings 4
Text.

##### Headings 5
Text.

### A new chapter (handled)
Decreasing of headers should be done by one level at a time or go back to h2s.
