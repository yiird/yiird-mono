import { describe, expect, test } from '@jest/globals';
import { Scanner } from '@src/news/Scanner';
import { Transform } from '@src/news/Transform';

describe('Test Transform', () => {
	//测试阻止重复加载文件
	test('Test Transform Sfc', () => {
		const scanner = new Scanner({
			root: '/Users/gavin/Works/projects/self/vscode-workspace/yiird-mono/packages/vue3-ts-api-extractor/src/__tests__',
			scanDirs: ['test-resouces'],
			extensions: ['.ts', '.vue'],
			externals: ['vue']
		});

		scanner.scan();

		const context = scanner.getContext();
		const transform = new Transform(context);
		const comments = transform.execute();
		const comment = comments[0];
		expect(comment.props).toBeDefined();
		expect(comment.props?.length).toBe(7);
		comment.props?.forEach((prop) => {
			if (prop.name === 'mode') {
				expect(prop.values?.length).toBe(3);
			}
		});

		comment.methods?.forEach((method) => {
			console.log(method);
		});
	});
});
