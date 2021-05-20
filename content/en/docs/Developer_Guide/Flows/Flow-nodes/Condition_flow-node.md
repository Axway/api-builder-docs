---
title: Condition flow-node
linkTitle: Condition flow-node
description: ADD A DESCRIPTION
weight: 50
date: 2021-05-17
---

The Condition flow-node methods, parameters, and outputs are described in the following sections.

## Methods

The default methods for a Condition flow-node are:

* `equals` - Tests if a value is equal.

* `exists` - Tests if a value exists, true or false.

* `greater-than` - Tests if a value is greater than another value.

* `greater-than-equal` - Tests if a value is greater than or equal to another value.

* `less-than` - Tests if a value is less than another value.

* `less-than-equal` - Tests if a value is less than or equal to another value.

## Parameters

The Condition parameters are described in the following sections.

### equals parameters

The `equals` method parameters are:

| Parameter | Type | Description | Configuration selection |
| --- | --- | --- | --- |
| source | any | The input to test. | Selector, String, Number, Boolean, Object, Array, Null |
| value | any | The value to test input against. | Selector, String, Number, Boolean, Object, Array, Null |

### exists parameters

The `exists` method parameter is:

| Parameter | Type | Description | Configuration selection |
| --- | --- | --- | --- |
| source | any | The input to test. | Selector, String, Number, Boolean, Object, Array, Null |

### greater-than parameters

The `greater-than` method parameters are:

| Parameter | Type | Description | Configuration selection |
| --- | --- | --- | --- |
| source | any | The input to test. | Selector, String, Number, Boolean, Object, Array, Null |
| value | any | The value to test input against. | Selector, String, Number, Boolean, Object, Array, Null |

### greater-than-equal parameters

The `greater-than-equal` method parameters are:

| Parameter | Type | Description | Configuration selection |
| --- | --- | --- | --- |
| source | any | The input to test. | Selector, String, Number, Boolean, Object, Array, Null |
| value | any | The value to test input against. | Selector, String, Number, Boolean, Object, Array, Null |

### less-than parameters

The `less-than` method parameters are:

| Parameter | Type | Description | Configuration selection |
| --- | --- | --- | --- |
| source | any | The input to test. | Selector, String, Number, Boolean, Object, Array, Null |
| value | any | The value to test input against. | Selector, String, Number, Boolean, Object, Array, Null |

### less-than-equal parameters

The `less-than-equal` method parameters are:

| Parameter | Type | Description | Configuration selection |
| --- | --- | --- | --- |
| source | any | The input to test. | Selector, String, Number, Boolean, Object, Array, Null |
| value | any | The value to test input against. | Selector, String, Number, Boolean, Object, Array, Null |

## Outputs

The Condition flow-node outputs are described in the following sections.

### equals outputs

The `equals` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| true | boolean | The condition tested true. | $.equals |
| false | boolean | The condition tested false. | $.equals |

### exists outputs

The `exists` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| true | boolean | The condition tested true. | $.exists |
| false | boolean | The condition tested false. | $.exists |

### greater-than outputs

The `greater-than` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| true | boolean | The condition tested true. | $.greaterThan |
| false | boolean | The condition tested false. | $.greaterThan |

### greater-than-equal outputs

The `greater-than-equal` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| true | boolean | The condition tested true. | $.greaterThanEqual |
| false | boolean | The condition tested false. | $.greaterThanEqual |

### less-than outputs

The `greater-than-equal` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| true | boolean | The condition tested true. | $.lessThan |
| false | boolean | The condition tested false. | $.lessThan |

### less-than-equal outputs

The `less-than-equal` method outputs are:

| Output | Type | Description | Save output value as: |
| --- | --- | --- | --- |
| true | boolean | The condition tested true. | $.lessThanEqual |
| false | boolean | The condition tested false. | $.lessThanEqual |
