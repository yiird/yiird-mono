import { Context } from '../../common/Context';
import { ScriptStructure } from '../node/ScriptStructure';
import { AbstractCommentParser } from './AbstractCommentParser';
import { ParamComment } from './node/ParamComment';
import { TypeComment } from './node/TypeComment';
import { ParamCommentParser } from './ts/ParamCommentParser';
import { TypeCommentParser } from './ts/TypeCommentParser';

export class NodeCommentParserFactory {
	static createTypeParser(structure: ScriptStructure, context: Context): AbstractCommentParser<TypeComment> {
		return new TypeCommentParser(structure, context);
	}

	static createParamParser(structure: ScriptStructure, context: Context): AbstractCommentParser<ParamComment> {
		return new ParamCommentParser(this.createTypeParser(structure, context), structure, context);
	}
}
