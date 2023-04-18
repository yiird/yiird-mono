import { expect, test } from 'vitest';
import { Scanner } from '../src/Scanner';

//测试阻止重复加载文件
test('Test Duplicate File', () => {
    const scanner = new Scanner({
        scanDirs: ['/Users/loufei/works/projects/vscode/yiird-mono/packages/vue3-ts-api-extractor/__tests__/test-resouces/'],
        extensions: ['.ts', '.vue'],
        ignore: ['button/**', 'node_modules/**'],
        externals: ['vue']
    });
    scanner.scan();

    expect(scanner.prevent_duplicate_loads_times).toBeGreaterThan(1);

    expect(scanner.getContext().getAllSfc().length).toBe(1);
});

//测试强制加载文件
test('Test ForceUpdate File', () => {
    const c_file = '/Users/loufei/works/projects/vscode/yiird-mono/packages/vue3-ts-api-extractor/__tests__/test-resouces/c.ts';

    const scanner = new Scanner({
        scanDirs: ['/Users/loufei/works/projects/vscode/yiird-mono/packages/vue3-ts-api-extractor/__tests__/test-resouces'],
        extensions: ['.ts'],
        ignore: ['button/**'],
        externals: ['vue']
    });
    scanner.scan();
    scanner.scan(c_file);
    scanner.scan(c_file);
    expect(scanner.prevent_duplicate_loads_times).toBe(18);
    scanner.scan(c_file, true);
    expect(scanner.prevent_duplicate_loads_times).toBe(18);
});
