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
const collections = [{
  ...docsDefaults('', 'docbook/images/general'), // content directory, image directory
  name: 'docs',
  label: 'Documentation',
  description: 'Top level pages in documentation.',
  format: 'frontmatter',
  create: false,
}, {
  ...docsDefaults('api_mgmt_overview', 'api_mgmt_overview'),
  name: 'api_mgmt_overview',
  label: 'API management overview',
  label_singular: 'page in APIM overview section',
  description: 'All pages relating to API management overview',
}, {
  ...docsDefaults('api_mgmt_overview/api_mgmt_components', 'api_mgmt_overview'),
  name: 'api_mgmt_components',
  label: 'API management components',
  label_singular: 'page in APIM components section',
  description: 'All pages relating to API management components',
}, {
  ...docsDefaults('api_mgmt_overview/key_concepts', 'api_mgmt_overview'),
  name: 'key_concepts',
  label: 'API management concepts',
  label_singular: 'page in APIM concepts section',
  description: 'All pages relating to API management concepts',
}, {
  ...docsDefaults('apim_installation/apigtw_install', 'APIGateway'),
  name: 'apigtw_install',
  label: 'Install API Gateway',
  label_singular: 'page in APIG install section',
  description: 'All pages relating to installing API Gateway and API Manager.',
}, {
  ...docsDefaults('apim_installation/apiportal_install', 'APIPortal'),
  name: 'apiportal_install',
  label: 'Install or upgrade API Portal',
  label_singular: 'page in APIP install section',
  description: 'All pages relating to installing or upgrading API Portal.',
}, {
  ...docsDefaults('apim_installation/apigw_containers', 'ContainerGuide'),
  name: 'apigw_containers',
  label: 'Deploy API Gateway in containers',
  label_singular: 'page in APIG containers section',
  description: 'All pages relating to deploying API Gateway and API Manager in Docker containers.',
  format: 'frontmatter',
}, {
  ...docsDefaults('apim_installation/apiportal_docker', 'APIPortal'),
  name: 'apiportal_docker',
  label: 'Deploy API Portal in containers',
  label_singular: 'page in APIP containers section',
  description: 'All pages relating to deploying API Portal in containers.',
}, {
  ...docsDefaults('apim_installation/apigw_upgrade', 'UpgradeGuide'),
  name: 'apigw_upgrade',
  label: 'Upgrade API Gateway',
  label_singular: 'page in APIG upgrade section',
  description: 'All pages relating to upgrading API Gateway.',
}, {
  ...docsDefaults('apim-reference-architectures/container-aws', 'apim-reference-architectures/container-aws'),
  name: 'container-aws',
  label: 'API management AWS reference architecture',
  label_singular: 'page in APIM AWS ref arch section',
  description: 'All pages relating to AWS reference architecture',
}, {
  ...docsDefaults('apim-reference-architectures/container-azure', 'apim-reference-architectures/container-azure'),
  name: 'container-azure',
  label: 'API management Azure reference architecture',
  label_singular: 'page in APIM Azure ref arch section',
  description: 'All pages relating to Azure reference architecture',
}, {
  ...docsDefaults('apimgmt_multi_dc', 'APIGateway'),
  name: 'apimgmt_multi_dc',
  label: 'Configure API Manager in multi-DC',
  label_singular: 'page in APIM multi-DC section',
  description: 'All pages relating to configuring API Manager in multi-DC.',
}, {
  ...docsDefaults('apiportal_ha', 'APIPortal'),
  name: 'apiportal_ha',
  label: 'Configure API Portal for HA',
  label_singular: 'page in APIP HA section',
  description: 'All pages relating to configuring API Portal for HA.',
}, {
  ...docsDefaults('apigtw_devops', 'docbook/images/promotion'),
  name: 'apigtw_devops',
  label: 'Deploy to production',
  label_singular: 'page in APIG deploy section',
  description: 'All pages relating to deploying API Gateway configuration.',
}, {
  ...docsDefaults('apimanager_capacityguide', 'CapacityPlanningGuide'),
  name: 'apimanager_capacityguide',
  label: 'Capacity planning and performance',
  label_singular: 'page in APIM CPG section',
  description: 'All pages relating to capacity planning and performance tests.',
  format: 'frontmatter',
}, {
  ...docsDefaults('apimgmt_security', 'docbook/images/security'),
  name: 'apimgmt_security',
  label: 'Security guidance',
  label_singular: 'page in APIM security section',
  description: 'All pages relating to security guidance for API Gateway, API Manager, and API Portal.',
}, {
  ...docsDefaults('apim_administration/apigtw_admin', 'APIGateway'),
  name: 'apigtw_admin',
  label: 'Administer API Gateway',
  label_singular: 'page in APIG admin section',
  description: 'All pages relating to administering API Gateway.',
}, {
  ...docsDefaults('apim_administration/apimgr_admin', 'docbook/images/api_mgmt'),
  name: 'apimgr_admin',
  label: 'Administer API Manager',
  label_singular: 'page in APIM admin section',
  description: 'All pages relating to administering API Manager.',
}, {
  ...docsDefaults('apim_administration/apimgr_sso', 'docbook/images/api_mgmt'),
  name: 'apimgr_sso',
  label: 'API Manager single sign-on (SSO)',
  label_singular: 'page in APIM SSO section',
  description: 'All pages relating to API Manager SSO.',
}, {
  ...docsDefaults('apim_administration/apiportal_admin', 'APIPortal'),
  name: 'apiportal_admin',
  label: 'Administer API Portal',
  label_singular: 'page in APIP admin section',
  description: 'All pages relating to administering API Portal.',
  format: 'frontmatter',
}, {
  ...docsDefaults('apim_administration/apiportal_sso', 'APIPortal'),
  name: 'apiportal_sso',
  label: 'API Portal single sign-on (SSO)',
  label_singular: 'page in APIP SSO section',
  description: 'All pages relating to API Portal SSO.',
  format: 'frontmatter',
}, {
  ...docsDefaults('cass_admin', 'CassandraAdminGuide'),
  name: 'cass_admin',
  label: 'Administer Apache Cassandra',
  label_singular: 'page in Cassandra admin section',
  description: 'All pages relating to administering Apache Cassandra.',
  format: 'frontmatter',
}, {
  ...docsDefaults('apim_policydev/apigw_poldev', 'docbook/images/general'),
  name: 'apigw_poldev',
  label: 'Develop policies',
  label_singular: 'page in policy dev section',
  description: 'All pages relating to developing policies in Policy Studio.',
}, {
  ...docsDefaults('apim_policydev/apigw_external_connections', 'docbook/images/general'),
  name: 'apigw_external_connections',
  label: 'Configure external connections',
  label_singular: 'page in external connections section',
  description: 'All pages relating to configuring external connections in Policy Studio.',
}, {
  ...docsDefaults('apim_policydev/apigw_gw_instances', 'docbook/images/general'),
  name: 'apigw_gw_instances',
  label: 'Configure instances and listeners',
  label_singular: 'page in instances and listeners section',
  description: 'All pages relating to configuring API Gateway instances and listeners in Policy Studio.',
}, {
  ...docsDefaults('apim_policydev/apigw_web_services', 'docbook/images/general'),
  name: 'apigw_web_services',
  label: 'Register and secure web services',
  label_singular: 'page in web services section',
  description: 'All pages relating to registering and securing web services in Policy Studio.',
}, {
  ...docsDefaults('apim_policydev/apigw_oauth', 'OAuth'),
  name: 'apigw_oauth',
  label: 'Configure OAuth',
  label_singular: 'page in OAuth config section',
  description: 'All pages relating to configuring OAuth in Policy Studio.',
  format: 'frontmatter',
}, {
  ...docsDefaults('apim_policydev/apigw_oauth/oauth_flows', 'OAuth'),
  name: 'oauth_flows',
  label: 'OAuth authentication flows',
  label_singular: 'page in OAuth flows section',
  description: 'All pages relating to OAuth authentication flows.',
  format: 'frontmatter',
}, {
  ...docsDefaults('apim_policydev/apigw_polref', 'docbook/images/content'),
  name: 'apigw_polref',
  label: 'Policy filter reference',
  label_singular: 'page in pol filter ref section',
  description: 'All pages relating to filters in Policy Studio.',
}, {
  ...docsDefaults('apim_policydev/apigw_kps', 'APIGatewayKPSUserGuide'),
  name: 'apigw_kps',
  label: 'Configure KPS',
  label_singular: 'page in KPS section',
  description: 'All pages relating to configuring KPS in Policy Studio.',
}, {
  ...docsDefaults('apigtw_kerberos', 'IntegrationGuides/KerberosIntegration'),
  name: 'apigtw_kerberos',
  label: 'Integrate with Kerberos',
  label_singular: 'page in Kerberos integration section',
  description: 'All pages relating to integrating with Kerberos.',
}, {
  ...docsDefaults('apigtw_auth_auth', 'IntegrationGuides/auth_auth'),
  name: 'apigtw_auth_auth',
  label: 'Integrate with Identity Management',
  label_singular: 'page in IM integration section',
  description: 'All pages relating to integrating with Identity Management.',
}, {
  ...docsDefaults('apimanager_analytics', 'admin'),
  name: 'apimanager_analytics',
  label: 'Configure API Gateway Analytics',
  label_singular: 'page in APIG analytics section',
  description: 'All pages relating to configuring and using API Gateway Analytics.',
  format: 'frontmatter',
}, {
  ...docsDefaults('apim_howto_guides', 'APIGateway'),
  name: 'apim_howto_guides',
  label: 'How-to guides',
  label_singular: 'page in APIM how-to guides section',
  description: 'All pages relating to APIM how-to guides.',
}, {
  ...docsDefaults('apigtw_devguide', 'APIGatewayDeveloperGuide'),
  name: 'apigtw_devguide',
  label: 'Extend API Gateway',
  label_singular: 'page in APIG extend section',
  description: 'All pages relating to extending API Gateway.',
}, {
  ...docsDefaults('apim_reference', 'APIGatewayDeveloperGuide'),
  name: 'apim_reference',
  label: 'Reference',
  label_singular: 'page in APIM ref section',
  description: 'All reference pages for API Gateway and API Manager.',
}, {
  ...docsDefaults('glossary', 'docbook/images/glossary'),
  name: 'glossary',
  label: 'Glossary',
  label_singular: 'page in glossary section',
  description: 'Glossary for API Management and AMPLIFY Central.',
  folder: 'content/en/docs/glossary',
}, {
  ...docsDefaults('apim_relnotes', 'docbook/images/release_notes'),
  name: 'apim_relnotes',
  label: 'Release notes',
  label_singular: 'page in APIM release note section',
  description: 'Release notes for APIM 7.7 release.',
  format: 'frontmatter',
}, {
  ...docsDefaults('apim_relnotes/201904_release', 'docbook/images/release_notes'),
  name: '201904_release',
  label: 'API Management 7.7 April 2019 release notes',
  label_singular: 'page in 7.7 April 2019 release note section',
  description: 'Release notes for 7.7 April 2019 release.',
}, {
  ...docsDefaults('central', 'central'),
  name: 'central',
  label: 'AMPLIFY Central documentation',
  label_singular: 'page in AMPLIFY Central section',
  description: 'All pages relating to AMPLIFY Central.',
  format: 'frontmatter',
}, {
  ...docsDefaults('central/mesh_management', 'central/mesh_management'),
  name: 'mesh_management',
  label: 'Mesh management documentation',
  label_singular: 'page in Mesh management',
  description: 'All pages relating to Mesh management.',
  format: 'frontmatter',
}, {
  ...docsDefaults('central/connect-api-manager', 'central/connect-api-manager'),
  name: 'connect-api-manager',
  label: 'Connect API Manager documentation',
  label_singular: 'page in Connect API Manager',
  description: 'All pages relating to Connect API Manager.',
  format: 'frontmatter',
}, {
  ...docsDefaults('central/connect-aws-gateway', 'central/connect-aws-gateway'),
  name: 'connect-aws-gateway',
  label: 'Connect AWS Gateway documentation',
  label_singular: 'page in Connect AWS Gateway',
  description: 'All pages relating to Connect AWS Gateway.',
  format: 'frontmatter',
}, {
  ...docsDefaults('central/cli_central', 'central/cli_central'),
  name: 'cli_central',
  label: 'Get started with AMPLIFY Central CLI',
  label_singular: 'page in AMPLIFY Central CLI',
  description: 'All pages relating to AMPLIFY Central CLI.',
  format: 'frontmatter',
}, {
  ...docsDefaults('catalog', 'catalog'),
  name: 'catalog',
  label: 'AMPLIFY Unified Catalog documentation',
  label_singular: 'page in AMPLIFY Unified Catalog',
  description: 'All pages relating to AMPLIFY Unified Catalog.',
  format: 'frontmatter',
}, {
  ...docsDefaults('streams', 'streams'),
  name: 'streams',
  label: 'AMPLIFY Streams documentation',
  label_singular: 'page in AMPLIFY Streams section',
  description: 'All pages relating to AMPLIFY Streams.',
  format: 'frontmatter',
}, {
  ...docsDefaults('streams/publishers', 'streams/publishers'),
  name: 'streams_publishers',
  label: 'AMPLIFY Streams Publishers documentation',
  label_singular: 'page in AMPLIFY Streams Publishers section',
  description: 'All pages relating to AMPLIFY Streams Publishers.',
  format: 'frontmatter',
}, {
  ...docsDefaults('streams/subscribers', 'streams/subscribers'),
  name: 'streams_subscribers',
  label: 'AMPLIFY Streams Subscribers documentation',
  label_singular: 'page in AMPLIFY Streams Subscribers section',
  description: 'All pages relating to AMPLIFY Streams Subscribers.',
  format: 'frontmatter',
}, {
  ...docsDefaults('shared_services', 'shared_services'),
  name: 'shared_services',
  label: 'AMPLIFY Shared Services documentation',
  label_singular: 'page in AMPLIFY Shared Services section',
  description: 'All pages relating to AMPLIFY Shared Services.',
  format: 'frontmatter',
}, {
  ...docsDefaults('shared_services/supportapi', 'shared_services/supportapi'),
  name: 'supportapi',
  label: 'Support Portal API documentation',
  label_singular: 'page in Support Portal API section',
  description: 'All pages relating to Support Portal API.',
  format: 'frontmatter',
}, {
  ...docsDefaults('shared_services/supportapi/formats', 'shared_services/supportapi'),
  name: 'formats',
  label: 'Support Portal API Formats documentation',
  label_singular: 'page in Support Portal API Formats section',
  description: 'All pages relating to Support Portal API Formats.',
  format: 'frontmatter',
}, {
  ...docsDefaults('shared_services/supportapi/methods', 'shared_services/supportapi'),
  name: 'methods',
  label: 'Support Portal API Methods documentation',
  label_singular: 'page in Support Portal API Methods section',
  description: 'All pages relating to Support Portal API Methods.',
  format: 'frontmatter',
}, {
  ...docsDefaults('contribution_guidelines', 'contributing'),
  name: 'contribution_guidelines',
  label: 'Contribution guidelines',
  description: 'All pages relating to contributing to the documentation.',
  create: false,
  format: 'frontmatter',
}, {
  ...postDefaults,
  name: 'news',
  label: 'News posts',
  label_singular: 'News post',
  description: 'All news posts.',
  folder: 'content/en/blog/news',
}, {
  ...postDefaults,
  name: 'releases',
  label: 'Release posts',
  label_singular: 'Release post',
  description: 'All product release posts.',
  folder: 'content/en/blog/releases',
}, {
  ...postDefaults,
  name: 'friends',
  label: 'Friends posts',
  label_singular: 'Friends post',
  description: 'All friends of the doc posts.',
  folder: 'content/en/blog/friends',
}];

const cms_branch = window.location.hostname.includes('develop') ? 'develop' : 'master';

const config = {
  backend: {
    name: 'github',
    branch: cms_branch,
    repo: 'Axway/axway-open-docs', //Path to your GitHub repository. For fork testing use alexearnshaw/axway-open-docs.
    open_authoring: true,
  },
  publish_mode: 'editorial_workflow',
  media_folder: '/static/Images', // Media files will be stored in the repo under static/Images
  public_folder: '/Images', // The src attribute for uploaded media will begin with /Images
  site_url: 'https://axway-open-docs.netlify.com/', // for fork testing use https://fork-axway-open-docs.netlify.com/
  collections,
};

// Make the config object available on the global scope for processing by
// subsequent scripts.Don't rename this to `CMS_CONFIG` - it will cause the
// config to be loaded without proper processing.
window.CMS_CONFIGURATION = config;

CMS.init({ config })
