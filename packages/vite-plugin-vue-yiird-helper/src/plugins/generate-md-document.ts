import { ExtractorOptions, FileNameCallback, extractor } from '@yiird/vue3-ts-api-extractor';
import { resolve } from 'node:path';
import { Plugin } from 'vite';

export type Options = {
    root?: string;
    scanDirs?: string[];
    outputDir?: string;
    outputSingleFile?: boolean;
    filename?: FileNameCallback;
};

export const extractCommentsPlugin = (rawOptions: Options = {}): Plugin[] => {
    const { root = resolve(__dirname, '.'), scanDirs = ['./src'], outputDir = './dist', filename = ({ outfilename }) => outfilename, outputSingleFile = false } = rawOptions;

    const options: ExtractorOptions = {
        root: root,
        scanner: {
            scanDirs: scanDirs,
            extensions: ['.ts', '.vue'],
            externals: ['vue'],
            watch: true
        },
        output: {
            single: outputSingleFile,
            dir: outputDir,
            filename: filename,
            type: 'markdown'
        },
        markdown: {
            hLevelFrom: 2
        }
    };

    return [
        {
            name: 'yiird:extract-comments-plugin',
            enforce: 'pre',
            apply: 'serve',
            async buildStart() {
                const extractorobj = extractor(options);
                extractorobj.extractor();
                extractorobj.on('filechange', (path) => {
                    extractorobj.extractor(path);
                });
            }
        },
        {
            name: 'yiird:custom-block-docs',
            transform(code, id) {
                if (!/vue&type=docs/.test(id)) {
                    return;
                }

                return `export default Comp => {
                    Comp.docs = \`${code}\`
                }`;
            }
        }
    ];
};
