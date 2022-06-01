import { Expression, ExpressionStatement, getJSDocPrivateTag, isCallExpression, isJSDocParameterTag, isStringLiteral, JSDoc } from 'typescript';
import { CallbackArgComment, EmitComment } from '../types';
import { SfcUtil } from '../utils/sfc-utils';
export class SfcEventComment implements EmitComment {
	private _node: ExpressionStatement;
	private _callback: Expression;
	private _docs: JSDoc[];
	private _mainDoc?: JSDoc;
	name: string;
	description?: string;
	isPrivate?: boolean;
	callbackArgs?: CallbackArgComment[];

	constructor(node: ExpressionStatement) {
		this._node = node;
		this._callback = node.expression;
		this._docs = SfcUtil.getJsDoc(this._node);
		this._mainDoc = !this._docs || this._docs[this._docs.length - 1];
		this.name = this._getName();
		this.isPrivate = this._mainDoc && !!getJSDocPrivateTag(this._mainDoc);
		this.description = !this._mainDoc ? '' : SfcUtil.getDescription(this._mainDoc);
		this.callbackArgs = this._getCallbackArgs();
	}

	private _getCallbackArgs(): CallbackArgComment[] {
		const args: CallbackArgComment[] = [];
		if (this._mainDoc) {
			const argComments = SfcUtil.getTags('param', this._mainDoc);
			argComments?.forEach((argComment, index) => {
				if (isJSDocParameterTag(argComment)) {
					const _argComment: CallbackArgComment = {
						name: `arg${index + 1}`,
						description: SfcUtil.getDescription(argComment)
					};
					args.push(Object.assign(SfcUtil.getParamComment(argComment, this._docs), _argComment));
				}
			});
		}
		return args;
	}

	private _getName() {
		if (isCallExpression(this._callback)) {
			const arg0 = this._callback.arguments[0];
			if (isStringLiteral(arg0)) {
				return arg0.text;
			}
		}

		return '';
	}
}
