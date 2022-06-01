import { Node } from 'typescript';
import { ScriptNode } from './ScriptNode';

export class DeclarationNode extends ScriptNode {
	constructor(name: string, root: Node, localDeclarations: Map<string, DeclarationNode>, projection?: Node) {
		super(name, root, localDeclarations, projection);
	}
}
