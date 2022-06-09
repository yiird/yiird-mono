import ts, { Node } from 'typescript';
import { JsdocUtils } from '../../../common/JsdocUtils';
import { AbstractCommentParser } from '../AbstractCommentParser';
import { CommentParserFactory } from '../CommentParserFactory';
import { ParamComment } from '../node/ParamComment';

export class ParamCommentParser extends AbstractCommentParser<ParamComment> {
	private _typeParser = CommentParserFactory.createTypeParser(this.structure, this.context);

	parse(node: Node): ParamComment {
		const jsdocs = JsdocUtils.getJsDoc(node);
		const jsdoc = jsdocs[0];
		const comment = new ParamComment();
		if (ts.isParameter(node)) {
			comment.name = node.name.getText();
			comment.isRequired = !node.questionToken;
			if (node.type) {
				comment.type = this._typeParser.parse(node.type);
			}
		}

		if (jsdoc) {
			comment.description = JsdocUtils.getDescription(jsdoc);
		}
		return comment;
	}
}
