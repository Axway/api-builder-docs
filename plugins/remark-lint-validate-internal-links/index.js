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

/**
 * The cache has the following structure: reference: warning.
 * Valid references have "warning.valid" values.
 */
const cache = {};

export default lintRule("remark-lint:validate-internal-links", validateInternalLinks);

function validateInternalLinks(tree, file, options = {}) {
  projectRoot = file.cwd;
  docsRoot = options.docsRoot || 'content/en';
  staticRoot = options.staticRoot || 'static';
  
  visit(tree, "link", verifyLinks);
  visit(tree, "image", verifyImages);

  function verifyLinks(node) {
    const ref = node.url;
    log(ref);
    if (cache[ref] === warnings.valid) {
      // We have valid reference so move to next one
      return;
    }
    if (cache[ref]) {
      // The reference being detected as invalid. Reuse the message for this
      // node and move to the next one
      file.message(cache[ref], node);
      return;
    }
    if (isExternalPageRef(ref)) {
      log(`${ref} is handled with "no-dead-urls" from remark-lint-no-dead-urls`);
      cache[ref] = warnings.valid;
      return;
    }
    if (isLocalAnchorRef(ref)) {
      log(`${ref} is handled with "missing-heading" from remark-validate-links`);
      cache[ref] = warnings.valid;
      return;
    }
    if (isRelativeRef(ref)) {
      file.message(warnings.relativePath, node);
      cache[ref] = warnings.relativePath;
      return;
    }
    if (isStaticRef(ref)) {
      // Ensure we don't allow upper case in static file names. This section
      // does not handle images which is done in verifyImages.
      if (hasUpperCase(ref.split('/').pop())) {
        file.message(warnings.pathWithUpperCase, node);
        cache[ref] = warnings.pathWithUpperCase;
        return;
      }
      addWarningIfFileIsMissing({
        file,
        node,
        refRoot: staticRoot,
        ref,
        warning: warnings.missingStaticFile
      }) || ( cache[ref] = warnings.valid );
      return;
    }
    if (isDocRef(ref)) {
      // paths with upper cases are not working
      if (hasUpperCase(ref)) {
        file.message(warnings.pathWithUpperCase, node);
        cache[ref] = warnings.pathWithUpperCase;
        return;
      }
      addWarningIfFileIsMissing({
          file,
          node,
          refRoot: docsRoot,
          ref: ref.endsWith('/') ? `${ref.slice(0, -1)}.md` : `${ref}.md`,
          originalRef: ref,
          warning: warnings.missingDoc
      }) || ( cache[ref] = warnings.valid );
      return;
    }
    verifyAnchor(file, node, ref);
  }
  
  function verifyImages(node) {
    const ref = node.url;
    if (hasUpperCase(ref.split('/').pop())) {
      file.message(warnings.pathWithUpperCase, node);
      cache[ref] = warnings.pathWithUpperCase;
      return;
    }
    addWarningIfFileIsMissing({
      file,
      node,
      refRoot: staticRoot,
      ref,
      warning: warnings.missingImage
    }) || ( cache[ref] = warnings.valid );
  }  
}

function verifyAnchor(file, node, ref) {
  let [filePath, anchor] = ref.split('#');
  if (filePath.endsWith('/')) {
    filePath = filePath.slice(0, -1)
  }
  filePath = join(projectRoot, docsRoot, `${filePath}.md`);
  const doc = getFile({ file, node, ref, filePath });
  if (doc) {
    let anchorFound = 0;
    // We got the doc now turn it into an AST.
    const tree = fromMarkdown(doc);
    visit(tree, "heading", compare);
    function compare(currentNode) {
      // Here we get the current node from AST which holds the heading value but
      // it is the original one with spaces and upper case in the beggining.
      // The references are with lower cases only and dashes instead of spaces
      // to be URL friendly. So we do transform what we get as heading value in
      // order to do proper comparison.
      const refAnchor
        = currentNode.children[0].value.toLowerCase().replace(' ', '-');
      if (refAnchor === anchor) {
        anchorFound++
      }
    }
    if (anchorFound) {
      cache[ref] = warnings.valid;
    } else {
      file.message(warnings.missingAnchor, node);
      cache[ref] = warnings.missingAnchor;
    }
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

function getFile(config) {
  const { file, node, ref, filePath } = config;
  let doc;
  try {
    doc = readFileSync(filePath);
  } catch (err) {
    log(err);
    file.message(warnings.missingDoc, node);
    cache[ref] = warnings.missingDoc;
  }
  return doc;
}

function addWarningIfFileIsMissing(config) {
  // Note that this method is reused in multiple use case some of which modify
  // the reference e.g. to add file extension like .md. We ususally search by the
  // modified reference but want to store the original reference in the cache.
  const { file, node, refRoot, ref, originalRef, warning } = config;
  const filePath = join(projectRoot, refRoot, ref);  
  try {
    accessSync(filePath, constants.R_OK);
  } catch (err) {
    file.message(warning, node);
    cache[originalRef || ref] = warning;
    return true;
  }
  return false;
}
