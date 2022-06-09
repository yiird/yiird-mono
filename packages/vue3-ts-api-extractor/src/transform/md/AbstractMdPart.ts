import { BasicComment } from '../../parser/comment/basic/BasicComment';
import { NodeComment } from '../../parser/comment/node/NodeComment';
import { MdStyles } from './Style';

export interface MdOptions {
	styles: typeof MdStyles;
	// before: (comment: UnionBasicComment, nodeComment: UnionNodeComment) => string;
	// transform: (basicComment: UnionBasicComment, nodeComment: UnionNodeComment) => BasicComment;
	// after: (comment: UnionBasicComment, nodeComment: UnionNodeComment) => string;
}

export abstract class AbstractMdPart<C extends BasicComment | NodeComment> {
	private _options: MdOptions;

	public get styles(): typeof MdStyles {
		return this.options.styles;
	}

	constructor(options: MdOptions) {
		this._options = options;
	}

	abstract toMd(comment: C, level: number): string;

	/**
	 * Getter options
	 * @return {MdOptions}
	 */
	public get options(): MdOptions {
		return this._options;
	}

	protected _commentToObject(comment: BasicComment | NodeComment) {
		const obj: Record<string, unknown> = {};
		Object.getOwnPropertyNames(comment).forEach((name) => {
			obj[name.startsWith('_') ? name.substring(1) : name] = Object.getOwnPropertyDescriptor(comment, name)?.value;
		});
		return obj;
	}
}
