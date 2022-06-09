import { Context } from './common/Context';
import { CommentParserFactory } from './parser/comment/CommentParserFactory';
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

	execute(): TransResult[] {
		const sfcs = this._context.getAllSfc();
		const rs: TransResult[] = [];
		sfcs.forEach((sfc) => {
			const parser = CommentParserFactory.createSfcParser(sfc, this._context);
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
