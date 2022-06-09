import { tsquery } from '@phenomnomnominal/tsquery';
import ts, { ImportDeclaration, Node, SourceFile, SyntaxKind } from 'typescript';
import { DeclarationNode } from '../parser/node/DeclarationNode';
import { ScriptNode } from '../parser/node/ScriptNode';
import { SlotNode } from '../parser/node/SlotNode';
import { AbstractNode } from './AbstractNode';

export type BasketItem = {
	origin: Node;
	initializer: Node;
};

export class NodeUtils {
	static extractImporters(script: SourceFile): ImportDeclaration[] {
		return tsquery(script, 'ImportDeclaration');
	}

	static isScriptNode(node: AbstractNode) {
		return node instanceof ScriptNode;
	}

	static isSlotNode(node: AbstractNode) {
		return node instanceof SlotNode;
	}

	static getText(node: Node): string {
		let text;
		if (
			SyntaxKind.NumberKeyword === node.kind ||
			SyntaxKind.BooleanKeyword === node.kind ||
			SyntaxKind.StringKeyword === node.kind ||
			SyntaxKind.UndefinedKeyword === node.kind ||
			SyntaxKind.NullKeyword === node.kind ||
			SyntaxKind.UnknownKeyword === node.kind
		) {
			text = node.getText();
		} else if (SyntaxKind.TrueKeyword === node.kind || SyntaxKind.FalseKeyword === node.kind) {
			text = new Boolean(node.getText());
		} else if (ts.isNumericLiteral(node) || ts.isBigIntLiteral(node)) {
			text = Number(node.text);
		} else if (ts.isIdentifier(node) || ts.isLiteralExpression(node)) {
			text = node.text;
		} else if (ts.isLiteralTypeNode(node)) {
			text = this.getText(node.literal);
		} else {
			text = node.getText();
		}
		return text + '';
	}

	static searchChildTsNodes(root: string | Node, selector: string): Node[] {
		const nodes = tsquery(root, selector, {
			visitAllChildren: true
		});
		return nodes.filter((_node) => {
			return root !== _node && ts.isBlock(_node.parent) ? root === _node.parent.parent : root === _node.parent;
		});
	}

	static recursiveSearchDeclarations(nodes: Array<Node>): Map<string, DeclarationNode> {
		const basket = new Map<string, BasketItem>();
		nodes.forEach((_result) => {
			this.getDeclarationNodeInfo(_result).forEach((_declaration) => {
				basket.set(_declaration.name, {
					origin: _result,
					initializer: _declaration.initializer
				});
			});
		});

		const result = new Map<string, DeclarationNode>();

		basket.forEach((_item, _name) => {
			if (!_item) {
				return;
			}
			const selector = `VariableStatement,FunctionDeclaration`;
			let projection: Node | undefined;
			if (ts.isIdentifier(_item.initializer)) {
				const _projectionNode = this.recursiveSearch(_item.initializer.text, basket);
				if (_projectionNode) {
					projection = _projectionNode.initializer || _projectionNode.origin;
				}
			} else {
				projection = _item.initializer;
			}
			let projectionInnerNodes;
			if (projection) {
				projectionInnerNodes = this.searchChildTsNodes(projection, selector);
			}

			let innerNodesMap = new Map();
			if (projectionInnerNodes && projectionInnerNodes.length > 0) {
				innerNodesMap = this.recursiveSearchDeclarations(projectionInnerNodes);
			}

			const declarationNode = new DeclarationNode(_name, _item.origin, innerNodesMap, projection);
			result.set(_name, declarationNode);
		});

		return result;
	}

	static getDeclarationNodeInfo(node: Node): Array<{ name: string; initializer: Node }> {
		const basket: Array<{ name: string; initializer: Node }> = [];
		if (ts.isVariableStatement(node)) {
			node.declarationList.declarations.forEach((_declaration) => {
				const name = _declaration.name.getText();
				const initializer = _declaration.initializer;
				if (initializer) {
					basket.push({
						name,
						initializer
					});
				}
			});
		} else if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node)) {
			const name = node.name?.getText();

			if (name) {
				basket.push({
					name,
					initializer: node
				});
			}
		} else if (ts.isTypeAliasDeclaration(node)) {
			basket.push({
				name: node.name.text,
				initializer: node.type
			});
		}
		return basket;
	}

	static recursiveSearch<T extends DeclarationNode | BasketItem | undefined>(name: string, basket: Map<string, T>): T | undefined {
		const target = basket.get(name);
		if (!target) return;

		if (target instanceof DeclarationNode) {
			return target;
		} else {
			if (ts.isIdentifier(target.initializer)) {
				return this.recursiveSearch(target.initializer.text, basket);
			} else {
				return target;
			}
		}
	}

	static getScopeDeclarations(name: string, scope: Node) {
		const scopeDeclarations = NodeUtils.recursiveSearchDeclarations([scope]);
		let targetNode: DeclarationNode | undefined;
		scopeDeclarations.forEach((scopeDeclaration) => {
			const _targetNode = scopeDeclaration.localDeclarations.get(name);
			if (_targetNode) {
				targetNode = _targetNode;
			}
		});
		return targetNode;
	}
}
