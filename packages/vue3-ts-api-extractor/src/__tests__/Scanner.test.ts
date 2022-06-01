import { describe, test } from '@jest/globals';
import { Scanner } from '@src/news/Scanner';

describe('Test Scanner', () => {
	//测试阻止重复加载文件
	test('Test Duplicate File', () => {
		const scanner = new Scanner({
			root: '/Users/gavin/Works/projects/self/vscode-workspace/yiird-mono/packages/vue3-ts-api-extractor/src/__tests__',
			scanDirs: ['test-resouces'],
			extensions: ['.ts', '.vue'],
			ignore: ['button/**'],
			externals: ['vue']
		});
		scanner.scan();

		expect(scanner.prevent_duplicate_loads_times).toBe(1);

		expect(scanner.getContext().getAllSfc().length).toBe(0);
	});

	//测试强制加载文件
	test('Test ForceUpdate File', () => {
		const c_file = '/Users/gavin/Works/projects/self/vscode-workspace/yiird-mono/packages/vue3-ts-api-extractor/src/__tests__/test-resouces/c.ts';

		const scanner = new Scanner({
			root: '/Users/gavin/Works/projects/self/vscode-workspace/yiird-mono/packages/vue3-ts-api-extractor/src/__tests__',
			scanDirs: ['test-resouces'],
			extensions: ['.ts'],
			ignore: ['button/**'],
			externals: ['vue']
		});
		scanner.scan();
		scanner.scan(c_file);
		scanner.scan(c_file);
		expect(scanner.prevent_duplicate_loads_times).toBe(3);
		scanner.scan(c_file, true);
		expect(scanner.prevent_duplicate_loads_times).toBe(3);
	});
});
