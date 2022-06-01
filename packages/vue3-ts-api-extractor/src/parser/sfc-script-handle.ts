import { tsquery } from '@phenomnomnominal/tsquery';
import { isMap } from 'lodash-es';
import {
	Expression,
	isArrayLiteralExpression,
	isAsExpression,
	isCallExpression,
	isExpressionStatement,
	isIdentifier,
	isLiteralExpression,
	isMethodDeclaration,
	isObjectLiteralExpression,
	isPropertyAssignment,
	isStringLiteral,
	isVariableStatement,
	Node,
	NodeArray,
	ObjectLiteralElementLike
} from 'typescript';
import { ExportInitalizer, NormalComment } from '../types';
import { SfcUtil } from '../utils/sfc-utils';
import { FileCache } from './loader';
import { SfcEventComment } from './sfc-event-comment';
import { SfcMethodComment } from './sfc-method-comment';
import { SfcPropComment } from './sfc-prop-comment';
export class SfcScriptHandle implements NormalComment {
	private _fileCache: FileCache;
	private _defaultExport: ExportInitalizer;
	private _node: Node;
	name: string;
	description?: string | undefined;
	isPrivate?: boolean;
	author?: string;
	date?: string;
	constructor(fileCache: FileCache) {
		this._fileCache = fileCache;
		const defaultExport = this._fileCache.getAllExports().get('default');
		if (!defaultExport || !defaultExport.projection) {
			throw new Error(`There are no exports on file: ${this._fileCache.getAst().fileName}`);
		}
		this._defaultExport = defaultExport;
		this._node = defaultExport.projection;
		this.isPrivate = false;
		this.name = this._getName();
		const jsDocs = SfcUtil.getJsDoc(defaultExport.root);
		this.description = jsDocs.length > 0 ? SfcUtil.getDescription(jsDocs[0]) : undefined;
		this.author = this._getTagComment('author');
		this.date = this._getTagComment('date');
	}
	private _getName() {
		let nameComment = this._getTagComment('name');
		if (!nameComment) {
			const name = this._extractPropertyFromDefault('name');
			if (name) {
				if (!isMap(name) && isLiteralExpression(name)) {
					nameComment = name.text;
				}
			} else {
				const defaultExport = this._node;
				if (defaultExport && isVariableStatement(defaultExport)) {
					nameComment = defaultExport.declarationList.declarations[0].name.getText();
				}
			}
		}

		return nameComment || '';
	}

	private _getTagComment(name: string) {
		const defaultExport = this._defaultExport;

		if (defaultExport) {
			const jsDocs = SfcUtil.getJsDoc(defaultExport.root);
			if (jsDocs && jsDocs[0]) {
				const tag = SfcUtil.getTag(name, jsDocs[0]);
				if (tag) {
					return SfcUtil.getDescription(tag);
				}
			}
		}
	}

	public props() {
		const result: SfcPropComment[] = [];
		const propsExpression = this._extractPropertyFromDefault('props');

		if (propsExpression) {
			const properties = this._handlePropsExpression(propsExpression);
			properties?.forEach((property) => {
				if (isPropertyAssignment(property)) {
					result.push(new SfcPropComment(property, this._fileCache));
				} else if (isStringLiteral(property)) {
					result.push(new SfcPropComment(property, this._fileCache));
				}
			});
		}
		return result;
	}

	private _handlePropsExpression(node: Node): NodeArray<ObjectLiteralElementLike | Expression> | undefined {
		if (isObjectLiteralExpression(node)) {
			return node.properties;
		} else if (isArrayLiteralExpression(node)) {
			//todo 不支持数组定义的简单语法
			return node.elements;
		} else if (isAsExpression(node)) {
			return this._handlePropsExpression(node.expression);
		}
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
		const filterEmits = (nodes: Node[]) => {
			const result: Node[] = [];
			nodes.forEach((_node) => {
				const _nodes = tsquery(_node, 'ExpressionStatement:has(CallExpression[expression.name=emit]),ExpressionStatement:has(CallExpression[expression.name.name=$emit])', {
					visitAllChildren: true
				});
				result.push(..._nodes);
			});
			return result;
		};

		const emitEvents = filterEmits([this._fileCache.getAst()]);

		emitEvents.forEach((emitEvent) => {
			if (isExpressionStatement(emitEvent)) {
				result.push(new SfcEventComment(emitEvent));
			}
		});

		return result;
	}

	private _extractPropertyFromDefault(name: string) {
		let expression: Expression | undefined;
		if (isCallExpression(this._node) && this._node.expression.getText() === 'defineComponent') {
			expression = this._node.arguments[0];
		} else if (isObjectLiteralExpression(this._node)) {
			expression = this._node;
		}
		if (expression) {
			if (isObjectLiteralExpression(expression)) {
				const property = expression.properties.find((property) => property.name?.getText() === name);
				if (property) {
					if (isPropertyAssignment(property)) {
						if (isIdentifier(property.initializer)) {
							return this._fileCache.getProduction(property.initializer.text);
						} else return property.initializer;
					}
				}
			}
		}
	}
}
