# API Builder Docs

API Builder Docs is a docs-as-code implementation for Axway documentation. It is built using the [Hugo](https://gohugo.io/) static site generator with the [Google Docsy](https://github.com/google/docsy) theme. The site is deployed on Netlify at <https://api-builder-docs.netlify.app//>. Users can edit any documentation page using GitHub web UI or a WYSIWYG editor provided by [Netlify CMS](https://api-builder-docs.netlify.app/).

This repository contains all files for building and deploying the netlify site. The Markdown files for the documentation are stored at `/content/en/docs`. The image files for the documentation are stored at `/static/Images`.

## Contribute

We welcome your contributions! To get started fork this repository, create a feature branch with your changes, and then submit a pull request.

## Style guide

### Text buttons

When writing about text buttons, these shall be **Bold**, and written exactly as they appear in the UI.

1. **Apply**
1. **Close**
1. **Discard changes**

### Inputs, tabs

When writing about named inputs, e.g. **Status**, they should be written in bold and exactly as they appear in the UI.

1. **Status**
1. **Outputs**

### Secondary fields, minor UI components, icons

These are written in _italic_

1. Change the _Selector_ drop-own to _Object_.
1. Enter `$.output` in _Save output value as:_
1. Click the _Pencil_ icon.

### Types of components

Component types are not capitalized, unless they are acronyms. Follow normal capitalization rules for sentences, e.g. within sentences:

1. API
1. endpoints
1. flow
1. flow editor
1. flow-node
1. flow-trigger
1. model

As section headings:

1. Flow
1. Flow editor
1. Flow-node
1. Flow-trigger

### Named plugin and flow-nodes

Named plugins shall be bold, but only the name, not the type.

1. **OpenAPI** flow-trigger
1. **Kafka Consumer** flow-trigger
1. **Kafka Producer** flow-node

### Pages

Pages, such as _API Doc & Test_ shall be written in italic, and exactly as they appear in the UI.
