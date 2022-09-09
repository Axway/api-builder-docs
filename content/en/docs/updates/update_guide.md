---
title: Update guide
weight: 10
date: 2022-09-09
---

New versions of {{% variables/apibuilder_prod_name %}} are released every 2 weeks, often containing important fixes and features. Each {{% variables/apibuilder_prod_name %}} project depends on it is own version of {{% variables/apibuilder_prod_name %}} which allows you to update your services individually.

{{% variables/apibuilder_prod_name %}} provides details about component updates in the _Updates_ tab in the UI. There are two types:

* _Updates_ - These are safe, incremental updates that may fix bugs, introduce new features, or apply security updates. These types of updates are automatically applied when `npm update` is run from the command line. You should regularly update your application (see [installing updates](#installing-updates)).

* _Upgrades_ - These are breaking changes, meaning that the new version that is introduced is somehow incompatible with the previous version, and may adversely effect your application. Installing upgrades is optional, however you should check the [release schedule](/docs/release_schedule) for when your current version will no longer be supported. For these, you should read the release notes carefully before installing. In many cases, a component may only require a newer version of Node.js. However, some upgrades may require that you make changes to your application, and these will be detailed in the release notes (see [installing upgrades](#installing-upgrades)).

Occassionally, there are also recommended updates to the project's files that will be mentioned in the [release notes](/docs/release_notes), these can be found in [Project updates](/docs/updates/project_updates).

## Update notifications

When updates or upgrades are available, the UI will show a badge in the **Updates** button in the navigation panel indicating the number of components that have updates.

![Updates badge](/Images/updates_badge.png)

## Installing updates

When updates are available, a panel will appear at the top of the **Updates** page, that indicates it is an "Update".

![Updates panel](/Images/updates_panel.png)

The panel can be expanded by clicking on it to review the components and the release notes for each component that will be updated.

When ready, click the **Update** button. The UI does not actually install updates. It merely guides you in how to install the update, which is effectively:

1. Return to the console where you started the application.
1. Exit the application.
1. Run `npm update`
1. Restart the application

The UI is not required for installing updates. The `npm update` command can be run any time.

{{% alert title="Note" color="primary" %}}Installing updates is a manual process that requires restart.{{% /alert %}}

## Installing upgrades

When upgrades are available, a panel will appear at the bottom of the **Updates** page, that indicates it is an "Upgrade". The panels can be expanded to see the effected module and versions and review the release notes.

In the example below, there are two panels, _Updates_ and _Upgrades_, but all of the upgrades are disabled because we require all [updates be applied](#installing-updates) before upgrading.

![Updates and upgrade panels](/Images/updates_upgrades.png)

{{% alert title="Note" color="primary" %}}
* All upgrade prerequisites must be installed before the upgrade can be installed.
* All updates must be installed before any upgrade.
* Installing upgrades is a manual process that requires restart.
{{% /alert %}}

Once all of the prerequisites are met for an individual upgrade, you may install the upgrade. A final prerequisite is a check-box to ensure that you have read the release notes. Installing upgrades can have an adverse effect on your application if you do not correctly prepare for them.

![Upgrade JSON](/Images/upgrade_json.png)

When ready, click the **Update** button. The UI does not actually install upgrades. It merely guides you in how to install the upgrade, which is effectively:

1. Return to the console where you started the application.
1. Exit the application.
1. Run the command provided from the _Upgrade_ dialog
1. Restart the application

## Update CLI

The CLI is used to create new projects. Before creating a new project, ensure that your CLI is up to date. This ensures that the project contains all of the latest updates.

```bash
npm install -g axway
axway pm update
```
