const alert = {
  id: 'alert',
  label: 'Alert',
  widget: 'object',
  fields: [
    { name: 'title', label: 'Title' },
    {
      name: 'color',
      label: 'Color',
      widget: 'select',
      options: ['primary', 'info', 'warning', 'danger'],
      default: 'primary',
    },
    { name: 'content', label: 'Content', widget: 'markdown' },
  ],
  fromBlock: match => {
    if (!match) {
      return;
    }
    const attrsExp = /([\w]*)="([^"]*)"/g;
    const attrs = match[1] && [...match[1].matchAll(attrsExp)]
      .reduce((acc, { 1: key, 2: value }) => ({ ...acc, [key]: value }), {})
    return { color: 'primary', ...attrs, content: match[2] }
  },
  toBlock: ({ title = '', color = '', content = '' }) => {
    return `{{< alert title="${title}" color="${color}" >}}${content}{{< /alert >}}`
  },
  toPreview: ({ title = '', color = '', content = '' }) => (
    <div
      className={`alert alert-${color}`}
      role="alert"
      dangerouslySetInnerHTML={{ __html: `
        <h4 className="alert-heading">${title}</h4>
        ${marked(content)}
      `}}
    />
  ),
  pattern: /^{{[<%] *alert +(.*) *[>%]}}([\s\S]*){{[<%] *\/alert *[>%]}}$/,
};

CMS.registerEditorComponent(alert);
