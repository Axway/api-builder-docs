---
title: Christie release notes
linkTitle: Christie
description: 23 September 2022
date: 2022-09-23
Hide_readingtime: true
---
## Summary
In this release we added support for publishing and subscribing to queues in the Solace plugin.

{{% releasenotes/update %}}

<!-- ## Breaking changes -->

## Features
* #7443: Added support for publishing and subscribing to queues in the Solace plugin.
* #7443: Added support for manual application acknowledgement for messages from Solace queues using the new [**Solace Acknowledge** flow-node](/docs/developer_guide/flows/flow_nodes/solace_acknowledge_flow_node/).

<!-- ## Fixes -->

{{% releasenotes/deprecations %}}

<!-- Regenerate modules/plugins with api-builder-tools generate-release-notes script -->
<!-- ## Updated modules -->

<!-- ## Updated plugins -->

## Known issues
For a list of up-to-date known issues see [{{% variables/apibuilder_prod_name %}} known issues](/docs/known_issues/).

{{% releasenotes/previous %}}
