import { SlotOutletNode } from '@vue/compiler-core';
import { SlotNode } from './SlotNode';

export class TemplateSlotNode extends SlotNode {
	constructor(root: SlotOutletNode, comments: string[]) {
		super(root, comments);
	}

	public get root(): SlotOutletNode {
		return this._root as SlotOutletNode;
	}
}
