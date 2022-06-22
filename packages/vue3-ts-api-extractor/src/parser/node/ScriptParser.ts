import { AbstractStructure } from '../../common/AbstractStructure';
import { Context } from '../../common/Context';
import { ScriptFile } from '../../common/ScriptFile';
import { DeclarationNode } from './DeclarationNode';
import { ExportNode } from './ExportNode';
import { ScriptStructure } from './ScriptStructure';

export abstract class ScriptParser {
	protected _scriptFile: ScriptFile;
	private _declarations: Map<string, DeclarationNode>;
	private _entries: Map<string, ExportNode>;
	private _context: Context;

	constructor(scriptFile: ScriptFile, context: Context) {
		this._scriptFile = scriptFile;
		this._context = context;
		this._declarations = new Map<string, DeclarationNode>();
		this._entries = new Map<string, ExportNode>();
	}

	protected abstract parseEntries(): Map<string, ExportNode>;
	protected abstract parseDeclarations(): Map<string, DeclarationNode>;

	parse(): ScriptStructure {
		this._declarations = this.parseDeclarations();
		this._entries = this.parseEntries();
		return new ScriptStructure(this._scriptFile.filename, this._entries, this._declarations);
	}

	get context() {
		return this._context;
	}

	getStructureFromContext(filename: string): AbstractStructure {
		const structure = this._context.getStructure(filename);
		if (!structure) {
			throw new Error('找不到文件 :' + filename);
		}
		return structure;
	}

	/**
	 * Getter declarations
	 * @return {Map<string, DeclarationNode>}
	 */
	public get declarations(): Map<string, DeclarationNode> {
		return this._declarations;
	}
}
