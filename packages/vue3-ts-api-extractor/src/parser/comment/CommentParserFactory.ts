import { Context } from '../../common/Context';
import { ScriptStructure } from '../node/ScriptStructure';
import { AbstractCommentParser } from './AbstractCommentParser';
import { EventComment } from './basic/EventComment';
import { MethodComment } from './basic/MethodComment';
import { PropComment } from './basic/PropComment';
import { EventCommentParser } from './ts/EventCommentParser';
import { MethodCommentParser } from './ts/MethodCommentParser';
import { PropCommentParser } from './ts/PropCommentParser';

export class CommentParserFactory {
	static createPropParser(structure: ScriptStructure, context: Context): AbstractCommentParser<PropComment> {
		return new PropCommentParser(structure, context);
	}

	static createMethodParser(structure: ScriptStructure, context: Context): AbstractCommentParser<MethodComment | undefined> {
		return new MethodCommentParser(structure, context);
	}

	static createEventParser(structure: ScriptStructure, context: Context): AbstractCommentParser<EventComment> {
		return new EventCommentParser(structure, context);
	}

	// static createTypeParser(structure: ScriptStructure, context: Context): AbstractCommentParser<TypeComment> {
	// 	return new TypeCommentParser(structure, context);
	// }

	// static createPropertyParser(structure: ScriptStructure, context: Context): AbstractCommentParser<PropertyComment> {
	// 	return new PropertyCommentParser(structure, context);
	// }

	// static createParamParser(structure: ScriptStructure, context: Context): AbstractCommentParser<ParamComment> {
	// 	return new ParamCommentParser(structure, context);
	// }
}
