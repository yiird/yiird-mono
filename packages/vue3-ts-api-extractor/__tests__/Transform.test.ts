import { describe, test } from '@jest/globals';
import { extractor } from '../src';

describe('Test Transform', () => {
	//测试阻止重复加载文件
	test('Test Transform Sfc', () => {
		extractor({
			scanner: {
				root: '/Users/gavin/Works/projects/self/vscode-workspace/yiird-mono/packages/vue3-ts-api-extractor/__tests__',
				scanDirs: ['test-resouces'],
				extensions: ['.ts', '.vue'],
				externals: ['vue']
			},
			output: {
				single: false,
				dir: '/Users/gavin/Works/projects/self/vscode-workspace/yiird-mono/packages/vue3-ts-api-extractor/__tests__/md',
				filename(filename) {
					console.log(filename);
					return filename;
				},
				type: 'markdown'
			}
		});
	});
});
