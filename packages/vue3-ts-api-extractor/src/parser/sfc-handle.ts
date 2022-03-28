import { ElementNode, isSlotOutlet, NodeTypes, SlotOutletNode } from '@vue/compiler-core';
import { FileCache } from './loader';
import { SfcScriptHandle } from './sfc-script-handle';
import { SfcSlotComment } from './sfc-slot-comment';

export class SfcHandle extends SfcScriptHandle {
	private _templateAst?: ElementNode;
	constructor(fileCache: FileCache) {
		super(fileCache);
		this._templateAst = fileCache.getTemplateAst();
	}

	public slots() {
		const result: SfcSlotComment[] = [];
		if (this._templateAst) {
			const allSlot: SlotOutletNode[] = [];
			this._findSlot(this._templateAst, allSlot);
			if (allSlot.length > 0) {
				allSlot.forEach((slot) => {
					result.push(new SfcSlotComment(slot));
				});
			}
		}

		return result;
	}

	private _findSlot(node: ElementNode, result: SlotOutletNode[]) {
		node.children.forEach((child) => {
			if (isSlotOutlet(child)) {
				result.push(child);
			} else if (child.type === NodeTypes.ELEMENT && child.children.length > 0) {
				this._findSlot(child, result);
			}
		});
	}
}
