# Axway-Open-Docs

Axway-Open-Docs is a docs-as-code implementation for Axway documentation. It is built using the [Hugo](https://gohugo.io/) static site generator with the [Google Docsy](https://github.com/google/docsy) theme. The site is deployed on Netlify at <https://axway-open-docs.netlify.com/>. Users can edit any documentation page using GitHub web UI or a WYSIWYG editor provided by [Netlify CMS](https://www.netlifycms.org/).

This repository contains all files for building and deploying a **microsite** in the Axway-Open-Docs ecosystem.

## Create your own microsite using this repository

This section details how to create your own microsite in the Axway-Open-Docs ecosystem. For an overall view of the microsite architecture, see [Architecture for docs-as-code at scale](https://techweb.axway.com/confluence/display/RDAPI/Architecture+for+docs+as+code+at+scale).

### Before you start

You must have the following installed in your development environment:

* Git client
* Hugo
* Node.js

See [Set up and work locally](https://axway-open-docs.netlify.app/docs/contribution_guidelines/setup_work_locally/) for information on recommended versions of these tools and for tips on installing them in a WSL environment.

The following steps assume that you already have a GitHub account in the Axway org and that you have the permissions to create new projects in that org.

### Create a new microsite repository in Axway org

1. Go to [Axway org on GitHub](https://github.com/Axway) and click **New**.
    ![Create new repo](/static/Images/axway_github_new.png)
2. At the top of the page click **Import a repository**.
    ![Import repo](/static/Images/axway_github_import.png)
3. On the next screen, enter the clone URL of this repository and the name for your new microsite.

    * To find the clone URL of this repository, click the drop-down arrow on the Code button above and copy the HTTPS URL to your clipboard.
    * Enter a name following the naming convention `MYPROJECT-open-docs`, for example `amplify-central-open-docs`.

    ![Import details](/static/Images/axway_github_import_details.png)

### Clone the new microsite repository to your local environment

Clone your new repository:

```
cd ~
git clone git@github.com:Axway/MYPROJECT-open-docs.git
```

After running these commands, you will have a local copy of the repository in the following location:

```
/home/YOUR-UNIX-USERNAME/MYPROJECT-open-docs
```

### Build the site locally

Run the `build.sh` command in your site root:

```
cd ~/MYPROJECT-open-docs/
./build.sh
```

The `build.sh` script performs the following:

* Adds the `docsy` theme Git submodule
* Adds the `axway-open-docs-common` Git submodule
* Installs the npm packages required by Docsy
* Runs the `hugo server` command

The website is now available locally at `http://localhost:1313/`.

### Create a new Netlify microsite

Create a new site from your microsite repo in Netlify:

1. Log in to [OpenDocs Netlify account](https://app.netlify.com/teams/opendocs/sites).
2. Click **New site from Git**.
3. Click **GitHub**. You'll be asked to authorize Netlify to your account.
4. On the **Create a new site** dialog, select the **Axway** GitHub organization and click **Configure the Netlify app on GitHub**.

    ![Add site to Netlify](/static/Images/netlify_add_site.png)

5. On the **Install Netlify** dialog, select **Axway** to expand it.
6. On the **Update Netlify's repository access** dialog, select the Axway org and the microsite repository you created earlier and click **Update access** to give Netlify access. Be careful not to deselect or remove any repositories that already have the Netlify app installed!
7. Back in the Netlify window, verify that your newly created microsite repository is on the list, and click to select it.
8. Select **Open docs team** as Owner, select **master** as branch to deploy. Do not change the **Basic** or **Advanced** build settings. Click **Deploy site**.

The site is now deployed on a random URL. To change the URL click **Site settings > Change site name** and enter a name in the format `MYPROJECT-open-docs`. The site will now be available on the URL `https://MYPROJECT-open-docs.netlify.app/`.

### Customize the site to use your Github repo

Change the `github_repo` parameter in `config.toml` to point to your project repo as this is used by Hugo/Docsy to generate the GitHub edit links on each page. For example:

```
github_repo = "https://github.com/Axway/MYPROJECT-open-docs"
```

### Customize the site to use your Netlify CMS instance

Make the following changes to get the **Edit on Netlify CMS** links on each page to link to the correct Netlify CMS app. The Netlify CMS app is available by default on the URL  `https://MYPROJECT-open-docs.netlify.app/admin/`.

**NOTE these steps are still TBC**

#### Change baseURL in `config.toml` to the URL of your microsite

Change the `baseURL` in `config.toml`:

```
baseURL = "https://MYPROJECT-open-docs.netlify.app/"
```

#### Update the Netlify CMS configuration for your repository and microsite

Change `repo` and `site_url` in `static/admin/config.js` to point to your GitHub repo and your microsite.

```
repo: 'Axway/MYPROJECT-open-docs', //Path to your GitHub repository.
...
site_url: 'https://MYPROJECT-open-docs.netlify.app/', //URL to netlify site
```

#### Add the Axway GitHub OAuth app to your microsite

To enable users to log in to Netlify CMS with their GitHub accounts, you must add the Axway OAuth authentication provider to the microsite. 

1. Log in to [OpenDocs Netlify account](https://app.netlify.com/teams/opendocs/sites).
2. Click your microsite.
3. Go to **Settings > Access control > OAuth**.
4. Click **Install provider**.
5. Select **GitHub** as the provider and enter the client ID and secret from [this internal Confluence page](https://techweb.axway.com/confluence/display/RDAPI/Open+docs+quick+reference#Opendocsquickreference-OAuthproviderdetailsforNetlifyCMS).
6. Click **Install**.

### Customize the content for your project

The project contains placeholder documentation content in the folder `/content/en/docs` and placeholder images in `/static/Images`. The placeholder content is copied from the [Docsy example project](https://example.docsy.dev/) (with some modifications) and shows the different types of content and the different types of formatting that are available for you to use when creating your own content.

You must replace or update the placeholder content as necessary with your own documentation content.

When working with the content it can be useful to read the following Docsy documentation to get an understanding of how to add content files and images, and how to change the navigation of the content using frontmatter fields in Markdown files:

* [Adding Content](https://www.docsy.dev/docs/adding-content/content/)
* [Navigation and Search](https://www.docsy.dev/docs/adding-content/navigation/)

### Customize the microsite landing page

The landing page for the microsite is a HTML page `content/en/_index.html` and uses Docsy content blocks. You must modify this page to create your own blocks and link to your own content.

### Update the Netlify CMS collections configuration for your documentation

After you have replaced the placeholder content with your documentation content, you must update the `collections` variable in `static/admin/config.js` so that Netlify CMS shows one collection for each folder under `content\en\docs`.

For more information, see [Add new documentation to Netlify CMS](https://axway-open-docs.netlify.app/docs/contribution_guidelines/maintain_customize/#add-new-documentation-to-netlify-cms).

### Customize your Git repo for your way of working

You can set up your Git repo in whatever way works best for your team and your product, however, to be accepted into the Axway-Open-Docs ecosystem you must enable the following as a minimum.

#### Branch protections

Your `master` branch must be protected:

* It must require pull request reviews before merging (at least 1 review from a technical writer or doc owner)
* It must require status checks to pass before merging (for the Axway CLA, the Markdown linter, and any **Netlify** checks (Header rules, Pages changed, Redirect rules, Mixed content, deploy/netlify))

![Branch protections](/static/Images/microsite_github_protections.png)

#### Markdown linting

You must use the the GitHub Action that runs the Markdown linter (see `.github/workflows/ciworkflow.yml`).

#### Merge strategy

It is best to use a squash merging strategy in public projects with external contributors as this results in a more readable Git history and cleaner change history messages at the bottom of each documentation page.

To enable squash merging, select the **Allow squash merging** checkbox and deselect the other options under **Settings > Options > Merge button**. When using this option it is best to also enable the linear history requirement on any protected branches.

You can also enable **Automatically delete head branches** to keep your branch list clean.

#### Branching strategy

You can set up any branching strategy as required by your product team. 

Some common options include:

* A single production branch (`master`) for single version continuously delivered products
* A development branch (`develop`) and a production branch (`master`) for single version products delivered on a regular cycle
* A latest version production branch (`master`) and one or more previous version sustaining production branches (`762`, `753`, etc.)

#### CODEOWNERS

You must modify the CODEOWNERS (`.github/CODEOWNERS`) file with the correct users. This automates who gets added as reviewers in pull requests.

#### Pull request and issue templates

It is best to modify the following templates to suit your project:

* Pull request template (`.github/pull_request_template.md`) - This template is used when a contributor creates a PR on GitHub. It is not used by Netlify CMS. 
* Issue templates (`.github/ISSUE_TEMPLATE/documentation-issue-template.md` and `.github/ISSUE_TEMPLATE/website-issue-template.md`) - These are used when a contributor creates a GitHub issue.

### Connect your microsite to the Axway-Open-Docs ecosystem

When you and your stakeholders are happy with the content on your Netlify microsite, you can request that your microsite be added to the overall ecosystem. This involves having redirects added to the main [Axway Open Documentation](https://axway-open-docs.netlify.app/) site to redirect all traffic to your documentation to your microsite. Contact @alexearnshaw or @andreamussap to request this.

### Set up publishing to Zoomin

To enable publishing of the microsite content as a new _bundle_ on Zoomin production doc portal you must create a classification file, properties file, and zip file as detailed in [Docs-as-code on Zoomin](https://techweb.axway.com/confluence/display/RDAPI/Docs-as-code+on+Zoomin).

When this is set up you must manually FTP the zip file to Zoomin to trigger an upload of the Netlify microsite content.
