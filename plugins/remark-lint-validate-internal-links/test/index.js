import { resolve } from 'path';
import { remark } from 'remark';
import { expect } from 'chai';
import { readSync } from 'to-vfile';
import lintRule from '../index.js';
import warningMessages from '../warnings.js';

describe('remark-lint-validate-internal-links', () => {
	before(() => {
		process.chdir(resolve(process.cwd(), 'test', 'fixtures'));
	});

	after(() => {
		process.chdir(resolve(process.cwd(), '..', '..'));
	});

	it('should validate anchors', async () => {
		const warnings = (
			await remark()
				.use(lintRule)
				.process(readSync('anchors.md'))
		).messages.map(warnObj => String(warnObj));
		expect(warnings.length).to.equal(5);
		warnings.forEach((warning) => { expect(warning).to.include(warningMessages.missingAnchor); });
	});

	it('should validate relative links', async () => {
		const expected = [
			'relative.md:1:5-1:47: Link references must be an absolute path from /docs: ../getting_started/getting-started',
			'relative.md:2:5-2:56: Link references must be an absolute path from /docs: ../getting_started/getting-started#models',
			'relative.md:3:5-3:46: Link references must be an absolute path from /docs: ./getting_started/getting-started'
		];
		const warnings = (
			await remark()
				.use(lintRule)
				.process(readSync('relative.md'))
		).messages.map(warnObj => String(warnObj));
		expect(warnings).to.deep.equal(expected);
	});

	it('should validate links to files', async () => {
		const warnings = (
			await remark()
				.use(lintRule)
				.process(readSync('files.md'))
		).messages.map(warnObj => String(warnObj));
		expect(warnings.length).to.equal(4);
		warnings.forEach((warning) => { expect(warning).to.include(warningMessages.missingStaticFile); });
	});

	it('should validate links with upper cases', async () => {
		const warnings = (
			await remark()
				.use(lintRule)
				.process(readSync('casing.md'))
		).messages.map(warnObj => String(warnObj));
		expect(warnings.length).to.equal(3);
		warnings.forEach((warning) => { expect(warning).to.include(warningMessages.pathWithUpperCase); });
	});
	
	it('should validate links to images', async () => {
		const warnings = (
			await remark()
				.use(lintRule)
				.process(readSync('images.md'))
		).messages.map(warnObj => String(warnObj));
		expect(warnings.length).to.equal(1);
		warnings.forEach((warning) => { expect(warning).to.include(warningMessages.missingImage); });
	});

	it('should validate links to docs', async () => {
		const warnings = (
			await remark()
				.use(lintRule)
				.process(readSync('docs.md'))
		).messages.map(warnObj => String(warnObj));
		expect(warnings.length).to.equal(4);
		warnings.forEach((warning) => { expect(warning).to.include(warningMessages.missingDoc); });
	});

	it('should validate links with extensions', async () => {
		const warnings = (
			await remark()
				.use(lintRule)
				.process(readSync('extensions.md'))
		).messages.map(warnObj => String(warnObj));
		expect(warnings.length).to.equal(5);
		warnings.forEach((warning) => { expect(warning).to.include(warningMessages.usingFileExtension); });
	});	
});

