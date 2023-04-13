import EventEmitter from 'events';
import { writeFileSync } from 'fs';
import { basename, extname, join } from 'path';
import { Scanner } from './Scanner';
import { Transform } from './Transform';
import { MdProvider } from './transform/MdProvider';
import { Provider } from './transform/Provider';
import { ExtractorOptions } from './types';
export * from './types';

export const extractor = (options: ExtractorOptions) => {
    // const scanner = new Scanner(options.scanner);
    // scanner.scan();
    // const context = scanner.getContext();

    // let provider;
    // if (options.output.type === 'markdown') {
    // 	provider = new MdProvider(options.markdown);
    // }
    // if (provider) {
    // 	const transform = new Transform(context, provider);
    // 	const result = transform.execute();
    // 	const allValue: string[] = [];
    // 	result.forEach(({ value, sfc }) => {
    // 		if (options.output.single) {
    // 			allValue.push(value + '');
    // 		} else {
    // 			let outfilename = join(options.output.dir, basename(sfc.filename, extname(sfc.filename)) + '.md');
    // 			outfilename = options.output.filename(outfilename);
    // 			writeFileSync(outfilename, value + '', {
    // 				encoding: 'utf-8',
    // 				flag: 'w+'
    // 			});
    // 		}
    // 	});

    // 	if (allValue.length > 0 && options.output.filename) {
    // 		let outfilename = join(options.output.dir, 'README.md');
    // 		outfilename = options.output.filename(outfilename);

    // 		writeFileSync(outfilename, allValue.join('\n\n'));
    // 	}
    // }
    const extractor = new Extractor(options);
    extractor.extractor();
    return extractor;
};

export class Extractor extends EventEmitter {
    private _options: ExtractorOptions;
    private _scanner: Scanner;
    private _provider: Provider;
    private _transform: Transform;
    constructor(options: ExtractorOptions) {
        super();
        this._options = options;
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
        const result = this._transform.execute(filename);
        const allValue: string[] = [];
        result.forEach(({ value, sfc }) => {
            if (this._options.output.single) {
                allValue.push(value + '');
            } else {
                let outfilename = join(this._options.output.dir, basename(sfc.filename, extname(sfc.filename)) + '.md');
                outfilename = this._options.output.filename(outfilename);
                writeFileSync(outfilename, value + '', {
                    encoding: 'utf-8',
                    flag: 'w+'
                });
            }
        });

        if (allValue.length > 0 && this._options.output.filename) {
            let outfilename = join(this._options.output.dir, 'README.md');
            outfilename = this._options.output.filename(outfilename);

            writeFileSync(outfilename, allValue.join('\n\n'));
        }
    }
}
