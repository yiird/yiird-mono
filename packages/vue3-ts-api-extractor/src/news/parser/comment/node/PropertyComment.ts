import { NodeComment } from './NodeComment';
import { TypeComment } from './TypeComment';

export class PropertyComment extends NodeComment {
	private _type?: TypeComment | string;
	public get type(): TypeComment | string | undefined {
		return this._type;
	}
	public set type(value: TypeComment | string | undefined) {
		this._type = value;
	}
}
