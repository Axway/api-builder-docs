dayjs.extend(dayjs_plugin_utc);

const Page = ({ title, description, children }) => (
  <div className="container-fluid td-outer">
    <div className="td-main">
      <div className="row flex-xl-nowrap">
        <main className="col-12" role="main">
          <div className="td-content">
            <h1>{title}</h1>
            {description && <div className="lead">{description}</div>}
            {children}
          </div>
        </main>
      </div>
    </div>
  </div>
);

const DocsPage = ({ entry, widgetFor }) => {
  const { title, description } = entry.get('data').toJS();
  return (
    <Page title={title} description={description}>
      {widgetFor('body')}
    </Page>
  );
}

const BlogPage = ({ entry, widgetFor }) => {
  const { title, description, author, date} = entry.get('data').toJS();
  return (
    <Page title={title} description={description}>
      <div class="td-byline mb-4">
        By <b>{author}</b>
        {` | `}
        <time datetime={date} className="text-muted">
          {dayjs.utc(date).format('dddd, MMMM DD, YYYY')}
        </time>
      </div>
      {widgetFor('body')}
    </Page>
  );
}

window.CMS_CONFIGURATION.collections.map(({ name, folder }) => {
  if (folder.startsWith('content/en/docs/')) {
    CMS.registerPreviewTemplate(name, DocsPage)
  }
  if (folder.startsWith('content/en/blog/')) {
    CMS.registerPreviewTemplate(name, BlogPage)
  }
});
