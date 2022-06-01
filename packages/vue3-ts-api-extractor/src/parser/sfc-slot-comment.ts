import { tsquery } from '@phenomnomnominal/tsquery';
import { CommentNode, SlotOutletNode } from '@vue/compiler-core';
import { isJSDocParameterTag, JSDoc, JSDocParameterTag } from 'typescript';
import { CallbackArgComment, SlotComment } from '../types';
import { SfcUtil } from '../utils/sfc-utils';

export class SfcSlotComment implements SlotComment {
	private _node: SlotOutletNode;
	name = 'default';
	description?: string;
	props?: CallbackArgComment[] = [];

	constructor(node: SlotOutletNode) {
		this._node = node;
		this._init();
	}

	private _init() {
		this._node.props.forEach((prop) => {
			if (SfcUtil.isAttributeNode(prop)) {
				if (prop.name === 'name' && prop.value) {
					this.name = prop.value?.content;
				}
			} else if (SfcUtil.isDirectiveNode(prop)) {
				if (prop.arg && SfcUtil.isSimpleExpression(prop.arg)) {
					this.props?.push({
						name: prop.arg.content,
						type: ''
					});
				}
			}
		});
		const comments = this._node.children.filter(SfcUtil.isCommentNode);
		if (comments.length > 0) {
			this.description = comments[0].content;
			if (comments.length > 1) {
				const jsDocs = this._packgeTypeDef(comments);
				const params = new Map<string, JSDocParameterTag>();
				jsDocs.forEach((jsDoc) => {
					jsDoc.tags?.forEach((tag) => {
						if (isJSDocParameterTag(tag)) {
							params.set(tag.name.getText(), tag);
						}
					});
				});
				this.props?.forEach((_argComment) => {
					const tag = params.get(_argComment.name);
					if (tag) {
						Object.assign(_argComment, SfcUtil.getParamComment(tag, jsDocs));
					}
				});
			}
		}
	}

	private _packgeTypeDef(comments: CommentNode[]): JSDoc[] {
		const typedefs = [];
		for (let i = 1; i < comments.length; i++) {
			const commentContent = comments[i].content.trim();
			if (commentContent.startsWith('@typedef')) {
				typedefs.push('/\n/**');
				typedefs.push(' ' + commentContent);
			} else {
				typedefs.push(' ' + commentContent);
			}
		}
		const jsDocStr = '/**\n *' + typedefs.join('\n *') + '\n */';
		return tsquery.query(jsDocStr, 'JSDocComment', {
			visitAllChildren: true
		});
	}
}
