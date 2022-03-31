import { describe, expect, test } from '@jest/globals';
import path from 'path';
import { toSfc } from '../src';
import { transform } from '../src/markdown';
import { Loader } from '../src/parser/loader';
import { LoaderOptions } from '../src/types';
describe('Test Markdown', () => {
	const loaderOptions: LoaderOptions = {
		root: path.resolve(__dirname, '.'),
		scanDirs: ['./resource']
	};
	const loader = new Loader(loaderOptions);

	test('Transform', () => {
		const filePath = path.resolve(__dirname, './resource/components/com-full.vue');
		loader.load(filePath);
		const cache = loader.getCache(filePath);

		expect(cache).not.toBeUndefined();

		if (cache) {
			const sfc = toSfc(cache);
			const md = transform(sfc);
			console.log(md);
			expect(md).toEqual(expect.stringMatching(/Props/g));
			expect(md).toEqual(expect.stringMatching(/Slots/g));
		}
	});
});
