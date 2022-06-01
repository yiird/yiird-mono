import { AbstractStructure } from '../../common/AbstractStructure';
import { DeclarationNode } from './DeclarationNode';
import { ExportNode } from './ExportNode';

export class ScriptStructure extends AbstractStructure {
	private _entries: Map<string, ExportNode>;
	private _declarations: Map<string, DeclarationNode>;

	constructor(filename: string, entries: Map<string, ExportNode>, declarations: Map<string, DeclarationNode>) {
		super(filename);
		this._entries = entries;
		this._declarations = declarations;
	}

	/**
	 * Getter entries
	 * @return {Map<string, ExportNode>}
	 */
	public get entries(): Map<string, ExportNode> {
		return this._entries;
	}

	/**
	 * Getter declarations
	 * @return {Map<string, DeclarationNode>}
	 */
	public get declarations(): Map<string, DeclarationNode> {
		return this._declarations;
	}
}
