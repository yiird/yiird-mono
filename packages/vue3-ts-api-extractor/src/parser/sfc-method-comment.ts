import { isUndefined } from 'lodash-es';
import {
	getJSDocPrivateTag,
	getTextOfJSDocComment,
	isFunctionExpression,
	isJSDocParameterTag,
	isMethodDeclaration,
	isPropertyAssignment,
	JSDoc,
	MethodDeclaration,
	PropertyAssignment
} from 'typescript';
import { MethodComment, ParamComment } from '../types';
import { SfcUtil } from '../utils/sfc-utils';

export class SfcMethodComment implements MethodComment {
	private _node: MethodDeclaration | PropertyAssignment;
	private _docs: JSDoc[];
	private _mainDoc?: JSDoc;
	name: string;
	description?: string;
	isPrivate?: boolean = false;
	syntax?: string[];
	parameters?: ParamComment[];
	returnType?: string;
	constructor(node: MethodDeclaration | PropertyAssignment) {
		this.name = '';
		this._node = node;
		this._docs = SfcUtil.getJsDoc(this._node);
		this._mainDoc = !this._docs || this._docs[this._docs.length - 1];
		this.name = this._node.name.getText();
		this.isPrivate = this._mainDoc && !!getJSDocPrivateTag(this._mainDoc);
		this.description = !this._mainDoc ? '' : SfcUtil.getDescription(this._mainDoc);
		this.syntax = this._getSyntax();
		this.parameters = this._getParameters();
		this.returnType = this._returnType();
	}

	private _getSyntax() {
		const result: string[] = [];
		let _parameters;
		if (isPropertyAssignment(this._node) && isFunctionExpression(this._node.initializer)) {
			_parameters = this._node.initializer.parameters;
		} else if (isMethodDeclaration(this._node)) {
			_parameters = this._node.parameters;
		}
		const defaultParams: string[] = [];
		_parameters?.forEach((_parameter) => {
			defaultParams.push(_parameter.getText());
		});
		const defaultSyntax = `${this.name}(${defaultParams.join(', ')})${this.returnType ? ' => ' + this.returnType : ''}`;

		result.push(defaultSyntax);

		if (this._mainDoc) {
			const tags = SfcUtil.getTags('syntax', this._mainDoc);
			tags?.forEach((tag) => {
				const tagComment = getTextOfJSDocComment(tag.comment);
				if (tagComment) {
					result.push(tagComment);
				}
			});
		}
		return result;
	}

	private _returnType() {
		let returnType;
		if (isPropertyAssignment(this._node) && isFunctionExpression(this._node.initializer)) {
			returnType = this._node.initializer.type?.getText();
		} else if (isMethodDeclaration(this._node)) {
			returnType = this._node.type?.getText();
		}
		return returnType;
	}

	private _getParameters() {
		const result: Map<string, ParamComment> = new Map();
		let _parameters;
		if (isPropertyAssignment(this._node) && isFunctionExpression(this._node.initializer)) {
			_parameters = this._node.initializer.parameters;
		} else if (isMethodDeclaration(this._node)) {
			_parameters = this._node.parameters;
		}

		if (_parameters) {
			_parameters.forEach((_parameter) => {
				const parameter = {
					name: _parameter.name.getText(),
					type: _parameter.type?.getText(),
					required: !isUndefined(_parameter.questionToken)
				};
				result.set(parameter.name, parameter);
			});
		}

		if (this._mainDoc) {
			const tags = SfcUtil.getTags('param', this._mainDoc);
			tags?.forEach((tag) => {
				if (isJSDocParameterTag(tag)) {
					const name = tag.name.getText();
					const parameter = result.get(name);
					Object.assign(parameter, SfcUtil.getParamComment(tag, this._docs));
				}
			});
		}

		return Array.from(result.values());
	}
}
