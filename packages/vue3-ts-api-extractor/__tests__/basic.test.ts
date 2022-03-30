import { describe, expect, test } from '@jest/globals';
import path from 'path';
import { Loader } from '../src/parser/loader';
import { SfcScriptHandle } from '../src/parser/sfc-script-handle';
import { LoaderOptions } from '../src/types';

describe('Test basic', () => {
	const loaderOptions: LoaderOptions = {
		root: path.resolve(__dirname, '.'),
		scanDirs: ['./resource']
	};
	const loader = new Loader(loaderOptions);
	loader.load();

	test('Test Component Info', () => {
		const filePathA = path.resolve(__dirname, './resource/components/com-a.vue');
		const cacheA = loader.getCache(filePathA);
		if (cacheA) {
			const scriptHandleA = new SfcScriptHandle(cacheA);
			expect(scriptHandleA.name).toBe('ComA');
			expect(scriptHandleA.author).toBe('Lou Fei');
			expect(scriptHandleA.date).toBe('2015-12-12 11:22');
		}

		const filePathB = path.resolve(__dirname, './resource/components/com-b.vue');
		const cacheB = loader.getCache(filePathB);
		if (cacheB) {
			const scriptHandleB = new SfcScriptHandle(cacheB);
			expect(scriptHandleB.name).toBe('ComB');
			expect(scriptHandleB.author).toBe('Lou Fei');
			expect(scriptHandleB.date).toBe('2015-12-12 11:22');
		}

		const filePathC = path.resolve(__dirname, './resource/components/com-c.vue');
		const cacheC = loader.getCache(filePathC);
		if (cacheC) {
			const scriptHandleC = new SfcScriptHandle(cacheC);
			expect(scriptHandleC.name).toBe('ComC');
			expect(scriptHandleC.author).toBe('Lou Fei');
			expect(scriptHandleC.date).toBe('2015-12-12 11:22');
		}
	});
});
