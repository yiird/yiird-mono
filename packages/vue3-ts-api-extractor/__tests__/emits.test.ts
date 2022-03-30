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

	test('Normal', () => {
		const filePath = path.resolve(__dirname, './resource/components/com-emits.vue');
		loader.load(filePath);
		const cache = loader.getCache(filePath);

		expect(cache).not.toBeUndefined();

		if (cache) {
			const handle = new SfcScriptHandle(cache);
			//const props = handle.props();
			const emits = handle.emits();
			expect(emits.length).toBeGreaterThan(0);
			//console.log(props);
		}
	});
});
