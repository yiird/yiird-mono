import { JsxElement } from 'typescript';
import { DeclarationNode } from './DeclarationNode';
import { SlotNode } from './SlotNode';

export class FunctionalSlotNode extends SlotNode {
	private _localDeclarations: Map<string, DeclarationNode>;

	constructor(name: string, root: JsxElement, localDeclarations: Map<string, DeclarationNode>) {
		super(name, root);
		this._localDeclarations = localDeclarations;
	}

	public get root(): JsxElement {
		return super.root as JsxElement;
	}

	/**
	 * Getter localDeclarations
	 * @return {Map<string, DeclarationNode>}
	 */
	public get localDeclarations(): Map<string, DeclarationNode> {
		return this._localDeclarations;
	}
}
