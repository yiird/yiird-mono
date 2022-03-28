import { tsquery } from '@phenomnomnominal/tsquery';
import { isMap } from 'lodash-es';
import {
	isArrayLiteralExpression,
	isCallExpression,
	isExpressionStatement,
	isIdentifier,
	isLiteralExpression,
	isMethodDeclaration,
	isObjectLiteralExpression,
	isPropertyAssignment,
	isStringLiteral,
	isVariableStatement,
	Node
} from 'typescript';
import { BingInitalizer, NormalComment } from '../types';
import { ParseUtil } from '../utils/parse-utils';
import { FileCache } from './loader';
import { SfcEventComment } from './sfc-event-comment';
import { SfcMethodComment } from './sfc-method-comment';
import { SfcPropComment } from './sfc-prop-comment';
export class SfcScriptHandle implements NormalComment {
	private _fileCache: FileCache;
	name: string;
	description?: string | undefined;
	isPrivate?: boolean;
	constructor(fileCache: FileCache) {
		this._fileCache = fileCache;
		this.isPrivate = false;
		this.name = this._getName();
	}
	private _getName() {
		const name = this._extractPropertyFromDefault('name');
		if (name) {
			if (!isMap(name) && isLiteralExpression(name)) {
				return name.text;
			}
		} else {
			const defaultExport = this.defaultExport();
			if (defaultExport && isVariableStatement(defaultExport)) {
				return defaultExport.declarationList.declarations[0].name.getText();
			}
		}
		return '';
	}

	public defaultExport(): Node | undefined {
		const localExports = this._fileCache.getLocalExports();
		let defaultExport;
		localExports.forEach((localExport, name) => {
			if (name === 'default') {
				if (!isMap(localExport.initializer)) {
					defaultExport = localExport.initializer;
				}
			}
		});
		return defaultExport;
	}

	public props() {
		const result: SfcPropComment[] = [];
		const propsExpression = this._extractPropertyFromDefault('props');
		if (propsExpression && !isMap(propsExpression)) {
			if (isObjectLiteralExpression(propsExpression)) {
				propsExpression.properties.forEach((property) => {
					if (isPropertyAssignment(property)) {
						result.push(new SfcPropComment(property));
					}
				});
			} else if (isArrayLiteralExpression(propsExpression)) {
				//todo 不支持数组定义的简单语法
				propsExpression.elements.forEach((element) => {
					if (isStringLiteral(element)) {
						result.push(new SfcPropComment(element));
					}
				});
			}
		}
		return result;
	}

	public methods() {
		const result: SfcMethodComment[] = [];
		const methodsExpression = this._extractPropertyFromDefault('methods');
		if (methodsExpression && !isMap(methodsExpression)) {
			if (isObjectLiteralExpression(methodsExpression)) {
				methodsExpression.properties.forEach((property) => {
					if (isMethodDeclaration(property) || isPropertyAssignment(property)) {
						result.push(new SfcMethodComment(property));
					}
				});
			}
		}
		return result;
	}

	public emits() {
		const result: SfcEventComment[] = [];
		const emitsExpression = this._extractPropertyFromDefault('emits');
		const emitNames: string[] = [];
		if (emitsExpression && !isMap(emitsExpression)) {
			if (isObjectLiteralExpression(emitsExpression)) {
				emitsExpression.properties.forEach((property) => {
					if (property.name) emitNames.push(property.name.getText());
				});
			} else if (isArrayLiteralExpression(emitsExpression)) {
				emitsExpression.elements.forEach((element) => {
					if (element) emitNames.push(element.getText());
				});
			}
		}

		const filterEmits = (declarations: BingInitalizer[]) => {
			const nodes: Node[] = [];
			declarations.forEach((declaration) => {
				if (!isMap(declaration.initializer)) {
					if (!isObjectLiteralExpression(declaration.initializer)) {
						const _nodes = tsquery(declaration.initializer, 'ExpressionStatement[expression.expression.name.name=emit]', {
							visitAllChildren: true
						});
						nodes.push(..._nodes);
					}
				} else {
					declaration.initializer.forEach((item) => {
						if (!isObjectLiteralExpression(item)) {
							const _nodes = tsquery(item, 'ExpressionStatement[expression.expression.name.name=emit]', {
								visitAllChildren: true
							});
							nodes.push(..._nodes);
						}
					});
				}
			});
			return nodes;
		};

		const target1 = Array.from(this._fileCache.getLocalDeclarations().values());
		const target2 = Array.from(this._fileCache.getImportDeclarations().values());
		const node1s = filterEmits(target1);
		const node2s = filterEmits(target2);
		const emitEvents = [...node1s, ...node2s];
		emitEvents.forEach((emitEvent) => {
			if (isExpressionStatement(emitEvent)) {
				result.push(new SfcEventComment(emitEvent));
			}
		});
		return result;
	}

	private _extractPropertyFromDefault(name: string) {
		let defaultExport = this.defaultExport();
		if (defaultExport && isVariableStatement(defaultExport)) {
			defaultExport = defaultExport.declarationList.declarations[0].initializer;
		}
		if (defaultExport) {
			if (isCallExpression(defaultExport) && defaultExport.expression.getText() === 'defineComponent') {
				defaultExport = defaultExport.arguments[0];
			}
		}
		if (defaultExport && isObjectLiteralExpression(defaultExport)) {
			const property = defaultExport.properties.find((property) => property.name?.getText() === name);
			if (property) {
				if (isPropertyAssignment(property)) {
					const initializer = property.initializer;
					if (isIdentifier(initializer)) {
						const name = initializer.getText();
						return ParseUtil.getInitalizer(name, this._fileCache)?.initializer;
					} else {
						return initializer;
					}
				}
			}
		}
	}
}
