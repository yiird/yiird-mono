import { PropertyComment } from '../node/PropertyComment';
import { BasicComment } from './BasicComment';

export class EventComment extends BasicComment {
	private _args?: Array<PropertyComment>;
	public get args(): Array<PropertyComment> | undefined {
		return this._args;
	}
	public set args(value: Array<PropertyComment> | undefined) {
		this._args = value;
	}
}
