import { Node } from 'typescript';
import { DeclarationNode } from './DeclarationNode';
import { ScriptNode } from './ScriptNode';

export class ExportNode extends ScriptNode {
	private _exportedName: string;
	constructor(name: string, root: Node, localDeclarations: Map<string, DeclarationNode>, projection?: Node) {
		super(name, root, localDeclarations, projection);
		this._exportedName = name;
	}

	/**
	 * Getter exportedName
	 * @return {string}
	 */
	public get exportedName(): string {
		return this._exportedName;
	}
}
