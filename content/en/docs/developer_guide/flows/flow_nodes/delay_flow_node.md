---
title: Delay flow-node
linkTitle: Delay flow-node
weight: 60
date: 2021-10-01
---

The Delay flow-node method, parameter, and output are described in the following sections.

## Method

The method for a Delay flow-node is:

* `delay` - Wait for a configured amount of time before continuing to the next flow-node.

## Parameter

The Delay flow-node parameter is described in the following section.

### delay parameter

The `delay` method parameter is:

| Parameter | Type | Default | Description | Configuration selection |
| --- | --- | --- | --- | --- |
| delay | integer | \- | The length of delay, in milliseconds. | Selector, Number |

## Output

The Delay flow-node output is described in the following section.

### delay output

The `delay` method output is:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| next | integer | The delay is completed. | $.delayed |
