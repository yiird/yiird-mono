import { describe, expect, it } from '@jest/globals';
import { resolve } from 'path';
import { FileCache, Loader } from '../src/parser/loader';
import { LoaderOptions } from '../src/types';

describe('测试 Loader 相关功能', () => {
	const filePath = '/Users/congcong/Public/projects/yiird/learn/learn-lerna/packages/vue3-ts-api-extractor/__tests__/resource/core/logic-base.ts';
	const options: LoaderOptions = {
		root: resolve(__dirname),
		scanDirs: ['./resource'],
		extensions: ['.vue', '.ts', '.xx'],
		externals: ['vue', '@vue/*', 'lodash-es', '@fortawesome/*']
	};

	it('Test Loader.load', () => {
		const loader = new Loader(options);
		loader.load(filePath);
		const cache = loader.getAllCache();
		expect(cache.get(filePath)).not.toBe(undefined);
	});

	it('Test FileCache', () => {
		const fileCache = new FileCache(filePath, options);
		const localDeclarations = fileCache.getLocalDeclarations();
		expect(localDeclarations.size).toBeGreaterThan(0);
	});

	it('Test reload after all files loaded', () => {
		const loader = new Loader(options);
		loader.load();

		const cache = loader
			.getAllCache()
			.get('/Users/congcong/Public/projects/yiird/learn/learn-lerna/packages/vue3-ts-api-extractor/__tests__/resource/src/packages/button/o-button-props.ts');
		const _exports = cache?.getLocalExports();
		console.log(_exports);
	});
});
