import { DeclarationNode } from './DeclarationNode';
import { ExportNode } from './ExportNode';
import { ScriptStructure } from './ScriptStructure';
import { SlotNode } from './SlotNode';

export class SfcStructure extends ScriptStructure {
	private _slotNodes: SlotNode[];

	constructor(filename: string, entries: Map<string, ExportNode>, declarations: Map<string, DeclarationNode>, slotNodes: SlotNode[]) {
		super(filename, entries, declarations);
		this._slotNodes = slotNodes;
	}

	get slotNodes() {
		return this._slotNodes;
	}
}
