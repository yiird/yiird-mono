import { writeFileSync } from 'fs';
import { basename, extname, join } from 'path';
import { Scanner } from './Scanner';
import { Transform } from './Transform';
import { MdProvider } from './transform/MdProvider';
import { ExtractorOptions } from './types';

export const extractor = (options: ExtractorOptions) => {
	const scanner = new Scanner(options.scanner);
	scanner.scan();
	const context = scanner.getContext();

	let provider;
	if (options.output.type === 'markdown') {
		provider = new MdProvider(options.markdown);
	}
	if (provider) {
		const transform = new Transform(context, provider);
		const result = transform.execute();
		const allValue: string[] = [];
		result.forEach(({ value, sfc }) => {
			if (options.output.single) {
				allValue.push(value + '');
			} else {
				let outfilename = join(options.output.dir, basename(sfc.filename, extname(sfc.filename)) + '.md');
				outfilename = options.output.filename(outfilename);
				writeFileSync(outfilename, value + '', {
					encoding: 'utf-8',
					flag: 'w+'
				});
			}
		});

		if (allValue.length > 0 && options.output.filename) {
			let outfilename = join(options.output.dir, 'README.md');
			outfilename = options.output.filename(outfilename);

			writeFileSync(outfilename, allValue.join('\n\n'));
		}
	}
};
