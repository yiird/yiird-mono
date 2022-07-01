import { describe, test } from '@jest/globals';
import { extractor } from '../src';
describe('Test Transform', () => {
	//测试阻止重复加载文件
	test('Test Transform Sfc', () => {
		extractor({
			scanner: {
				root: '/Users/gavin/Works/projects/self/vscode-workspace/yiird-mono/packages/owl/src/components/',
				scanDirs: ['icon'],
				extensions: ['.ts', '.vue'],
				externals: ['vue'],
				watch: true
			},
			output: {
				single: false,
				dir: '/Users/gavin/Works/projects/self/vscode-workspace/yiird-mono/packages/vue3-ts-api-extractor/__tests__/md',
				filename(filename) {
					return filename;
				},
				type: 'markdown'
			}
		});
	});
});
