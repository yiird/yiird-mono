import { ScriptKind } from 'typescript';
import { Context } from '../../common/Context';
import { SfcFile } from '../../common/SfcFile';
import { SfcParser } from './SfcParser';
import { TemplateSlotParser } from './TemplateSlotParser';

export class TemplateParserFactory {
    static createParser(sfcFile: SfcFile, context: Context): SfcParser {
        let parser;
        switch (sfcFile.lang) {
            case ScriptKind.JS:
            case ScriptKind.TS:
                parser = new TemplateSlotParser(sfcFile, context);
                break;
            case ScriptKind.JSX:
            case ScriptKind.TSX:
            default:
                parser = new TemplateSlotParser(sfcFile, context);
        }
        return parser;
    }
}
