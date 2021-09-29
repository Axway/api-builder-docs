import { accessSync, constants, readFileSync } from 'fs';
import { join } from 'path';
import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';
import { generated } from 'unist-util-generated';
import { fromMarkdown } from 'mdast-util-from-markdown';
import warnings from './warnings.js';
import debugModule from 'debug';

const log = new debugModule('remark-lint:validate-internal-links');

let projectRoot;
let docsRoot;
let staticRoot;
const cache = {
  valid: [],
  invalid: []
};


export default lintRule("remark-lint:validate-internal-links", validateInternalLinks);

function validateInternalLinks(tree, file, options) {
  projectRoot = file.cwd;
  docsRoot = options.docsRoot;
  staticRoot = options.staticRoot;
  
  visit(tree, "link", verifyLinks);
  visit(tree, "image", verifyImages);

  function verifyLinks(node) {
    const ref = node.url;
    log(ref);
    if (isExternalPageRef(ref)) {
      log(`${ref} is handled with "no-dead-urls" from remark-lint-no-dead-urls`);
      return;
    }
    if (isLocalAnchorRef(ref)) {
      log(`${ref} is handled with "missing-heading" from remark-validate-links`);
      return;
    }
    if (isRelativeRef(ref)) {
      file.message(warnings.relativePath, node);
      return;
    }
    if (isStaticRef(ref)) {
      // Ensure we don't allow upper case in static file names. This section
      // does not handle images which is done in verifyImages.
      if (hasUpperCase(ref.split('/').pop())) {
        file.message(warnings.pathWithUpperCase, node);
        return;
      }
      addWarningIfFileIsMissing({
        file,
        node,
        refRoot: staticRoot,
        ref,
        warning: warnings.missingStaticFile
      });
      return;
    }
    if (isDocRef(ref)) {
      // paths with upper cases are not working
      if (hasUpperCase(ref)) {
        file.message(warnings.pathWithUpperCase, node);
        return;
      } 
      // TODO read the cache first
      addWarningIfFileIsMissing({
          file,
          node,
          refRoot: docsRoot,
          ref: ref.endsWith('/') ? `${ref.slice(0, -1)}.md` : `${ref}.md`,
          warning: warnings.missingDoc
      });
      // TODO add to the cache
      return;
    }
    verifyAnchor(file, node, ref);
  }
  
  function verifyImages(node) {
    const ref = node.url;
    // ensure we don't allow upper case in static file names
    if (hasUpperCase(ref.split('/').pop())) {
      file.message(warnings.pathWithUpperCase, node);
      return;
    }
    addWarningIfFileIsMissing({
      file,
      node,
      refRoot: staticRoot,
      ref,
      warning: warnings.missingImage
    });
  }  
}

function verifyAnchor(file, node, ref) {
  let found = 0;
  let [filePath, anchor] = ref.split('#');
  if (filePath.endsWith('/')) {
    filePath = filePath.slice(0, -1)
  }
  filePath = join(projectRoot, docsRoot, `${filePath}.md`);
  const doc = getFile(filePath);
  if (doc) {
    const tree = fromMarkdown(doc)
    visit(tree, "heading", compare);
    function compare(n) {
      const refAnchor = n.children[0].value.toLowerCase().replace(' ', '-');
      if (refAnchor === anchor) {
        found++
      }
    }
    if (!found) {
      file.message(warnings.missingAnchor, node);
    }
  } else {
    file.message(warnings.missingDoc, node);
  }
}

function isExternalPageRef(ref) {
  return ref.startsWith('http');
}

function isDocRef(ref) {
  return !/#/g.test(ref);
}

function hasUpperCase(ref) {
  return /[A-Z]/g.test(ref);
}

function isRelativeRef(ref) {
  return ref.startsWith('../');
}

function isLocalAnchorRef(ref) {
  return ref.startsWith('#');
}

function isStaticRef(ref) {
  // Add more extensions to this list if needed
  const staticFileExtensions = ['.json', '.js', '.yaml', '.sh', '.html'];
  function checkIfPathHasStaticExtension(prev, curr) {
    ref.endsWith(curr) && prev++;
    return prev;
  };
  return !!staticFileExtensions.reduce(checkIfPathHasStaticExtension, 0);
}

function getFile(filePath) {
  let doc;
  try {
    doc = readFileSync(filePath);
  } catch (err) {
    log(err)
    return false;
  }
  return doc;
}

function addWarningIfFileIsMissing(config) {
  const { file, node, refRoot, ref, warning } = config;
  const filePath = join(projectRoot, refRoot, ref);  
  try {
    accessSync(filePath, constants.R_OK);
  } catch (err) {
    file.message(warning, node);
  }  
}