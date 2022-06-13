import ts, { Node } from 'typescript';
import { Context } from '../../../common/Context';
import { JsdocUtils } from '../../../common/JsdocUtils';
import { ScriptStructure } from '../../node/ScriptStructure';
import { AbstractCommentParser } from '../AbstractCommentParser';
import { ParamComment } from '../node/ParamComment';
import { TypeComment } from '../node/TypeComment';

export class ParamCommentParser extends AbstractCommentParser<ParamComment> {
	private _typeParser;
	constructor(typeParser: AbstractCommentParser<TypeComment>, structure: ScriptStructure, context: Context) {
		super(structure, context);
		this._typeParser = typeParser;
	}
	//private _typeParser = NodeCommentParserFactory.createTypeParser(this.structure, this.context);

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
