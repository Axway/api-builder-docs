---
title: XSLT flow-node
linkTitle: XSLT flow-node
weight: 220
date: 2021-10-01
---

This flow-node is an {{% variables/apibuilder_prod_name %}} plugin that executes XSL Transformations (XSLT). Supports XSLT 1.0, 2.0, and 3.0.

## Installation

The XSLT flow-node plugin is currently not included in the default application, but it can be installed manually with:

```bash
npm install @axway/api-builder-plugin-fn-xslt
```

## Methods

The default methods are available on the XSLT flow-node.

### Execute XSLT

Executes an XSLT stylesheet to generate a string (e.g. XML, JSON, HTML, text).

#### Parameters

| Parameter | Type | Description | Configuration selection | Required |
| --- | --- | --- | --- | --- |
| xslt | string | The XSLT stylesheet. | Selector, String | Yes |
| xml | string | The XML document to be transformed. | Selector, String | No |
| stylesheetParams | boolean | External parameters for the stylesheet, which were specified as `xsl:param`. | Selector, Object | No |

##### Parameter: xslt

The `xslt` parameter is required and is where you define the XSLT stylesheet. The value is a `String`, and must be valid XSLT.

##### Parameter: xml

The `xml` parameter is used to optionally provide a document on which the XSLT operates. The value is a `String`, and must be valid XML.

##### Parameter: stylesheetParams

The `stylesheetParams` parameter is used provide external parameters to the XSLT. For example, if the stylesheet declares `xsl:param`, then the value can be provided using this parameter. The value is an `Object`.

#### Outputs

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| Next | String | The XSLT stylesheet transformation was successful. | `$.result` |
| Error | Object | An unexpected error was encountered. | `$.error` |

## How to use the XSLT plugin

After the installation of the XSLT plugin and editing a Flow, you will find the XSLT flow-node in the Core section:

![image2021-1-29_13_2_14](/Images/image2021_1_29_13_2_14.png)

You can drag and drop the XSLT flow-node on to the Flow Graph and select it to edit its configuration properties in the panel on the right:

![image2021-1-29_13_3_0](/Images/image2021_1_29_13_3_0.png)

### Example 1 - Transform XML into XML

Given an XML input representing "persons":

```xml
// XML

<?xml version="1.0" ?>
<persons>
    <person username="bobby">
        <name>Bob</name>
        <surname>Allen</surname>
    </person>
    <person username="jordy">
        <name>Jordan</name>
        <surname>Wilson</surname>
    </person>
</persons>
```

And an XSLT input:

```xml
// XSLT

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="xml" indent="yes"/>
    <xsl:template match="/persons">
        <root>
            <xsl:apply-templates select="person"/>
        </root>
    </xsl:template>
    <xsl:template match="person">
        <name username="{@username}">
            <xsl:value-of select="name"/>
        </name>
    </xsl:template>
</xsl:stylesheet>
```

The transformed result would be:

```xml
// Result (XML)

<root>
  <name username="bobby">Bob</name>
  <name username="jordy">Jordan</name>
</root>
```

### Example 2 - Execute XSLT with params and return a string

Given no XML input, but given an XSLT input representing an equation (a + b):

```xml
// XML

<?xml version="1.0"?>
<xsl:stylesheet version="3.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xsl:param name="a" as="xs:double"/>
  <xsl:param name="b" as="xs:double"/>
  <xsl:output method="text" />
  <xsl:template match="/">
    <xsl:value-of select="($a + $b)"/>
  </xsl:template>
</xsl:stylesheet>
```

And an Stylesheet Params:

```json
// Stylesheet params

{"a": 2, "b": 3}
```

The transformed result would be a string:

```xml
// Result (XML)

5
```
