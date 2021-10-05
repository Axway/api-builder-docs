import { accessSync, constants, readFileSync } from 'fs';
import { join, extname } from 'path';
import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';
import { fromMarkdown } from 'mdast-util-from-markdown';
import warnings from './warnings.js';
import debugModule from 'debug';
import GithubSlugger from 'github-slugger';

const log = new debugModule('remark-lint:validate-internal-links');
const slugger = new GithubSlugger();
let availableAnchors = []

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
			const msg = `${warnings.usesRelativePath}: ${ref}`;
			file.message(msg, node);
			cache[ref] = msg;
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
		if (!hasAnchor(ref)) {
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
		const msg = `${warnings.usesUpperCase}: ${ref}`;
		file.message(msg, node);
		cache[ref] = msg;
		return true;
	}
}

function warnOnExtension(file, node, ref) {
	// Extensions are not wanted
	if (ref.endsWith('.md') || ref.endsWith('.md/')) {
		const msg = `${warnings.usesFileExtension}: ${ref}`;
		file.message(msg, node);
		cache[ref] = msg;
		return true;
	}
}

function warnOnMissingStartingSlash(file, node, ref) {
	if (!ref.startsWith('/')) {
		const msg = `${warnings.missingDoc}: ${ref}`;
		file.message(msg, node);
		cache[ref] = msg;
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
		// Optimise for empty anchors e.g. '#'
		if (isEmptyAnchor(file, node, anchor)) {
			return;
		}
		const doc = getFile({ file, node, ref, filePath });
		const tree = fromMarkdown(doc);
		slugger.reset();
		availableAnchors = [];
		visit(tree, "heading", compare);
		if (availableAnchors.includes[anchor]) {
			cache[ref] = warnings.valid;
		} else {
			const msg = `${warnings.missingAnchor}: ${ref}`;
			file.message(msg, node);
			cache[ref] = msg;
		}
		return;
	}
	if (warnOnMissingStartingSlash(file, node, ref)) {
		return;
	}
	const parts = ref.split('#');
	filePath = parts[0];
	anchor = parts[1];
	if (isEmptyAnchor(file, node, anchor)) {
		return;
	}
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
		slugger.reset();
		availableAnchors = [];
		visit(tree, "heading", compare);
		if (availableAnchors.includes(anchor)) {
			cache[ref] = warnings.valid;
		} else {
			const msg = `${warnings.missingAnchor}: ${ref}`;
			file.message(msg, node);
			cache[ref] = msg;
		}
	}
	function compare(currentNode) {
		// Here we get the current node from AST which holds the heading value but
		// it is the original one with spaces and upper case in the beginning.
		// The references are URL friendly so we do transform using github-slugger
		// module, collect all transformed anchors. Later when this loops end
		// we compare if the anchors we search is present or not.
		const heading = currentNode.children[0].value;
		availableAnchors.push(slugger.slug(heading));
	}
}

function isEmptyAnchor(file, node, anchor) {
	if (anchor === '') {
		const msg = `${warnings.missingAnchor}: #`;
		file.message(msg, node);
		cache['#'] = msg;
		return true;
	}
}

function isExternalPageRef(ref) {
	return ref.startsWith('http');
}

function hasAnchor(ref) {
	return /#/g.test(ref);
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
		const msg = `${warnings.missingDoc}: ${filePath}`;
		file.message(msg, node);
		cache[ref] = msg;
	}
	return doc;
}

function addWarningIfFileIsMissing(config) {
	const { file, node, ref, staticFile } = config;
	if ( staticFile ) {
		const filePath = join(projectRoot, staticRoot, ref);
		if (isFileMissing(filePath)) {
			const msg = `${warnings.missingStaticFile}: ${filePath}`;
			file.message(msg, node);
			cache[ref] = msg;
			return true;
		};
	} else {
		const filePath = join(projectRoot, docsRoot, getFilePathWithExtension(ref));
		const indexFilePath = join(projectRoot, docsRoot, getIndexFilePath(ref));
		// We check both options "ref" pointing out to a file or pointing out to
		// a directory which means we have to check for _index.md file in that
		// directory.
		if (isFileMissing(filePath) && isFileMissing(indexFilePath)) {
			const msg = `${warnings.missingDoc}: ${ref}`;
			file.message(msg, node);
			cache[ref] = msg;
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

