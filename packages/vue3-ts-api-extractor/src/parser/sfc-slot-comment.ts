import { SlotOutletNode } from '@vue/compiler-core';
import { CallbackArgComment, SlotComment } from '../types';
import { SfcUtil } from '../utils/sfc-utils';

export class SfcSlotComment implements SlotComment {
	private _node: SlotOutletNode;
	name = 'default';
	description?: string;
	callbackArgs?: CallbackArgComment[] = [];

	constructor(node: SlotOutletNode) {
		this._node = node;
		this._node.props.forEach((prop) => {
			if (SfcUtil.isAttributeNode(prop)) {
				if (prop.name === 'name' && prop.value) {
					this.name = prop.value?.content;
				} else {
					this.callbackArgs?.push({
						name: prop.name,
						type: ''
					});
				}
			}
		});
		const comments = node.children.filter(SfcUtil.isCommentNode);
		if (comments.length > 0) {
			this.description = comments[0].content;
			if (comments.length > 1) {
				for (let i = 1; i < comments.length; i++) {
					const commentContent = comments[i].content.trim();
					const index = commentContent.indexOf(' ');
					const propName = commentContent.substring(0, index).trim();
					const propComment = commentContent.substring(index).trim();
					const callbackArg = this.callbackArgs?.find((_callbackArg) => _callbackArg.name === propName);
					if (callbackArg) {
						callbackArg.type = propComment;
					}
				}
			}
		}
	}
}
