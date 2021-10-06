/**
 * Docs page collections require the following minimal dataset:
 *   name: [string] used in routes, ie.: /admin/collections/:slug/edit
 *   label: [string] used in CMS UI left nav
 *   label_singular: [string] used in CMS UI, ie.: 'New Post'
 *   description: [string] used in CMS UI
 */
const docsDefaults = (contentDirectory, imageDirectory) => ({
  folder: `content/en/docs/${contentDirectory}`,
  media_folder: `{{media_folder}}/${imageDirectory}`,
  public_folder: `{{public_folder}}/${imageDirectory}`,
  preview_path: `docs/${contentDirectory}/{{filename}}/`,
  create: true, // Allow users to create new documents in this collection
  delete: false, // Allow users to delete documents in this collection
  format: 'json-frontmatter', // Specify frontmatter for YAML or json-frontmatter for JSON
  fields: [
    { name: 'title', label: 'Title', widget: 'string' },
    { name: 'linkTitle', widget: 'hidden', required: false },
    { name: 'no_list', widget: 'hidden', required: false },
    { name: 'simple_list', widget: 'hidden', required: false },
    { name: 'draft', widget: 'hidden', required: false },
    { name: 'weight', widget: 'hidden', required: false },
    { name: 'date', widget: 'hidden', required: false },
    { name: 'description', label: 'Summary', widget: 'text', required: false },
    { name: 'body', label: 'Body', widget: 'markdown' },
  ],
})

/**
 * Post collections require the same minimal dataset as docs pages.
 */
const postDefaults = {
  create: true,
  delete: false,
  fields: [
    { label: 'Title', name: 'title', widget: 'string' },
    { label: 'Author', name: 'author', widget: 'string' },
    { label: 'Publish Date', name: 'date', widget: 'datetime' },
    { label: 'Summary', name: 'description', widget: 'text' },
    { label: 'Image', name: 'image', widget: 'image', required: false },
    { label: 'Body', name: 'body', widget: 'markdown' },
  ],
}

/**
 * Add new collections here.
 */
 const collections = [
  {
    ...docsDefaults('', 'docbook/images/general'), // content directory, image directory
    name: 'docs',
    label: 'API Builder Documentation',
    description: 'Top level pages in API Builder documentation.',
    format: 'frontmatter',
    create: false,
  }, {
    ...docsDefaults('developer_guide', 'developer_guide'),
    name: 'developer_guide',
    label: 'Developer Guide',
    label_singular: 'page in Developer Guide section',
    description: 'All pages relating to Developer Guide section.',
    format: 'frontmatter',
  }, {
    ...docsDefaults('how_to', 'how_to'),
    name: 'how_to',
    label: 'How to',
    label_singular: 'page in How to section',
    description: 'All pages relating to How to section.',
    format: 'frontmatter',
  }, {
    ...docsDefaults('release_notes', 'release_notes'),
    name: 'release_notes',
    label: 'Release Notes',
    label_singular: 'page in Release Notes section',
    description: 'All pages relating to Release Notes section.',
    format: 'frontmatter',
  }, {
    ...docsDefaults('deprecations', 'deprecations'),
    name: 'deprecations',
    label: 'Deprecations',
    label_singular: 'page in Deprecations section',
    description: 'All pages relating to Deprecations section.',
    format: 'frontmatter',
  }, {
    ...docsDefaults('best_practices', 'best_practices'),
    name: 'best_practices',
    label: 'Best Practices',
    label_singular: 'page in Best Practices section',
    description: 'All pages relating to Best Practices section.',
    format: 'frontmatter',
  }, {
    ...docsDefaults('faq', 'faq'),
    name: 'faq',
    label: 'FAQ',
    label_singular: 'page in FAQ section',
    description: 'All pages relating to FAQ section.',
    format: 'frontmatter',
  }, {
    ...docsDefaults('getting_started', 'getting_started'),
    name: 'getting_started',
    label: 'Getting Started',
    label_singular: 'page in Getting Started section',
    description: 'All pages relating to Getting Started section.',
    format: 'frontmatter',
  }, {
    ...docsDefaults('known_issues', 'known_issues'),
    name: 'known_issues',
    label: 'Known Issues',
    label_singular: 'page in Known Issues section',
    description: 'All pages relating to Known Issues section.',
    format: 'frontmatter',
  }, {
    ...docsDefaults('nodejs_support_policy', 'nodejs_support_policy'),
    name: 'nodejs_support_policy',
    label: 'Nodejs Support Policy',
    label_singular: 'page in Nodejs Support Policy section',
    description: 'All pages relating to Nodejs Support Policy section.',
    format: 'frontmatter',
  }, {
    ...docsDefaults('performance_metrics', 'performance_metrics'),
    name: 'performance_metrics',
    label: 'Performance Metrics',
    label_singular: 'page in Performance Metrics section',
    description: 'All pages relating to Performance Metrics section.',
    format: 'frontmatter',
  }, {
    ...docsDefaults('security_guide', 'security_guide'),
    name: 'security_guide',
    label: 'Security Guide',
    label_singular: 'page in Security Guide section',
    description: 'All pages relating to Security Guide section.',
    format: 'frontmatter',
  }, {
    ...docsDefaults('updates', 'updates'),
    name: 'updates',
    label: 'Updates',
    label_singular: 'page in Updates section',
    description: 'All pages relating to Updates section.',
    format: 'frontmatter',
  }, {
    ...docsDefaults('v3_to_v4_upgrade_guide', 'v3_to_v4_upgrade_guide'),
    name: 'v3_to_v4_upgrade_guide',
    label: 'v3 to v4 upgrade guide',
    label_singular: 'page in v3 to v4 upgrade guide section',
    description: 'All pages relating to v3 to v4 upgrade guide section.',
    format: 'frontmatter',
  }
];

const cms_branch = window.location.hostname.includes('develop') ? 'develop' : 'master'; // Additional config for a develop branch and develop site

const config = {
  backend: {
    name: 'github',
    branch: cms_branch,
    repo: 'Axway/api-builder-docs', // Path to your GitHub repository.
    open_authoring: true,
  },
  publish_mode: 'editorial_workflow',
  media_folder: '/static/Images', // Media files will be stored in the repo under static/Images
  public_folder: '/Images', // The src attribute for uploaded media will begin with /Images
  site_url: 'https://api-builder-docs.netlify.com/', // URL to netlify site
  collections,
};

// Make the config object available on the global scope for processing by
// subsequent scripts.Don't rename this to `CMS_CONFIG` - it will cause the
// config to be loaded without proper processing.
window.CMS_CONFIGURATION = config;

CMS.init({ config })
