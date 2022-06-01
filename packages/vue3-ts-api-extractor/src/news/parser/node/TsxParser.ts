import { NodeUtils } from '@src/news/common/NodeUtils';
import ts, { Node, StringLiteral, SyntaxKind } from 'typescript';
import { DeclarationNode } from './DeclarationNode';
import { ExportFromNode } from './ExportFromNode';
import { ExportNode } from './ExportNode';
import { ScriptParser } from './ScriptParser';

type BasketItem = {
	origin: Node;
	initializer: Node;
};

export class TsxParser extends ScriptParser {
	protected parseEntries(): Map<string, ExportNode> {
		//所有导出项声明或者导出表达式
		const map = new Map<string, ExportNode>();
		if (!this._scriptFile.script) {
			return map;
		}
		const selector = '[modifiers.0.kind=' + SyntaxKind.ExportKeyword + '],ExportAssignment,ExportDeclaration';
		const basket = new Map<string, BasketItem>();
		const results = NodeUtils.searchChildTsNodes(this._scriptFile.script, selector);

		let ALL_IN_INDEX = 0;

		results.forEach((_result) => {
			if (ts.isExportAssignment(_result)) {
				basket.set('default', {
					origin: _result,
					initializer: _result.expression
				});
			} else if (ts.isExportDeclaration(_result)) {
				//NamespaceExport | NamedExports
				const exportClause = _result.exportClause;
				let moduleSpecifier: string | undefined;
				if (_result.moduleSpecifier) {
					moduleSpecifier = (_result.moduleSpecifier as StringLiteral).text;
				}
				if (exportClause) {
					if (ts.isNamedExports(exportClause)) {
						exportClause.elements.forEach((_element) => {
							const name = _element.name.text;
							const propertyName = _element.propertyName;
							if (moduleSpecifier) {
								map.set(name, new ExportFromNode(name, propertyName ? propertyName.text : name, moduleSpecifier, _result));
							} else {
								basket.set(name, {
									origin: _result,
									initializer: propertyName || _element.name
								});
							}
						});
					} else if (ts.isNamespaceExport(exportClause)) {
						if (moduleSpecifier) {
							const name = exportClause.name.text;
							map.set(name, new ExportFromNode(name, '*', moduleSpecifier, _result));
						}
					}
				} else {
					if (moduleSpecifier) {
						const name = `ALL_IN_${ALL_IN_INDEX++}`;
						map.set(name, new ExportFromNode(name, '*', moduleSpecifier, _result));
					}
				}
			} else {
				NodeUtils.getDeclarationNodeInfo(_result).forEach((_declaration) => {
					basket.set(_declaration.name, {
						origin: _result,
						initializer: _declaration.initializer
					});
				});
			}
		});

		basket.forEach((_item, _name) => {
			if (!_item) {
				return;
			}
			const selector = `VariableStatement,FunctionDeclaration`;
			let projection: Node | undefined;
			if (ts.isIdentifier(_item.initializer)) {
				const _projectionNode = NodeUtils.recursiveSearch(_item.initializer.text, this.declarations);
				if (_projectionNode) {
					projection = _projectionNode.projection || _projectionNode.root;
				}
			} else {
				projection = _item.initializer;
			}

			let projectionInnerNodes;
			if (projection) {
				projectionInnerNodes = NodeUtils.searchChildTsNodes(projection, selector);
			} else {
				projectionInnerNodes = NodeUtils.searchChildTsNodes(_item.initializer, selector);
			}

			let innerNodesMap = new Map();
			if (projectionInnerNodes && projectionInnerNodes.length > 0) {
				innerNodesMap = NodeUtils.recursiveSearchDeclarations(projectionInnerNodes);
			}

			const exportNode = new ExportNode(_name, _item.origin, innerNodesMap, projection);
			map.set(_name, exportNode);
		});
		return map;
	}
	protected parseDeclarations(): Map<string, DeclarationNode> {
		if (!this._scriptFile.script) {
			return new Map();
		}
		const not = ':not([modifiers.0.kind=' + SyntaxKind.ExportKeyword + '])';
		const selector = `VariableStatement${not},FunctionDeclaration${not},ClassDeclaration${not},InterfaceDeclaration${not}`;
		const results = NodeUtils.searchChildTsNodes(this._scriptFile.script, selector);
		return NodeUtils.recursiveSearchDeclarations(results);
	}
}
