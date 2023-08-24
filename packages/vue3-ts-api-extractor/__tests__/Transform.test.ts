import { isArray, kebabCase } from 'lodash-es';
import { resolve } from 'node:path';
import { describe, test } from 'vitest';
import { extractor } from '../src';
describe('Test Transform', () => {
    //测试阻止重复加载文件
    test('Test Transform Sfc', () => {
        extractor({
            root: '/Users/loufei/works/projects/vscode/yiird-mono/packages/elements/packages',
            scanner: {
                scanDirs: ['components/tree'],
                extensions: ['.ts', '.tsx', '.vue'],
                externals: ['vue'],
                watch: true
            },
            output: {
                single: false,
                dir: '/Users/loufei/works/projects/vscode/yiird-mono/packages/vue3-ts-api-extractor/__tests__/md',
                filename({ outfilename, outDir, info }) {
                    if (!isArray(info)) {
                        return resolve(outDir, kebabCase(info.comment.name) + '.md');
                    }
                    return outfilename;
                },
                type: 'markdown'
            }
        });
    });
});
