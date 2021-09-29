import { resolve } from 'path';
import { remark } from 'remark';
import { expect } from 'chai';
import { readSync } from 'to-vfile'
import lintRule from '../index.js';

describe('remark-lint-heading-sentence-case', () => {
	before(() => {
		process.chdir(resolve(process.cwd(), 'test', 'fixtures'))
	});
	after(() => {
		process.chdir(resolve(process.cwd(), '..', '..'))
	});
	it('should validate links.md', async () => {
		const expectedWarnings = [
			"links.md:31:39-31:74: Relative paths must be replaced with abcolute paths from the root e.g. /docs/guides/best_practices",
			"links.md:32:40-32:86: Relative paths must be replaced with abcolute paths from the root e.g. /docs/guides/best_practices",
			"links.md:48:39-48:65: Referred doc does not exists or is unnessessary specified with the extension.",
			"links.md:49:39-49:75: Paths with upper cases must be lowercased e.g. /docs/guides/best_practices",
			"links.md:50:39-50:80: Referred doc does not exists or is unnessessary specified with the extension.",
			"links.md:56:40-56:75: Referred doc does not exists or is unnessessary specified with the extension.",
			"links.md:57:40-57:90: Referred doc does not exists or is unnessessary specified with the extension.",
			"links.md:58:40-58:91: Referred doc does not exists or is unnessessary specified with the extension.",
			"links.md:59:40-59:91: Referred doc does not exists or is unnessessary specified with the extension.",
			"links.md:60:40-60:92: Referred doc does not exists or is unnessessary specified with the extension.",
			"links.md:61:40-61:88: Missing anchor in the referenced page.",
			"links.md:62:40-62:89: Missing anchor in the referenced page.",
			"links.md:63:40-63:108: Missing anchor in the referenced page.",
			"links.md:70:83-70:123: Referred file does not exists.",
			"links.md:71:88-71:144: Referred file does not exists.",
			"links.md:72:88-72:138: Referred file does not exists.",
			"links.md:73:88-73:145: Referred file does not exists.",
			"links.md:74:109-74:167: Paths with upper cases must be lowercased e.g. /docs/guides/best_practices",
			"links.md:66:159-66:189: Paths with upper cases must be lowercased e.g. /docs/guides/best_practices",
			"links.md:67:67-67:105: Referred image does not exists."
		];
		const warnings = (
			await remark()
				.use(lintRule)
				.process(readSync('links.md'))
		).messages.map(warnObj => String(warnObj));
		expect(warnings).to.deep.equal(expectedWarnings);
	});
});

