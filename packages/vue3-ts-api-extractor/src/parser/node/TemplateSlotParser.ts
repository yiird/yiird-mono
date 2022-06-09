import { ElementNode, isSlotOutlet, NodeTypes, TemplateChildNode } from '@vue/compiler-core';
import { SfcParser } from './SfcParser';
import { SlotNode } from './SlotNode';
import { TemplateSlotNode } from './TemplateSlotNode';

export class TemplateSlotParser extends SfcParser {
	protected parseSlotNodes(): SlotNode[] {
		const template = this._sfcFile.template;
		const result: SlotNode[] = [];
		if (template) {
			return this._findSlot(template.ast);
		}

		return result;
	}

	private _findSlot(node: ElementNode) {
		const result: TemplateSlotNode[] = [];
		const commentStack: TemplateChildNode[] = [];
		node.children.forEach((child) => {
			if (child.type === NodeTypes.COMMENT) {
				commentStack.push(child);
			} else if (isSlotOutlet(child)) {
				const comments: string[] = [];
				commentStack.splice(0, commentStack.length).forEach((child) => {
					if (child.type === NodeTypes.COMMENT) {
						comments.push(child.content);
					}
				});
				result.push(new TemplateSlotNode(child, comments));
			} else if (child.type === NodeTypes.ELEMENT && child.children.length > 0) {
				commentStack.splice(0, commentStack.length);
				this._findSlot(child).forEach((v) => {
					result.push(v);
				});
			} else if (child.type === NodeTypes.TEXT) {
				if (!/\t+/g.test(child.content)) {
					commentStack.splice(0, commentStack.length);
				}
			} else {
				commentStack.splice(0, commentStack.length);
			}
		});
		return result;
	}
}
