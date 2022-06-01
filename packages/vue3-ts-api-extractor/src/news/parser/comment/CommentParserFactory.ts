import { Context } from '@src/news/common/Context';
import { ScriptStructure } from '../node/ScriptStructure';
import { SfcStructure } from '../node/SfcStructure';
import { AbstractCommentParser } from './AbstractCommentParser';
import { EventComment } from './basic/EventComment';
import { MethodComment } from './basic/MethodComment';
import { PropComment } from './basic/PropComment';
import { SfcComment } from './basic/SfcComment';
import { ParamComment } from './node/ParamComment';
import { PropertyComment } from './node/PropertyComment';
import { TypeComment } from './node/TypeComment';
import { EventCommentParser } from './ts/EventCommentParser';
import { MethodCommentParser } from './ts/MethodCommentParser';
import { ParamCommentParser } from './ts/ParamCommentParser';
import { PropCommentParser } from './ts/PropCommentParser';
import { PropertyCommentParser } from './ts/PropertyCommentParser';
import { SfcCommentParser } from './ts/SfcCommentParser';
import { TypeCommentParser } from './ts/TypeCommentParser';

export class CommentParserFactory {
	static createSfcParser(structure: SfcStructure, context: Context): AbstractCommentParser<SfcComment> {
		return new SfcCommentParser(structure, context);
	}

	static createPropParser(structure: ScriptStructure, context: Context): AbstractCommentParser<PropComment> {
		return new PropCommentParser(structure, context);
	}

	static createMethodParser(structure: ScriptStructure, context: Context): AbstractCommentParser<MethodComment | undefined> {
		return new MethodCommentParser(structure, context);
	}

	static createEventParser(structure: ScriptStructure, context: Context): AbstractCommentParser<EventComment> {
		return new EventCommentParser(structure, context);
	}

	static createTypeParser(structure: ScriptStructure, context: Context): AbstractCommentParser<TypeComment> {
		return new TypeCommentParser(structure, context);
	}

	static createPropertyParser(structure: ScriptStructure, context: Context): AbstractCommentParser<PropertyComment> {
		return new PropertyCommentParser(structure, context);
	}

	static createParamParser(structure: ScriptStructure, context: Context): AbstractCommentParser<ParamComment> {
		return new ParamCommentParser(structure, context);
	}
}
