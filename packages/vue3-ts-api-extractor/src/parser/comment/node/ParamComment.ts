import { NodeComment } from './NodeComment';
import { TypeComment } from './TypeComment';

export class ParamComment extends NodeComment {
	private _type?: TypeComment;
	private _isRequired?: boolean;

	/**
	 * Getter type
	 * @return {TypeComment}
	 */
	public get type(): TypeComment | undefined {
		return this._type;
	}

	/**
	 * Setter type
	 * @param {TypeComment} value
	 */
	public set type(value: TypeComment | undefined) {
		this._type = value;
	}

	/**
	 * Getter isRequired
	 * @return {boolean}
	 */
	public get isRequired(): boolean | undefined {
		return this._isRequired;
	}

	/**
	 * Setter isRequired
	 * @param {boolean} value
	 */
	public set isRequired(value: boolean | undefined) {
		this._isRequired = value;
	}
}
