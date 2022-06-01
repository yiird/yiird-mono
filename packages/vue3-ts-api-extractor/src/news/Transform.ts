import { Context } from './common/Context';
import { SfcComment } from './parser/comment/basic/SfcComment';
import { CommentParserFactory } from './parser/comment/CommentParserFactory';
export class Transform {
	private _context: Context;

	constructor(context: Context) {
		this._context = context;
	}

	execute(): SfcComment[] {
		const sfcs = this._context.getAllSfc();
		const comments: SfcComment[] = [];
		sfcs.forEach((sfc) => {
			const parser = CommentParserFactory.createSfcParser(sfc, this._context);
			const main = sfc.entries.get('default');
			if (main) {
				comments.push(parser.parse(main));
			}
		});
		return comments;
	}
}
