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
		// TODO: should cover 5 cases
		expect(warnings.length).to.equal(3);
		warnings.forEach((warning) => { expect(warning).to.include(warningMessages.missingAnchor); });
	});

	it('should validate relative links', async () => {
		const expected = [
			'relative.md:1:5-1:40: Link references must be an absolute path from /docs: ../Guides/Best_Practices.md',
			'relative.md:2:5-2:51: Link references must be an absolute path from /docs: ../Guides/Best_Practices.md#codebase',
			'relative.md:3:5-3:39: Link references must be an absolute path from /docs: ./Guides/Best_Practices.md'
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
		// TODO: should be 4
		expect(warnings.length).to.equal(2);
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

