'use string';

const remark = require('remark');
const lint = require('remark-lint');
const vfile = require('vfile');
const sentenceCase = require('./');
const { expect } = require('chai');

const lintWithOptions =
	(options) => remark().use(lint).use(sentenceCase, options);

const check = (contents, { path = 'banana.md', ignore = [] } = {}) => {
	return lintWithOptions(ignore)
		.processSync(vfile({ path, contents }))
		.messages.map(String);
};

describe('remark-lint-heading-sentence-case', () => {
	it('should pass sentence case', () => {
		expect(check('# I love bananas')).to.have.length(0);
		expect(check('# I love bananas ♥')).to.have.length(0);
		expect(check('# You love bananas and so do I')).to.have.length(0);
		expect(check('# You love bananas (and so do I)')).to.have.length(0);
	});

	it('should pass sentence case containing globally ignored "API" and ignored "API Builder"', () => {
		expect(check('# I love API Builder', { ignore: [ 'API Builder' ] }))
			.to.have.length(0);
	});

	it('should fail lower case', () => {
		expect(check('# you love bananas')).to.have.length(1);
	});

	it('should fail title case', () => {
		expect(check('# You Love Bananas')).to.have.length(1);
	});

	it('should fail on capital letter used within sentence', () => {
		expect(check('# Bananas come from the Caribbean')).to.have.length(1);
	});
});
