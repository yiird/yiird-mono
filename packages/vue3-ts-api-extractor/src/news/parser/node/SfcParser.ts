import { Context } from '@src/news/common/Context';
import { SfcFile } from '../../common/SfcFile';
import { ScriptParser } from './ScriptParser';
import { ScriptParserFactory } from './ScriptParserFactory';
import { SfcStructure } from './SfcStructure';
import { SlotNode } from './SlotNode';

export abstract class SfcParser {
	protected _sfcFile: SfcFile;
	private _slotsNode: SlotNode[];
	private _scriptParser: ScriptParser;

	constructor(sfcFile: SfcFile, context: Context) {
		this._sfcFile = sfcFile;
		this._slotsNode = [];
		this._scriptParser = ScriptParserFactory.createParser(sfcFile, context);
	}

	protected abstract parseSlotNodes(): SlotNode[];

	parse(): SfcStructure {
		const scriptStructure = this._scriptParser.parse();
		this._slotsNode = this.parseSlotNodes();
		return new SfcStructure(scriptStructure.filename, scriptStructure.entries, scriptStructure.declarations, this._slotsNode);
	}
}
