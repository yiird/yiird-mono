import { describe, expect, it } from '@jest/globals';
import { tsquery } from '@phenomnomnominal/tsquery';
import { resolve } from 'path';
import { ExportDeclaration } from 'typescript';
import { Loader } from '../src/parser/loader';
import { LoaderOptions } from '../src/types';
import { ParseUtil } from '../src/utils/parse-utils';

describe('测试 Util 相关功能', () => {
	const filePath = '/Users/congcong/Public/projects/yiird/learn/learn-lerna/packages/vue3-ts-api-extractor/__tests__/resource2/main.ts';
	const options: LoaderOptions = {
		root: resolve(__dirname),
		scanDirs: ['./resource2'],
		extensions: ['.vue', '.ts', '.xx'],
		externals: ['vue', '@vue/*', 'lodash-es', '@fortawesome/*']
	};
	const loader = new Loader(options);
	loader.load();
	const cache = loader.getCache(filePath);
	it('Test getLocalExports', () => {
		if (cache) {
			const result = ParseUtil.getExports(cache);
			expect(result.size).toEqual(9);
		}
	});

	it('Test getLocalDeclarations', () => {
		if (cache) {
			const result = ParseUtil.getDeclarations(cache);
			expect(result.size).toEqual(4);
		}
	});

	it('Test getImporterDeclarations', () => {
		if (cache) {
			const result = ParseUtil.getImporters(cache);
			expect(result.size).toEqual(4);
		}
	});

	it('Test path.extname(filePath)', () => {
		const ast = tsquery.ast('export * as X from "aa"');
		const xx = tsquery(ast, 'ExportDeclaration');
		const ee = (xx[0] as ExportDeclaration).exportClause;
		const token = ee?.getFirstToken();
		console.log(ast);
	});
});
