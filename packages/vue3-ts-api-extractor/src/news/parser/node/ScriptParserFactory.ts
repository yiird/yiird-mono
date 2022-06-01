import { Context } from '@src/news/common/Context';
import { ScriptKind } from 'typescript';
import { ScriptFile } from '../../common/ScriptFile';
import { TsxParser } from './TsxParser';

export class ScriptParserFactory {
	static createParser(scriptFile: ScriptFile, context: Context) {
		const parser = new TsxParser(scriptFile, context);
		switch (scriptFile.lang) {
			case ScriptKind.JS:
			case ScriptKind.JSX:
			case ScriptKind.TS:
			case ScriptKind.TSX:
				break;
		}
		return parser;
	}
}
