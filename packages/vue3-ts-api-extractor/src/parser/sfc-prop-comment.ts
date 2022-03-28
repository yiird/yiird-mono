import { tsquery } from '@phenomnomnominal/tsquery';
import {
	getJSDocPrivateTag,
	getTextOfJSDocComment,
	isAsExpression,
	isFunctionDeclaration,
	isLiteralExpression,
	isMethodDeclaration,
	isObjectLiteralExpression,
	isPropertyAssignment,
	isReturnStatement,
	isStringLiteral,
	JSDoc,
	PropertyAssignment,
	StringLiteral,
	SyntaxKind
} from 'typescript';
import { PropComment } from '../types';
import { SfcUtil } from '../utils/sfc-utils';

export class SfcPropComment implements PropComment {
	private _node: StringLiteral | PropertyAssignment;
	private _docs?: JSDoc[];
	private _mainDoc?: JSDoc;
	name: string;
	description?: string;
	isPrivate?: boolean = false;
	default?: string;
	type?: string;
	required?: boolean = false;
	values?: string;
	constructor(node: StringLiteral | PropertyAssignment) {
		this.name = '';
		this._node = node;
		if (isStringLiteral(this._node)) {
			this.name = this._node.text;
		} else if (isPropertyAssignment(this._node)) {
			this._docs = SfcUtil.getJsDoc(this._node);
			this._mainDoc = !this._docs || this._docs[this._docs.length - 1];
			this.name = this._node.name.getText();
			this.default = this._getDefault();
			this.required = this._getRequired();
			this.isPrivate = this._mainDoc && !!getJSDocPrivateTag(this._mainDoc);
			this.description = !this._mainDoc ? '' : SfcUtil.getDescription(this._mainDoc);
			this.type = this._getType();
			this.values = this._getValues();
		}
	}
	private _getType() {
		const property = this._getDefineProperty('type') || this._node;
		if (property && isPropertyAssignment(property)) {
			if (isAsExpression(property.initializer)) {
				return property.initializer.expression.getText();
			} else {
				return property.initializer.getText();
			}
		}
	}

	private _getValues() {
		if (this._mainDoc) {
			const tag = SfcUtil.getTag('values', this._mainDoc);
			if (tag) {
				return getTextOfJSDocComment(tag.comment);
			}
		}
	}

	private _getDefineProperty(name: string) {
		if (isPropertyAssignment(this._node) && isObjectLiteralExpression(this._node.initializer)) {
			return this._node.initializer.properties.find((property) => (isPropertyAssignment(property) || isMethodDeclaration(property)) && property.name.getText() === name);
		}
	}

	private _getDefault() {
		if (this._mainDoc) {
			const tag = SfcUtil.getTag('default', this._mainDoc);
			if (tag) {
				return getTextOfJSDocComment(tag.comment);
			}
		}

		const returns = [];
		const property = this._getDefineProperty('default');
		if (property) {
			if (isMethodDeclaration(property) || (isPropertyAssignment(property) && isFunctionDeclaration(property.initializer))) {
				const statements = tsquery(property, 'ReturnStatement');
				statements.forEach((statement) => {
					if (isReturnStatement(statement)) {
						returns.push(statement.expression?.getFullText());
					}
				});
			} else if (isPropertyAssignment(property)) {
				if (isLiteralExpression(property.initializer)) {
					returns.push(property.initializer.text);
				} else {
					returns.push(property.initializer.getText());
				}
			}
		}
		return returns.length > 0 ? returns[returns.length - 1] : undefined;
	}

	private _getRequired() {
		const property = this._getDefineProperty('required');
		if (property) {
			if (isPropertyAssignment(property) && property.initializer.kind === SyntaxKind.TrueKeyword) {
				return true;
			}
		}
		return false;
	}
}
