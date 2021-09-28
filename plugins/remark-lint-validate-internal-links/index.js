import { accessSync, constants, readFileSync } from 'fs'
import { join } from 'path'
import { lintRule } from 'unified-lint-rule'
import { visit } from 'unist-util-visit'
import { generated } from 'unist-util-generated'
import { fromMarkdown } from 'mdast-util-from-markdown'

function isValidNode(node) {
  if (node.url) {
    return !node.url.endsWith(".gif");
  }
}
const cache = {
  valid: [],
  invalid: []
};
function isExternalPageRef(ref) {
  return ref.startsWith('http');
}
function isPageRef(ref) {
  return ref.endsWith('/');
}
function isLocalRef(ref) {
  return ref.startsWith('#');
}
function getFile(filePath) {
  let doc;
  try {
    doc = readFileSync(filePath);  
  } catch (err) {
    console.log(err)
    return false;
  }
  return doc;
}
function validateInternalLinks(tree, file, options) {
  const docsRoot = 'content/en';
  const projectRoot = file.cwd;
  const fileName = file.basename;
  const documentLocation = file.dirname;
  visit(tree, "link", visitor);
  function visitor(node) {
    const ref = node.url;
    if (isLocalRef(ref)) {
      console.log(`${ref} is handled with missing-heading if wrong`);
    } else if (isExternalPageRef(ref)) {
      console.log(`${ref} is handled with no-dead-urls if wrong`);
    } else if (isPageRef(ref)) {
      const filePath = join(projectRoot, docsRoot, `${ref.slice(0, -1)}.md`);
      // TODO read the cache first
      try {
        accessSync(filePath, constants.R_OK);
        console.log(`can read/write ${ref}`);
        // TODO add to the cache
      } catch (err) {
        //console.log('error')
      }
    } else {
      let found = 0;
      let [ filePath, tag ] = ref.split('#');
      if (filePath.endsWith('/')) {
        filePath = filePath.slice(0, -1)
      }
      filePath = join(projectRoot, docsRoot, `${filePath}.md`);
      const doc = getFile(filePath);
      if (doc) {
        const tree = fromMarkdown(doc)
        visit(tree, "heading", compare);       
        function compare(n) {
          if (n.children[0].value.toLowerCase() === tag) {
            found++
          }
        }
        if (!found) {
          file.message(
            'Invalid reference',
            node
          )
        }
      }
    }
  }
}

export default lintRule("remark-lint:validate-internal-links", validateInternalLinks);