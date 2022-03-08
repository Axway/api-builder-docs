import { accessSync, constants, readFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';
import { fromMarkdown } from 'mdast-util-from-markdown';
import warnings from './warnings.js';
import debugModule from 'debug';
import unicode from 'unicode/category/index.js';

const log = new debugModule('remark-lint:validate-internal-links');

// This regex is used for finding hugo variables in the headings. It is somewhat
// limited since we could have another type of parameters refered with <% text %>
// we well as spaces in the variables e.g. {{% deprecation/link D042 %}}.
// If we have heading in mypage.md:  ## My heading is {{% deprecation/link D042 %}}
// It will be displayed as: ## My heading is [D042](/docs/deprecations#D042)
// It needs to be referred as: /docs/mypage#my-heading-is-D042. Another caveat
// is that the html files that represent variables could contain something more
// complex than a simple string.
//
// REFACTOR: If we hit an edge case consider removing the current mechanism
// (see loadHugoVariables) and  replace it with simple plugin configuration:
// replace: {
//	"{{% variables/api-builder-product-name %}}": "API Builder"
// }
const regex = /{{% [a-z/_]* %}}/;
let availableAnchors = [];
let anchorMap = Object.create(null);
const pluginConfig = {
	projectRoot: null,
	docsRoot: 'content/en',
	staticRoot: 'static',
	staticFilesExtensions: ['.json', '.js', '.yaml', '.sh', '.html', '.zip'],
	ignoreLinksThatStartWith: ['mailto', 'http'],
	hugoShortcodesDirectory: 'layouts/shortcodes/variables',
	hugoVariables: {}
}

/**
 * The cache has the following structure => reference: warning. Valid references
 * have "warnings.valid" values. The purpose of the caches is to skip checking
 * links that already have been checked.
 *
 * REFACTOR: The cache could be improved with storing the collected information
 * for files and their headings. Such information could be reused in
 * validateAnchors function.
 */
const cache = {};

export default lintRule("remark-lint:validate-internal-links", validateInternalLinks);

function validateInternalLinks(tree, file, options = {}) {
	pluginConfig.projectRoot = file.cwd;
	pluginConfig.docsRoot = options.docsRoot || pluginConfig.docsRoot;
	pluginConfig.staticRoot = options.staticRoot || pluginConfig.staticRoot;
	pluginConfig.staticFilesExtensions =
		options.staticFilesExtensions || pluginConfig.staticFilesExtensions;
	pluginConfig.ignoreLinksThatStartWith =
		options.ignoreLinksThatStartWith || pluginConfig.ignoreLinksThatStartWith;
	pluginConfig.hugoShortcodesDirectory =
		options.hugoShortcodesDirectory || pluginConfig.hugoShortcodesDirectory;

	loadHugoVariables();

	visit(tree, "link", verifyLinks);
	visit(tree, "image", verifyImages);

	function verifyLinks(node) {
		const ref = node.url;
		log('Verify link:', ref);
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
		for (const pattern of pluginConfig.ignoreLinksThatStartWith) {
			if (ref.startsWith(pattern)) {
				return;
			}
		}
		if (isRelativeRef(ref)) {
			const msg = `${warnings.usesRelativePath}: ${ref}`;
			file.message(msg, node);
			cache[ref] = msg;
			return;
		}
		if (isStaticRef(ref)) {
			if (warnOnUpperCase(file, node, ref.split('/').pop())) {
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
		if (warnOnUpperCase(file, node, ref.split('/').pop())) {
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
		filePath = join(pluginConfig.projectRoot, file.path);
		anchor = ref.slice(1);
		// Optimise for empty anchors e.g. '#'
		if (isEmptyAnchor(file, node, anchor)) {
			return;
		}
		// We are reading the file that we currently process so it does exists.
		const doc = getFile(filePath);
		const tree = fromMarkdown(doc);
		availableAnchors = [];
		anchorMap = Object.create(null);
		visit(tree, "heading", compare);
		if (availableAnchors.includes(anchor)) {
			cache[ref] = warnings.valid;
		} else {
			debugger;
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
	const pathToFile
		= join(pluginConfig.projectRoot, pluginConfig.docsRoot, getFilePathWithExtension(filePath));
	const pathToIndexFile
		= join(pluginConfig.projectRoot, pluginConfig.docsRoot, getIndexFilePath(filePath));
	const doc = getFile(pathToFile)
		|| getFile(pathToIndexFile);
	if (doc) {
		anchorFound = false;
		// We got the doc now turn it into an AST.
		const tree = fromMarkdown(doc);
		availableAnchors = [];
		anchorMap = Object.create(null);
		visit(tree, "heading", compare);
		// console.dir(availableAnchors);
		// console.log('anchor:', filePath, anchor);
		// process.stderr.write(availableAnchors.join(', '));

		if (availableAnchors.includes(anchor)) {
			cache[ref] = warnings.valid;
		} else {
			debugger;
			const msg = `${warnings.missingAnchor}: ${ref}`;
			file.message(msg, node);
			cache[ref] = msg;
		}
	} else {
		const msg = `${warnings.missingDoc}: ${filePath}`;
		file.message(msg, node);
		cache[ref] = msg;
	}
	function compare(currentNode) {
		// Here we get the current node from AST which holds the heading value but
		// it is the original one which is not URL friendly. We do transform it
		// using the slug function and collect all transformed anchors. Later when
		// this loops end we compare if the anchor we search is present or not.
		// Note that the cuurentNode could have a collection of children that
		// represent the same heading in cases when the heading contains '<' and '>'
		// symbols.
		let heading = currentNode.children
			.reduce((acc, current) => { return acc.concat(current.value); }, '');
		if (heading.includes('{{%') && heading.includes('%}}')) {
			// The heading contains hugo placeholder. Replace it.
			let placeholder = regex.exec(heading);
			while (placeholder) {
				const placeholderItem = placeholder[0];
				const variableName = placeholderItem.split('/')[1].split(' ')[0];
				heading = heading.replace(regex, pluginConfig.hugoVariables[variableName]);
				placeholder = regex.exec(heading);
			}
		}
		availableAnchors.push(slug(heading));
	}
}

function isEmptyAnchor(file, node, anchor) {
	if (anchor === '') {
		debugger;
		const msg = `${warnings.missingAnchor}: #`;
		file.message(msg, node);
		cache['#'] = msg;
		return true;
	}
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
	return pluginConfig.staticFilesExtensions.includes(extname(ref));
}

function getFile(filePath) {
	let doc;
	try {
		doc = readFileSync(filePath);
	} catch (err) {
		log(err);
		return;
	}
	return doc;
}

function addWarningIfFileIsMissing(config) {
	const { file, node, ref, staticFile } = config;
	if (staticFile) {
		const filePath = join(pluginConfig.projectRoot, pluginConfig.staticRoot, ref);
		if (isFileMissing(filePath)) {
			const msg = `${warnings.missingStaticFile}: ${filePath}`;
			file.message(msg, node);
			cache[ref] = msg;
			return true;
		};
	} else {
		const filePath = join(pluginConfig.projectRoot, pluginConfig.docsRoot, getFilePathWithExtension(ref));
		const indexFilePath = join(pluginConfig.projectRoot, pluginConfig.docsRoot, getIndexFilePath(ref));
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

function loadHugoVariables() {
	let files;
	let directoryPath;
	try {
		directoryPath = join(pluginConfig.projectRoot, pluginConfig.hugoShortcodesDirectory);
		files = readdirSync(directoryPath);
	} catch (err) {
		throw (`Unable to get directory content: ${err}`);
	}
	files.forEach(file => {
		const variable = getFile(join(directoryPath, file));
		pluginConfig.hugoVariables[file.slice(0, file.length - 5)] = variable.toString().replace(/(\r\n|\n|\r)/gm, '');
	});
}

function isLetter(r) {
	// 'Ll' is the collection of Unicode lower case letters and that is what we do
	// care about. If the character is in this collection we return it as part of
	// the sanitized anchor.
	return unicode.Ll[r];
}

function isNumber(r) {
	return 48 <= r && r <= 57;
}

/**
 * Implements blackfriday algorithm for anchor sanitization:
 * https://pkg.go.dev/github.com/russross/blackfriday#hdr-Sanitized_Anchor_Names
 *
 * @param {string} heading - the heading to produce anchor from.
 * @returns {string} the sanitized anchor.
 */
function slug(heading) {
	const head = heading.toLowerCase();
	log(`Heading to produce anchor from: ${head}`)
	const anchorName = [];
	let dash = false;
	for (let i = 0; i < head.length; i++) {
		const char = head.charAt(i);
		const r = head.charCodeAt(i);
		if (isNumber(r) || isLetter(r)) {
			if (dash && anchorName.length > 0) {
				anchorName.push('-');
			}
			dash = false;
			anchorName.push(char);
		} else {
			dash = true
		}
	}
	let slug = anchorName.join('');
	const originalSlug = slug

	while (Object.hasOwnProperty.call(anchorMap, slug)) {
		anchorMap[originalSlug]++;
		slug = originalSlug + '-' + anchorMap[originalSlug];
	}
	anchorMap[slug] = 0;
	log(`Sanitized anchor: ${slug}`);
	return slug
}
