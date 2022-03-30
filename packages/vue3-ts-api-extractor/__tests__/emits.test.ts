import { describe, expect, test } from '@jest/globals';
import path from 'path';
import { Loader } from '../src/parser/loader';
import { SfcScriptHandle } from '../src/parser/sfc-script-handle';
import { LoaderOptions } from '../src/types';

describe('Test Emits', () => {
	const loaderOptions: LoaderOptions = {
		root: path.resolve(__dirname, '.'),
		scanDirs: ['./resource']
	};
	const loader = new Loader(loaderOptions);
	loader.load();

	test('Normal', () => {
		const filePath = path.resolve(__dirname, './resource/components/com-emits.vue');
		const cache = loader.getCache(filePath);

		expect(cache).not.toBeUndefined();

		if (cache) {
			const handle = new SfcScriptHandle(cache);
			const emits = handle.emits();
			expect(emits.length).toBeGreaterThan(0);
		}
	});
});
