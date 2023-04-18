import { describe, test } from 'vitest';
import { extractor } from '../src';
describe('Test Transform', () => {
    //测试阻止重复加载文件
    test('Test Transform Sfc', () => {
        extractor({
            root: '/Users/loufei/works/projects/vscode/yiird-mono/packages/vue3-ts-api-extractor/__tests__/test-resouces/',
            scanner: {
                scanDirs: ['button'],
                extensions: ['.ts', '.vue'],
                externals: ['vue'],
                watch: true
            },
            output: {
                single: false,
                dir: '/Users/loufei/works/projects/vscode/yiird-mono/packages/vue3-ts-api-extractor/__tests__/md',
                filename({ outfilename }) {
                    return outfilename;
                },
                type: 'markdown'
            }
        });
    });
});
