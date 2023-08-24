import { writeFile } from 'fs';
import EventEmitter from 'node:events';
import { basename, extname, isAbsolute, join, resolve } from 'path';
import { Scanner } from './Scanner';
import { Transform } from './Transform';
import { MdProvider } from './transform/MdProvider';
import { Provider } from './transform/Provider';
import { ExtractorOptions } from './types';
export * from './types';

export const extractor = (options: ExtractorOptions) => {
    const extractor = new Extractor(options);
    return extractor.extractor();
};

export class Extractor extends EventEmitter {
    private _options: ExtractorOptions;
    private _scanner: Scanner;
    private _provider: Provider;
    private _transform: Transform;
    constructor(options: ExtractorOptions) {
        super();
        this._options = options;

        this._options.scanner.scanDirs.forEach((scandir, index, arr) => {
            if (!isAbsolute(scandir)) arr[index] = resolve(this._options.root, scandir);
        });

        if (!isAbsolute(this._options.output.dir)) {
            this._options.output.dir = resolve(this._options.root, this._options.output.dir);
        }

        this._scanner = new Scanner(this._options.scanner);
        if (this._options.output.type === 'markdown') {
            this._provider = new MdProvider(this._options.markdown);
        } else {
            throw Error('目前只支持输出： markdown');
        }
        this._scanner.scan();
        const context = this._scanner.getContext();
        this._transform = new Transform(context, this._provider);
        this._scanner.on('filechange', (path, eventName) => {
            this.emit('filechange', path, eventName);
        });
    }

    extractor(filename?: string) {
        if (filename) {
            this._scanner.scan(filename, true);
        }
        const results = this._transform.execute(filename);
        const allValue: string[] = [];

        results.forEach((rs) => {
            const { sfc, value } = rs;
            if (this._options.output.single) {
                allValue.push(value + '');
            } else {
                let outfilename = join(this._options.output.dir, basename(sfc.filename, extname(sfc.filename)) + '.md');
                outfilename = this._options.output.filename({ outfilename, outDir: this._options.output.dir, info: rs });
                writeFile(
                    outfilename,
                    value + '',
                    {
                        encoding: 'utf-8',
                        flag: 'w+'
                    },
                    () => {}
                );
            }
        });

        //将所有组件文档输出到单文件中
        if (allValue.length > 0 && this._options.output.filename) {
            let outfilename = join(this._options.output.dir, 'README.md');
            outfilename = this._options.output.filename({ outfilename, outDir: this._options.output.dir, info: results });
            writeFile(
                outfilename,
                allValue.join('\n\n'),
                {
                    encoding: 'utf-8',
                    flag: 'w+'
                },
                () => {}
            );
        }
        return this;
    }
}
