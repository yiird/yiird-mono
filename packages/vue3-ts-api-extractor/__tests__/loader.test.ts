import { describe, expect, test } from '@jest/globals';
import path from 'path';
import { Loader } from '../src/parser/loader';
import { LoaderOptions } from '../src/types';
describe('Test Loader', () => {
	test('Normal', () => {
		const loaderOptions: LoaderOptions = {
			root: path.resolve(__dirname, '.'),
			scanDirs: ['./resource']
		};
		const loader = new Loader(loaderOptions);
		loader.load();

		const cacheCount = loader.getAllCache().size;
		const fileCount = loader.getFiles().length;

		expect(cacheCount).toEqual(fileCount);
		expect(cacheCount).toBeGreaterThan(1);

		const filePath = path.resolve(__dirname, './resource/components/com-emits.vue');
		const cache = loader.getCache(filePath);
		expect(cache).not.toBeUndefined();
	});

	test('Load one file', () => {
		const loaderOptions: LoaderOptions = {
			root: path.resolve(__dirname, '.'),
			scanDirs: ['./resource']
		};
		const loader = new Loader(loaderOptions);
		const filePath = path.resolve(__dirname, './resource/components/com-emits.vue');
		loader.load(filePath);

		const cacheCount = loader.getAllCache().size;
		const fileCount = loader.getFiles().length;

		expect(cacheCount).toBeLessThan(fileCount);
	});
});
