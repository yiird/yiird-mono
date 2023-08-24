import { ExtractorOptions, FileNameCallback, extractor } from '@yiird/vue3-ts-api-extractor';
import { existsSync, lstatSync, readdirSync, unlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { FilterPattern, Plugin, createFilter } from 'vite';

type CleanOptions = {
    target: FilterPattern;
    ignore?: FilterPattern;
};

export type Options = {
    root?: string;
    scanDirs?: string[];
    outputDir?: string;
    outputSingleFile?: boolean;
    filename?: FileNameCallback;
    clean?: CleanOptions;
};

function deleteFolderRecursive(folderPath: string, filter?: (id: string | unknown) => boolean) {
    if (existsSync(folderPath)) {
        readdirSync(folderPath).forEach((file) => {
            const curPath = join(folderPath, file);
            if (lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath, filter);
            } else {
                if (filter) {
                    if (filter(curPath)) {
                        unlinkSync(curPath);
                    }
                } else {
                    unlinkSync(curPath);
                }
            }
        });
        // rmdirSync(folderPath);
    }
}

export const extractCommentsPlugin = (rawOptions: Options = {}): Plugin[] => {
    const { clean, root = resolve(__dirname, '.'), scanDirs = ['./src'], outputDir = './dist', filename = ({ outfilename }) => outfilename, outputSingleFile = false } = rawOptions;

    const options: ExtractorOptions = {
        root: root,
        scanner: {
            scanDirs: scanDirs,
            extensions: ['.ts', '.tsx', '.vue'],
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
            hLevelFrom: 1
        }
    };

    return [
        {
            name: 'yiird:extract-comments-plugin',
            enforce: 'pre',
            apply: 'serve',
            async buildStart() {
                if (clean) {
                    const filter = createFilter(clean.target, clean.ignore);
                    deleteFolderRecursive(resolve(options.root, options.output.dir), filter);
                }
                const extractorobj = extractor(options);
                extractorobj.extractor();
                extractorobj.on('filechange', (path) => {
                    console.log('extractor:', path);
                    console.time('extractor');
                    extractorobj.extractor(path);
                    console.timeEnd('extractor');
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
