import { extname } from 'path';
import { Context } from './common/Context';
import { SfcCommentParser } from './parser/comment/ts/SfcCommentParser';
import { SfcStructure } from './parser/node/SfcStructure';
import { Provider } from './transform/Provider';

export type TransResult = {
	sfc: SfcStructure;
	value: unknown;
};

export class Transform {
	private _context: Context;
	private _provider: Provider;

	constructor(context: Context, provider: Provider) {
		this._context = context;
		this._provider = provider;
	}

	execute(filename?: string): TransResult[] {
		const sfcs: SfcStructure[] = [];
		if (filename) {
			if (extname(filename) === '.vue') {
				sfcs.push(...this._context.getSfc(filename));
			} else {
				this._context.getAffectedFiles(filename).forEach((_filename) => {
					if (extname(_filename) === '.vue') {
						sfcs.push(...this._context.getSfc(_filename));
					}
				});
			}
		} else {
			sfcs.push(...this._context.getAllSfc());
		}
		const rs: TransResult[] = [];
		sfcs.forEach((sfc) => {
			const parser = new SfcCommentParser(sfc, this._context);
			const main = sfc.entries.get('default');
			if (main) {
				const comment = parser.parse(main);
				const value = this._provider.to(comment);
				rs.push({
					sfc,
					value
				});
			}
		});
		return rs;
	}
}
