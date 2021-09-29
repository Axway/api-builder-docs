import { accessSync, constants, readFileSync } from 'fs';
import { join } from 'path';
import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';
import { generated } from 'unist-util-generated';
import { fromMarkdown } from 'mdast-util-from-markdown';
import warnings from './warnings.js';
import debugModule from 'debug';

const log = new debugModule('remark-lint:validate-internal-links');
const docsRoot = 'content/en';
const staticRoot = 'static';
const cache = {
  valid: [],
  invalid: []
};
function isExternalPageRef(ref) {
  return ref.startsWith('http');
}
function isPageRef(ref) {
  return !/#/g.test(ref);
}
function hasUpperCase(ref) {
  return /[A-Z]/g.test(ref);
}
function isRelativeRef(ref) {
  return ref.startsWith('../');
}
function isStaticRef(ref) {
  // Add more extensions to this list if needed
  const staticFileExtensions = ['.json', '.js', '.yaml', '.sh', '.html', '.png'];
  function checkIfPathHasStaticExtension(prev, curr) {
    ref.endsWith(curr) && prev++;
    return prev;
  };
  return !!staticFileExtensions.reduce(checkIfPathHasStaticExtension, 0);
}
function isLocalRef(ref) {
  return ref.startsWith('#');
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
function verifyAnchor(file, node, ref) {
  // Manage anchors
  const projectRoot = file.cwd;
  const fileName = file.basename;
  const documentLocation = file.dirname;
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
      if (n.children[0].value.toLowerCase() === anchor) {
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

function addWarningIfFileIsMissing(file, node, filePath, warning) {
  try {
    accessSync(filePath, constants.R_OK);
  } catch (err) {
    file.message(warning, node);
  }  
}

function validateInternalLinks(tree, file, options) {
  const projectRoot = file.cwd;
  const fileName = file.basename;
  const documentLocation = file.dirname;
  visit(tree, "link", verifyLinks);
  visit(tree, "image", verifyImages);

  function verifyImages(node) {
    const ref = node.url;
    log(ref);
  }
  function verifyLinks(node) {
    let referredFilePath;
    const ref = node.url;
    log(ref);
    if (isLocalRef(ref)) {
      log(`${ref} is handled with "missing-heading" from remark-validate-links`);
      return;
    }
    if (isExternalPageRef(ref)) {
      log(`${ref} is handled with "no-dead-urls" from remark-lint-no-dead-urls`);
      return;
    }
    if (isRelativeRef(ref)) {
      file.message(warnings.relativePath, node);
      return;
    }
    if (isStaticRef(ref)) {
      referredFilePath = join(projectRoot, staticRoot, ref);
      addWarningIfFileIsMissing(file, node, referredFilePath, warnings.missingStaticFile);
      return;
    }
    if (isPageRef(ref)) {
      if (hasUpperCase(ref)) {
        file.message(warnings.pathWithUpperCase, node);
        return;
      }
      if (ref.endsWith('/')) {
        referredFilePath = join(projectRoot, docsRoot, `${ref.slice(0, -1)}.md`);
      } else {
        referredFilePath = join(projectRoot, docsRoot, `${ref}.md`);
      }
      // TODO read the cache first
      addWarningIfFileIsMissing(file, node, referredFilePath, warnings.missingDoc);
      // TODO add to the cache
      return;
    }
    verifyAnchor(file, node, ref);
  }
}

export default lintRule("remark-lint:validate-internal-links", validateInternalLinks);