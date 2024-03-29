import debugModule from 'debug';
const log = new debugModule('remark-lint:heading-sentence-case');
import { pointStart } from 'unist-util-position';
import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';
// a list of strings that are always okay.  enhancements could include lists
// of countries, etc.
const DEFAULT_ALLOW = [];

export default lintRule('remark-lint:heading-sentence-case', checkSentenceCase);

function cleanNonASCII(value) {
	return value.replace(/([^A-Z0-9 ])/ig, '');
}

function containsCaps(value) {
	return !!value.match(/[A-Z]/);
}

function isLowerCase(value) {
	return !!value.match(/^[a-z ]+$/);
}

function isSentenceCase(value, allAllowed) {
	let clean = cleanNonASCII(value);
	if (!clean.match(/^[A-Z0-9]/)) {
		// if it doesn't start with upper-case, then it's not sentence case
		log('did not start with upper-case:', clean);
		return false;
	}
	let startsWithAllowed = false;
	for (const allowed of allAllowed) {
		const expStart = new RegExp(`^\\s*${allowed}\\s*`, 'g');
		const starts = clean.match(expStart) !== null;
		if (starts) {
			startsWithAllowed = true;
			log('starts with allowed word:', allowed);
		}
	}

	// Pre-process the string, removing any word(s) that are allowed
	for (const allowed of allAllowed) {
		log('cleaning:', allowed);
		const exp = new RegExp(`\\s*${allowed}\\s*`, 'g');
		clean = clean.replace(exp, '');
		log('after cleaning allowed:', clean);
	}

	const sentence = clean;

	if (isLowerCase(sentence)) {
		// if it started with an allowed word, and the rest is all lower-case,
		// then it's okay
		if (startsWithAllowed) {
			log('sentence started with an allowed word:', sentence);
		} else {
			log('sentence is lower-case:', sentence);
		}
		return startsWithAllowed;
	}

	log('checking pre-processed sentence:', sentence);
	if (!sentence[0].match(/[A-Z]/)) {
		log('sentence did not start with capital:', sentence);
		return false;
	}
	if (containsCaps(sentence.slice(1))) {
		log('sentence contains capital:', sentence);
		return false;
	}
	return true;
}

function checkSentenceCase(tree, file, allowedStrings) {
	if (!Array.isArray(allowedStrings)) {
		throw new Error(`Configuration should be an array: ${typeof allowedStrings}`);
	}

	let previous;

	visit(tree, 'heading', (node) => {
		if (!node.children.length || node.children[0].type !== 'text') {
			return;
		}

		// Hugo uses the docs' title from the metadata to create an h1. We would
        // like to avoid having any h1 headings.
        if (node.depth === 1) {
			file.message('Headings must be depth 2 or greater', node);
        }

		const { value } = node.children[0];

		const allAllowed = [
			...allowedStrings,
			...DEFAULT_ALLOW
		];
		if (!isSentenceCase(value, allAllowed)) {
			const initial = pointStart(node).offset;
			file.message(`Heading is not sentence case: "${value}"`, node.position);
		}
	});
}
