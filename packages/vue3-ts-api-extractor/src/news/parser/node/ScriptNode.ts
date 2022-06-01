import { Node } from 'typescript';
import { AbstractNode } from '../../common/AbstractNode';
import { DeclarationNode } from './DeclarationNode';

export class ScriptNode extends AbstractNode {
	private _root: Node;
	private _projection?: Node;
	private _localDeclarations: Map<string, DeclarationNode>;
	constructor(name: string, root: Node, localDeclarations?: Map<string, DeclarationNode>, projection?: Node) {
		super(name);
		this._root = root;
		this._projection = projection;
		this._localDeclarations = localDeclarations || new Map();
	}

	/**
	 * Getter root
	 * @return {Node}
	 */
	public get root(): Node {
		return this._root;
	}

	/**
	 * Getter localDeclarations
	 * @return {Map<string, DeclarationNode>}
	 */
	public get localDeclarations(): Map<string, DeclarationNode> {
		return this._localDeclarations;
	}

	/**
	 * Getter projection
	 * @return {Map<string, DeclarationNode>}
	 */
	public get projection(): Node | undefined {
		return this._projection;
	}
}
