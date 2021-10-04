import { accessSync, constants, readFileSync } from 'fs';
import { join, extname } from 'path';
import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';
import { fromMarkdown } from 'mdast-util-from-markdown';
import warnings from './warnings.js';
import debugModule from 'debug';

const log = new debugModule('remark-lint:validate-internal-links');

let projectRoot;
let docsRoot;
let staticRoot;

/**
 * The cache has the following structure => reference: warning.
 * Valid references have "warnings.valid" values.
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
		log('checking:', ref);
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
		if (isRelativeRef(ref)) {
			file.message(`${warnings.usesRelativePath}: ${ref}`, node);
			cache[ref] = warnings.usesRelativePath;
			return;
		}
		if (isStaticRef(ref)) {
			if(warnOnUpperCase(file, node, ref.split('/').pop())) {
				return;
			}
			addWarningIfFileIsMissing({
				file,
				node,
				ref,
				staticFile: true
			}) || (cache[ref] = warnings.valid);
			return;
		}
		if (isDocRef(ref)) {
			if (warnOnMissingStartingSlash(file, node, ref)) {
				return;
			}
			if (warnOnUpperCase(file, node, ref)) {
				return;
			}
			if (warnOnExtension(file, node, ref)) {
				return;
			}
			addWarningIfFileIsMissing({
				file,
				node,
				ref,
				staticFile: false
			}) || (cache[ref] = warnings.valid);
			return;
		}
		verifyAnchor(file, node, ref);
	}

	function verifyImages(node) {
		const ref = node.url;
		if(warnOnUpperCase(file, node, ref.split('/').pop())) {
			return;
		}		
		addWarningIfFileIsMissing({
			file,
			node,
			ref,
			staticFile: true
		}) || (cache[ref] = warnings.valid);
	}
}

function warnOnUpperCase(file, node, ref) {
	// Paths with upper cases are not working
	if (hasUpperCase(ref)) {
		file.message(`${warnings.usesUpperCase}: ${ref}`, node);
		cache[ref] = warnings.usesUpperCase;
		return true;
	}
}

function warnOnExtension(file, node, ref) {
	// Extensions are not wanted
	if (ref.endsWith('.md') || ref.endsWith('.md/')) {
		file.message(`${warnings.usesFileExtension}: ${ref}`, node);
		cache[ref] = warnings.usesFileExtension;
		return true;
	}
}

function warnOnMissingStartingSlash(file, node, ref) {
	if (!ref.startsWith('/')) {
		file.message(`${warnings.missingDoc}: ${ref}`, node);
		cache[ref] = warnings.missingDoc;
		return true;
	}
}

function verifyAnchor(file, node, ref) {
	let anchorFound;
	let filePath
	let anchor;
	if (isLocalAnchorRef(ref)) {
		anchorFound = false;
		filePath = join(projectRoot, file.path);
		anchor = ref.slice(1);
		const doc = getFile({ file, node, ref, filePath });
		const tree = fromMarkdown(doc);
		visit(tree, "heading", compare);
		if (anchorFound) {
			cache[ref] = warnings.valid;
		} else {
			file.message(`${warnings.missingAnchor}: ${ref}`, node);
			cache[ref] = warnings.missingAnchor;
		}
		return;
	}
	if (warnOnMissingStartingSlash(file, node, ref)) {
		return;
	}
	const parts = ref.split('#');
	filePath = parts[0];
	anchor = parts[1];
	if (warnOnUpperCase(file, node, filePath)) {
		return;
	}
	if (warnOnExtension(file, node, filePath)) {
		return;
	}
	filePath = join(projectRoot, docsRoot, getFilePathWithExtension(filePath));
	const doc = getFile({ file, node, ref, filePath });
	if (doc) {
		anchorFound = false;
		// We got the doc now turn it into an AST.
		const tree = fromMarkdown(doc);
		visit(tree, "heading", compare);
		if (anchorFound) {
			cache[ref] = warnings.valid;
		} else {
			file.message(`${warnings.missingAnchor}: ${ref}`, node);
			cache[ref] = warnings.missingAnchor;
		}
	}
	function compare(currentNode) {
		// Here we get the current node from AST which holds the heading value but
		// it is the original one with spaces and upper case in the beginning.
		// The references are with lower cases only and dashes instead of spaces
		// to be URL friendly. So we do transform what we get as heading value in
		// order to do proper comparison.			
		const refAnchor
			= currentNode.children[0].value.toLowerCase().replace(' ', '-');
		if (refAnchor === anchor) {
			anchorFound = true;
			return false; //found so break the loop
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
	return ref.startsWith('../') || ref.startsWith('./');
}

function isLocalAnchorRef(ref) {
	return ref.startsWith('#');
}

function isStaticRef(ref) {
	// Add more extensions to this list if needed
	const staticFileExtensions = ['.json', '.js', '.yaml', '.sh', '.html'];
	return staticFileExtensions.includes(extname(ref));
}

function getFile(config) {
	const { file, node, ref, filePath } = config;
	let doc;
	try {
		doc = readFileSync(filePath);
	} catch (err) {
		log(err);
		file.message(`${warnings.missingDoc}: ${filePath}`, node);
		cache[ref] = warnings.missingDoc;
	}
	return doc;
}

function addWarningIfFileIsMissing(config) {
	const { file, node, ref, staticFile } = config;
	if ( staticFile ) {
		const filePath = join(projectRoot, staticRoot, ref);
		if (isFileMissing(filePath)) {
			file.message(`${warnings.missingStaticFile}: ${filePath}`, node);
			cache[ref] = warnings.missingStaticFile;
			return true;
		};
	} else {
		const filePath = join(projectRoot, docsRoot, getFilePathWithExtension(ref));
		const indexFilePath = join(projectRoot, docsRoot, getIndexFilePath(ref));
		// We check both options "ref" pointing out to a file or pointing out to
		// a directory which means we have to check for _index.md file in that
		// directory.
		if (isFileMissing(filePath) && isFileMissing(indexFilePath)) {
			file.message(`${warnings.missingDoc}: ${ref}`, node);
			cache[ref] = warnings.missingDoc;
			return true;
		}
	}
}

function isFileMissing(filePath) {
	try {
		accessSync(filePath, constants.R_OK);
	} catch (err) {
		return true;
	}
}

function getFilePathWithExtension(ref) {
	return ref.endsWith('/') ? `${ref.slice(0, -1)}.md` : `${ref}.md`
}

function getIndexFilePath(ref) {
	return ref.endsWith('/') ? `${ref}_index.md` : `${ref}/_index.md`
}

