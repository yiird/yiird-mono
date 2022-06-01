import { Context } from '@src/news/common/Context';
import { SfcFile } from '@src/news/common/SfcFile';
import { ScriptParserFactory } from './ScriptParserFactory';
import { TemplateSlotParser } from './TemplateSlotParser';

export class SfcParserFactory {
	static createParser(sfcFile: SfcFile, context: Context) {
		let parser;
		if (sfcFile.template) {
			parser = new TemplateSlotParser(sfcFile, context);
		} else {
			parser = ScriptParserFactory.createParser(sfcFile, context);
		}
		return parser;
	}
}
