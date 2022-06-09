import { SlotOutletNode } from '@vue/compiler-core';
import { JsxElement } from 'typescript';
import { AbstractNode } from '../../common/AbstractNode';

export abstract class SlotNode extends AbstractNode {
	private _root: SlotOutletNode | JsxElement;
	private _comments: string[];
	constructor(root: SlotOutletNode | JsxElement, comments: string[]) {
		super();
		this._root = root;
		this._comments = comments;
	}

	/**
	 * Getter root
	 * @return {SlotOutletNode|JsxElement}
	 */
	public get root(): SlotOutletNode | JsxElement {
		return this._root;
	}

	/**
	 * Getter comments
	 * @return {string[]}
	 */
	public get comments(): string[] {
		return this._comments;
	}
}
